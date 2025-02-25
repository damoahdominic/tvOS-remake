import React from 'react'

export default function AppLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div
                className={`fixed inset-0 transition-all duration-500 blur-2xl`}
                style={{
                    backgroundImage: `url(${"/os-bg.jpg"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className='fixed inset-0 bg-black opacity-30' />

            <div className='h-screen w-full z-10 my-10'>
                {children}
            </div>
        </div>
    )
}