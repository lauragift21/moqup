import type { ReactNode } from 'react'

interface MonitorFrameProps {
  children: ReactNode
}

export function MonitorFrame({ children }: MonitorFrameProps) {
  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Monitor body */}
      <div className="relative bg-[#1D1D1F] rounded-[16px] p-[12px] shadow-lg">
        {/* Screen */}
        <div className="relative bg-black rounded-[4px] overflow-hidden">
          {/* Screen content */}
          <div className="relative w-[800px] aspect-[1920/1080]">
            {children}
          </div>
        </div>
      </div>
      
      {/* Chin with logo */}
      <div className="w-[90%] h-[36px] bg-[#1D1D1F] rounded-b-[4px] flex items-center justify-center -mt-[2px]">
        <div className="w-[40px] h-[6px] bg-[#2C2C2E] rounded-full" />
      </div>
      
      {/* Stand neck */}
      <div className="w-[80px] h-[50px] bg-gradient-to-b from-[#2C2C2E] to-[#3A3A3C] rounded-b-[4px]" />
      
      {/* Stand base */}
      <div className="w-[200px] h-[8px] bg-[#3A3A3C] rounded-[4px] shadow-sm" />
    </div>
  )
}
