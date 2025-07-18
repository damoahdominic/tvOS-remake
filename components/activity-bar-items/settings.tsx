import { settings } from "@/data/settings";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Settings({ settingsActionMap }: { settingsActionMap: Record<string, () => void> }) {
    const [toggleDND, setToggleDND] = useState(true);

    return (
        <div className="activity-bar-item-bg">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-4 grid-rows-4 gap-3 p-5"
            >
                {settings.map((settings, i) => {
                    return (
                        <motion.div
                            layoutId={settings.layoutId}
                            whileHover={{ scale: 1.05 }}
                            whileFocus={{ scale: 1.05 }}
                            key={i + settings.title}
                            className={`rounded-[15px] group px-3 flex hover:cursor-pointer items-center gap-2 p-2 bg-white/60 dark:bg-[#1E1E1E]/50 hover:!bg-white 
                                ${settings.title.includes("Do Not") && toggleDND && "!bg-white"} 
                                ${i === 0
                                    ? "col-span-2 row-span-2 aspect-square"
                                    : i === 1 || i === 2 || i === 3 || i === 4
                                        ? "col-span-2"
                                        : "col-span-1"
                                } ${settings.alignment === "horizontal"
                                    ? "flex-row justify-start"
                                    : "flex-col justify-center"
                                }`}
                            onClick={settings.title.includes("Do Not") ? () => {
                                setToggleDND(!toggleDND)
                            } : settingsActionMap[settings?.actionKey || ""]}
                        >
                            {!settings.title.includes("Do Not") ? <>
                                <Image
                                    src={settings.icon}
                                    width={135}
                                    height={135}
                                    alt={settings.title}
                                    className={`${i === 0 ? "w-[65px]" : "w-[30px]"} dark:hidden block group-hover:block`}
                                />

                                {settings.title === 'Do Not Disturb' ? (
                                    <>
                                        <Image
                                            src={settings.iconDark}
                                            width={135}
                                            height={135}
                                            alt={settings.title}
                                            className={`${i === 0 ? "w-[65px]" : "w-[30px]"} dark:block hidden group-hover:hidden`}
                                        />
                                        <Image
                                            src="/dnd_dark_hover.svg"
                                            width={135}
                                            height={135}
                                            alt={settings.title}
                                            className={`${i === 0 ? "w-[65px]" : "w-[30px]"} dark:block hidden group-hover:block`}
                                        />
                                    </>
                                ) : (
                                    <Image
                                        src={settings.iconDark}
                                        width={135}
                                        height={135}
                                        alt={settings.title}
                                        className={`${i === 0 ? "w-[65px]" : "w-[30px]"} dark:block hidden group-hover:hidden`}
                                    />
                                )}
                            </>
                                :
                                !toggleDND ?
                                    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                                        <Image
                                            src={settings.icon}
                                            width={135}
                                            height={135}
                                            alt={settings.title}
                                            className={`${i === 0 ? "w-[65px]" : "w-[35px]"} dark:hidden block group-hover:block`}
                                        />

                                        <Image
                                            src={settings.iconDark}
                                            width={135}
                                            height={135}
                                            alt={settings.title}
                                            className={`${i === 0 ? "w-[65px]" : "w-[35px]"} dark:block hidden group-hover:hidden`}
                                        />
                                    </motion.div>
                                    :
                                    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                                        <Image
                                            src={"/icons/dnd_active.svg"}
                                            width={135}
                                            height={135}
                                            alt={settings.title}
                                            className={`${i === 0 ? "w-[65px]" : "w-[35px]"} rounded-full`}
                                        />
                                    </motion.div>
                            }

                            {!settings.iconOnly && (
                                <p className={`text-wrap leading-tight w-[80px] text-[#1E1E1E]/85 dark:text-white/80 group-hover:text-[#1E1E1E]/85 ${settings.title.includes("Do Not") && toggleDND && "!text-[#1E1E1E]/85"}`}>
                                    {settings.title}
                                </p>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}