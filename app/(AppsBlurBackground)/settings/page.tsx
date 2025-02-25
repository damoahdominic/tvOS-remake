"use client"
import SettingsItem from '@/components/settings-item'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

const Page = () => {
    const focusableElements = useRef<NodeListOf<HTMLDivElement> | null>(null);
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        focusableElements.current = document.querySelectorAll(".focusable-settings-item");
        focusElement(0);
        // Handle keyboard navigation
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!focusableElements.current) return;

            let newIndex = focusedIndex;
            if (e.key === "ArrowDown" || e.key === "s") {
                newIndex = Math.min(focusedIndex + 1, focusableElements.current.length - 1);
            } else if (e.key === "ArrowUp" || e.key === "w") {
                newIndex = Math.max(focusedIndex - 1, 0);
            }

            if (newIndex !== focusedIndex) {
                focusElement(newIndex);
                setFocusedIndex(newIndex);
            }
        };


        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [focusedIndex]);

    const focusElement = (index: number) => {
        if (focusableElements.current) {
            focusableElements.current[index]?.focus();
        }
    };

    return (
        <div className='h-full'>
            {/* Title */}
            <h1 className='text-4xl font-bold text-center text-white'>Settings</h1>

            {/* Main Content */}
            <div className='grid grid-cols-2 w-full h-full'>
                {/* Logo with App Details */}
                <div className='flex flex-col items-center justify-center text-center gap-8'>
                    {/* Apple logo */}
                    <Image
                        src="/apple-logo-blur.svg"
                        alt="Apple Logo"
                        width={1080}
                        height={1080}
                        className='w-1/2 aspect-square'
                    />

                    {/* App Details */}
                    <div>
                        {/* <h1 className='text-2xl font-bold'>Apple TV</h1>
                            <p className='text-sm'>Version 1.0.0</p> */}
                    </div>
                </div>

                {/* Menu Items */}
                <ScrollArea className="h-[80svh] w-full mt-4 flex items-center">
                    <div className="p-4 flex flex-col items-center gap-2">
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                        <SettingsItem text='General' />
                    </div>
                </ScrollArea>

            </div>
        </div>
    )
}

export default Page