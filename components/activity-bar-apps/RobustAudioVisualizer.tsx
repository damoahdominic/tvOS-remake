/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useAudio } from '@/providers/audio-provider';

interface AudioVisualizerProps {
    barCount?: number;
    mode?: 'frequency' | 'waveform';
}

const RobustAudioVisualizer: React.FC<AudioVisualizerProps> = ({
    barCount = 6,
    mode = 'frequency'
}) => {
    const { audioRef, isPlaying, currentTime } = useAudio();
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const [fallbackMode, setFallbackMode] = useState(false);
    const animationRef = useRef<number | null>(null);
    const barRefs = useRef<SVGRectElement[]>([]);
    const initAttempted = useRef(false);
    const isConnectedRef = useRef(false);

    // Initialize the audio analyzer
    useEffect(() => {
        if (!audioRef.current || initAttempted.current) return;

        initAttempted.current = true;

        const initAudioAnalyzer = () => {
            try {
                // Try to create audio context
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;

                if (!AudioContextClass) {
                    console.warn('AudioContext not supported, using fallback animation');
                    setFallbackMode(true);
                    return;
                }

                const context = new AudioContextClass();
                setAudioContext(context);

                // Create analyzer
                const analyzerNode = context.createAnalyser();
                analyzerNode.fftSize = 256;
                analyzerNode.smoothingTimeConstant = mode === 'frequency' ? 0.8 : 0.4;
                setAnalyser(analyzerNode);

                // Connect audio element to analyzer
                try {
                    const sourceNode = context.createMediaElementSource(audioRef.current!);
                    sourceRef.current = sourceNode;
                    sourceNode.connect(analyzerNode);
                    analyzerNode.connect(context.destination);
                    isConnectedRef.current = true;
                } catch (error) {
                    console.warn('Error connecting media element to analyzer:', error);
                    setFallbackMode(true);

                    // Clean up context since we're switching to fallback
                    context.close();
                    setAudioContext(null);
                    setAnalyser(null);
                }
            } catch (error) {
                console.warn('Error initializing audio analyzer:', error);
                setFallbackMode(true);
            }
        };

        // Wait for audio element to be ready
        if (audioRef.current.readyState >= 2) {
            initAudioAnalyzer();
        } else {
            const handleCanPlay = () => {
                initAudioAnalyzer();
                audioRef.current?.removeEventListener('canplay', handleCanPlay);
            };
            audioRef.current.addEventListener('canplay', handleCanPlay);

            return () => {
                audioRef.current?.removeEventListener('canplay', handleCanPlay);
            };
        }

        return () => {
            // Cleanup
            if (audioContext && !fallbackMode) {
                try {
                    // Disconnect source if it exists
                    if (sourceRef.current && isConnectedRef.current) {
                        try {
                            sourceRef.current.disconnect();
                        } catch (e) {
                            console.warn('Error disconnecting source:', e);
                        }
                        isConnectedRef.current = false;
                    }
                    audioContext.close();
                } catch (e) {
                    console.warn('Error closing AudioContext:', e);
                }
            }
        };
    }, [audioRef, mode]);

    // Reconnect source when audio source changes (new track)
    useEffect(() => {
        // When audio source changes (new track), we may need to reconnect
        if (audioRef.current && sourceRef.current && analyser && audioContext && !fallbackMode) {
            // If we already connected before, we should be good
            // AudioContext keeps the connection even when audio src changes
            // This is just a safety check
            if (!isConnectedRef.current) {
                try {
                    sourceRef.current.connect(analyser);
                    analyser.connect(audioContext.destination);
                    isConnectedRef.current = true;
                } catch (error) {
                    console.warn('Error reconnecting audio source:', error);
                    setFallbackMode(true);
                }
            }
        }
    }, [audioRef.current?.src, analyser, audioContext, fallbackMode]);

    // Set up bars and references
    useEffect(() => {
        // Initialize bar refs array with the correct size
        barRefs.current = new Array(barCount);
    }, [barCount]);

    // Animation loop using Web Audio API
    useEffect(() => {
        if ((!analyser || !isPlaying) && !fallbackMode) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;

                // Reset bars to default position
                barRefs.current.forEach(bar => {
                    if (bar) {
                        bar.setAttribute('y', '25');
                        bar.setAttribute('height', '10');
                    }
                });
            }
            return;
        }

        // Skip if in fallback mode (handled by another effect)
        if (fallbackMode) return;

        let dataArray: Uint8Array;

        if (mode === 'frequency') {
            dataArray = new Uint8Array(analyser!.frequencyBinCount);
        } else {
            dataArray = new Uint8Array(analyser!.fftSize);
        }

        const animate = () => {
            try {
                if (mode === 'frequency') {
                    analyser!.getByteFrequencyData(dataArray);
                } else {
                    analyser!.getByteTimeDomainData(dataArray);
                }

                const step = Math.floor(dataArray.length / barCount);

                // Update each bar
                for (let i = 0; i < barCount; i++) {
                    if (barRefs.current[i]) {
                        let value: number;

                        if (mode === 'frequency') {
                            // For frequency data (0-255)
                            value = dataArray[i * step];
                            const height = Math.max(4, (value / 255) * 25);
                            const y = 30 - height / 2;

                            barRefs.current[i].setAttribute('height', `${height}`);
                            barRefs.current[i].setAttribute('y', `${y}`);
                        } else {
                            // For waveform data (centered at 128, range 0-255)
                            value = dataArray[i * step];
                            const deviation = Math.abs(value - 128) / 128;
                            const height = Math.max(4, deviation * 25);
                            const y = 30 - height / 2;

                            barRefs.current[i].setAttribute('height', `${height}`);
                            barRefs.current[i].setAttribute('y', `${y}`);
                        }
                    }
                }
            } catch (error) {
                console.warn('Error in animation loop:', error);
                setFallbackMode(true);
                return;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };
    }, [analyser, isPlaying, barCount, mode, fallbackMode]);

    // Fallback animation loop using simple oscillation
    useEffect(() => {
        if (!fallbackMode || !isPlaying) {
            return;
        }

        // Use simple oscillation based on currentTime for a fake visualization
        const animate = () => {
            const time = performance.now() / 1000; // Current time in seconds

            for (let i = 0; i < barCount; i++) {
                if (barRefs.current[i]) {
                    // Create a different oscillation for each bar based on its index
                    // This creates a wave-like effect across the bars
                    const phase = i * (Math.PI / barCount);
                    const frequency = 2 + (i % 3); // Different frequencies for variety

                    // Calculate oscillation value (0-1)
                    const oscillation = Math.sin(time * frequency + phase) * 0.5 + 0.5;

                    // Map to height (4-25px)
                    const height = 4 + oscillation * 21;
                    const y = 30 - height / 2;

                    barRefs.current[i].setAttribute('height', `${height}`);
                    barRefs.current[i].setAttribute('y', `${y}`);
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };
    }, [fallbackMode, isPlaying, barCount, currentTime]);

    // Resume AudioContext if it's suspended
    useEffect(() => {
        if (audioContext?.state === 'suspended' && isPlaying) {
            try {
                audioContext.resume().catch(err => {
                    console.warn('Failed to resume AudioContext:', err);
                    setFallbackMode(true);
                });
            } catch (error) {
                console.warn('Error resuming AudioContext:', error);
                setFallbackMode(true);
            }
        }
    }, [audioContext, isPlaying]);

    // Create refs for each bar
    const setBarRef = (el: SVGRectElement | null, index: number) => {
        if (el) {
            barRefs.current[index] = el;
        }
    };

    // Add a class to the container when in fallback mode
    const containerClass = `visualizer-wrapper ${fallbackMode ? 'fallback-mode' : ''}`;

    // Generate the bars dynamically
    const generateBars = () => {
        const bars = [];
        const barWidth = 4;
        const gap = 6;
        const totalWidth = 60;
        const startX = (totalWidth - (barCount * barWidth + (barCount - 1) * gap)) / 2;

        for (let i = 0; i < barCount; i++) {
            const x = startX + i * (barWidth + gap);
            bars.push(
                <rect
                    key={i}
                    ref={(el) => setBarRef(el, i)}
                    x={x}
                    y="25"
                    width={barWidth}
                    height="10"
                    rx="2"
                    style={{ "--index": i } as React.CSSProperties}
                />
            );
        }

        return bars;
    };

    return (
        <div className={containerClass}>
            <svg id="visualizer" viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet">
                {generateBars()}
            </svg>
        </div>
    );
};

export default RobustAudioVisualizer;