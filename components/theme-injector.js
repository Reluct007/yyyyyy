'use client';

import { useSettings } from '@/lib/settings-context';
import { useEffect } from 'react';

export default function ThemeInjector() {
    const { theme } = useSettings();

    useEffect(() => {
        if (theme.primaryColor) {
            document.documentElement.style.setProperty('--color-primary', theme.primaryColor);
        }
        if (theme.accentColor) {
            document.documentElement.style.setProperty('--color-accent', theme.accentColor);
        }
    }, [theme]);

    return null;
}
