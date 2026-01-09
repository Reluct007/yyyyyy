'use client';

import { Ruler, Building, HardHat, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const iconMap = {
    ruler: Ruler,
    building: Building,
    hardhat: HardHat
};

export default function RenovexServices({ content, containerWidth = 'container' }) {
    const {
        sectionTitle = "Construction Solutions",
        services = [
            { title: "Project Planning", description: "Comprehensive planning ensuring timely and budget-friendly project execution.", icon: "ruler" },
            { title: "Interior Design", description: "Creative interior solutions that blend functionality with aesthetic appeal.", icon: "building" },
            { title: "Urban Development", description: "Transforming urban landscapes with sustainable and modern infrastructure.", icon: "building" },
            { title: "Civil Engineering", description: "Expert engineering services for robust and durable structural foundations.", icon: "hardhat" }
        ],
        variant = "grid"
    } = content || {};

    // Determine container class based on containerWidth prop
    const getContainerClass = () => {
        if (containerWidth === 'full') {
            return 'w-full px-4';
        }
        return 'container mx-auto px-4 max-w-7xl';
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    // Grid Variant (Classic Corporate) - Professional & Clean
    if (variant === 'grid') {
        return (
            <section className="py-20 bg-slate-50">
                <div className={getContainerClass()}>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            {sectionTitle}
                        </h2>
                        <div className="w-20 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {services.map((service, idx) => {
                            const Icon = iconMap[service.icon] || Ruler;
                            return (
                                <motion.div
                                    variants={itemVariants}
                                    key={idx}
                                    className="bg-white p-8 rounded-xl border border-slate-200 hover:border-[var(--color-primary)] hover:shadow-xl transition-all duration-300 group"
                                >
                                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)] transition-colors">
                                        <Icon className="w-7 h-7 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        );
    }

    // Blocks Variant (Modern SaaS) - Bold & Engaging
    if (variant === 'blocks') {
        return (
            <section className="py-24 bg-slate-50">
                <div className={getContainerClass()}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                            {sectionTitle}
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Comprehensive solutions for modern businesses
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {services.map((service, idx) => {
                            const Icon = iconMap[service.icon] || Ruler;
                            const isEven = idx % 2 === 0;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow`}
                                >
                                    <div className="flex-1 space-y-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                                            {service.title}
                                        </h3>
                                        <p className="text-lg text-slate-600 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all">
                                            Learn More
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                    <div className="flex-1 w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl"></div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }

    // Minimal Variant (Creative Portfolio) - Elegant & Refined
    if (variant === 'minimal') {
        return (
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className={getContainerClass()}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                            {sectionTitle}
                        </h2>
                    </motion.div>

                    <div className="space-y-12">
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-8 pb-12 border-b border-slate-200 last:border-0"
                            >
                                <div className="text-6xl font-bold text-slate-200 leading-none">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <h3 className="text-2xl font-bold text-slate-900">
                                        {service.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // AT&T Grid Variant - 4-column card layout with CTAs
    if (variant === 'att-grid') {
        return (
            <section className="py-12 bg-white">
                <div className={getContainerClass()}>
                    {/* Section Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            {sectionTitle}
                        </h2>
                    </motion.div>

                    {/* Service Cards Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {services.map((service, idx) => {
                            const Icon = iconMap[service.icon] || Ruler;
                            return (
                                <motion.div
                                    variants={itemVariants}
                                    key={idx}
                                    className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
                                >
                                    {/* Icon */}
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-blue-600" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 min-h-[56px]">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* CTA Button */}
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full h-11 mt-auto">
                                        {service.cta || 'Get started'}
                                    </Button>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        );
    }

    return null;
}
