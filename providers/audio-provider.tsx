"use client"
// File: providers/audio-provider.tsx
import React, { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';

// Define Track interface to match your existing Song structure
export interface Track {
    id: number | string;
    title: string;
    artist: string;
    duration: number;
    albumArt: string;
    audioSrc: string;
}

export interface AudioContextType {
    // Current state
    currentTrack: Track | null;
    currentTrackIndex: number;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    canPlay: boolean;
    audioError: boolean;
    errorMessage: string;
    isDragging: boolean;
    loopMode: 'none' | 'one' | 'all';

    // Control functions
    play: () => Promise<void>;
    pause: () => Promise<void>;
    togglePlayPause: () => Promise<void>;
    playNextSong: () => Promise<void>;
    playPreviousSong: () => Promise<void>;
    setCurrentTime: (time: number) => void;
    setIsDragging: (isDragging: boolean) => void;
    handleSeekStart: () => Promise<void>;
    handleSeekChange: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleSeekEnd: () => Promise<void>;
    setShouldPlayAfterSeek: (shouldPlay: boolean) => void;
    toggleLoopMode: () => void;

    // Utility functions
    formatTime: (seconds: number) => string;

    // Additional state
    tracks: Track[];
    progressPercentage: number;
    remainingTime: number;
    remainingTimeFormatted: string;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    progressRef: React.RefObject<HTMLDivElement | null>;
}

// Create context with default values
const AudioContext = createContext<AudioContextType>({
    currentTrack: null,
    currentTrackIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    canPlay: false,
    audioError: false,
    errorMessage: "",
    isDragging: false,
    loopMode: 'all',

    play: async () => { },
    pause: async () => { },
    togglePlayPause: async () => { },
    playNextSong: async () => { },
    playPreviousSong: async () => { },
    setCurrentTime: () => { },
    setIsDragging: () => { },
    handleSeekStart: async () => { },
    handleSeekChange: () => { },
    handleSeekEnd: async () => { },
    setShouldPlayAfterSeek: () => { },
    toggleLoopMode: () => { },

    formatTime: () => "",

    tracks: [],
    progressPercentage: 0,
    remainingTime: 0,
    remainingTimeFormatted: "-0:00",
    audioRef: { current: null } as React.RefObject<HTMLAudioElement | null>,
    progressRef: { current: null } as React.RefObject<HTMLDivElement | null>,
});

interface AudioProviderProps {
    children: ReactNode;
    initialTracks?: Track[];
}

export const AudioProvider: React.FC<AudioProviderProps> = ({
    children,
    initialTracks = []
}) => {
    // State variables
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [canPlay, setCanPlay] = useState<boolean>(false);
    const [audioError, setAudioError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [shouldPlayAfterSeek, setShouldPlayAfterSeek] = useState<boolean>(false);
    const [tracks] = useState<Track[]>(initialTracks);

    // Refs
    const intervalRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const playPromiseRef = useRef<Promise<void> | null>(null);

    // Derived values
    const currentTrack = tracks.length > 0 ? tracks[currentTrackIndex] : null;
    const duration = currentTrack?.duration || 0;

    // Calculate progress percentage
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Calculate remaining time
    const remainingTime = duration - currentTime;

    // Format time in MM:SS format
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const remainingTimeFormatted = `-${formatTime(remainingTime)}`;

    // Safe play function that handles the play promise correctly
    const safePlay = async (): Promise<void> => {
        if (!audioRef.current || audioError || !canPlay) return;

        try {
            // Store the play promise so we can handle it properly
            playPromiseRef.current = audioRef.current.play();
            await playPromiseRef.current;
            setIsPlaying(true);
            playPromiseRef.current = null;
        } catch (error) {
            console.error("Play error:", error instanceof Error ? error.message : String(error));
            setIsPlaying(false);
            setErrorMessage(`Play error: ${error instanceof Error ? error.message : "Unknown error"}`);
            playPromiseRef.current = null;
        }
    };

    // Safe pause function that handles the play promise correctly
    const safePause = async (): Promise<void> => {
        if (!audioRef.current) return;

        // If there's a pending play operation, wait for it to complete before pausing
        if (playPromiseRef.current) {
            try {
                await playPromiseRef.current;
            } catch (error) {
                // Play promise failed, but we're pausing anyway
                console.error("Error in pending play:", error);
            }
            playPromiseRef.current = null;
        }

        audioRef.current.pause();
        setIsPlaying(false);
    };

    // Handle play/pause
    const togglePlayPause = async (): Promise<void> => {
        if (audioError || !audioRef.current) return;

        if (isPlaying) {
            await safePause();
        } else {
            await safePlay();
        }
    };

    // Handle previous track
    const playPreviousSong = async (): Promise<void> => {
        await safePause();
        setCanPlay(false);
        setAudioError(false);
        setErrorMessage("");

        const newIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
        setCurrentTrackIndex(newIndex);
        setCurrentTime(0);

        // Auto-play the previous track
        if (isPlaying) {
            setTimeout(() => {
                safePlay().catch(error => {
                    console.error("Error playing previous track:", error);
                });
            }, 100);
        }
    };

    // Handle next track with autoplay
    const playNextSong = async (): Promise<void> => {
        await safePause();
        setCanPlay(false);
        setAudioError(false);
        setErrorMessage("");

        // When loopMode is 'none' and we're at the last track, don't loop
        if (loopMode === 'none' && currentTrackIndex === tracks.length - 1) {
            // Just stop playback (don't change track)
            setIsPlaying(false);
            return;
        }

        const newIndex = (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(newIndex);
        setCurrentTime(0);

        // Auto-play the next track
        if (isPlaying) {
            setTimeout(() => {
                if (audioRef.current) {
                    safePlay().catch(error => {
                        console.error("Error playing next track:", error);
                    });
                }
            }, 100);
        }
    };

    // Handle seek functionality
    const handleSeekStart = async (): Promise<void> => {
        if (audioError || !audioRef.current) return;

        setIsDragging(true);
        // Remember if we should resume playback after seeking
        setShouldPlayAfterSeek(isPlaying);

        if (isPlaying) {
            await safePause();
        }
    };

    const handleSeekChange = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (!progressRef.current || audioError) return;

        const progressRect = progressRef.current.getBoundingClientRect();
        const seekPosition = Math.max(0, Math.min(1, (e.clientX - progressRect.left) / progressRect.width));
        const newTime = seekPosition * (currentTrack?.duration || 0);

        setCurrentTime(Math.max(0, Math.min(newTime, currentTrack?.duration || 0)));
    };

    const handleSeekEnd = async (): Promise<void> => {
        if (audioError || !audioRef.current || !isDragging) return;

        setIsDragging(false);

        // Only now update the actual audio position when the user releases the mouse
        audioRef.current.currentTime = currentTime;

        // If we were playing before the seek started, resume playback
        if (shouldPlayAfterSeek) {
            // Use a timeout to ensure the currentTime change is processed
            // before attempting to play
            setTimeout(() => {
                safePlay().catch(error => {
                    console.error("Error resuming after seek:", error);
                    setErrorMessage(`Seek error: ${error instanceof Error ? error.message : "Unknown error"}`);
                });
            }, 50);
        }

        setShouldPlayAfterSeek(false);
    };

    // Handle time update
    const handleTimeUpdate = (): void => {
        if (!isDragging && audioRef.current && !audioError) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Progress tracking
    const startProgressInterval = () => {
        clearProgressInterval();

        intervalRef.current = window.setInterval(() => {
            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
            }
        }, 1000);
    };

    const clearProgressInterval = () => {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // State for loop mode
    const [loopMode, setLoopMode] = useState<'none' | 'one' | 'all'>('all');

    // Track ended handler with proper autoplay
    const handleTrackEnded = (): void => {
        // console.log("Track ended, loopMode:", loopMode);

        if (loopMode === 'one' && audioRef.current) {
            // Loop the current track
            audioRef.current.currentTime = 0;
            safePlay().catch(error => {
                console.error("Error restarting track:", error);
            });
        } else {
            // Move to next track with autoplay
            setIsPlaying(true); // Important: Set to true to ensure next track plays
            playNextSong();
        }
    };

    // Handle canplay event to ensure autoplay works
    const handleCanPlay = async (): Promise<void> => {
        // console.log("Track can play now!");
        setCanPlay(true);
        setAudioError(false);
        setErrorMessage("");

        // Auto-play if we were playing before
        if (isPlaying && audioRef.current) {
            // console.log("Auto-playing track");
            // Use a short timeout to avoid potential race conditions
            setTimeout(() => {
                safePlay().catch(error => {
                    console.error("Error auto-playing after load:", error);
                    setIsPlaying(false);
                    setErrorMessage(`Auto-play error: ${error instanceof Error ? error.message : "Unknown error"}`);
                    setAudioError(true);
                });
            }, 50);
        }
    };

    // Handle audio loading error
    const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>): void => {
        const target = e.target as HTMLAudioElement;
        let errorMsg = "File not found or unsupported format";

        if (target.error) {
            switch (target.error.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                    errorMsg = "Playback aborted by the user";
                    break;
                case MediaError.MEDIA_ERR_NETWORK:
                    errorMsg = "Network error while loading the audio";
                    break;
                case MediaError.MEDIA_ERR_DECODE:
                    errorMsg = "Format error: Audio cannot be decoded";
                    break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    errorMsg = "Format error: Audio format not supported by the browser";
                    break;
                default:
                    errorMsg = `Unknown error: ${target.error.message}`;
            }
        }

        console.error("Audio loading error:", errorMsg);
        setErrorMessage(errorMsg);
        setAudioError(true);
        setCanPlay(false);
        setIsPlaying(false);
    };

    // When currentTrack changes, load and play the new track
    useEffect(() => {
        if (!currentTrack || !audioRef.current) return;

        audioRef.current.src = currentTrack.audioSrc;

        // Reset states
        setCanPlay(false);
        setAudioError(false);
        setErrorMessage("");
        setShouldPlayAfterSeek(false);
        playPromiseRef.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTrackIndex, currentTrack?.audioSrc]);

    // Handle play/pause state changes
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            safePlay().catch(error => {
                console.error("Error in play effect:", error);
            });
            startProgressInterval();
        } else {
            audioRef.current.pause();
            clearProgressInterval();
        }

        return () => {
            clearProgressInterval();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    // Function to toggle loop mode
    const toggleLoopMode = () => {
        setLoopMode(current => {
            switch (current) {
                case 'none': return 'all';
                case 'all': return 'one';
                case 'one': return 'none';
                default: return 'all';
            }
        });
    };

    const value = {
        currentTrack,
        currentTrackIndex,
        isPlaying,
        currentTime,
        duration,
        canPlay,
        audioError,
        errorMessage,
        isDragging,
        loopMode,

        play: safePlay,
        pause: safePause,
        togglePlayPause,
        playNextSong,
        playPreviousSong,
        setCurrentTime,
        setIsDragging,
        handleSeekStart,
        handleSeekChange,
        handleSeekEnd,
        setShouldPlayAfterSeek,
        toggleLoopMode,

        formatTime,

        tracks,
        progressPercentage,
        remainingTime,
        remainingTimeFormatted,
        audioRef,
        progressRef,
    };

    return (
        <AudioContext.Provider value={value}>
            {children}

            {/* Hidden audio element */}
            <audio
                id='audio'
                ref={audioRef}
                src={currentTrack?.audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleTrackEnded}
                onCanPlay={handleCanPlay}
                onError={handleError}
                preload="auto"
                onLoadedData={(e) => {
                    if (e.currentTarget.readyState >= 2) {
                        setCanPlay(true);
                        setAudioError(false);
                        setErrorMessage("");
                    }
                 }}
            />
        </AudioContext.Provider>
    );
};

// Custom hook for using the audio context
export const useAudio = () => {
    const context = useContext(AudioContext);

    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }

    return context;
};