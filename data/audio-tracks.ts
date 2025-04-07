import { Track } from '@/providers/audio-provider';

// Default tracks for the audio player
export const defaultTracks: Track[] = [
    {
        id: 1,
        title: "Grind day",
        artist: "Kwesi Arthur",
        duration: 251, // in seconds
        albumArt: "/icons/Grind Day - Kwesi Arthur.png",
        audioSrc: "/audio/Grind-Day-Kwesi-Arthur.mp3"
    },
    {
        id: 2,
        title: "Original",
        artist: "Sarkodie",
        duration: 274,
        albumArt: "/icons/Original Sarkodie.png",
        audioSrc: "/audio/Original-Sarkodie.mp3"
    },
    {
        id: 3,
        title: "Anthem",
        artist: "Kwesi Arthur",
        duration: 192,
        albumArt: "/icons/Anthem - Kwesi Arthur.png",
        audioSrc: "/audio/Anthem - Kwesi-Arthur.mp3"
    },
    {
        id: 4,
        title: "Placebo",
        artist: "La meme gang",
        duration: 311,
        albumArt: "/icons/Placebo - DarkoVibes.png",
        audioSrc: "/audio/Placebo-DarkoVibes.mp3"
    },
    {
        id: 5,
        title: "Pray for me",
        artist: "Kwesi Arthur",
        duration: 305,
        albumArt: "/icons/Pray For Me Kwesi Arthur.png",
        audioSrc: "/audio/PrayvFor-Me-Kwesi-Arthur.mp3"
    }
];