import React, { forwardRef } from 'react';
import { motion } from "framer-motion";
import { ChevronRight } from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';

interface SettingsItemProps {
    text: string;
    action?: () => void;
    href?: string;
    icon?: React.ReactNode;
    description?: string;
    value?: string;
    isSelected?: boolean;
    isFocused?: boolean;
    hasSubmenu?: boolean;
    index?: number; // For staggered animation
}

const SettingsItem = forwardRef<HTMLButtonElement, SettingsItemProps>(({
    text,
    action,
    href,
    // icon,
    // description,
    value,
    isSelected,
    isFocused = false,
    hasSubmenu = true,
}, ref) => {
    const router = useTransitionRouter();

    // Click handler
    const handleClick = () => {
        if (action && !href) {
            action();
        } else if (href) {
            router.push(href);
        }
    };

    return (
        <motion.div>
            <motion.button
                ref={ref}
                whileHover={!isFocused ? { scale: 1.02 } : {}}
                animate={isFocused ? { scale: 1.05 } : { scale: 1 }}
                onClick={handleClick}
                tabIndex={0}
                className={`
                    group focusable-settings-item rounded-xl px-3 md:px-4 py-2 md:py-3 
                    flex items-center justify-between w-[95%] md:w-[80%] max-w-4xl mx-auto
                    backdrop-blur-[50px] transition-all duration-300
                    ${isFocused
                        ? 'bg-white apple-active-item-shadow transform-gpu z-10'
                        : 'bg-white/30 hover:bg-white/40'
                    }
                `}
            >
                <div className="flex items-center space-x-4">
                    {/* Icon (if provided) */}
                    {/* {icon && (
                        <div className={`p-1 ${isFocused ? 'text-black' : 'text-white'}`}>
                            {icon}
                        </div>
                    )} */}

                    {/* Text and description */}
                    <div className="text-left">
                        <h2 className={`text-lg md:text-2xl font-medium ${isFocused ? 'text-black' : 'text-white group-hover:text-white/90'}`}>
                            {text}
                        </h2>

                        {/* {description && (
                            <p className={`text-sm mt-1 ${isFocused ? 'text-black/70' : 'text-white/60'}`}>
                                {description}
                            </p>
                        )} */}
                    </div>
                </div>

                <div className="flex items-center">
                    {/* Value text (if provided) */}
                    {value && (
                        <span className={`mr-3 ${isFocused ? 'text-black/70' : 'text-white/60'}`}>
                            {value}
                        </span>
                    )}

                    {/* Selected checkmark (if item is selected) */}
                    {isSelected && (
                        <div className={`mr-3 ${isFocused ? 'text-black' : 'text-white'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}

                    {/* Chevron (if has submenu) */}
                    {hasSubmenu && (
                        <ChevronRight
                            className={`size-8 transition-colors ${isFocused
                                ? 'text-gray-600'
                                : 'text-white group-hover:text-white/80'
                                }`}
                        />
                    )}
                </div>
            </motion.button>

            {/* Subtle divider */}
            <div className="h-px mx-2 my-1"></div>
        </motion.div>
    );
});

SettingsItem.displayName = 'SettingsItem';

export default SettingsItem;