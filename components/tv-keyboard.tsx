import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';

interface TVKeyboardProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (value: string) => void;
    className?: string;
    showSearchBar?: boolean;
    placeholder?: string;
}

const TVKeyboard: React.FC<TVKeyboardProps> = ({
    value,
    onChange,
    onSubmit,
    className = '',
    showSearchBar = true,
    placeholder = 'Movies, Shows, Cast and More'
}) => {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [keyboardMode, setKeyboardMode] = useState<'alpha' | 'numeric'>('alpha');

    const alphaKeys = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    const numericKeys = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        '@', '#', '$', '%', '&', '*', '(', ')', '-', '+',
        ':', ';', ',', '.', '/', '?', '!', "'", '"', '_'
    ];

    const activeKeys = keyboardMode === 'alpha' ? alphaKeys : numericKeys;

    // Handle character input
    const handleKeyClick = useCallback((char: string) => {
        onChange(value + char);
        setSelectedKey(char);
    }, [value, onChange]);

    // Handle space input
    const handleSpaceClick = useCallback(() => {
        onChange(value + ' ');
        setSelectedKey('SPACE');
    }, [value, onChange]);

    // Handle backspace
    const handleBackspaceClick = useCallback(() => {
        if (value.length > 0) {
            onChange(value.slice(0, -1));
        }
        setSelectedKey('⌫');
    }, [value, onChange]);

    // Toggle between alphabetic and numeric keyboard
    const toggleKeyboardMode = useCallback(() => {
        setKeyboardMode(prev => prev === 'alpha' ? 'numeric' : 'alpha');
    }, []);

    // Handle submit
    const handleSubmit = useCallback(() => {
        if (onSubmit && value.trim()) {
            onSubmit(value);
        }
    }, [onSubmit, value]);

    // Clear input
    const handleClear = useCallback(() => {
        onChange('');
    }, [onChange]);

    // Reset selected key after a short delay
    useEffect(() => {
        if (selectedKey) {
            const timer = setTimeout(() => {
                setSelectedKey(null);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [selectedKey]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Enter':
                    handleSubmit();
                    break;
                case 'Backspace':
                    handleBackspaceClick();
                    break;
                case ' ':
                    handleSpaceClick();
                    break;
                case 'Delete':
                    handleClear();
                    break;
                default:
                    // Handle alphabetic and numeric input from physical keyboard
                    if (e.key.length === 1 &&
                        ((e.key >= 'a' && e.key <= 'z') ||
                            (e.key >= 'A' && e.key <= 'Z') ||
                            (e.key >= '0' && e.key <= '9') ||
                            "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?".includes(e.key))) {
                        handleKeyClick(e.key.toLowerCase());
                    }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyClick, handleSpaceClick, handleBackspaceClick, handleSubmit, handleClear]);

    return (
        <div className={`flex flex-col items-center ${className}`}>
            {/* Search Bar */}
            {showSearchBar && (
                <div className="w-full bg-black text-white mb-4">
                    <div className="flex items-center">
                        <div className="text-2xl mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="text-gray-400">{placeholder}</div>
                            <div className="text-2xl min-h-8 transition-all">
                                {value || ' '}
                                <span className="animate-pulse">|</span>
                            </div>
                        </div>
                        {value && (
                            <button
                                onClick={handleClear}
                                className="p-2 text-gray-400 hover:text-white"
                            >
                                <span className="text-2xl">×</span>
                            </button>
                        )}
                    </div>
                    <div className="border-b border-white/50 mt-2"></div>
                </div>
            )}

            {/* Keyboard */}
            <div className="w-full bg-transparent p-2 rounded">

                {/* Character grid */}
                <div className="flex flex-wrap justify-center items-center gap-x-2">
                    <button
                        className="h-6 px-3 bg-white/50 rounded text-black text-sm transition-colors hover:bg-white/60 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        onClick={toggleKeyboardMode}
                    >
                        {keyboardMode === 'alpha' ? '123' : 'ABC'}
                    </button>
                    <button
                        className="h-6 px-3 bg-white/50 rounded text-black text-sm transition-colors hover:bg-white/60 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        onClick={handleSpaceClick}
                    >
                        SPACE
                    </button>
                    {activeKeys.map((char) => (
                        <button
                            key={char}
                            className={`w-10 h-10 flex items-center justify-center rounded text-3xl transition-colors focus:outline-none ${selectedKey === char
                                ? 'bg-white text-[#1e1e1e]/85'
                                : 'text-white/50 hover:text-white'
                                }`}
                            onClick={() => handleKeyClick(char)}
                        >
                            {char}
                        </button>
                    ))}
                    <button
                        className="h-10"
                        onClick={handleBackspaceClick}
                    >
                        <Image src={'/apple-tv/search/backspace.svg'} alt="Backspace" width={36} height={30}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TVKeyboard;