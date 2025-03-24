import React, { forwardRef, memo, useContext } from "react";
import { motion } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import { Squircle } from "@squircle-js/react";
import { cn } from "@/lib/utils";
import { AppContextMenuContext } from "@/providers/context-menu-provider";
import useGridNavigation from "@/hooks/useGridNavigation";

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
      const { setFocusedPosition } = useGridNavigation(3, 6, 0, 0);

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
          setFocusedPosition({ row, col });
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
            "relative group rounded-[30px] transition-all duration-500 focusable-apps w-full"
          )}
        >
          <Squircle
            asChild
            cornerRadius={30}
            cornerSmoothing={1}
            className="bg-black text-white"
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

          <motion.span
            className={`pt-2 text-base text-white text-wrap ${
              focused
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100 group-focus:opacity-100"
            }`}
            initial={{ y: -10 }}
            animate={{ y: 0 }}
          >
            {shouldShowAppName && appName}
          </motion.span>
        </motion.button>
      );
    }
  )
);

// Add display name for better debugging
AppItem.displayName = "AppItem";

export default AppItem;
