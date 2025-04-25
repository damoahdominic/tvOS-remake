import Image from 'next/image'
import React from 'react'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    page: "home" | "library" | "search"
}

const AppleTvSideToggler = ({ open, setOpen, page }: Props) => {
    return (
        <button onClick={() => setOpen(!open)} className='flex gap-2 items-center group pt-3 z-50 relative'>
            <Image src={"/apple-tv/caret-left.svg"} alt="caret-left" width={8} height={16} className={open ? 'rotate-180' : ''} />

            <div className='p-2 pr-4 rounded-full flex items-center gap-2 bg-[#1e1e1e]/50'>
                <div className={`rounded-full size-8 bg-white/10 flex items-center justify-center`}>
                    {
                        page === "home" ? <Image src={"/apple-tv/home.svg"} alt="home" width={16} height={16} />
                            :
                            page === "library" ? <Image src={"/apple-tv/stack.svg"} alt="library" width={16} height={16} />
                                :
                                <Image src={"/apple-tv/search.svg"} alt="search" width={16} height={16} />
                    }
                </div>

                <p className='text-md font-semibold text-white/70 capitalize'>{page}</p>
            </div>
        </button>
    )
}

export default AppleTvSideToggler