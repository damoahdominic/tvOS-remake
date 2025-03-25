"use client";

import React, { createContext, useContext, useState } from "react";

interface Position {
  row: number;
  col: number;
}

interface GridNavigationContextType {
  focusedPosition: Position;
  setFocusedPosition: (position: Position) => void;
}

// Create the context with default values
const GridNavigationContext = createContext<GridNavigationContextType>({
  focusedPosition: { row: 0, col: 0 },
  setFocusedPosition: () => {}, // Default empty function
});

export function GridNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [focusedPosition, setFocusedPosition] = useState<Position>({
    row: 0,
    col: 0,
  });

  return (
    <GridNavigationContext.Provider
      value={{
        focusedPosition,
        setFocusedPosition,
      }}
    >
      {children}
    </GridNavigationContext.Provider>
  );
}

// Custom hook to use the grid navigation context
export function useGridNavigationContext() {
  return useContext(GridNavigationContext);
}
