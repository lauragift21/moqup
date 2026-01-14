import type { ReactNode } from 'react'

interface BrowserFrameProps {
  children: ReactNode
  url?: string
}

export function BrowserFrame({ children, url = 'localhost:3000' }: BrowserFrameProps) {
  return (
    <div className="relative inline-flex flex-col shadow-lg rounded-[12px] overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-[#27272A] px-4 py-3 flex items-center gap-3">
        {/* Traffic lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" aria-hidden="true" />
        </div>
        
        {/* Navigation buttons */}
        <div className="flex items-center gap-1 ml-2">
          <div className="w-6 h-6 rounded flex items-center justify-center text-[var(--color-text-muted)]" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
          <div className="w-6 h-6 rounded flex items-center justify-center text-[var(--color-text-muted)]" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
        
        {/* Address bar */}
        <div className="flex-1 mx-4">
          <div className="bg-[#18181B] rounded-lg h-8 flex items-center px-3">
            <svg className="w-4 h-4 text-[var(--color-text-muted)] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span className="text-sm text-[var(--color-text-muted)] truncate">{url}</span>
          </div>
        </div>
        
        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center text-[var(--color-text-muted)]" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Browser content */}
      <div className="relative bg-black">
        <div className="relative w-[800px] aspect-[1280/800]">
          {children}
        </div>
      </div>
    </div>
  )
}
