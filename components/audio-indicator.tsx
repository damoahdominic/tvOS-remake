// File: components/audio-indicator.tsx
import React from 'react';
import { useAudio } from '@/providers/audio-provider';
import { Play, Pause } from 'lucide-react';

interface AudioIndicatorProps {
    className?: string;
    size?: 'sm' | 'md'; // Different size options
}

// A small audio indicator that can be placed anywhere in the app
// Useful for showing playing status and basic controls when the main player is hidden
const AudioIndicator: React.FC<AudioIndicatorProps> = ({
    className = '',
    size = 'sm'
}) => {
    const { currentTrack, isPlaying, togglePlayPause, canPlay } = useAudio();

    if (!currentTrack) return null;

    return (
        <div
            className={`flex items-center gap-2 ${size === 'sm' ? 'text-xs' : 'text-sm'
                } ${className}`}
        >
            <button
                onClick={togglePlayPause}
                disabled={!canPlay}
                className={`flex items-center justify-center rounded-full bg-black/20 
          ${size === 'sm' ? 'w-6 h-6' : 'w-8 h-8'} 
          ${!canPlay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/30'}`}
            >
                {isPlaying ? (
                    <Pause size={size === 'sm' ? 12 : 16} className="text-white" />
                ) : (
                    <Play size={size === 'sm' ? 12 : 16} className="text-white" />
                )}
            </button>

            <div className="truncate">
                <span className="text-white/60">{currentTrack.title}</span>
                {size === 'md' && (
                    <span className="text-white/40 ml-1">• {currentTrack.artist}</span>
                )}
            </div>

            {/* Optional audio visualizer bars */}
            {isPlaying && (
                <div className="flex items-center gap-[2px] h-3">
                    <div className={`w-[2px] bg-white/60 h-2 animate-pulse-slow`}></div>
                    <div className={`w-[2px] bg-white/60 h-3 animate-pulse-medium`}></div>
                    <div className={`w-[2px] bg-white/60 h-1 animate-pulse-fast`}></div>
                </div>
            )}
        </div>
    );
};

export default AudioIndicator;