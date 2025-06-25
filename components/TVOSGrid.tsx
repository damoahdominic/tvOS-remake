/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import AppItem from "./app-item";
import { motion } from "framer-motion";
import { Squircle } from "@squircle-js/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AppIcon {
  id?: number;
  appIconUrl: string;
  appName: string;
  href: string;
  shouldShowAppName?: boolean;
}

interface TVOSGridProps {
  apps: AppIcon[];
  rowCount: number;
  colCount: number;
  isExpanded?: boolean;
  scrolled?: boolean;
  toggleExpansion: () => void;
  isFocused: (row: number, col: number) => boolean;
  setFocusedPosition: (position: { row: number; col: number }) => void;
  setLastFocusedPosition: (position: { row: number; col: number }) => void;
  getFocusRef: (
    row: number,
    col: number
  ) => React.RefObject<HTMLButtonElement> | null;
}

const container = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const TVOSGrid: React.FC<TVOSGridProps> = ({
  apps,
  rowCount,
  colCount,
  scrolled,
  toggleExpansion,
  isExpanded,
  isFocused,
  getFocusRef,
  setFocusedPosition,
  setLastFocusedPosition,
}) => {

  const [isPreparing, setIsPreparing] = useState(true);
  const [gridItems, setGridItems] = useState<
    | {
        firstRow: React.JSX.Element[];
        rest: React.JSX.Element[];
      }
    | undefined
  >(undefined);

  const renderAppsCallback = useCallback(() => {
    const firstRow = [];
    const rest = [];
    let appIndex = 0;

    for (let row = 0; row < rowCount; row++) {
      const rowItems = [];

      for (let col = 0; col < colCount; col++) {
        if (appIndex < apps.length) {
          const app = apps[appIndex++];
          const focused = isFocused(row, col);
          const ref = getFocusRef(row, col);

          rowItems.push(
            <motion.div
              animate={{ scale: focused ? 1.10 : 1 }}
              whileFocus={{ scale: 1.10 }}
              whileHover={{ scale: 1 }}
              key={app.id || `app-${row}-${col}`}
              className={cn("transition-all duration-300 focus:!outline-none focus-visible:outline-none focus-visible:ring-0", {
                "": focused,
              })}
            >
              <AppItem
                shouldShowAppName={app.shouldShowAppName ?? true}
                appIconUrl={app.appIconUrl}
                appName={app.appName}
                href={app.href}
                id={app.id}
                ref={ref}
                col={col}
                showBadge={false} // Example condition for showing badge
                // showBadge={col === 0 && row === 0} // Example condition for showing badge
                badgeCount={0}
                setFocusedPosition={setFocusedPosition}
                setLastFocusedPosition={setLastFocusedPosition}
                row={row}
                focused={focused}
              />
            </motion.div>
          );
        }
      }

      if (row === 0) {
        firstRow.push(...rowItems);
      } else {
        rest.push(...rowItems);
      }
    }

    return { firstRow, rest };
  }, [apps, colCount, rowCount, isFocused, getFocusRef, setFocusedPosition]);

  useEffect(() => {
    console.log(
      `TVOSGrid rendering with ${apps.length} apps, ${rowCount} rows, ${colCount} cols`
    );
    setIsPreparing(true);
    const items = renderAppsCallback();
    setGridItems(items);
    setIsPreparing(false);
  }, [renderAppsCallback]);

  // Log DOM structure after render to help debug
  useEffect(() => {
    if (!isPreparing && gridItems) {
      console.log(
        `Grid items ready - first row: ${gridItems.firstRow.length}, rest: ${gridItems.rest.length}`
      );

      // Check if refs are properly initialized
      for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
          const ref = getFocusRef(row, col);
          if (row < 3 && col < 3) {
            // Just log a sample to avoid clutter
            console.log(
              `Ref at ${row},${col}: ${
                ref ? (ref.current ? "has element" : "no element") : "no ref"
              }`
            );
          }
        }
      }
    }
  }, [isPreparing, gridItems, getFocusRef, rowCount, colCount]);

  return (isExpanded || isPreparing) ? (
    <></>
  ) : (
    <>
      {/* Main Content */}
        <div className="relative min-h-screen flex flex-col justify-end px-4 ">
          {/* Expand/Collapse Caret */}
          <button
            onClick={toggleExpansion}
            className={`relative w-full flex justify-center z-10 transition-all duration-500 ${isExpanded ? 'hidden' : 'visible bottom-12'
              }`}
          >
            <Image src={"/chevron-up.svg"} alt='chevron' width={50} height={12}
              className={`transition-transform duration-500}`}
            />
          </button>
        {/* Dock */}
        <Squircle
          asChild
          cornerRadius={30}
          cornerSmoothing={1}
          className="bg-white/30 dark:bg-black/30"
        >
          <motion.div
            className="w-full px-6 py-4 relative bottom-8 backdrop-blur-xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-6 gap-9">
              {gridItems?.firstRow?.slice(0, 6).map((app, i) => (
                <div key={i} className="first-row-item">
                  {app}
                </div>
              ))}
            </div>
          </motion.div>
        </Squircle>
      </div>

      {/* Additional Content (for scrolling) */}
      <motion.div
        animate={{ bottom: scrolled ? "3rem" : "3.9rem" }}
        className="relative px-8 py-12 cursor-pointer"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-6 gap-x-9 relative"
        >
          {gridItems?.rest?.map((app, i) => (
            <div key={i} className="rest-row-item">
              {app}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default TVOSGrid;
