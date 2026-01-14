import { Slider } from '../ui/Slider'

interface PaddingControlProps {
  value: number
  onChange: (value: number) => void
}

export function PaddingControl({ value, onChange }: PaddingControlProps) {
  return (
    <Slider
      label="Padding"
      min={0}
      max={200}
      step={8}
      value={value}
      unit="px"
      onChange={(e) => onChange(Number(e.target.value))}
    />
  )
}
