import { useState, useRef, useEffect, useCallback, useId } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { RotateCcw, Github } from 'lucide-react'

import { DropZone } from '../components/editor/DropZone'
import { Canvas } from '../components/editor/Canvas'
import { ExportMenu } from '../components/editor/ExportMenu'
import { DeviceSelector } from '../components/controls/DeviceSelector'
import { BackgroundPicker } from '../components/controls/BackgroundPicker'
import { PaddingControl } from '../components/controls/PaddingControl'
import { ShadowControl } from '../components/controls/ShadowControl'
import { Slider } from '../components/ui/Slider'
import { Button } from '../components/ui/Button'
import { getGradientStyle, gradientPresets } from '../lib/gradients'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [image, setImage] = useState<string | null>(null)
  const [device, setDevice] = useState('none')
  const [background, setBackground] = useState(getGradientStyle(gradientPresets[0]))
  const [padding, setPadding] = useState(64)
  const [shadow, setShadow] = useState('medium')
  const [borderRadius, setBorderRadius] = useState(24)
  const [exportMenuOpen, setExportMenuOpen] = useState(false)
  const [browserUrl, setBrowserUrl] = useState('myapp.com')

  const canvasRef = useRef<HTMLDivElement>(null)
  const browserUrlId = useId()

  const handleReset = useCallback(() => {
    setImage(null)
    setDevice('none')
    setBackground(getGradientStyle(gradientPresets[0]))
    setPadding(64)
    setShadow('medium')
    setBorderRadius(24)
    setBrowserUrl('myapp.com')
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S to open export menu
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (image) {
          setExportMenuOpen(true)
        }
      }
      
      // Escape to clear image
      if (e.key === 'Escape' && image) {
        e.preventDefault()
        handleReset()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [image, handleReset])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.5))' }}>
              <rect x="4" y="6" width="16" height="20" rx="2" fill="#3F3F46" stroke="#EF4444" strokeWidth="1.5"/>
              <rect x="12" y="6" width="16" height="20" rx="2" fill="#27272A" stroke="#EF4444" strokeWidth="1.5"/>
            </svg>
            <span className="text-lg font-semibold text-[var(--color-text-primary)]">Moqup</span>
          </div>
          <span className="text-sm text-[var(--color-text-muted)] hidden sm:inline">
            Drop. Frame. Ship.
          </span>
        </div>

        <div className="flex items-center gap-3">
          {image && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          )}
          <a
            href="https://github.com/lauragift21/moqup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="View on GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <ExportMenu 
            canvasRef={canvasRef} 
            disabled={!image} 
            open={exportMenuOpen}
            onOpenChange={setExportMenuOpen}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Canvas area */}
        <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
          {!image ? (
            <DropZone onImageSelect={setImage} />
          ) : (
            <div className="flex items-center justify-center">
              <Canvas
                ref={canvasRef}
                image={image}
                device={device}
                background={background}
                padding={padding}
                shadow={shadow}
                borderRadius={borderRadius}
                browserUrl={browserUrl}
              />
            </div>
          )}
        </div>

        {/* Controls sidebar - only show when image is loaded */}
        {image && (
          <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-[var(--color-border)] bg-[var(--color-background)] p-6 space-y-6 overflow-y-auto animate-slide-in-right">
            <DeviceSelector value={device} onChange={setDevice} />
            
            {device === 'browser' && (
              <div className="space-y-2">
                <label htmlFor={browserUrlId} className="block text-sm font-medium text-[var(--color-text-secondary)]">
                  Browser URL
                </label>
                <input
                  id={browserUrlId}
                  type="text"
                  value={browserUrl}
                  onChange={(e) => setBrowserUrl(e.target.value)}
                  placeholder="example.com"
                  className="w-full h-10 px-3 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                />
              </div>
            )}
            
            <BackgroundPicker value={background} onChange={setBackground} />
            
            <PaddingControl value={padding} onChange={setPadding} />
            
            <ShadowControl value={shadow} onChange={setShadow} />
            
            <Slider
              label="Border Radius"
              min={0}
              max={48}
              step={4}
              value={borderRadius}
              unit="px"
              onChange={(e) => setBorderRadius(Number(e.target.value))}
            />
          </aside>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            Free & open-source. Built on Cloudflare Workers.
          </p>
          {image && (
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 font-mono bg-[var(--color-surface)] rounded border border-[var(--color-border)]">Ctrl+S</kbd>
                <span>Export</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 font-mono bg-[var(--color-surface)] rounded border border-[var(--color-border)]">Esc</kbd>
                <span>Reset</span>
              </span>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
