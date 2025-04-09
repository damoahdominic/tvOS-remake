import { Track } from '@/providers/audio-provider';

// Default tracks for the audio player
export const defaultTracks: Track[] = [
    {
        id: 1,
        title: "Grind day",
        artist: "Kwesi Arthur",
        duration: 251, // in seconds
        albumArt: "https://res.cloudinary.com/dgfdign4l/image/upload/v1744181963/Grind_Day_-_Kwesi_Arthur_ym3lm5.png",
        audioSrc: "https://res.cloudinary.com/dgfdign4l/video/upload/v1744136830/Grind_Day_-_Kwesi_Arthur_ntr8n0.mp3"
    },
    {
        id: 2,
        title: "Original",
        artist: "Sarkodie",
        duration: 274,
        albumArt: "https://res.cloudinary.com/dgfdign4l/image/upload/v1744181963/Original_Sarkodie_rlrtko.png",
        audioSrc: "https://res.cloudinary.com/dgfdign4l/video/upload/v1744136830/Original_-_Sarkodie_slh4pz.mp3"
    },
    {
        id: 3,
        title: "Anthem",
        artist: "Kwesi Arthur",
        duration: 192,
        albumArt: "https://res.cloudinary.com/dgfdign4l/image/upload/v1744181963/Anthem_-_Kwesi_Arthur_bhbhbk.png",
        audioSrc: "https://res.cloudinary.com/dgfdign4l/video/upload/v1744136829/Anthem_-_Kwesi_Arthur_gcrqv6.mp3"
    },
    {
        id: 4,
        title: "Placebo",
        artist: "La meme gang",
        duration: 311,
        albumArt: "https://res.cloudinary.com/dgfdign4l/image/upload/v1744181963/Placebo_-_Darkovibes_vmd76f.png",
        audioSrc: "https://res.cloudinary.com/dgfdign4l/video/upload/v1744136830/Placebo_-_DarkoVibes_rheahi.mp3"
    },
    {
        id: 5,
        title: "Pray for me",
        artist: "Kwesi Arthur",
        duration: 305,
        albumArt: "https://res.cloudinary.com/dgfdign4l/image/upload/v1744181963/Pray_For_Me_Kwesi_Arthur_aqdvmm.png",
        audioSrc: "https://res.cloudinary.com/dgfdign4l/video/upload/v1744136830/Pray_For_Me_-_Kwesi_Arthur_nr9vl9.mp3"
    }
];