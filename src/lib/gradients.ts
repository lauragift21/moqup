export interface Gradient {
  name: string
  from: string
  to: string
  angle: number
}

export const gradientPresets: Gradient[] = [
  { name: 'Void', from: '#0f0f0f', to: '#1a1a2e', angle: 135 },
  { name: 'Dawn', from: '#ff6b6b', to: '#feca57', angle: 45 },
  { name: 'Ocean', from: '#667eea', to: '#764ba2', angle: 90 },
  { name: 'Forest', from: '#134e5e', to: '#71b280', angle: 180 },
  { name: 'Sunset', from: '#fa709a', to: '#fee140', angle: 45 },
  { name: 'Northern', from: '#43cea2', to: '#185a9d', angle: 135 },
  { name: 'Midnight', from: '#232526', to: '#414345', angle: 180 },
  { name: 'Peach', from: '#ffecd2', to: '#fcb69f', angle: 90 },
  { name: 'Electric', from: '#4776e6', to: '#8e54e9', angle: 45 },
  { name: 'Emerald', from: '#11998e', to: '#38ef7d', angle: 135 },
  { name: 'Flame', from: '#ff416c', to: '#ff4b2b', angle: 90 },
  { name: 'Slate', from: '#373b44', to: '#4286f4', angle: 135 },
]

export function getGradientStyle(gradient: Gradient): string {
  return `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.to})`
}

export function getGradientStyleFromColors(from: string, to: string, angle: number): string {
  return `linear-gradient(${angle}deg, ${from}, ${to})`
}
