import React from 'react'

export default function TeamLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className='flex flex-col items-center justify-center h-svh overflow-y-auto' style={{backgroundImage: "url('/team-bg.png')"}}>
            <div
                className={`fixed inset-0 transition-all duration-500 backdrop-blur-3xl`}
            />
            <div className='fixed inset-0 bg-black opacity-30' />

            <div className='h-svh w-full z-10'>
                {children}
            </div>
        </div>
    )
}