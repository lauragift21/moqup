import { useState, useRef, useEffect, useCallback, type RefObject } from 'react'
import { toPng, toSvg } from 'html-to-image'
import { Download, ChevronDown, Image, FileCode } from 'lucide-react'
import { Button } from '../ui/Button'
import { socialSizes, scaleOptions } from '../../lib/social-sizes'

interface ExportMenuProps {
  canvasRef: RefObject<HTMLDivElement | null>
  disabled?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ExportMenu({ canvasRef, disabled, open, onOpenChange }: ExportMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [exporting, setExporting] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Support both controlled and uncontrolled modes
  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = useCallback((value: boolean) => {
    setInternalOpen(value)
    onOpenChange?.(value)
  }, [onOpenChange])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, setIsOpen])

  const handleExportPng = async (scale: number, targetWidth?: number | null, targetHeight?: number | null) => {
    if (!canvasRef.current || exporting) return

    setExporting(true)
    try {
      const options: Parameters<typeof toPng>[1] = {
        pixelRatio: scale,
        cacheBust: true,
      }

      if (targetWidth && targetHeight) {
        options.width = targetWidth
        options.height = targetHeight
        options.style = {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      }

      const dataUrl = await toPng(canvasRef.current, options)
      
      const link = document.createElement('a')
      link.download = `moqup-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
      setIsOpen(false)
    }
  }

  const handleExportSvg = async () => {
    if (!canvasRef.current || exporting) return

    setExporting(true)
    try {
      const dataUrl = await toSvg(canvasRef.current, {
        cacheBust: true,
      })
      
      const link = document.createElement('a')
      link.download = `moqup-${Date.now()}.svg`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || exporting}
        variant="primary"
        size="md"
      >
        <Download className="w-4 h-4" />
        {exporting ? 'Exporting...' : 'Export'}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg overflow-hidden z-50 animate-fade-in-up">
          {/* PNG Options */}
          <div className="p-2 border-b border-[var(--color-border)]">
            <div className="px-2 py-1 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              PNG
            </div>
            {scaleOptions.map((scale) => (
              <button
                key={scale.id}
                type="button"
                onClick={() => handleExportPng(scale.value)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-[var(--color-surface-elevated)] rounded-lg transition-colors"
              >
                <Image className="w-4 h-4 text-[var(--color-text-muted)]" />
                <span className="text-[var(--color-text-primary)]">Original ({scale.label})</span>
              </button>
            ))}
          </div>

          {/* Social Sizes */}
          <div className="p-2 border-b border-[var(--color-border)] max-h-[200px] overflow-y-auto">
            <div className="px-2 py-1 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
              Social Media
            </div>
            {socialSizes.filter(s => s.width !== null).map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => handleExportPng(2, size.width, size.height)}
                className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm text-left hover:bg-[var(--color-surface-elevated)] rounded-lg transition-colors"
              >
                <span className="text-[var(--color-text-primary)]">{size.name}</span>
                <span className="text-xs text-[var(--color-text-muted)] font-mono">
                  {size.width}x{size.height}
                </span>
              </button>
            ))}
          </div>

          {/* SVG Option */}
          <div className="p-2">
            <button
              type="button"
              onClick={handleExportSvg}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-[var(--color-surface-elevated)] rounded-lg transition-colors"
            >
              <FileCode className="w-4 h-4 text-[var(--color-text-muted)]" />
              <span className="text-[var(--color-text-primary)]">SVG (Vector)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
