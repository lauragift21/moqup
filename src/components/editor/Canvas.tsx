import { forwardRef, type ReactNode } from 'react'
import { IPhoneFrame, MacBookFrame, IPadFrame, PixelFrame, BrowserFrame, MonitorFrame } from '../frames'

interface CanvasProps {
  image: string | null
  device: string
  background: string
  padding: number
  shadow: string
  borderRadius: number
  browserUrl?: string
}

const shadowStyles: Record<string, string> = {
  none: '',
  soft: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))',
  medium: 'drop-shadow(0 8px 40px rgba(0, 0, 0, 0.4))',
  hard: 'drop-shadow(0 12px 60px rgba(0, 0, 0, 0.6))',
}

function DeviceWrapper({ device, children, browserUrl }: { device: string; children: ReactNode; browserUrl?: string }) {
  switch (device) {
    case 'iphone':
      return <IPhoneFrame>{children}</IPhoneFrame>
    case 'macbook':
      return <MacBookFrame>{children}</MacBookFrame>
    case 'ipad':
      return <IPadFrame>{children}</IPadFrame>
    case 'pixel':
      return <PixelFrame>{children}</PixelFrame>
    case 'browser':
      return <BrowserFrame url={browserUrl}>{children}</BrowserFrame>
    case 'monitor':
      return <MonitorFrame>{children}</MonitorFrame>
    default:
      return <>{children}</>
  }
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  ({ image, device, background, padding, shadow, borderRadius, browserUrl }, ref) => {
    const isTransparent = background === 'transparent'
    
    return (
      <div
        ref={ref}
        className={`relative inline-flex items-center justify-center animate-fade-in-scale ${isTransparent ? 'checkerboard' : ''}`}
        style={{
          background: isTransparent ? undefined : background,
          padding: `${padding}px`,
          borderRadius: `${borderRadius}px`,
          minWidth: '300px',
          minHeight: '200px',
        }}
      >
        {image && (
          <div
            style={{
              filter: shadowStyles[shadow] || '',
            }}
          >
            <DeviceWrapper device={device} browserUrl={browserUrl}>
              <img
                src={image}
                alt="Screenshot"
                className="w-full h-full object-cover"
                style={{
                  borderRadius: device === 'none' ? `${Math.max(0, borderRadius - padding)}px` : undefined,
                }}
              />
            </DeviceWrapper>
          </div>
        )}
      </div>
    )
  }
)

Canvas.displayName = 'Canvas'
