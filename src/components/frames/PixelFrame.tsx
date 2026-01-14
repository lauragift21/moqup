import type { ReactNode } from 'react'

interface PixelFrameProps {
  children: ReactNode
}

export function PixelFrame({ children }: PixelFrameProps) {
  return (
    <div className="relative inline-flex">
      {/* Outer bezel */}
      <div className="relative bg-[#202124] rounded-[48px] p-[12px] shadow-lg">
        {/* Side buttons - Volume */}
        <div className="absolute -right-[3px] top-[100px] w-[3px] h-[50px] bg-[#3C4043] rounded-r-sm" />
        {/* Side button - Power */}
        <div className="absolute -right-[3px] top-[160px] w-[3px] h-[35px] bg-[#3C4043] rounded-r-sm" />
        
        {/* Inner screen area */}
        <div className="relative bg-black rounded-[38px] overflow-hidden">
          {/* Punch-hole camera */}
          <div className="absolute top-[16px] left-1/2 -translate-x-1/2 w-[16px] h-[16px] rounded-full bg-[#1a1a1a] z-10 border border-[#2a2a2a]" />
          
          {/* Screen content */}
          <div className="relative w-[412px] aspect-[412/915]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
