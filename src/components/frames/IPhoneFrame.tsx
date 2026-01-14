import type { ReactNode } from 'react'

interface IPhoneFrameProps {
  children: ReactNode
}

export function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="relative inline-flex">
      {/* Outer bezel */}
      <div className="relative bg-[#1C1C1E] rounded-[60px] p-[14px] shadow-lg">
        {/* Side buttons - Volume */}
        <div className="absolute -left-[3px] top-[120px] w-[3px] h-[30px] bg-[#2C2C2E] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[160px] w-[3px] h-[30px] bg-[#2C2C2E] rounded-l-sm" />
        {/* Side button - Power */}
        <div className="absolute -right-[3px] top-[140px] w-[3px] h-[60px] bg-[#2C2C2E] rounded-r-sm" />
        {/* Silent switch */}
        <div className="absolute -left-[3px] top-[80px] w-[3px] h-[18px] bg-[#2C2C2E] rounded-l-sm" />
        
        {/* Inner screen area */}
        <div className="relative bg-black rounded-[46px] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-10" />
          
          {/* Screen content */}
          <div className="relative w-[393px] aspect-[393/852]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
