import React from "react";
import { GrTopCorner, GrBottomCorner } from "react-icons/gr";

interface AppleMusicBackgroundProps {
  title: string;
  description: string;
}

export function AppleMusicBackground({
  title,
  description,
}: AppleMusicBackgroundProps) {
  return (
    <div className="relative px-10 gap-3 size-full flex-col flex items-center top-[120px] text-white">
      <div className="w-[80%] flex justify-between mb-24">
        <div>
          <GrTopCorner size={38} />
        </div>
        <div className="rotate-90">
          <GrTopCorner size={38} />
        </div>
      </div>

      <div className="text-left w-[80%]">
        <p className="text-4xl">{title}</p>
        <p className="text-xl">{description}</p>
      </div>

      <div className="w-[80%] flex justify-between mt-24">
        <div className="rotate-90">
          <GrBottomCorner size={38} />
        </div>
        <div>
          <GrBottomCorner size={38} />
        </div>
      </div>
    </div>
  );
}
