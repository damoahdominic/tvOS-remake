// "use client";
// import "atropos/css";
// import Atropos from "atropos/react";
// import React from "react";

// interface ParallaxWrapperProps {
//   children: React.ReactNode;
// }

// const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({ children }) => {
//   return (
//     <Atropos activeOffset={1} highlight={true} shadow={false} commonOrigin>
//       {children}
//     </Atropos>
//   );
// };

// export default ParallaxWrapper;



import React, { useRef } from 'react';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // optional customization
  perspective?: number;
  scale?: number;
  speed?: number;
}

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
  speed = 300,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const rotateX = (maxTilt / 2 - y * maxTilt).toFixed(2);
    const rotateY = (x * maxTilt - maxTilt / 2).toFixed(2);

    container.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (container) {
      container.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
      container.style.transition = `transform ${speed}ms ease`;
    }
  };

  const handleMouseEnter = () => {
    const container = containerRef.current;
    if (container) {
      container.style.transition = `none`;
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxWrapper;

