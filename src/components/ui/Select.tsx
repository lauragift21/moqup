import { useId, type SelectHTMLAttributes, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  children: ReactNode
}

export function Select({
  label,
  children,
  className = '',
  id: providedId,
  ...props
}: SelectProps) {
  const generatedId = useId()
  const id = providedId || generatedId

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm text-[var(--color-text-secondary)]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className="w-full h-10 px-3 pr-10 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg appearance-none cursor-pointer text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
      </div>
    </div>
  )
}
