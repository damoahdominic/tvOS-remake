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
  showBadge?: boolean;
  badgeCount?: number;
  isFolder?: boolean;
  setFocusedPosition: (position: { row: number; col: number }) => void;
  setLastFocusedPosition: (position: { row: number; col: number }) => void;
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
        showBadge,
        badgeCount,
        row,
        focused,
        setLastFocusedPosition
      },
      ref
    ) => {

      const router = useTransitionRouter();
      const { openContextMenu } = useContext(AppContextMenuContext);

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
          // setLastFocusedPosition({ row, col });
          console.log({ row, col })
        }
      };
      console.log("🚀 ~ row === 0:", row === 0)

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
          <AppleTVCard
            title={appName}
            autoSize={true}
            withShadow={row === 0 ? false : true}
            backgroundImage={appIconUrl}
            showBadge={showBadge}
            badgeCount={badgeCount}
            shouldShowTitle={shouldShowAppName}
            onClick={() => {
              setLastFocusedPosition({ row: row || 0, col: col || 0 });
              router.push(href)
            }}
          />
          {showBadge && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full size-6 flex items-center justify-center">
              {badgeCount}
            </div>
          )}
        </motion.button>
      );
    }
  )
);

// Add display name for better debugging
AppItem.displayName = "AppItem";

export default AppItem;
