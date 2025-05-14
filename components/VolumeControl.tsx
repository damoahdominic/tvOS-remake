/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useAudio } from '@/providers/audio-provider';
import { motion } from 'framer-motion';

export default function VolumeControl() {
    const { audioRef } = useAudio();
    const [volume, setVolume] = useState(50);
    const [isVisible, setIsVisible] = useState(false);
    // const [isChanging, setIsChanging] = useState(false);
    const timeoutRef = useRef<any>(null);
    const [isAtLimit, setIsAtLimit] = useState(false);
    const [limitDirection, setLimitDirection] = useState<'min' | 'max' | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const previousVolumeRef = useRef(50);
    const [numberOfClicks, setNumberOfClicks] = useState(0);
    const [showLarge, setShowLarge] = useState(true);

    // Initialize volume value based on audio element
    useEffect(() => {
        if (audioRef?.current) {
            // Audio volume is between 0 and 1, convert to percentage
            setVolume(Math.round(audioRef.current.volume * 100));
            setIsMuted(audioRef.current.muted);
        }
    }, [audioRef]);

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (e.key === '+' || e.key === '=') {
                handleVolumeChange(Math.min(volume + 5, 100));
            } else if (e.key === '-' || e.key === '_') {
                handleVolumeChange(Math.max(volume - 5, 0));
            } else if (e.key === 'm') {
                toggleMute();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [volume, isMuted]);

    useEffect(() => {
        if (numberOfClicks === 1) {
            setShowLarge(true);
        } else {
            setShowLarge(false);
        }
    }, [numberOfClicks]);

    const handleVolumeChange = (newVolume: any) => {
        setVolume(newVolume);
        setIsVisible(true);
        setNumberOfClicks((prevClicks) => prevClicks + 1);

        if(newVolume === 0) {
            setIsAtLimit(true);
            setLimitDirection('min');
            setTimeout(() => {
                setIsAtLimit(false);
                setLimitDirection(null);
            }, 300);
        } else if(newVolume === 100) {
            setIsAtLimit(true);
            setLimitDirection("max");
            setTimeout(() => {
                setIsAtLimit(false);
                setLimitDirection(null);
            }, 300);
        }
        else {
            setIsAtLimit(false);
            setLimitDirection(null);
        }

        // setIsChanging(true);

        // Apply the volume to the audio element
        if (audioRef?.current) {
            audioRef.current.volume = newVolume / 100;

            // If changing from 0 or to 0, handle mute state
            if (newVolume === 0 && !isMuted) {
                setIsMuted(true);
                audioRef.current.muted = true;
            } else if (newVolume > 0 && isMuted) {
                setIsMuted(false);
                audioRef.current.muted = false;
            }
        }

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a timeout to hide the control
        timeoutRef.current = setTimeout(() => {
            // setIsChanging(false);
            setTimeout(() => {
                setIsVisible(false);
            }, 300); // Match the transition time
            setTimeout(() => {
                setNumberOfClicks(0);
            }, 300); // Match the transition time
        }, 2000);
    };

    const toggleMute = () => {
        if (audioRef?.current) {
            if (isMuted) {
                // Unmute
                audioRef.current.muted = false;
                setIsMuted(false);
                if (volume === 0) {
                    // If volume was 0, restore previous volume
                    const newVolume = previousVolumeRef.current || 50;
                    setVolume(newVolume);
                    audioRef.current.volume = newVolume / 100;
                }
            } else {
                // Mute
                previousVolumeRef.current = volume;
                audioRef.current.muted = true;
                setIsMuted(true);
            }

            // Show the volume control
            setIsVisible(true);
            // setIsChanging(true);

            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set a timeout to hide the control
            timeoutRef.current = setTimeout(() => {
                // setIsChanging(false);
                setTimeout(() => {
                    setIsVisible(false);
                }, 300);
            }, 2000);
        }
    };

    const getVolumeIcon = () => {
        if (isMuted || volume === 0) return <VolumeX className="size-6 text-[#1e1e1e]" />;
        if (volume < 50) return <Volume1 className="size-6 text-[#1e1e1e]" />;
        return <Volume2 className="size-6 text-[#1e1e1e]" />;
    };

    return (
        <div
            className={`fixed !z-[99999999999] right-0 top-1/2 transform -translate-y-1/2 flex items-center rounded-l-lg p-4 transition-all duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="flex flex-col items-center justify-center gap-2">
                {/* <button
                    onClick={toggleMute}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                    {getVolumeIcon()}
                </button> */}
                <motion.div animate={{ width: showLarge ? '32px' : isAtLimit ? '4px' : '8px', top: (!showLarge && isAtLimit) ? (limitDirection === 'max' ? '-2svh' : '2svh') : '0' }} className={`relative h-[40svh] bg-black/30 rounded-full overflow-hidden`}>
                    <div
                        className="absolute bottom-0 w-full bg-white transition-all duration-300 ease-in-out"
                        style={{ height: isMuted ? '0%' : `${volume}%` }}
                        onClick={(e) => {
                            const rect = e.currentTarget?.parentElement?.getBoundingClientRect();
                            const clickY = e.clientY - (rect?.top || 0);
                            const height = rect?.height || 0;
                            const percentage = 100 - Math.max(0, Math.min(100, (clickY / height) * 100));
                            handleVolumeChange(Math.round(percentage));
                        }}
                    />

                    {showLarge &&
                        <div className='absolute bottom-2 w-full z-10 flex items-center justify-center transition-all duration-300 ease-in-out'>
                            {getVolumeIcon()}
                        </div>}
                </motion.div>
                {/* <span className="text-white text-sm font-medium mt-1">
                    {isMuted ? 'Muted' : `${volume}%`}
                </span> */}
            </div>

            {/* <div
                className={`absolute left-0 top-0 h-full w-1 bg-blue-500 transition-all duration-150 ${isChanging ? 'opacity-100' : 'opacity-0'
                    }`}
            /> */}
        </div>
    );
};
