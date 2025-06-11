/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, Transition } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import moment from 'moment';
import { Squircle } from '@squircle-js/react';
import { useTransitionRouter } from 'next-view-transitions';

interface IMenu {
    page: "home" | "library" | "search"
}
const transition: Transition = {
    type: 'tween',
    duration: 0.1,
    stiffness: 400,
    damping: 40,
};

// Menu items.
const items = [
    {
        title: "Search",
        url: "#search",
        icon: "search.svg",
    },
    {
        title: "Home",
        url: "#home",
        icon: "home.svg",
    },
    // {
    //     title: "Library",
    //     url: "#library",
    //     icon: "stack.svg",
    // },
]

function AppleTvSideToggler({ page }: IMenu) {
    const [time, setTime] = React.useState<Date>(new Date());
    const [showAlternativeUserView, setShowAlternativeUserView] = React.useState<boolean>(false);
    const [isReady, setIsReady] = React.useState<boolean>(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const uniqueId = useId();
    const router = useTransitionRouter();

    // Effect hook to run on component mount
    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date()); // Update the time every second
        }, 1000);
        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    React.useEffect(() => {
        setIsReady(true);
    }, []);


    useEffect(() => {
        if (isMenuModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuModalOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuModalOpen]);

    if (!isReady) {
        return null;
    }

    const onRoute = (url: string) => {
        if (window?.location?.hash !== url) {
            window.location.hash = url
        }
    }

    return (
        <>
            <MotionConfig transition={transition}>
                <motion.div
                    className='flex gap-1 items-center group pt-3 z-50 relative w-[300px] h-fit cursor-pointer'
                    layoutId={`dialog-${uniqueId}`}
                    style={{
                        borderRadius: '12px',
                    }}
                    onClick={() => {
                        setIsMenuModalOpen(true);
                    }}
                >
                    {!isMenuModalOpen && <>
                        <Image src={"/apple-tv/caret-left.svg"} alt="caret-left" width={10} height={16} />

                        <div className='p-2 pr-4 rounded-full flex items-center gap-2 bg-[#1e1e1e]/50'>
                            <div className={`rounded-full size-8 bg-white/10 flex items-center justify-center`}>
                                {
                                    page === "home" ? <Image src={"/apple-tv/light/home.svg"} alt="home" width={16} height={16} />
                                        :
                                        page === "library" ? <Image src={"/apple-tv/light/stack.svg"} alt="library" width={16} height={16} />
                                            :
                                            <Image src={"/apple-tv/light/search.svg"} alt="search" width={16} height={16} />
                                }
                            </div>

                            <p className='text-md font-semibold text-white/70 capitalize'>{page}</p>
                        </div>
                    </>}
                </motion.div>
                <AnimatePresence initial={false} mode='popLayout'>
                    {isMenuModalOpen && (
                        <>
                            <motion.div
                                key={`backdrop-${uniqueId}`}
                                className='fixed inset-0 h-full w-full bg-transparent z-[50]'
                                variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
                                initial='closed'
                                animate='open'
                                exit='closed'
                                onClick={() => {
                                    setIsMenuModalOpen(false);
                                }}
                            />
                            <motion.div
                                key='dialog'
                                className='pointer-events-none fixed inset-0 left-10 z-50'
                            >
                                <motion.div
                                    className='pointer-events-auto relative flex flex-col overflow-hidden bg-black/80 backdrop-blur-3xl border w-[250px] h-[95%] px-4'
                                    layoutId={`dialog-${uniqueId}`}
                                    tabIndex={-1}
                                    style={{
                                        borderRadius: '24px',
                                    }}
                                >
                                    <div className="pt-4 pb-6 group">
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="group-hover:hidden flex items-center gap-2 justify-between">
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={"/users/dominic.png"}
                                                    alt="user"
                                                    width={36}
                                                    height={36}
                                                    className="rounded-full"
                                                />
                                                <h2 className="text-xs font-semibold text-white/70">Dominic</h2>
                                            </div>

                                            <p className="text-sm text-white/70 font-medium pl-4">
                                                {moment(time).format("LT")}
                                            </p>
                                        </motion.div>

                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="group-hover:flex hidden items-center gap-2">
                                            <Image
                                                src={"/users/dominic.png"}
                                                alt="user"
                                                width={36}
                                                height={36}
                                                className="rounded-full border-2 border-white"
                                            />

                                            <div className="cursor-pointer">
                                                <h2 className="text-xs font-semibold text-white/70">Dominic</h2>
                                                <p onClick={() => router.back()} className="text-xs text-white/70 hover:underline underline-offset-4">Go Back</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <div className='space-y-2'>
                                        {items.map((item) => {
                                            return (
                                                <div key={item.title}>
                                                    <Squircle
                                                        cornerRadius={15}
                                                        cornerSmoothing={1}
                                                        className="w-full app-item-shadow group"
                                                    >
                                                        <div onClick={() => { onRoute(item.url) }} className={`rounded-lg pl-2 font-[510] gap-2 cursor-pointer group flex items-center sidebar-menu-item h-[50px] ${window?.location?.hash === item.url ? "!bg-white/5" : "!bg-transparent"} hover:!bg-white hover:!text-[#1E1E1E]/85 text-white transition-all duration-300`}>
                                                            <div className={`rounded-full size-8 bg-white/10 flex items-center justify-center`}>
                                                                <Image src={`/apple-tv/light/${item.icon}`} alt={item.title} width={16} height={16} className='' />
                                                                <Image src={`/apple-tv/dark/${item.icon}`} alt={item.title} width={16} height={16} className='hidden absolute group-hover:block' />
                                                            </div>
                                                            <span className="text">{item.title}</span>
                                                        </div>
                                                    </Squircle>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </MotionConfig>
        </>
    );
}

export default AppleTvSideToggler