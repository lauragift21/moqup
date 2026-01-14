export interface Device {
  id: string
  name: string
  width: number
  height: number
  screenRadius: number
  bezelColor: string
}

export const devices: Device[] = [
  {
    id: 'none',
    name: 'No Frame',
    width: 0,
    height: 0,
    screenRadius: 12,
    bezelColor: 'transparent',
  },
  {
    id: 'iphone',
    name: 'iPhone 15 Pro',
    width: 393,
    height: 852,
    screenRadius: 55,
    bezelColor: '#1C1C1E',
  },
  {
    id: 'macbook',
    name: 'MacBook Pro',
    width: 1512,
    height: 982,
    screenRadius: 10,
    bezelColor: '#1D1D1F',
  },
  {
    id: 'ipad',
    name: 'iPad Pro',
    width: 1024,
    height: 1366,
    screenRadius: 18,
    bezelColor: '#1C1C1E',
  },
  {
    id: 'pixel',
    name: 'Pixel 8',
    width: 412,
    height: 915,
    screenRadius: 42,
    bezelColor: '#202124',
  },
  {
    id: 'browser',
    name: 'Browser',
    width: 1280,
    height: 800,
    screenRadius: 0,
    bezelColor: '#27272A',
  },
  {
    id: 'monitor',
    name: 'Desktop',
    width: 1920,
    height: 1080,
    screenRadius: 0,
    bezelColor: '#1D1D1F',
  },
]

export function getDeviceById(id: string): Device | undefined {
  return devices.find((d) => d.id === id)
}
