import React, { useState } from 'react'
import AppleTvSideToggler from './AppleTvSideToggler'
import Image from 'next/image'
import { searchItems } from '@/data/apple-tv'
import { Separator } from '../ui/separator'
import TVKeyboard from '../tv-keyboard'
import { X } from 'lucide-react'


const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    // const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleInputChange = (value: string) => {
        setSearchQuery(value);

        // Example: Simple search functionality
        if (value.trim()) {
            // In a real app, you would fetch from an API here
            // const mockResults = [
            //     'Movies containing: ' + value,
            //     'Shows containing: ' + value,
            //     'Actors named: ' + value,
            // ];
            // setSearchResults(mockResults);
        } else {
            // setSearchResults([]);
        }
    };

    const handleSearch = (query: string) => {
        // console.log('Searching for:', query);
        // Implement your actual search logic here
        // This would typically involve an API call
    };
    return (
        <div className='px-10 space-y-8'>
            <AppleTvSideToggler page='search' />

            <div className='flex-1 flex flex-col justify-center gap-10'>
                {/* Header */}
                <div className='space-y-5'>
                    <div className='flex items-end justify-between gap-4'>
                        <div className='flex items-center gap-4 flex-1'>
                            <Image src={"/apple-tv/light/search.svg"} width={32} height={32} alt={"search"} />
                            <input value={searchQuery} className='text-4xl flex-1 text-white/50 font-medium bg-transparent border-none outline-none placeholder:text-white/50 focus:outline-none' placeholder='Movies, Shows, Cast and More' />
                            {searchQuery.length > 0 && <X onClick={() => setSearchQuery('')} className='cursor-pointer' />}
                        </div>

                        <p className='text-white/80 text-lg flex items-center gap-2'>Press <Image src={"/apple-tv/search/playpause.svg"} width={16} height={16} alt={"play-pause"} /> to change keyboards</p>
                    </div>

                    <TVKeyboard
                        value={searchQuery}
                        onChange={handleInputChange}
                        onSubmit={handleSearch}
                        showSearchBar={false}
                        className="mb-8" />

                    <Separator className='w-full h-[0.5px] bg-white/30' />
                </div>

                {/* Search Items */}
                <div className='space-y-5'>
                    <h1 className='text-2xl font-medium text-white'>Browse</h1>
                    <div className='grid grid-cols-3 gap-8'>
                        {
                            searchItems.map((item, index) => {
                                return (
                                    <Image key={index} src={item.image} width={1160} height={660} alt={item.name} className='aspect-video object-cover rounded-3xl hover:scale-[1.02] focus:scale-105 transition-all duration-300' />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage