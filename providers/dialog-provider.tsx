"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DialogContextType {
    isDialogOpen: boolean;
    setDialogOpen: (isOpen: boolean) => void;
}

const DialogContext = createContext<DialogContextType>({
    isDialogOpen: false,
    setDialogOpen: () => { },
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    return (
        <DialogContext.Provider value={{ isDialogOpen, setDialogOpen }}>
            {children}
        </DialogContext.Provider>
    );
};

export const useDialogContext = () => useContext(DialogContext);