import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';

interface Props {
    onClick?: () => void;
}
const Game = ({ onClick }: Props) => {
    return (
        <div className='grid gap-2 p-3'>
            <h1 className='text-xl font-bold text-[#1E1E1E]/85 dark:text-white/85'>Game</h1>

            <div className='h-[1px] w-full bg-black/40 dark:bg-white/40' />
            
            <div className='flex flex-col items-center text-center my-6 gap-3'>
                <>
                    <Image src="/icons/light/game.svg" alt="Game" width={100} height={100} className="block dark:hidden" />
                    <Image src="/icons/dark/game.svg" alt="Game" width={80} height={80} className="dark:block hidden" />
                </>

                <p className='font-medium text-base max-w-[220px] text-[#1E1E1E]/85 dark:text-white/85'>
                    Place your controller in
                    discovery mode.
                </p>
            </div>

            <motion.button
                className={`transition-all bg-white/85 hover:bg-white text-xl font-[510] text-[#1E1E1E]/85 rounded-xl duration-300 h-[45px] w-[260px]`}
                onClick={onClick}
            >
                More Details
            </motion.button>
        </div>
    )
}

export default Game