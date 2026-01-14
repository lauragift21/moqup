import { useState } from 'react'
import { gradientPresets, getGradientStyle, getGradientStyleFromColors } from '../../lib/gradients'
import { ColorPicker } from '../ui/ColorPicker'
import { Slider } from '../ui/Slider'
import { Button } from '../ui/Button'

type BackgroundType = 'gradient' | 'solid' | 'custom' | 'transparent'

interface BackgroundPickerProps {
  value: string
  onChange: (value: string) => void
}

export function BackgroundPicker({ value, onChange }: BackgroundPickerProps) {
  const [type, setType] = useState<BackgroundType>('gradient')
  const [solidColor, setSolidColor] = useState('#18181B')
  const [customFrom, setCustomFrom] = useState('#667eea')
  const [customTo, setCustomTo] = useState('#764ba2')
  const [customAngle, setCustomAngle] = useState(90)

  const handleTypeChange = (newType: BackgroundType) => {
    setType(newType)
    
    switch (newType) {
      case 'gradient':
        onChange(getGradientStyle(gradientPresets[0]))
        break
      case 'solid':
        onChange(solidColor)
        break
      case 'custom':
        onChange(getGradientStyleFromColors(customFrom, customTo, customAngle))
        break
      case 'transparent':
        onChange('transparent')
        break
    }
  }

  const handleSolidChange = (color: string) => {
    setSolidColor(color)
    if (type === 'solid') {
      onChange(color)
    }
  }

  const handleCustomGradientChange = (from: string, to: string, angle: number) => {
    setCustomFrom(from)
    setCustomTo(to)
    setCustomAngle(angle)
    if (type === 'custom') {
      onChange(getGradientStyleFromColors(from, to, angle))
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm text-[var(--color-text-secondary)]">Background</span>
      
      {/* Type tabs */}
      <div className="flex gap-1 p-1 bg-[var(--color-surface)] rounded-lg">
        {(['gradient', 'solid', 'custom', 'transparent'] as BackgroundType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTypeChange(t)}
            className={`
              flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize
              ${type === t 
                ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]' 
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
              }
            `}
          >
            {t === 'transparent' ? 'None' : t}
          </button>
        ))}
      </div>

      {/* Gradient presets */}
      {type === 'gradient' && (
        <div className="grid grid-cols-6 gap-2">
          {gradientPresets.map((gradient) => (
            <button
              key={gradient.name}
              type="button"
              onClick={() => onChange(getGradientStyle(gradient))}
              title={gradient.name}
              className={`
                w-full aspect-square rounded-lg border-2 transition-all
                ${value === getGradientStyle(gradient) 
                  ? 'border-[var(--color-accent)] scale-95' 
                  : 'border-transparent hover:border-[var(--color-border)]'
                }
              `}
              style={{ background: getGradientStyle(gradient) }}
            />
          ))}
        </div>
      )}

      {/* Solid color */}
      {type === 'solid' && (
        <ColorPicker
          value={solidColor}
          onChange={(e) => handleSolidChange(e.target.value)}
        />
      )}

      {/* Custom gradient */}
      {type === 'custom' && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <ColorPicker
              label="From"
              value={customFrom}
              onChange={(e) => handleCustomGradientChange(e.target.value, customTo, customAngle)}
            />
            <ColorPicker
              label="To"
              value={customTo}
              onChange={(e) => handleCustomGradientChange(customFrom, e.target.value, customAngle)}
            />
          </div>
          <Slider
            label="Angle"
            min={0}
            max={360}
            step={15}
            value={customAngle}
            unit="°"
            onChange={(e) => handleCustomGradientChange(customFrom, customTo, Number(e.target.value))}
          />
        </div>
      )}

      {/* Transparent info */}
      {type === 'transparent' && (
        <p className="text-sm text-[var(--color-text-muted)]">
          Transparent background - exports with alpha channel (PNG only)
        </p>
      )}
    </div>
  )
}
