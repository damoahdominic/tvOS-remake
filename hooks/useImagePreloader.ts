import { useState, useEffect } from 'react';
import { AppItemType } from '@/data';

type PreloaderStatus = {
    loaded: number;
    total: number;
    isComplete: boolean;
    progress: number; // 0-100
};

/**
 * Custom hook to preload images for apps
 * @param apps Array of apps to preload images for
 * @param limit Optional limit on number of apps to preload (default: 6)
 * @returns Preloader status object
 */
export function useImagePreloader(apps: AppItemType[], limit: number = 6): PreloaderStatus {
    const [status, setStatus] = useState<PreloaderStatus>({
        loaded: 0,
        total: 0,
        isComplete: false,
        progress: 0
    });

    useEffect(() => {
        if (!apps || apps.length === 0) {
            setStatus({ loaded: 0, total: 0, isComplete: true, progress: 100 });
            return;
        }

        const appsToPreload = apps.slice(0, limit);
        const imagesToLoad: string[] = [];

        // Collect all images to preload
        appsToPreload.forEach(app => {
            // Add splash background if it exists
            if (app.splash?.background) {
                imagesToLoad.push(app.splash.background);
            }

            // Add splash foreground if it exists
            if (app.splash?.foreground) {
                imagesToLoad.push(app.splash.foreground);
            }

            // Add first background image if it exists
            if (app.backgrounds && app.backgrounds.length > 0) {
                imagesToLoad.push(app.backgrounds[0].image);
            }
        });

        // No images to preload
        if (imagesToLoad.length === 0) {
            setStatus({ loaded: 0, total: 0, isComplete: true, progress: 100 });
            return;
        }

        let loadedCount = 0;
        const totalImages = imagesToLoad.length;

        // Update initial status
        setStatus({
            loaded: 0,
            total: totalImages,
            isComplete: false,
            progress: 0
        });

        // Preload each image
        imagesToLoad.forEach(imageUrl => {
            const img = new Image();

            img.onload = () => {
                loadedCount++;
                const progress = Math.round((loadedCount / totalImages) * 100);

                setStatus({
                    loaded: loadedCount,
                    total: totalImages,
                    isComplete: loadedCount === totalImages,
                    progress
                });
            };

            img.onerror = () => {
                // Count errors as loaded to avoid getting stuck
                loadedCount++;
                const progress = Math.round((loadedCount / totalImages) * 100);

                setStatus({
                    loaded: loadedCount,
                    total: totalImages,
                    isComplete: loadedCount === totalImages,
                    progress
                });

                console.error(`Failed to preload image: ${imageUrl}`);
            };

            // Start loading the image
            img.src = imageUrl;
        });

        // Cleanup function
        return () => {
            // Nothing to clean up here, but required for useEffect
        };
    }, [apps, limit]);

    return status;
}