"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode; // Optional icon component
  action: () => void;
  rightArrow?: boolean; // Show right arrow for submenus
  rightIcon?: React.ReactNode; // Custom right icon (like TV or plus)
}

interface ContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  menuItems: ContextMenuItem[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  onClose,
  position,
  menuItems,
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [adjustedPosition, setAdjustedPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // Reset focused index when menu opens
  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(0);
      // Initialize refs array
      itemRefs.current = itemRefs.current.slice(0, menuItems.length);
    }
  }, [isOpen, menuItems.length]);

  // Handle keyboard navigation within the context menu
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "ArrowDown":
        case "s":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < menuItems.length - 1 ? prev + 1 : prev
          );
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (menuItems[focusedIndex]) {
            menuItems[focusedIndex].action();
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, menuItems, focusedIndex, onClose]);

  // Focus the selected item
  useEffect(() => {
    if (isOpen && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Adjust position to make sure menu stays in viewport
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdjustedPosition({
        x: Math.min(position.x, window.innerWidth - 300),
        y: Math.min(
          position.y,
          window.innerHeight - (menuItems.length * 60 + 40)
        ),
      });
    }
  }, [position, menuItems.length]);

  const TVIcon = (props: { color: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M7 21h10" />
      <rect width="20" height="14" x="2" y="3" rx="2" stroke={props.color} />
    </svg>
  );

  const PlusIcon = (props: { color: string }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4V20M4 12H20"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const ChevronIcon = (props: { color: string }) => (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L7 7L1 13"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Define the background color for inactive items - used for both items and container
  const inactiveBackgroundColor = "#2a2a2a";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Semi-transparent backdrop */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Container wrapper with background */}
          <motion.div
            ref={menuRef}
            className="absolute z-[9999]"
            style={{
              top: adjustedPosition.y,
              left: adjustedPosition.x,
              width: "318px",
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Container background */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                backgroundColor: inactiveBackgroundColor,
                paddingTop: "12px", // Padding around all sides
                paddingBottom: "12px", // Padding around all sides
                top: -12, // Offset to account for padding
                left: -12,
                right: -12,
                bottom: -12,
                zIndex: -1,
              }}
            />

            {/* Menu items */}
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => {
                const isActive = focusedIndex === index;
                // Determine correct icon based on item type
                let rightIcon;
                if (item.rightIcon) {
                  rightIcon = item.rightIcon;
                } else if (item.rightArrow) {
                  rightIcon = (
                    <ChevronIcon color={isActive ? "#000" : "#fff"} />
                  );
                } else if (item.label === "Edit Home Screen") {
                  rightIcon = <TVIcon color={isActive ? "#000" : "#fff"} />;
                } else if (item.label === "New Folder") {
                  rightIcon = <PlusIcon color={isActive ? "#000" : "#fff"} />;
                }

                return (
                  <motion.button
                    key={item.id}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ref={(el: any) => (itemRefs.current[index] = el)}
                    className={`
                      w-full text-left py-3 px-5 outline-none rounded-2xl
                      flex items-center justify-between
                      focus:outline-none
                    `}
                    style={{
                      backgroundColor: isActive
                        ? "white"
                        : inactiveBackgroundColor,
                      color: isActive ? "black" : "white",
                      border: "none",
                      boxShadow: isActive
                        ? "0 2px 8px rgba(0,0,0,0.2)"
                        : "none",
                      transition: "all 0.15s ease",
                    }}
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    onMouseEnter={() => setFocusedIndex(index)}
                    whileHover={{ scale: 1.15 }}
                    animate={
                      isActive
                        ? {
                            scale: 1.15,
                          }
                        : {
                            scale: 1,
                          }
                    }
                    transition={{ duration: 0.15 }}
                  >
                    <span className="text-lg font-normal">{item.label}</span>
                    {rightIcon}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
