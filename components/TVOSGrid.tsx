import React, { useCallback, useEffect, useState } from 'react';
import useGridNavigation from '@/hooks/useGridNavigation';
import AppItem from './app-item';
import { motion } from "framer-motion"
import { Squircle } from '@squircle-js/react';

interface AppIcon {
    id?: number;
    appIconUrl: string;
    appName: string;
    href: string;
    shouldShowAppName?: boolean;
}

interface TVOSGridProps {
    apps: AppIcon[];
    rowCount: number;
    colCount: number;
    scrolled?: boolean
    isFocused: (row: number, col: number) => boolean;
    getFocusRef: (row: number, col: number) => React.RefObject<HTMLButtonElement> | null;
}

const container = {
    hidden: { y: 100, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5
        }
    }
};


const TVOSGrid: React.FC<TVOSGridProps> = ({
    apps,
    rowCount,
    colCount,
    scrolled,
}) => {
    // Use 0-based indexing for the hook
    const { isFocused, getFocusRef } = useGridNavigation(rowCount, colCount, 0, 0);

    const [isPreparing, setIsPreparing] = useState(true)
    const [gridItems, setGridItems] = useState<{
        firstRow: React.JSX.Element[];
        rest: React.JSX.Element[];
    } | undefined>(undefined)

    const renderAppsCallback = useCallback(() => {
        const firstRow = [];
        const rest = [];
        let appIndex = 0;

        for (let row = 0; row < rowCount; row++) {
            const rowItems = [];

            for (let col = 0; col < colCount; col++) {
                if (appIndex < apps.length) {
                    const app = apps[appIndex++];
                    const focused = isFocused(row, col);
                    const ref = getFocusRef(row, col);

                    rowItems.push(
                        <div key={app.id || `app-${row}-${col}`}>
                            <AppItem
                                shouldShowAppName={app.shouldShowAppName ?? true}
                                appIconUrl={app.appIconUrl}
                                appName={app.appName}
                                href={app.href}
                                id={app.id}
                                ref={ref}
                                focused={focused}
                            />
                        </div>
                    );
                }
            }

            if (row === 0) {
                firstRow.push(...rowItems);
            }
            else {
                rest.push(...rowItems)
            }

        }

        return { firstRow, rest };
    }, [apps, colCount, rowCount, isFocused, getFocusRef])

    useEffect(() => {
        setIsPreparing(true)
        const items = renderAppsCallback()
        setGridItems(items)
        setIsPreparing(false)
    }, [renderAppsCallback])

    return (
        isPreparing
            ?
            <>
            </>
            :
            <>
                {/* Main Content */}
                <div className="relative min-h-screen flex flex-col justify-end px-4">
                    {/* Dock */}
                    <Squircle
                        asChild
                        cornerRadius={30}
                        cornerSmoothing={1}
                        className="bg-black/30"
                    >
                        <motion.div
                            className="w-full px-6 py-4 relative bottom-8 backdrop-blur-xl"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="grid grid-cols-6 gap-7">
                                {gridItems?.firstRow?.slice(0, 6).map((app, i) => (
                                    <div key={i}>
                                        {app}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </Squircle>
                </div>

                {/* Additional Content (for scrolling) */}
                <motion.div animate={{ bottom: scrolled ? "3rem" : "3.9rem" }} className="relative px-8 py-12 cursor-pointer">
                    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-6 gap-7 relative">
                        {gridItems?.rest?.map((app, i) => (
                            <div key={i}>
                                {app}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </>
    );
};

export default TVOSGrid;