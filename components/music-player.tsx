import React, { useState, useRef, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

// Define interfaces for our data
interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number;
  albumArt: string;
  audioSrc: string;
}

const MusicPlayer: React.FC = () => {
    // Data structure for 5 songs with local audio files
    const songs: Song[] = [
        {
            id: 1,
            title: "Grind day",
            artist: "Kwesi Arthur",
            duration: 207, // in seconds
            albumArt: "/icons/Grind Day - Kwesi Arthur.png",
            audioSrc: "/audio/Grind Day - Kwesi Arthur.ogg"
        },
        {
            id: 2,
            title: "Original",
            artist: "Sarkodie",
            duration: 239,
            albumArt: "/icons/Original Sarkodie.png",
            audioSrc: "/audio/Original - Sarkodie.ogg"
        },
        {
            id: 3,
            title: "Anthem",
            artist: "Kwesi Arthur",
            duration: 189,
            albumArt: "/icons/Anthem - Kwesi Arthur.png",
            audioSrc: "/audio/Anthem - Kwesi Arthur.ogg"
        },
        {
            id: 4,
            title: "Placebo",
            artist: "La meme gang",
            duration: 221,
            albumArt: "/icons/Placebo - DarkoVibes.png",
            audioSrc: "/audio/Placebo - DarkoVibes.ogg"
        },
        {
            id: 5,
            title: "Pray for me",
            artist: "Kwesi Arthur",
            duration: 195,
            albumArt: "/icons/Pray For Me Kwesi Arthur.png",
            audioSrc: "/audio/Pray For Me - Kwesi Arthur.ogg"
        }
    ];

    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [canPlay, setCanPlay] = useState<boolean>(false);
    const [audioError, setAudioError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [shouldPlayAfterSeek, setShouldPlayAfterSeek] = useState<boolean>(false);
    
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const playPromiseRef = useRef<Promise<void> | null>(null);
    
    const currentSong = songs[currentSongIndex];

    // Format time in MM:SS format
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate remaining time
    const remainingTime = currentSong.duration - currentTime;
    const remainingTimeFormatted = `-${formatTime(remainingTime)}`;

    // Calculate progress percentage
    const progressPercentage = (currentTime / currentSong.duration) * 100;

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
        const newIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
        setCurrentSongIndex(newIndex);
        setCurrentTime(0);
    };

    // Handle next track
    const playNextSong = async (): Promise<void> => {
        await safePause();
        setCanPlay(false);
        setAudioError(false);
        setErrorMessage("");
        const newIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(newIndex);
        setCurrentTime(0);
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
        const seekPosition = (e.clientX - progressRect.left) / progressRect.width;
        const newTime = seekPosition * currentSong.duration;
        
        setCurrentTime(Math.max(0, Math.min(newTime, currentSong.duration)));
    };

    const handleSeekEnd = async (): Promise<void> => {
        if (audioError || !audioRef.current) return;
        
        setIsDragging(false);
        
        // Update current time of audio
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

    // Handle track ended
    const handleTrackEnded = (): void => {
        playNextSong();
    };

    // Handle canplay event
    const handleCanPlay = async (): Promise<void> => {
        setCanPlay(true);
        setAudioError(false);
        setErrorMessage("");
        
        // Update the duration from the actual audio file
        if (audioRef.current) {
            const actualDuration = audioRef.current.duration;
            if (!isNaN(actualDuration) && isFinite(actualDuration)) {
                // In a real app, we'd update the songs array or use a ref for actual duration
            }
        }
        
        // Auto-play if we were playing before
        if (isPlaying) {
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

    // Load audio when song changes
    useEffect(() => {
        if (audioRef.current) {
            // Reset states
            setCanPlay(false);
            setAudioError(false);
            setErrorMessage("");
            setShouldPlayAfterSeek(false);
            playPromiseRef.current = null;
        }
    }, [currentSongIndex, currentSong.audioSrc]);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            // No need to await the promise here since the component is unmounting
            if (audioRef.current && isPlaying) {
                audioRef.current.pause();
            }
            playPromiseRef.current = null;
        };
    }, [isPlaying]);

    return (
        <motion.div
            variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
            initial='closed'
            animate='open'
            exit='closed'
            className="flex items-center justify-center flex-col gap-4"
        >
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                src={currentSong.audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleTrackEnded}
                onCanPlay={handleCanPlay}
                onError={handleError}
                preload="auto"
            />

            {/* Album art and song info */}
            <div className='w-[330px] bg-black/50 p-4 rounded-xl flex items-center gap-2'>
                <div className='relative'>
                    <img src={currentSong.albumArt} alt='music' width={50} height={50} />
                    <img src="/icons/apple-music-small.svg" alt='music' width={14} height={14} className='absolute bottom-0 right-0' />
                </div>

                <div className='-space-y-1.5'>
                    <p className='text-white/50'>{currentSong.title}</p>
                    <p className='text-white/20'>{currentSong.artist}</p>
                    {audioError && (
                        <p className='text-red-500 text-xs mt-1'>{errorMessage}</p>
                    )}
                </div>
            </div>

            {/* Progress bar */}
            <div className='w-full space-y-2'>
                <div 
                    ref={progressRef}
                    className={`relative w-full h-4 ${audioError ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    onMouseDown={!audioError ? handleSeekStart : undefined}
                    onMouseMove={!audioError && isDragging ? handleSeekChange : undefined}
                    onMouseUp={!audioError && isDragging ? handleSeekEnd : undefined}
                    onMouseLeave={!audioError && isDragging ? handleSeekEnd : undefined}
                    onClick={!audioError ? handleSeekChange : undefined}
                >
                    <Progress value={audioError ? 0 : progressPercentage} className="h-1" />
                </div>
                <div className='flex items-center justify-between gap-4 w-full'>
                    <p>{audioError ? "0:00" : formatTime(currentTime)}</p>
                    <p>{audioError ? "-0:00" : remainingTimeFormatted}</p>
                </div>
            </div>

            {/* Controls */}
            <div className='flex items-center gap-4'>
                <button onClick={playPreviousSong}>
                    <img src="/icons/backward.png" alt='backward' width={30} height={30} />
                </button>
                <button 
                    onClick={togglePlayPause} 
                    disabled={!canPlay || audioError}
                    className={audioError ? "cursor-not-allowed" : ""}
                >
                    <img 
                        src={isPlaying ? "/icons/pause.png" : "/icons/play.png"} 
                        alt={isPlaying ? 'pause' : 'play'} 
                        width={30} 
                        height={30} 
                        className={(!canPlay || audioError) ? "opacity-50" : ""}
                    />
                </button>
                <button onClick={playNextSong}>
                    <img src="/icons/forward.png" alt='forward' width={30} height={30} />
                </button>
            </div>
        </motion.div>
    );
};

export default MusicPlayer;