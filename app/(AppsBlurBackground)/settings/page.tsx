"use client"
import SettingsItem from '@/components/settings-item'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from 'framer-motion';
import { useTransitionRouter } from 'next-view-transitions'

// Define types for menu items
interface MenuItem {
    id: string;
    label: string;
    hasSubmenu: boolean;
    icon?: React.ReactNode;
    description?: string;
    value?: string;
    isSelected?: boolean;
    href?: string;
    action?: () => void;
}

// Define an interface for the settings data
interface SettingsData {
    [key: string]: MenuItem[];
}

// Define an interface for menu paths
interface MenuPaths {
    [key: string]: string[];
}

// Icons for settings (using simple SVG for demo)
const SettingsIcons: { [key: string]: React.ReactNode } = {
    general: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
    ),
    privacy: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    ),
    screen: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
    ),
    audio: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
    ),
    network: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
        </svg>
    ),
    apps: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
    ),
    accounts: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    ),
    about: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    ),
    language: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M21.54 15a9 9 0 0 1-7.93 4.46c-4.95-.01-9-4.05-9.01-9 0-4.56 3.4-8.29 7.78-8.9"></path>
            <path d="M3.34 7.93A9 9 0 0 0 12.01 21c2.97 0 5.58-1.5 7.15-3.77"></path>
            <path d="M14 3v4h4"></path>
            <path d="M14 3l5 5"></path>
        </svg>
    )
};

// Mock data for settings menus
const settingsData: SettingsData = {
    main: [
        { id: 'general', label: 'General', hasSubmenu: true, icon: SettingsIcons.general, description: 'Language, Time Zone, Accessibility' },
        { id: 'privacy', label: 'Privacy & Security', hasSubmenu: true, icon: SettingsIcons.privacy, description: 'Tracking, Location Services, Analytics' },
        { id: 'screen', label: 'Screen & Display', hasSubmenu: true, icon: SettingsIcons.screen, description: 'Resolution, Calibration, HDMI settings' },
        { id: 'audio', label: 'Audio & Video', hasSubmenu: true, icon: SettingsIcons.audio, description: 'Dolby Atmos, Audio Format, Volume' },
        { id: 'network', label: 'Network', hasSubmenu: true, icon: SettingsIcons.network, description: 'Wi-Fi, Ethernet, Connection status' },
        { id: 'apps', label: 'Apps', hasSubmenu: true, icon: SettingsIcons.apps, description: 'Installed apps, Storage, Permissions' },
        { id: 'accounts', label: 'Accounts', hasSubmenu: true, icon: SettingsIcons.accounts, description: 'Apple ID, Users, Profiles' },
        { id: 'about', label: 'About', hasSubmenu: true, icon: SettingsIcons.about, description: 'System information, Legal, Regulatory' }
    ],
    general: [
        { id: 'language', label: 'Language', hasSubmenu: true, icon: SettingsIcons.language, description: 'System language and region' },
        { id: 'time', label: 'Time Zone', hasSubmenu: false, description: 'Automatic or manual time settings' },
        { id: 'keyboard', label: 'Keyboard', hasSubmenu: false, description: 'Layout, suggestions, dictation' },
        { id: 'accessibility', label: 'Accessibility', hasSubmenu: true, description: 'Vision, hearing, motor settings' },
        { id: 'reset', label: 'Reset', hasSubmenu: false, description: 'Restore factory settings' }
    ],
    language: [
        { id: 'english', label: 'English', hasSubmenu: false, value: 'English (US)', isSelected: true },
        { id: 'spanish', label: 'Spanish', hasSubmenu: false, value: 'Español' },
        { id: 'french', label: 'French', hasSubmenu: false, value: 'Français' },
        { id: 'german', label: 'German', hasSubmenu: false, value: 'Deutsch' },
        { id: 'italian', label: 'Italian', hasSubmenu: false, value: 'Italiano' },
        { id: 'japanese', label: 'Japanese', hasSubmenu: false, value: '日本語' },
        { id: 'korean', label: 'Korean', hasSubmenu: false, value: '한국어' },
        { id: 'chinese', label: 'Chinese', hasSubmenu: false, value: '中文' }
    ],
    privacy: [
        { id: 'tracking', label: 'App Tracking Transparency', hasSubmenu: false, description: 'Control how apps request to track you' },
        { id: 'location', label: 'Location Services', hasSubmenu: false, description: 'Manage which apps can access your location' },
        { id: 'analytics', label: 'Analytics & Improvements', hasSubmenu: false, description: 'Share usage data with Apple' },
        { id: 'ads', label: 'Apple Advertising', hasSubmenu: false, description: 'Personalized ads in Apple apps' }
    ]
};

// Menu breadcrumb trails
const menuPaths: MenuPaths = {
    main: ['Settings'],
    general: ['Settings', 'General'],
    language: ['Settings', 'General', 'Language'],
    privacy: ['Settings', 'Privacy & Security']
};

// Type for the animation direction
type Direction = 'forward' | 'backward';


const Page = () => {
    const router = useTransitionRouter()
    const [currentMenu, setCurrentMenu] = useState<string>('main');
    const [menuStack, setMenuStack] = useState<string[]>(['main']);
    const [focusedIndex, setFocusedIndex] = useState<number>(0);
    const [direction, setDirection] = useState<Direction>('forward');
    const [previousFocusMap, setPreviousFocusMap] = useState<{ [key: string]: number }>({});

    // Refs for focus management
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Handle keyboard navigation
    useEffect(() => {
        // Only add event listeners if window is defined (client-side)
        if (typeof window !== 'undefined') {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'ArrowUp' || e.key === 'w') {
                    e.preventDefault();
                    setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev));
                } else if (e.key === 'ArrowDown' || e.key === 's') {
                    e.preventDefault();
                    const maxIndex = settingsData[currentMenu].length - 1;
                    setFocusedIndex(prev => (prev < maxIndex ? prev + 1 : prev));
                } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'Enter') {
                    e.preventDefault();
                    const selectedItem = settingsData[currentMenu][focusedIndex];
                    if (selectedItem && selectedItem.hasSubmenu) {
                        navigateForward(selectedItem.id);
                    } else if (selectedItem.action) {
                        selectedItem.action();
                    }
                } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'Escape' || e.key === 'Backspace') {
                    e.preventDefault();
                    navigateBack();
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMenu, focusedIndex]);

    // Set focus when focusedIndex changes
    useEffect(() => {
        if (itemRefs.current[focusedIndex]) {
            itemRefs.current[focusedIndex]?.focus();
        }
    }, [focusedIndex]);

    // Initialize refs when currentMenu changes
    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, settingsData[currentMenu].length);
    }, [currentMenu]);

    // Navigate to submenu
    const navigateForward = (menuId: string) => {
        if (settingsData[menuId]) {
            // Save current focus position
            setPreviousFocusMap(prev => ({ ...prev, [currentMenu]: focusedIndex }));

            // Update menu state
            setCurrentMenu(menuId);
            setDirection('forward');
            setMenuStack(prev => [...prev, menuId]);

            // Set focus position (use previous if available)
            setFocusedIndex(previousFocusMap[menuId] !== undefined ? previousFocusMap[menuId] : 0);
        }
    };

    // Navigate back
    const navigateBack = () => {
        if (menuStack.length > 1) {
            const newStack = [...menuStack];
            newStack.pop();

            const prevMenu = newStack[newStack.length - 1];

            setCurrentMenu(prevMenu);
            setDirection('backward');
            setMenuStack(newStack);

            // Restore previous focus
            setFocusedIndex(previousFocusMap[prevMenu] || 0);
        }
        else {
            router.back();
        }
    };

    // Animation variants for menu transitions
    const containerVariants = {
        enter: (direction: Direction) => ({
            x: direction === 'forward' ? '20%' : '-20%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.25 }
            }
        },
        exit: (direction: Direction) => ({
            x: direction === 'forward' ? '-20%' : '20%',
            opacity: 0,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.25 }
            }
        })
    };


    return (
        <div className='h-full'>
            {/* Title */}
            <h1 className='text-4xl font-bold text-center text-white'>{menuPaths[currentMenu][menuPaths[currentMenu].length - 1]}</h1>

            {/* Main Content */}
            <div className='grid grid-cols-2 w-full h-full'>
                {/* Logo with App Details */}
                <div className='flex flex-col items-center justify-center text-center gap-8 mb-[20%]'>
                    {/* Apple logo */}
                    <Image
                        src="/apple-logo-blur.svg"
                        alt="Apple Logo"
                        width={1080}
                        height={1080}
                        className='w-1/2 aspect-square'
                    />

                    {/* App Details */}
                    <div className='w-1/2'>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${currentMenu}-${focusedIndex}`}
                                className="text-center text-white/60"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {settingsData[currentMenu][focusedIndex]?.description ? (
                                    <p className="text-base">{settingsData[currentMenu][focusedIndex].description}</p>
                                ) : (
                                    <p className="text-xs">Use arrow keys to navigate • Press right arrow or Enter to select • Press left arrow or Esc to go back</p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Menu Items */}
                <ScrollArea className="h-[80svh] mt-[5%] w-full flex items-center">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentMenu}
                            custom={direction}
                            variants={containerVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="py-4"
                        >
                            <div className="space-y-2">
                                {settingsData[currentMenu].map((item, index) => (
                                    <SettingsItem
                                        key={item.id}
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        ref={(el: any) => itemRefs.current[index] = el}
                                        text={item.label}
                                        icon={item.icon}
                                        description={item.description}
                                        value={item.value}
                                        isSelected={item.isSelected}
                                        isFocused={focusedIndex === index}
                                        hasSubmenu={item.hasSubmenu}
                                        href={item.href}
                                        action={
                                            item.hasSubmenu
                                                ? () => navigateForward(item.id)
                                                : item.action
                                        }
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </ScrollArea>
            </div>
        </div>
    )
}

export default Page