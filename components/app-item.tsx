import React, { forwardRef, memo, useContext } from "react";
import { motion } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
// import { Squircle } from "@squircle-js/react";
import { cn } from "@/lib/utils";
import { AppContextMenuContext } from "@/providers/context-menu-provider";
// import useGridNavigation from "@/hooks/useGridNavigation";
// import ParallaxWrapper from "./parallax-wrapper";
// import Atropos from 'atropos/react';
import DynamicAppleTVCard from "../components/DynamicAppleTVCard"
interface Props {
  shouldShowAppName: boolean;
  appIconUrl: string;
  appName: string;
  href: string;
  id?: number;
  col?: number;
  row?: number;
  focused?: boolean;
  isFolder?: boolean;
}

// Use both forwardRef and memo to prevent unnecessary re-renders
const AppItem = memo(
  forwardRef<HTMLButtonElement, Props>(
    (
      {
        shouldShowAppName = true,
        appIconUrl,
        appName,
        href,
        col,
        row,
        focused,
      },
      ref
    ) => {
      const router = useTransitionRouter();
      const { openContextMenu } = useContext(AppContextMenuContext);
      // const { setFocusedPosition } = useGridNavigation(3, 6, 0, 0);

      // Add debugging for focus issues
      React.useEffect(() => {
        if (focused) {
          console.log("AppItem focused:", appName);
        }
      }, [focused, appName]);

      // Handle right-click to open context menu
      const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        // Use the app name, ID, and specify if it's a folder
        const appId = `app-${row}-${col}`;
        openContextMenu(e, appName, appId);
      };

      // Handle hover to update focus
      const handleMouseEnter = () => {
        if (typeof row === "number" && typeof col === "number") {
          // setFocusedPosition({ row, col });
          console.log({ row, col })
        }
      };

      return (
        <motion.button
          data-row={row}
          data-col={col}
          ref={ref}
          id={`app-${row}-${col}`}
          tabIndex={focused ? 0 : -1}
          onClick={() => router.push(href)}
          onContextMenu={handleContextMenu}
          onMouseEnter={handleMouseEnter}
          className={cn(
            "relative group rounded-t-[80px] transition-all duration-500 grid focusable-apps w-full",
            // { "bg-black/30 backdrop-blur-md shadow-black/30": focused && shouldShowAppName }
          )}
        >
          {/* <Atropos
            activeOffset={focused ? 0 : 70}
            shadow={false}
            stretchZ={50}
            stretchY={20} 
            stretchX={20} 
            rotateYInvert={true}
            rotateXInvert={true}
            innerClassName={"!bg-transparent rounded-[30px]"}
          >
            <Squircle
              asChild
              cornerRadius={30}
              cornerSmoothing={1}
              className="bg-black text-white app-item-shadow"
            >
              <motion.div className={`aspect-video w-full`}>
                <Image
                  src={appIconUrl}
                  alt={`${appName}`}
                  className="w-full h-full object-cover"
                  width={1000}
                  height={1000}
                />
              </motion.div>
            </Squircle>
          </Atropos>
         
          {shouldShowAppName && focused && <div className="transition-all duration-500 absolute -z-10 top-[0%] app-item-shadow left-0 w-full h-1/2 bg-black/5 backdrop-blur-sm rounded-full"></div>}

          {shouldShowAppName && <motion.span
            className={`mt-1 text-xl font-semibold text-white text-wrap ${focused
              ? "opacity-100 "
              : "opacity-0 group-hover:opacity-100 group-focus:opacity-100"
              }`}
            initial={{ y: -10 }}
            animate={{ y: 0 }}
          >
            {appName}
          </motion.span>} */}

          <DynamicAppleTVCard
            title={appName}
            backgroundImage={appIconUrl}
            shouldShowName={shouldShowAppName}
          >
            <div className={`aspect-video w-full relative`}>
              <Image
                src={appIconUrl}
                alt={`${appName}`}
                className="w-full h-full object-cover"
                fill
              />
            </div>
          </DynamicAppleTVCard>
        </motion.button>
      );
    }
  )
);

// Add display name for better debugging
AppItem.displayName = "AppItem";

export default AppItem;
