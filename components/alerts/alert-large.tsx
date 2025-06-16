"use client"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useDialogContext } from '@/providers/dialog-provider'

export type AlertButtonType = "primary" | "secondary" | "destructive"

interface AlertLargeProps {
  children?: React.ReactNode
  actions?: {
    text?: string
    children?: React.ReactNode
    variant?: AlertButtonType
    onClick: () => void
  }[]
  title?: string
  description?: string
  open: boolean
  onOpenChange?: (open: boolean) => void
}

const AlertDialog = AlertDialogPrimitive.Root

const AlertLarge = ({ open, onOpenChange, title, description, children, actions }: AlertLargeProps) => {
  if (open) return <AlertLargeBody open={open} onOpenChange={onOpenChange} title={title} description={description} actions={actions}>
    {children}
  </AlertLargeBody>

  return null
}

const AlertLargeBody = ({ open, onOpenChange, title, description, children, actions }: AlertLargeProps) => {
  const focusableElements = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { setDialogOpen } = useDialogContext();
  const prevFocusedIndex = useRef(focusedIndex);

  // Sync the alert open state with our context
  useEffect(() => {
    setDialogOpen(open);

    // Reset focus index when dialog opens
    if (open) {
      setFocusedIndex(0);
      prevFocusedIndex.current = 0;
    }

    return () => {
      if (open) setDialogOpen(false);
    };
  }, [open, setDialogOpen]);

  useEffect(() => {
    if (!open) return;

    // Query all focusable elements
    focusableElements.current = document.querySelectorAll(".focusable-alert-large-item");

    // Initially focus the first element with a delay
    const focusTimer = setTimeout(() => {
      focusElement(0);
    }, 100);

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!focusableElements.current || !open) return;

      let newIndex = focusedIndex;
      if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault(); // Prevent default to avoid any scrolling
        newIndex = Math.min(focusedIndex + 1, focusableElements.current.length - 1);
      } else if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault(); // Prevent default to avoid any scrolling
        newIndex = Math.max(focusedIndex - 1, 0);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (focusableElements.current[focusedIndex]) {
          (focusableElements.current[focusedIndex] as HTMLElement).click();
        }
      }

      if (newIndex !== focusedIndex) {
        // Save previous index before updating state
        prevFocusedIndex.current = focusedIndex;

        // Update the focused index state
        setFocusedIndex(newIndex);

        // Focus the new element
        focusElement(newIndex);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [focusedIndex, open]);

  const focusElement = (index: number) => {
    if (!focusableElements.current) return;

    // First, blur/remove focus from all elements
    focusableElements.current.forEach((el, i) => {
      if (i !== index) {
        (el as HTMLElement).blur();
        el.classList.remove('focused-item');
        el.setAttribute('data-focused', 'false');
      }
    });

    // Then focus the target element
    const targetElement = focusableElements.current[index] as HTMLElement;
    if (targetElement) {
      targetElement.focus();
      targetElement.classList.add('focused-item');
      targetElement.setAttribute('data-focused', 'true');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay data-state={open ? "open" : "closed"} className='fixed inset-0 z-[5000] backdrop-blur-3xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 transition-all duration-500' />

        <div
          className='fixed left-[50%] top-[50%] z-[5000] flex flex-col items-center text-center w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-2 p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]'
          data-state={open ? "open" : "closed"}
        >
          {children || <>
            <h1 className='capitalize text-4xl font-bold text-white'>{title}</h1>
            <p className='text-white/70 text-lg font-bold'>{description}</p>

            <div className='flex flex-col gap-2 w-full max-w-sm mt-2'>
              {
                actions ?
                  actions.map((action, index) => (
                    <AlertButton
                      key={index}
                      index={index}
                      text={action.text}
                      variant={action.variant}
                      onClick={action.onClick}
                      setFocusedIndex={setFocusedIndex}
                      isFocused={focusedIndex === index}
                    />
                  ))
                  :
                  <AlertButton
                    text='Ok'
                    onClick={() => onOpenChange && onOpenChange(!open)}
                    isFocused={focusedIndex === 0}
                  />
              }
            </div>
          </>}
        </div>
      </AlertDialogPrimitive.Portal>
    </AlertDialog>
  )
}

export default AlertLarge

interface AlertButtonProps {
  children?: React.ReactNode,
  text?: string,
  index?: number,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  variant?: AlertButtonType,
  isFocused?: boolean
  setFocusedIndex?: React.Dispatch<React.SetStateAction<number>>
}

export const AlertButton = ({ children, text, onClick, isFocused, setFocusedIndex,index }: AlertButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Sync DOM focus with isFocused prop
  useEffect(() => {
    if (!buttonRef.current) return;

    if (isFocused) {
      // Apply focus styling
      buttonRef.current.focus();
      buttonRef.current.classList.add('focused-item');
      buttonRef.current.setAttribute('data-focused', 'true');
    } else {
      // Remove focus styling
      if (buttonRef.current === document.activeElement) {
        buttonRef.current.blur();
      }
      buttonRef.current.classList.remove('focused-item');
      buttonRef.current.setAttribute('data-focused', 'false');
    }
  }, [isFocused]);

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setFocusedIndex && setFocusedIndex(index || 0)}
      initial={false}
      animate={isFocused ? { scale: 1.05 } : { scale: 1 }}
      tabIndex={0}
      onClick={onClick}
      data-focused={isFocused ? 'true' : 'false'}
      className={`group focusable-alert-large-item rounded-md w-full px-2 py-1 flex items-center justify-center backdrop-blur-[50px] transition-all duration-500 hover:bg-white hover:apple-active-item-shadow ${isFocused
        ? 'bg-white apple-active-item-shadow z-[1]'
        : 'bg-white/30'
        }`}
    >
      {
        children
          ?
          children
          :
          <h2 className={`text-2xl ${isFocused
            ? 'text-[#1E1E1E]'
            : 'text-white group-hover:text-[#1E1E1E]'
            }`}>
            {text}
          </h2>
      }
    </motion.button>
  )
}