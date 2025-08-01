// components/NavigationItem.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { JumpBackItem } from '@/types';

interface NavigationItemProps {
    item: JumpBackItem;
    isSelected: boolean;
    onClick: () => void;
    index: number;
    setSelectedIndex: (index: number) => void
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
    item,
    isSelected,
    onClick,
    index,
    setSelectedIndex
}) => {
    return (
        <motion.div
            className={`relative rounded-t-3xl overflow-hidden cursor-pointer transition-all duration-300 ${isSelected ? 'scale-[1.05] shadow-lg' : 'scale-100 opacity-70'
                }`}
            onClick={onClick}
            onHoverStart={() => setSelectedIndex(index)}
            layout
        >
            {/* Main App Icon */}
            <div>
                <div
                    className="w-[250px] h-[140px] flex items-center justify-center rounded-3xl mb-3"
                    style={{ backgroundColor: item.iconColor || '#333' }}
                >
                    <div className="relative w-1/2 h-2/3 aspect-square">
                        <Image
                            src={item.logo}
                            alt={item.title}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>

                <h3 className='text-sm text-white'>{item.title}</h3>
                <p className='text-xs text-white/50'>{item.subTitle}</p>
            </div>
        </motion.div>
    );
};