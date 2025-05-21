import React, { forwardRef, memo, useContext } from "react";
import { motion } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import { cn } from "@/lib/utils";
import { AppContextMenuContext } from "@/providers/context-menu-provider";
import AppleTVCard from 'react-apple-tv-card';
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
      console.log("🚀 ~ shouldShowAppName:", shouldShowAppName)

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
          onContextMenu={handleContextMenu}
          onMouseEnter={handleMouseEnter}
          className={cn(
            "relative group rounded-t-[80px] transition-all duration-500 grid focusable-apps w-full",
          )}
        >
          {/* <DynamicAppleTVCard
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
          </DynamicAppleTVCard> */}
          <AppleTVCard
            title={appName}
            backgroundImage={appIconUrl}
            onClick={() => router.push(href)}
          />
        </motion.button>
      );
    }
  )
);

// Add display name for better debugging
AppItem.displayName = "AppItem";

export default AppItem;
