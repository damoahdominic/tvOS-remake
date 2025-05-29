// app/posts/useScrollRestoration.ts
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const scrollPositions = new Map<string, number>();

export default function useScrollRestoration() {
    const pathname = usePathname();
    const previousPath = useRef<string | null>(null);

    useEffect(() => {
        const handleBeforeUnload = () => {
            scrollPositions.set(pathname, window.scrollY);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            scrollPositions.set(pathname, window.scrollY);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [pathname]);

    useEffect(() => {
        if (previousPath.current && previousPath.current !== pathname) {
            scrollPositions.set(previousPath.current, window.scrollY);
        }

        const savedY = scrollPositions.get(pathname);
        if (savedY !== undefined) {
            requestAnimationFrame(() => {
                window.scrollTo(0, savedY);
            });
        }

        previousPath.current = pathname;
    }, [pathname]);
}
