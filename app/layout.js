import "./globals.css";
import { basic } from "@/data/basic";
import { withTrailingSlash } from "@/lib/seo-url";

const SITE_URL = withTrailingSlash(basic.seo.url);

// Root layout with html/body tags - required for App Router
export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: basic.seo.title,
        template: `%s | ${basic.info.brand}`,
    },
    description: basic.seo.description,
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
            { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
        ],
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preload" href="/logo1.webp" as="image" />
                <link rel="preload" href="/home/Cover-image.webp" as="image" />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
