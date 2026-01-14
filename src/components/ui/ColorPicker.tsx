import { useId, type InputHTMLAttributes } from 'react'

interface ColorPickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function ColorPicker({
  label,
  value,
  className = '',
  id: providedId,
  ...props
}: ColorPickerProps) {
  const generatedId = useId()
  const id = providedId || generatedId

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm text-[var(--color-text-secondary)]">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            id={id}
            type="color"
            value={value}
            className="w-10 h-10 rounded-lg cursor-pointer border border-[var(--color-border)] bg-transparent [&::-webkit-color-swatch-wrapper]:p-1 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none"
            {...props}
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={props.onChange}
          className="flex-1 h-10 px-3 text-sm font-mono bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}
