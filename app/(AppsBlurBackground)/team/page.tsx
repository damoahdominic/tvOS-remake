'use client'
import { engineeringTeam, designTeam } from '@/data/team'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Link } from 'next-view-transitions';

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
        link: "https://github.com/Apple-Remake"
    },
    {
        image: "/figma.png",
        title: "Design File (Community)",
        subtitle: "Figma File",
        link: "https://figma.com"
    }
]

export default function Page() {
    const [activeTab, setActiveTab] = useState(tabs[1].id);

    return (
        <div className='overflow-auto h-full'>
            <div className='absolute top-5 z-40 w-full flex justify-center'>
                <motion.div className="flex space-x-1 bg-[#090909CC] rounded-full">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${activeTab === tab.id ? "" : "hover:text-white/60"
                                } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
                            style={{
                                WebkitTapHighlightColor: "transparent",
                            }}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    // layoutId="bubble"
                                    className="absolute inset-0 z-10 bg-white mix-blend-difference rounded-full"
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

            <div className='pt-20 h-full'>
                {activeTab === "team" &&
                    <div className='flex flex-col space-y-12 h-full px-10 my-10'>
                        <div className='space-y-6'>
                            <h1 className='text-xl md:text-3xl font-bold'>Engineering Team</h1>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                                {
                                    engineeringTeam.map((member, index) => (
                                        <Link key={index} href={`/team/${member.id}`} className='w-full'>
                                            <div className='grid gap-2 relative'>
                                                <div style={{ backgroundColor: member.color }} className={`rounded-3xl hover:scale-105 transition-all duration-300 flex items-end justify-center pt-8`}>
                                                    <div className='relative min-w-[250px] xl:w-[400px] aspect-square'>
                                                        <Image src={member.image} alt={member.name} fill />
                                                    </div>
                                                </div>
                                                <h2 className="text-xl font-bold mt-4">{member.name}</h2>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='space-y-6'>
                            <h1 className='text-xl md:text-3xl font-bold'>Design Team</h1>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                                {
                                    designTeam.map((member, index) => (
                                        <Link key={index} href={`/team/${member.id}`} className='w-full'>
                                            <div className='grid gap-2 relative'>
                                                <div style={{ backgroundColor: member.color }} className={`rounded-3xl hover:scale-105 transition-all duration-300 flex items-end justify-center pt-8`}>
                                                    <div className='relative min-w-[250px] xl:w-[400px] aspect-square'>
                                                        <Image src={member.image} alt={member.name} fill />
                                                    </div>
                                                </div>
                                                <h2 className="text-xl font-bold mt-4">{member.name}</h2>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                }

                {activeTab === "credits" && <div className='flex flex-col space-y-8 h-full'>
                    <div className='px-10'>
                        <h1 className='text-3xl font-bold'>Resources</h1>
                        <div className='grid grid-cols-3 gap-4 mt-8'>
                            {
                                resources.map((resource, index) => (
                                    <Link target='_blank' href={resource.link} key={index}>
                                        <div className='flex gap-4 items-center font-bold text-xl bg-black/30 rounded-md p-2'>
                                            <Image src={resource.image} width={98} height={98} alt='github' />
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
                    <div className='h-full bg-black pt-10 px-10'>
                        <div>
                            <h1>Honorable Mentions <span className='border border-white p-1 text-xs rounded-md'>In the Journey</span></h1>
                            <h1 className='mt-4 text-2xl font-bold'>Collins Abrusu • Gideon Asare </h1>
                        </div>
                        <div className='fixed bottom-10 w-full'>
                            <p className='w-2/3 mx-auto text-center'>
                                This Project is not affiliated with, endorsed by, or sponsored by Apple Inc. All Apple trademarks, including product names and logos, are the property of Apple Inc. and are used here strictly for informational and creative purposes. Our goal is to provide a unique and enjoyable experience that is entirely our own. Everything you see has been thoughtfully crafted to inspire and entertain — with full respect to the original rights holders.
                            </p>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}