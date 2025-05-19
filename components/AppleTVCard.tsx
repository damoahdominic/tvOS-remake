/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import { useEffect } from 'react';

const AppleTVCard = ({ title, backgroundImage, shouldShowName, children }: { title: string; backgroundImage: string; shouldShowName: boolean; children: any; }) => {
    useEffect(() => {
        // Import the library only on the client side
        require('@marcreichel/apple-tv-card');
}, []);

    return (
        <div className="apple-tv-card-container">
            <div className="apple-tv-card h-auto">
                <div className="content h-fit" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    
                </div>
                <div className="parallax-content">
                    {children}
                </div>
            </div>
            {shouldShowName && <div className="apple-tv-card-title">
                {title}
            </div>}
        </div>
    );
};

export default AppleTVCard;