'use client'
import { engineeringTeam, designTeam } from '@/data/team'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Link } from 'next-view-transitions';
import EscapeNotice from '@/components/EscapeNotice';

const tabs = [
    { id: "home", label: "Home" },
    { id: "team", label: "Team" },
    { id: "credits", label: "Credits" },
];

const resources = [
    {
        image: "/github.png",
        title: "Open Source Code",
        subtitle: "Github",
        link: "https://github.com/damoahdominic/tvOS-remake"
    },
    {
        image: "/figma.png",
        title: "Design File (Community)",
        subtitle: "Figma File",
        link: "https://www.figma.com/design/KmvT8YhqhqDXjdza2Q9ae5/tvOS-18-UI-Kit"
    },
    {
        image: "/dstudios-circular.png",
        title: "DStudios",
        subtitle: "Diamond Sponsor",
        link: "https://ddamoah.com"
    }
]

const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const staggerChild = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function Page() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className={`overflow-auto h-full`}>
            <EscapeNotice className='absolute top-5 left-5 z-50'/>
            <div className='absolute top-5 z-40 w-full flex justify-center'>
                <motion.div className="flex space-x-1 bg-[#090909CC] rounded-full">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${activeTab === tab.id ? "" : "hover:text-white/60"
                                } relative rounded-full px-7 py-3 text-lg font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
                            style={{
                                WebkitTapHighlightColor: "transparent",
                            }}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    // layoutId="bubble"
                                    className="absolute inset-0 z-50 py-7 px-10 bg-white -translate-y-0.5 mix-blend-difference rounded-full"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    }}
                                />
                            )}
                            {tab.label}
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            <div className='pt-20 h-full text-white'>
                {activeTab === "home" &&
                    <div className='h-full w-full relative text-white'>
                        <Image src="/team/home-bg.png" alt="team" fill className='object-contain' />
                        <motion.div className="fixed bottom-0 left-0 right-0 z-20 py-6 h-1/2 flex items-end bg-gradient-to-t from-black/80 to-transparent px-10">
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='max-w-md space-y-2 relative left-10 bottom-16 text-2xl'>
                                <h2>Meet the Team <span className='border border-white rounded-md text-base p-0.5'>Extraordinary Individuals</span></h2>
                                <p>
                                    From flop to funded — Dom and Larry turn startup chaos into gold.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                }

                {activeTab === "team" &&
                    <motion.div className='flex flex-col space-y-12 h-full px-10 mt-10'>
                        <div className='space-y-6'>
                            <h1 className='text-xl md:text-3xl font-bold'>Engineering Team</h1>
                            {/* Stagger items bellow */}
                            <motion.div variants={staggerContainer} initial="hidden" animate="show" className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                                {/* Stagger items */}
                                {
                                    engineeringTeam.map((member, index) => (
                                        <motion.div key={index} variants={staggerChild}>
                                            <Link href={`/team/${member.id}`} className='w-full'>
                                                <div className='grid gap-2 relative'>
                                                    <div style={{ background: 'linear-gradient(135deg, #101010 0%, #454545 100%)' }} className={`rounded-3xl hover:scale-105 transition-all duration-300 flex items-end justify-center pt-8`}>
                                                        <div className='relative w-full aspect-square overflow-hidden'>
                                                            <Image 
                                                                src={member.image} 
                                                                alt={member.name} 
                                                                fill 
                                                                className='object-cover'
                                                            />
                                                        </div>
                                                    </div>
                                                    <h2 className="text-xl font-bold mt-4">{member.name}</h2>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))
                                }
                            </motion.div>
                        </div>
                        <div className='space-y-6 pb-12'>
                            <h1 className='text-xl md:text-3xl font-bold'>Design Team</h1>
                            <motion.div variants={staggerContainer} initial="hidden" animate="show" className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                                {
                                    designTeam.map((member, index) => (
                                        <motion.div key={index} variants={staggerChild}>
                                            <Link key={index} href={`/team/${member.id}`} className='w-full'>
                                                <div className='grid gap-2 relative'>
                                                    <div style={{ background: 'linear-gradient(135deg, #101010 0%, #454545 100%)' }} className={`rounded-3xl hover:scale-105 transition-all duration-300 flex items-end justify-center pt-8`}>
                                                        <div className='relative w-full aspect-square overflow-hidden'>
                                                            <Image
                                                                src={member.image}
                                                                alt={member.name}
                                                                fill
                                                                className='object-cover'
                                                            />
                                                        </div>
                                                    </div>
                                                    <h2 className="text-xl font-bold mt-4">{member.name}</h2>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))
                                }
                            </motion.div>
                        </div>
                    </motion.div>
                }

                {activeTab === "credits" && <div className='flex flex-col space-y-8 h-full text-white'>
                    <div className='px-10 w-full flex flex-col items-center'>
                        <div className='flex flex-wrap gap-8 mt-10 mx-auto'>
                            {
                                resources.map((resource, index) => (
                                    <Link target='_blank' href={resource.link} key={index}>
                                        <div className='flex flex-col gap-6 w-full md:w-[450px] font-medium text-xl bg-black/30 rounded-3xl px-[3.75svh] py-[7.5svh]'>
                                            <Image src={resource.image} width={145} height={145} alt='platform' />
                                            <div className=''>
                                                <h1>{resource.title}</h1>
                                                <h1>{resource.subtitle}</h1>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className='h-full bg-black text-white font-medium pt-10 px-10'>
                        {/* Donate Button Section */}
                        <div className='flex w-full flex-col items-center justify-center space-y-6 mb-24'>
                            <h2 className='text-2xl font-bold'>Support the Project</h2>
                            <Link href="https://buymeacoffee.com/damoahdominic" target="_blank">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='bg-white hover:bg-gray-100 text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 flex items-center space-x-3'
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    <span>Donate & Support</span>
                                </motion.button>
                            </Link>
                            <p className='text-sm text-white/60 text-center max-w-md'>
                                Help us continue building amazing tvOS experiences. Your support means the world to us!
                            </p>
                        </div>
                        
                        <div className='flex w-full flex-col items-center justify-center space-y-4 text-xl'>
                            <div className='flex items-center justify-center space-x-2'>
                                <h1>Honorable Mentions</h1>
                                <p className='border border-white p-1 text-xs font-bold rounded-md ml-2'>In the Journey</p>
                            </div>
                            <div className=''>
                                <p>• Collins Abrusu</p>
                                <p>• Gideon Asare </p>
                            </div>
                        </div>
                        
                        {/* Responsive Footer */}
                        <div className='mt-16 mb-8 px-4 sm:px-8 lg:px-16'>
                            <p className='max-w-4xl mx-auto text-center text-xs sm:text-sm text-white/60 leading-relaxed'>
                                This Project is not affiliated with, endorsed by, or sponsored by Apple Inc. All Apple trademarks, including product names and logos, are the property of Apple Inc. and are used here strictly for informational and creative purposes. Our goal is to provide a unique and enjoyable experience that is entirely our own. Everything you see has been thoughtfully crafted to inspire and entertain — with full respect to the original rights holders.
                            </p>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}