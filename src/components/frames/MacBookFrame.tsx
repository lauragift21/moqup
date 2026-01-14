import type { ReactNode } from 'react'

interface MacBookFrameProps {
  children: ReactNode
}

export function MacBookFrame({ children }: MacBookFrameProps) {
  return (
    <div className="relative inline-flex flex-col">
      {/* Screen */}
      <div className="relative bg-[#1D1D1F] rounded-t-[16px] p-[10px] pb-[10px]">
        {/* Camera notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[28px] bg-[#1D1D1F] rounded-b-[12px] z-10 flex items-center justify-center">
          <div className="w-[8px] h-[8px] rounded-full bg-[#2C2C2E] mt-[4px]" />
        </div>
        
        {/* Screen bezel */}
        <div className="relative bg-black rounded-[8px] overflow-hidden">
          {/* Screen content */}
          <div className="relative w-[960px] aspect-[1512/982]">
            {children}
          </div>
        </div>
      </div>
      
      {/* Bottom hinge/base */}
      <div className="relative">
        {/* Hinge */}
        <div className="w-full h-[4px] bg-gradient-to-b from-[#2C2C2E] to-[#1D1D1F]" />
        
        {/* Base */}
        <div className="w-[102%] -ml-[1%] h-[10px] bg-[#3A3A3C] rounded-b-[10px] shadow-sm">
          {/* Notch cutout in base */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[4px] bg-[#2C2C2E] rounded-b-[4px]" />
        </div>
      </div>
    </div>
  )
}
