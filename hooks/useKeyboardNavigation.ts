import { useEffect, useRef, useState } from 'react';

interface UseKeyboardNavigationOptions {
    selector: string;
    isActive?: boolean;
    initialIndex?: number;
    vertical?: boolean;
    horizontal?: boolean;
    loop?: boolean;
    onSelect?: (index: number) => void;
}

export const useKeyboardNavigation = ({
    selector,
    isActive = true,
    initialIndex = 0,
    vertical = true,
    horizontal = false,
    loop = false,
    onSelect
}: UseKeyboardNavigationOptions) => {
    const [focusedIndex, setFocusedIndex] = useState(initialIndex);
    const elementsRef = useRef<NodeListOf<HTMLElement> | null>(null);
    const previousFocusedElement = useRef<HTMLElement | null>(null);

    // Function to focus an element
    const focusElement = (index: number) => {
        if (!elementsRef.current) return;

        const elements = elementsRef.current;
        if (elements.length === 0) return;

        // Ensure index is within bounds
        const safeIndex = loop
            ? (index + elements.length) % elements.length
            : Math.max(0, Math.min(index, elements.length - 1));

        // Important: Clear focus from the previously focused element
        if (previousFocusedElement.current) {
            previousFocusedElement.current.blur();

            // Some elements might need additional class removal
            previousFocusedElement.current.classList.remove('focused-item');
        }

        const element = elements[safeIndex];
        if (element) {
            // Set DOM focus
            element.focus();

            // Add a class for additional visual styling if needed
            element.classList.add('focused-item');

            // Keep track of the element we just focused
            previousFocusedElement.current = element;

            // Update state
            setFocusedIndex(safeIndex);

            if (onSelect) onSelect(safeIndex);
        }
    };

    // Initialize and handle key navigation
    useEffect(() => {
        if (!isActive) return;

        // Query for elements
        elementsRef.current = document.querySelectorAll(selector);

        // Focus initial element
        if (elementsRef.current.length > 0) {
            focusElement(initialIndex);
        }

        // Handle keyboard navigation
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!elementsRef.current) return;

            const elements = elementsRef.current;
            if (elements.length === 0) return;

            let newIndex = focusedIndex;

            // Vertical navigation (W/S or Up/Down)
            if (vertical) {
                if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
                    e.preventDefault();
                    newIndex = loop
                        ? (focusedIndex + 1) % elements.length
                        : Math.min(focusedIndex + 1, elements.length - 1);
                } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
                    e.preventDefault();
                    newIndex = loop
                        ? (focusedIndex - 1 + elements.length) % elements.length
                        : Math.max(focusedIndex - 1, 0);
                }
            }

            // Horizontal navigation (A/D or Left/Right)
            if (horizontal) {
                if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
                    e.preventDefault();
                    newIndex = loop
                        ? (focusedIndex + 1) % elements.length
                        : Math.min(focusedIndex + 1, elements.length - 1);
                } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
                    e.preventDefault();
                    newIndex = loop
                        ? (focusedIndex - 1 + elements.length) % elements.length
                        : Math.max(focusedIndex - 1, 0);
                }
            }

            // Enter key to trigger click
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                elements[focusedIndex]?.click();
            }

            // Update focus if index changed
            if (newIndex !== focusedIndex) {
                focusElement(newIndex);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        // Cleanup
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            // Clear focus when unmounting
            if (previousFocusedElement.current) {
                previousFocusedElement.current.blur();
            }
        };
    }, [isActive, focusedIndex, initialIndex, selector, vertical, horizontal, loop, onSelect]);

    // Manual focus function for external use
    const setFocus = (index: number) => {
        focusElement(index);
    };

    return {
        focusedIndex,
        setFocusedIndex: setFocus,
        totalElements: elementsRef.current?.length || 0
    };
};