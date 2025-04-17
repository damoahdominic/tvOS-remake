"use client"

import { AppSidebar } from '@/components/AppleTv/app-sidebar'
import HomePage from '@/components/AppleTv/HomePage'
import LibraryPage from '@/components/AppleTv/LibraryPage'
import SearchPage from '@/components/AppleTv/SearchPage'
import { SidebarProvider } from '@/components/ui/sidebar'
import Image from 'next/image'
import React from 'react'

type AppleTvPageTypes = "search" | "home" | "library"

const Page = () => {
    const [open, setOpen] = React.useState(false)
    const [currentPage, setCurrentPage] = React.useState<AppleTvPageTypes>('home')

    // get the value with # in the url say #search show be return search
    React.useEffect(() => {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1)
            if (hash) {
                setCurrentPage(hash as AppleTvPageTypes)
            } else {
                setCurrentPage('search')
            }
        })

        return () => {
            window.removeEventListener('hashchange', () => {
                const hash = window.location.hash.substring(1)
                if (hash) {
                    setCurrentPage(hash as AppleTvPageTypes)
                } else {
                    setCurrentPage('search')
                }
            })
        }
    }, [])

    return (
        <>
            {currentPage === "home" && <div>
                <Image src={'/apple-tv/home/background.png'} alt="wallpaper" fill />
                <div className='bg-gradient-to-r from-black to-trasparent w-1/2 h-svh' />

            </div>}
            <SidebarProvider open={open} onOpenChange={setOpen} defaultOpen={false}>
                <AppSidebar />
                <main className='relative w-full h-svh'>
                    {
                        currentPage === "home" ? <HomePage open={open} setOpen={setOpen} />
                            :
                            currentPage === "library" ? <LibraryPage open={open} setOpen={setOpen} />
                                :
                                <SearchPage open={open} setOpen={setOpen} />
                    }
                </main>
            </SidebarProvider>
        </>
    )
}

export default Page