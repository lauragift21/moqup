import { Select } from '../ui/Select'

interface ShadowControlProps {
  value: string
  onChange: (value: string) => void
}

const shadowOptions = [
  { id: 'none', name: 'None' },
  { id: 'soft', name: 'Soft' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
]

export function ShadowControl({ value, onChange }: ShadowControlProps) {
  return (
    <Select
      label="Shadow"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {shadowOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </Select>
  )
}
