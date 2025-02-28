import React from 'react'
import { Progress } from "@/components/ui/progress"
import Image from 'next/image'
import {motion} from "framer-motion"

const MusicPlayer = () => {
    return (
        <motion.div
            variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
            initial='closed'
            animate='open'
            exit='closed'
            className="flex items-center justify-center flex-col gap-4">
            <div className='w-[330px] bg-black/50 p-4 rounded-xl flex items-center gap-2'>
                <div className='relative'>
                    <Image src="/icons/music-art.svg" alt='music' width={50} height={50} />
                    <Image src="/icons/apple-music-small.svg" alt='music' width={14} height={14} className='absolute bottom-0 right-0' />
                </div>

                <div className='-space-y-1.5'>
                    <p className='text-white/50'>AZAMAN</p>
                    <p className='text-white/20'>Rema</p>
                </div>
            </div>

            <div className='w-full space-y-2'>
                <Progress value={43} />
                <div className='flex items-center justify-between gap-4 w-full'>
                    <p>0:00</p>
                    <p>-3:27</p>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <Image src="/icons/backward.svg" alt='backward' width={30} height={30} />
                <Image src="/icons/play.svg" alt='play' width={30} height={30} />
                <Image src="/icons/forward.svg" alt='foward' width={30} height={30} />
            </div>
        </motion.div>
    )
}

export default MusicPlayer