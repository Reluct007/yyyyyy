'use client';

import RenovexHero from '@/components/renovex/hero';
import RenovexServices from '@/components/renovex/services';
import RenovexStats from '@/components/renovex/stats';
import RenovexHeader from '@/components/renovex/header';
import CTA from "@/components/features/cta";

export default function RenovexDemo() {
    return (
        <>
            <RenovexHeader />

            {/* Hero - Split Variant (Classic) */}
            <RenovexHero
                content={{
                    badge: "Classic Business",
                    heading: "Superior Construction Solutions",
                    description: "We provide high-quality construction services with a focus on safety, quality, and innovation.",
                    backgroundImage: "/home/banner-showcase.jpg",
                    ctaPrimary: "Get Free Estimate",
                    ctaSecondary: "Watch Video",
                    variant: "split"
                }}
                containerWidth="container"
            />

            {/* Services - Grid Variant (Classic) */}
            <RenovexServices
                content={{
                    sectionTitle: "Our Construction Solutions",
                    variant: "grid",
                    services: [
                        { title: "Project Planning", description: "Comprehensive planning ensuring timely and budget-friendly project execution.", icon: "ruler" },
                        { title: "Interior Design", description: "Creative interior solutions that blend functionality with aesthetic appeal.", icon: "building" },
                        { title: "Urban Development", description: "Transforming urban landscapes with sustainable and modern infrastructure.", icon: "building" },
                        { title: "Civil Engineering", description: "Expert engineering services for robust and durable structural foundations.", icon: "hardhat" }
                    ]
                }}
                containerWidth="container"
            />

            {/* Stats - Bar Variant (Classic) */}
            <RenovexStats
                content={{
                    variant: "bar",
                    stats: [
                        { value: "250+", label: "Projects", icon: "trophy" },
                        { value: "150+", label: "Clients", icon: "thumbsup" },
                        { value: "50+", label: "Team", icon: "users" },
                        { value: "25+", label: "Years", icon: "briefcase" }
                    ]
                }}
                containerWidth="container"
            />

            {/* Divider */}
            <div className="py-12 bg-slate-100 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Modern SaaS Variant</h2>
                <p className="text-slate-600">Vibrant and engaging design</p>
            </div>

            {/* Hero - Compact Variant (Modern) */}
            <RenovexHero
                content={{
                    badge: "Modern Tech Platform",
                    heading: "Build Better Products Faster",
                    description: "The all-in-one platform for modern teams to collaborate and ship amazing products.",
                    backgroundImage: "/home/banner-showcase.jpg",
                    ctaPrimary: "Start Free Trial",
                    ctaSecondary: "View Demo",
                    variant: "compact"
                }}
                containerWidth="full"
            />

            {/* Services - Blocks Variant (Modern) */}
            <RenovexServices
                content={{
                    sectionTitle: "Platform Features",
                    variant: "blocks",
                    services: [
                        { title: "Real-time Collaboration", description: "Work together seamlessly with your team in real-time.", icon: "users" },
                        { title: "Advanced Analytics", description: "Get insights with powerful analytics and reporting tools.", icon: "building" },
                        { title: "Secure Infrastructure", description: "Enterprise-grade security to protect your data.", icon: "hardhat" }
                    ]
                }}
                containerWidth="container"
            />

            {/* Stats - Badges Variant (Modern) */}
            <RenovexStats
                content={{
                    variant: "badges",
                    stats: [
                        { value: "10M+", label: "Users", icon: "users" },
                        { value: "99.9%", label: "Uptime", icon: "trophy" },
                        { value: "150+", label: "Countries", icon: "briefcase" },
                        { value: "24/7", label: "Support", icon: "thumbsup" }
                    ]
                }}
                containerWidth="full"
            />

            {/* Divider */}
            <div className="py-12 bg-slate-900 text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Creative Portfolio Variant</h2>
                <p className="text-slate-400">Minimalist and elegant design</p>
            </div>

            {/* Hero - Editorial Variant (Creative) */}
            <RenovexHero
                content={{
                    badge: "Design Studio",
                    heading: "Less Is More",
                    description: "We create spaces that inspire and function in perfect harmony.",
                    backgroundImage: "/home/banner-showcase.jpg",
                    ctaPrimary: "View Portfolio",
                    ctaSecondary: "Our Story",
                    variant: "editorial"
                }}
                containerWidth="container"
            />

            {/* Services - Minimal Variant (Creative) */}
            <RenovexServices
                content={{
                    sectionTitle: "What We Do",
                    variant: "minimal",
                    services: [
                        { title: "Brand Identity", description: "Creating memorable brand experiences that resonate with your audience.", icon: "building" },
                        { title: "Digital Design", description: "Crafting beautiful digital products with attention to every detail.", icon: "ruler" },
                        { title: "Art Direction", description: "Guiding visual narratives that tell your unique story.", icon: "hardhat" }
                    ]
                }}
                containerWidth="container"
            />

            {/* Stats - Inline Variant (Creative) */}
            <RenovexStats
                content={{
                    variant: "inline",
                    stats: [
                        { value: "100+", label: "Projects" },
                        { value: "50+", label: "Clients" },
                        { value: "15", label: "Awards" },
                        { value: "10", label: "Years" }
                    ]
                }}
                containerWidth="container"
            />

            {/* Final CTA */}
            <CTA
                className="bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200"
                buttonClassName="bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 hover:shadow-cyan-200"
            />
        </>
    );
}
