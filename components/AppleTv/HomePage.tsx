import React, { useEffect } from 'react'
import AppleTvSideToggler from './AppleTvSideToggler'
import { BackgroundImage } from './BackgroundImage'
import { ContentArea } from './ContentArea'
import { JumpBackInSection } from './JumpBackInSection'
import { jumpBackItems } from '@/data/jumpBackItems'
import { AppleTVProvider } from '@/providers/appletv-provider'

const HomePage = () => {
    // Listen for mouse movement to pause auto-rotation when user is active
    useEffect(() => {
        let mouseTimeout: NodeJS.Timeout;
        const navigation = document.getElementById('apple-tv-navigation');

        const handleMouseMove = () => {
            // Add active class to show UI elements that might be hidden during inactivity
            if (navigation) {
                navigation.classList.add('active');
            }

            // Remove active class after 3 seconds of inactivity
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                if (navigation) {
                    navigation.classList.remove('active');
                }
            }, 3000);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(mouseTimeout);
        };
    }, []);

    return (
        <AppleTVProvider items={jumpBackItems}>
            <div className="relative min-h-screen w-full bg-black overflow-hidden">
                {/* Dynamic Background */}
                <BackgroundImage />
                <div className='px-10 space-y-8'>
                    <AppleTvSideToggler page='home' />

                    {/* Main Content */}
                    <ContentArea />

                    {/* Jump Back In Navigation */}
                    <JumpBackInSection />
                </div>
            </div >
        </AppleTVProvider>
    )
}

export default HomePage