"use client"
import * as React from "react"
import { motion } from "framer-motion"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import moment from "moment"
import { Squircle } from "@squircle-js/react"

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
    {
        title: "Library",
        url: "#library",
        icon: "stack.svg",
    },
]

export function AppSidebar() {
    const [time, setTime] = React.useState<Date>(new Date());
    const [showAlternativeUserView, setShowAlternativeUserView] = React.useState<boolean>(false);
    const [isReady, setIsReady] = React.useState<boolean>(false);

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

    if (!isReady) {
        return null;
    }

    return (
        <Sidebar variant="floating">
            <SidebarHeader className="pt-4 pb-6">
                {!showAlternativeUserView && <motion.div onMouseOver={() => { setShowAlternativeUserView(true) }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 justify-between">
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
                </motion.div>}
                {showAlternativeUserView && <motion.div onMouseLeave={() => { setShowAlternativeUserView(false) }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="items-center gap-2 flex">
                    <Image
                        src={"/users/dominic.png"}
                        alt="user"
                        width={36}
                        height={36}
                        className="rounded-full border-2 border-white"
                    />

                    <div className="cursor-pointer">
                        <h2 className="text-xs font-semibold text-white/70">Dominic</h2>
                        <p className="text-xs text-white/70 hover:underline underline-offset-4">Switch User</p>
                    </div>
                </motion.div>}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <Squircle
                                            asChild
                                            cornerRadius={15}
                                            cornerSmoothing={1}
                                            className="bg-black text-white app-item-shadow group"
                                        >
                                            <SidebarMenuButton asChild>
                                                <a href={item.url} className={`rounded-lg pl-2 font-[510] sidebar-menu-item h-[50px] ${window?.location?.hash === item.url ? "!bg-white/5" : "!bg-transparent"} hover:!bg-white hover:!text-[#1E1E1E]/85 transition-all duration-300`}>
                                                    <div className={`rounded-full size-8 bg-white/10 circle-image flex items-center justify-center`}>
                                                        <Image src={`/apple-tv/light/${item.icon}`} alt={item.title} width={16} height={16} className='' />
                                                        <Image src={`/apple-tv/dark/${item.icon}`} alt={item.title} width={16} height={16} className='hidden absolute circle-image-active' />
                                                    </div>
                                                    <span className="">{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </Squircle>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
