import { useState, useCallback, useEffect, useRef, type DragEvent, type ChangeEvent } from 'react'
import { Upload, Image as ImageIcon } from 'lucide-react'

interface DropZoneProps {
  onImageSelect: (imageData: string) => void
}

export function DropZone({ onImageSelect }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') {
        onImageSelect(result)
      }
    }
    reader.readAsDataURL(file)
  }, [onImageSelect])

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }, [processFile])

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }, [processFile])

  // Paste handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) {
            processFile(file)
            break
          }
        }
      }
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [processFile])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      fileInputRef.current?.click()
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Upload image - drag and drop, paste, or click to browse"
      className={`
        relative w-full h-full min-h-[400px] flex flex-col items-center justify-center
        border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer animate-fade-in
        ${isDragOver 
          ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)] scale-[1.02]' 
          : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)] bg-[var(--color-surface)]'
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
      
      <div className={`
        flex flex-col items-center gap-4 transition-all duration-300 pointer-events-none
        ${isDragOver ? 'scale-110' : ''}
      `}>
        <div className={`
          w-20 h-20 rounded-2xl flex items-center justify-center transition-colors duration-300
          ${isDragOver ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-surface-elevated)]'}
        `}>
          {isDragOver ? (
            <Upload className="w-10 h-10 text-white" />
          ) : (
            <ImageIcon className="w-10 h-10 text-[var(--color-text-muted)]" />
          )}
        </div>
        
        <div className="text-center">
          <p className="text-lg font-medium text-[var(--color-text-primary)]">
            {isDragOver ? 'Drop your image' : 'Drop. Frame. Ship.'}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Drag & drop, paste (Ctrl+V), or click to browse
          </p>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <kbd className="px-2 py-1 text-xs font-mono bg-[var(--color-surface-elevated)] rounded border border-[var(--color-border)] text-[var(--color-text-muted)]">
            Ctrl
          </kbd>
          <span className="text-[var(--color-text-muted)]">+</span>
          <kbd className="px-2 py-1 text-xs font-mono bg-[var(--color-surface-elevated)] rounded border border-[var(--color-border)] text-[var(--color-text-muted)]">
            V
          </kbd>
          <span className="text-sm text-[var(--color-text-muted)] ml-1">to paste</span>
        </div>
      </div>
    </div>
  )
}
