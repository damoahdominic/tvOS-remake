import { motion } from 'framer-motion';
import React from 'react';

interface ActivityItemsWrapperProps {
    children: React.ReactNode;
    layoutId?: string;
    animatePresence?: boolean;
}

export const ActivityItemsWrapper: React.FC<ActivityItemsWrapperProps> = ({ children, layoutId, animatePresence }) => {
    if (animatePresence) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    mass: 0.8
                }}
                className="rounded-[20px] bg-white/50 dark:bg-[#1E1E1E]/50 border border-white/40 transition-[width] duration-500 text-black/40 dark:text-white/50 backdrop-blur-[50px]"
            >
                {children}
            </motion.div>
        );
    }
    return (
        <motion.div
            className="rounded-[20px] bg-white/50 dark:bg-[#1E1E1E]/50 border border-white/40 transition-[width] duration-500 text-black/40 dark:text-white/50 backdrop-blur-[50px]"
            layoutId={layoutId}
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            transition={{ 
                // type: "spring",
                // stiffness: 300,
                // damping: 25,
                // mass: 0.8,
                duration:0.4,
            }}
            style={{ pointerEvents: "auto" }}
        >
            {children}
        </motion.div>
    );
};

