"use client";
import "atropos/css";
import Atropos from "atropos/react";
import React from "react";

interface ParallaxWrapperProps {
  children: React.ReactNode;
}

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({ children }) => {
  return (
    <Atropos activeOffset={1} highlight={false} shadow={false}>
      {children}
    </Atropos>
  );
};

export default ParallaxWrapper;
