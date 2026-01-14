import type { ReactNode } from 'react'

interface IPadFrameProps {
  children: ReactNode
}

export function IPadFrame({ children }: IPadFrameProps) {
  return (
    <div className="relative inline-flex">
      {/* Outer bezel */}
      <div className="relative bg-[#1C1C1E] rounded-[24px] p-[16px] shadow-lg">
        {/* Side button - Power */}
        <div className="absolute -top-[3px] right-[100px] h-[3px] w-[40px] bg-[#2C2C2E] rounded-t-sm" />
        {/* Volume buttons */}
        <div className="absolute -right-[3px] top-[60px] w-[3px] h-[30px] bg-[#2C2C2E] rounded-r-sm" />
        <div className="absolute -right-[3px] top-[100px] w-[3px] h-[30px] bg-[#2C2C2E] rounded-r-sm" />
        
        {/* Camera */}
        <div className="absolute top-[16px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-[#2C2C2E]" />
        
        {/* Inner screen area */}
        <div className="relative bg-black rounded-[10px] overflow-hidden">
          {/* Screen content */}
          <div className="relative w-[512px] aspect-[1024/1366]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
