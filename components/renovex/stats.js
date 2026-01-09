'use client';

import { Trophy, ThumbsUp, Users, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
    trophy: Trophy,
    thumbsup: ThumbsUp,
    users: Users,
    briefcase: Briefcase
};

export default function RenovexStats({ content, containerWidth = 'container' }) {
    const {
        stats = [
            { value: "250+", label: "Projects", icon: "trophy" },
            { value: "150+", label: "Clients", icon: "thumbsup" },
            { value: "50+", label: "Team", icon: "users" },
            { value: "25+", label: "Years", icon: "briefcase" }
        ],
        variant = "bar"
    } = content || {};

    // Determine container class based on containerWidth prop
    const getContainerClass = () => {
        if (containerWidth === 'full') {
            return 'w-full px-4';
        }
        return 'container mx-auto px-4 max-w-7xl';
    };

    // Bar Variant (Classic Corporate) - Professional Cards
    if (variant === 'bar') {
        return (
            <section className="py-20 bg-slate-50">
                <div className={getContainerClass()}>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => {
                            const Icon = iconMap[stat.icon] || Trophy;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-8 rounded-xl border border-slate-200 hover:border-[var(--color-primary)] hover:shadow-lg transition-all text-center"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                                    </div>
                                    <div className="text-4xl font-bold text-slate-900 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-slate-600 font-semibold text-sm uppercase tracking-wide">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }

    // Badges Variant (Modern SaaS) - Vibrant & Modern
    if (variant === 'badges') {
        return (
            <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] bg-[size:30px_30px]"></div>
                <div className={`${getContainerClass()} relative z-10`}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            Trusted by Thousands
                        </h2>
                        <p className="text-xl text-slate-600">
                            Numbers that speak for themselves
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center"
                            >
                                <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-3">
                                    {stat.value}
                                </div>
                                <div className="text-slate-700 font-bold text-lg">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Inline Variant (Creative Portfolio) - Minimalist & Elegant
    if (variant === 'inline') {
        return (
            <section className="py-20 bg-slate-50 border-y border-slate-200">
                <div className={getContainerClass()}>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-5xl md:text-6xl font-bold text-slate-900 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-slate-500 text-sm uppercase tracking-widest">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return null;
}
