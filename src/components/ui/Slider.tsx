import { useId, type InputHTMLAttributes } from 'react'

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  showValue?: boolean
  unit?: string
}

export function Slider({
  label,
  showValue = true,
  unit = '',
  value,
  className = '',
  id: providedId,
  ...props
}: SliderProps) {
  const generatedId = useId()
  const id = providedId || generatedId

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={id} className="text-sm text-[var(--color-text-secondary)]">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-mono text-[var(--color-text-muted)]">
              {value}{unit}
            </span>
          )}
        </div>
      )}
      <input
        id={id}
        type="range"
        value={value}
        className="w-full h-1.5 bg-[var(--color-surface-elevated)] rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[var(--color-text-primary)]
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:duration-150
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-webkit-slider-thumb]:active:scale-95
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-[var(--color-text-primary)]
          [&::-moz-range-thumb]:border-none
          [&::-moz-range-thumb]:cursor-pointer"
        {...props}
      />
    </div>
  )
}
