// File: hooks/useGridNavigation.ts
import { useDialogContext } from "@/providers/dialog-provider";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { AppItemType, apps } from "@/data";
import { usePathname, useRouter } from "next/navigation";
import { useGridNavigationContext } from "@/providers/grid-navigation-provider";

interface Position {
  row: number;
  col: number;
}

interface UseGridNavigationReturn {
  focusedPosition: Position;
  isFocused: (row: number, col: number) => boolean;
  getFocusRef: (
    row: number,
    col: number
  ) => React.RefObject<HTMLButtonElement> | null;
  setFocusedPosition: (position: Position) => void;
}

// Add this helper at the top of the file
const isBrowser = typeof window !== "undefined";

export default function useGridNavigation(
  rowCount: number,
  colCount: number,
  initialRow: number = 0,
  initialCol: number = 0
): UseGridNavigationReturn {
  const router = useRouter();
  const { focusedPosition, setFocusedPosition } = useGridNavigationContext();
  const pathname = usePathname();
  const dockApps = apps.slice(0, 6); // Get first 6 apps

  // Create a 2D array of refs to store references to all the app items
  const appRefs = useRef<Array<Array<React.RefObject<HTMLButtonElement>>>>([]);

  // Track the last focused button to help with debugging
  const lastFocusedButton = useRef<HTMLButtonElement | null>(null);

  // Track the last Active Dock App
  const [lastActiveDockApp, setLastActiveDockApp] =
    useState<AppItemType | null>(null);

  // Initialize the 2D array of refs
  useEffect(() => {
    // @ts-expect-error It works despite the TypeScript error
    appRefs.current = Array(rowCount)
      .fill(0)
      .map(() =>
        Array(colCount)
          .fill(0)
          .map(() => React.createRef<HTMLButtonElement>())
      );

    console.log(
      `Grid navigation initialized with ${rowCount} rows and ${colCount} columns`
    );
  }, [rowCount, colCount]);

  useEffect(() => {
    if (focusedPosition.row === 0 && focusedPosition.col < dockApps.length) {
      const currentDockApp = dockApps[focusedPosition.col];
      setLastActiveDockApp(currentDockApp);
      console.log(
        `Active dock app: ${dockApps[focusedPosition.col].appName} (${dockApps[focusedPosition.col].href
        })`
      );
    } else {
      if (lastActiveDockApp) {
        console.log(
          `Last active dock app: ${lastActiveDockApp.appName} (${lastActiveDockApp.href})`
        );
      }
    }
  }, [focusedPosition, dockApps, lastActiveDockApp]);

  // Add an effect to handle the back/escape navigation
  useEffect(() => {
    if (!isBrowser) return; // Skip if not in browser

    // Handle Escape/Backspace keys to return to last active dock app position
    const handleBackNavigation = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault();
        if (lastActiveDockApp) {
          // Find the index of the last active dock app in the dock apps array
          const dockAppIndex = dockApps.findIndex(
            (app) => app.href === lastActiveDockApp.href
          );
          if (dockAppIndex !== -1) {
            // Reset focus position to the dock app's location
            setFocusedPosition({
              row: 0,
              col: dockAppIndex,
            });
            scrollToRow(0, "up");

            // Focus the button element
            const targetRef = appRefs.current[0]?.[dockAppIndex];
            if (targetRef?.current) {
              targetRef.current.focus();
              lastFocusedButton.current = targetRef.current;
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleBackNavigation);

    // Handle browser's back button navigation
    const handlePopState = () => {
      if (lastActiveDockApp) {
        // Find the dock app's position to return focus
        const dockAppIndex = dockApps.findIndex(
          (app) => app.href === lastActiveDockApp.href
        );

        if (dockAppIndex !== -1) {
          // Reset focus to the dock app's position
          setFocusedPosition({
            row: 0,
            col: dockAppIndex,
          });
          scrollToRow(0, "up");

          const targetRef = appRefs.current[0]?.[dockAppIndex];
          if (targetRef?.current) {
            targetRef.current.focus();
            lastFocusedButton.current = targetRef.current;
          }
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("keydown", handleBackNavigation);
      window.removeEventListener("popstate", () => { });
    };
  }, [router, lastActiveDockApp, setFocusedPosition]);

  // Handle smooth scrolling based on row position
  const scrollToRow = useCallback((row: number, direction: "up" | "down") => {
    if (!isBrowser) return; // Skip if not in browser

    // Determine the appropriate scroll position
    let scrollTarget;

    if (row === 0) {
      // First row - scroll to top
      scrollTarget = 0;
    } else if (row === 1) {
      // Second row - scroll to middle position
      scrollTarget = window.innerHeight * 0.25;
    } else if (row >= 2) {
      // Third row or below - scroll further down
      scrollTarget = window.innerHeight * 0.5;
    }

    // Apply smooth scrolling
    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth",
    });

    console.log(
      `Scrolling ${direction} to position ${scrollTarget}px for row ${row}`
    );
  }, []);

  // This is the updated handleKeyDown function for your existing hook
  const { isDialogOpen } = useDialogContext();

  // Then update your existing handleKeyDown function:
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Skip navigation when dialog is open
      if (isDialogOpen || !isBrowser || pathname.includes("/")) {
        return;
      }

      if (["w", "a", "s", "d", "enter"].includes(e.key.toLowerCase())) {
        e.preventDefault();

        let newRow = focusedPosition.row;
        let newCol = focusedPosition.col;
        let shouldUpdateFocus = false;
        let scrollDirection: "up" | "down" | null = null;

        switch (e.key.toLowerCase()) {
          case "w": // Up
            if (focusedPosition.row > 0) {
              newRow = focusedPosition.row - 1;
              shouldUpdateFocus = true;
              scrollDirection = "up";
              scrollToRow(newRow, scrollDirection);
            }
            break;
          case "a": // Left
            if (focusedPosition.col > 0) {
              newCol = focusedPosition.col - 1;
              shouldUpdateFocus = true;
            }
            break;
          case "s": // Down
            if (focusedPosition.row < rowCount - 1) {
              newRow = focusedPosition.row + 1;
              shouldUpdateFocus = true;
              scrollDirection = "down";
              scrollToRow(newRow, scrollDirection);
            }
            break;
          case "d": // Right
            if (focusedPosition.col < colCount - 1) {
              newCol = focusedPosition.col + 1;
              shouldUpdateFocus = true;
            }
            break;
          case "enter": // trigger click
            const elementById = document.getElementById(
              `app-${newRow}-${newCol}`
            );
            if (elementById) {
              elementById.click();
            }
            break;
        }

        // Only update if position changed
        if (shouldUpdateFocus) {
          // IMPORTANT: Clear previous focus FIRST
          if (lastFocusedButton.current) {
            lastFocusedButton.current.blur();

            // Remove any focus-related classes
            lastFocusedButton.current.classList.remove("focused-item");

            // If you're using data attributes for focus state
            lastFocusedButton.current.removeAttribute("data-focused");
          }

          // Wait for the blur to take effect
          setTimeout(() => {
            // Focus the element at the new position
            const targetRef = appRefs.current[newRow]?.[newCol];
            if (targetRef?.current) {
              targetRef.current.focus();

              // Add any focus-related classes
              targetRef.current.classList.add("focused-item");

              // Store the new focused button
              lastFocusedButton.current = targetRef.current;

              console.log(`Focused element at row=${newRow} col=${newCol}`);

              // Apply scrolling if needed
              if (scrollDirection) {
                scrollToRow(newRow, scrollDirection);
              }
            } else {
              console.warn(`No element found at row=${newRow} col=${newCol}`);
            }
          }, 10); // Shorter timeout should be sufficient

          // Update focus position directly
          setFocusedPosition({ row: newRow, col: newCol });
        }
      }
    },
    [
      rowCount,
      colCount,
      scrollToRow,
      isDialogOpen,
      setFocusedPosition,
      focusedPosition,
    ]
  );

  // Set up and clean up event listeners
  useEffect(() => {
    if (!isBrowser) return; // Skip if not in browser

    document.addEventListener("keydown", handleKeyDown);

    // Initial focus with a longer delay
    const focusTimer = setTimeout(() => {
      const initialRef = appRefs.current[initialRow]?.[initialCol];
      if (initialRef?.current) {
        initialRef.current.focus();
        lastFocusedButton.current = initialRef.current;
        console.log(`Set initial focus at row=${initialRow} col=${initialCol}`);
      } else {
        console.warn(
          `Failed to set initial focus at row=${initialRow} col=${initialCol}`
        );
      }
    }, 500); // Longer initial delay to ensure DOM is ready

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [handleKeyDown, initialRow, initialCol]);

  // Function to check if a tile is focused
  const isFocused = useCallback(
    (row: number, col: number): boolean => {
      return focusedPosition.row === row && focusedPosition.col === col;
    },
    [focusedPosition]
  );

  // Function to get the ref for a specific position
  const getFocusRef = useCallback(
    (row: number, col: number): React.RefObject<HTMLButtonElement> | null => {
      return appRefs.current[row]?.[col] || null;
    },
    []
  );

  // Return 1-indexed position for more intuitive use
  const focusedPositionOneIndexed = {
    row: focusedPosition.row + 1,
    col: focusedPosition.col + 1,
  };

  return {
    focusedPosition: focusedPositionOneIndexed,
    isFocused,
    getFocusRef,
    setFocusedPosition,
  };
}
