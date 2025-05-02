// File: components/music-player.tsx
import React from "react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAudio } from "@/providers/audio-provider";
import clsx from "clsx";

// MusicPlayer component that USES the audio context but doesn't provide it
const MusicPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    audioError,
    errorMessage,
    canPlay,
    progressPercentage,
    remainingTimeFormatted,
    isDragging,

    togglePlayPause,
    playPreviousSong,
    playNextSong,
    handleSeekStart,
    handleSeekChange,
    handleSeekEnd,
    formatTime,

    progressRef,
  } = useAudio();

  if (!currentTrack) {
    return null;
  }

  return (
    <motion.div
      variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
      initial="closed"
      animate="open"
      exit="closed"
      className="flex items-center justify-center flex-col gap-4  p-5"
    >
      {/* Album art and song info */}
      <div
        className={clsx(
          "w-[330px] bg-white/50 dark:bg-black/50 p-4 rounded-xl flex items-center gap-2 transition-colors duration-300 ease-in",
          isPlaying && "bg-white dark:bg-black"
        )}
      >
        <div className="relative">
          <Image
            src={currentTrack.albumArt}
            alt="music"
            width={50}
            height={50}
            className="rounded-xl"
          />
          <Image
            src="/icons/apple-music-small.svg"
            alt="music"
            width={14}
            height={14}
            className="absolute bottom-0 right-0"
          />
        </div>

        <div className="-space-y-1.5 text-[#1E1E1E]/85 dark:text-white/80 ">
          <p className="font-medium text-base">{currentTrack.title}</p>
          <p className="text-base">{currentTrack.artist}</p>
          {audioError && (
            <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full">
        <div
          ref={progressRef}
          className={`relative w-full h-4 ${
            audioError ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          onMouseDown={!audioError ? handleSeekStart : undefined}
          onMouseMove={isDragging && !audioError ? handleSeekChange : undefined}
          onMouseUp={isDragging && !audioError ? handleSeekEnd : undefined}
          onMouseLeave={isDragging && !audioError ? handleSeekEnd : undefined}
          onClick={
            !audioError && !isDragging
              ? (e) => {
                  handleSeekStart().then(() => {
                    handleSeekChange(e);
                    handleSeekEnd();
                  });
                }
              : undefined
          }
        >
          <Progress
            value={audioError ? 0 : progressPercentage}
            className={clsx(
              "h-1 transition-all duration-300 ease-in",
              isDragging && "h-2"
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-4 w-full text-[#1E1E1E]/85 dark:text-white/80">
          <p>{audioError ? "0:00" : formatTime(currentTime)}</p>
          <p>{audioError ? "-0:00" : remainingTimeFormatted}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1">
        <button
          className="hover:bg-white rounded-full transition-all group duration-300 h-[56px] w-[56px] flex items-center justify-center"
          onClick={playPreviousSong}
        >
          <Image
            src="/icons/light/prev.svg"
            className="dark:hidden block group-hover:block"
            alt="prev"
            width={30}
            height={30}
          />
          <Image
            src="/icons/dark/prev.svg"
            className="dark:block hidden group-hover:hidden"
            alt="prev"
            width={30}
            height={30}
          />
        </button>
        <button
          onClick={togglePlayPause}
          disabled={!canPlay || audioError}
          className={
            audioError
              ? "cursor-not-allowed"
              : "hover:bg-white rounded-full group transition-all duration-300 h-[56px] w-[56px] flex items-center justify-center"
          }
        >
          <Image
            src={isPlaying ? "/icons/light/pause.svg" : "/icons/light/play.svg"}
            alt={isPlaying ? "pause" : "play"}
            width={30}
            height={30}
            className={`dark:hidden block group-hover:block ${
              !canPlay || audioError ? "opacity-80" : ""
            }`}
          />
          <Image
            src={isPlaying ? "/icons/dark/pause.svg" : "/icons/dark/play.svg"}
            alt={isPlaying ? "pause" : "play"}
            width={30}
            height={30}
            className={`dark:block hidden group-hover:hidden ${
              !canPlay || audioError ? "opacity-80" : ""
            }`}
          />
        </button>
        <button
          className="hover:bg-white rounded-full transition-all duration-300 group h-[56px] w-[56px] flex items-center justify-center"
          onClick={playNextSong}
        >
          <Image
            src="/icons/light/next.svg"
            className="dark:hidden block group-hover:block"
            alt="next"
            width={30}
            height={30}
          />
          <Image
            src="/icons/dark/next.svg"
            className="dark:block hidden group-hover:hidden"
            alt="next"
            width={30}
            height={30}
          />
        </button>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
