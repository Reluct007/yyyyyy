'use client';

import { SettingsProvider } from "@/lib/settings-context";
import ThemeInjector from "@/components/theme-injector";
import RootChrome from "@/components/layout/root-chrome";

export default function ClientProviders({ children, locale }) {
    return (
        <SettingsProvider>
            <ThemeInjector />
            <RootChrome locale={locale}>{children}</RootChrome>
        </SettingsProvider>
    );
}
