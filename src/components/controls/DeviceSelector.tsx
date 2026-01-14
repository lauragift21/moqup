import { Select } from '../ui/Select'
import { devices } from '../../lib/devices'

interface DeviceSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function DeviceSelector({ value, onChange }: DeviceSelectorProps) {
  return (
    <Select
      label="Device"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {devices.map((device) => (
        <option key={device.id} value={device.id}>
          {device.name}
        </option>
      ))}
    </Select>
  )
}
