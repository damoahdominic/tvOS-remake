import React from "react";

interface MouseFollowerProps {
  circleSize?: number;
  circleColor?: string;
  mousePosition: { x: number; y: number };
}

const MouseFollower: React.FC<MouseFollowerProps> = ({
  circleSize,
  circleColor,
  mousePosition,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: mousePosition.y - (circleSize ?? 200) / 2,
        left: mousePosition.x - (circleSize ?? 200) / 2,
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundColor: circleColor,
        pointerEvents: "none",
        filter: "blur(10px)",
        padding: "10px",
      }}
    >
      <div
        style={{
          width: `${(circleSize ?? 400) - 50}px`,
          height: `${(circleSize ?? 400) - 50}px`,
          borderRadius: "50%",
          backgroundColor: circleColor,
          pointerEvents: "none",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          filter: "blur(10px)",
          padding: "10px",
        }}
      >
        <div
          style={{
            width: `${(circleSize ?? 400) - 100}px`,
            height: `${(circleSize ?? 400) - 100}px`,
            borderRadius: "50%",
            backgroundColor: circleColor,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            pointerEvents: "none",
            filter: "blur(10px)",
            padding: "10px",
          }}
        >
          <div
            style={{
              width: `${(circleSize ?? 400) - 150}px`,
              height: `${(circleSize ?? 400) - 150}px`,
              borderRadius: "50%",
              backgroundColor: circleColor,
              pointerEvents: "none",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              filter: "blur(10px)",
              padding: "10px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MouseFollower;
