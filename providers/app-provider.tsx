import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";

const AppContext = createContext({
    focusedIndex: 0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setFocusedIndex: (index: number) => { },
    focusableElements: null as NodeListOf<HTMLDivElement> | null,
});

export function AppProvider({ children }: { children: ReactNode }) {
    const focusableElements = useRef<NodeListOf<HTMLDivElement> | null>(null);
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        focusableElements.current = document.querySelectorAll(".focusable");
        focusElement(0);
    }, []);

    const focusElement = (index: number) => {
        if (focusableElements.current) {
            focusableElements.current[index]?.focus();
            setFocusedIndex(index);
        }
    };

    return (
        <AppContext.Provider value={{ focusedIndex, setFocusedIndex, focusableElements: focusableElements.current }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}