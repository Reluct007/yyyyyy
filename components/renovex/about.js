'use client';

import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function RenovexAbout({ content, containerWidth = 'container' }) {
    const {
        sectionTitle = "Building More Than Just Structures",
        description = "We are dedicated to providing top-notch construction services that stand the test of time.",
        image = "/home/banner-showcase.jpg",
        experienceYears = "25+",
        features = [
            { title: "Quality Craftsmanship", description: "Every project built to perfection" },
            { title: "Timely Delivery", description: "On-time completion guaranteed" },
            { title: "Expert Team", description: "Certified professionals" }
        ]
    } = content || {};

    const getContainerClass = () => {
        if (containerWidth === 'full') {
            return 'w-full px-4';
        }
        return 'container mx-auto px-4 max-w-7xl';
    };

    return (
        <section className="py-20 bg-white">
            <div className={getContainerClass()}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative h-[500px] rounded-2xl overflow-hidden">
                            <Image
                                src={image}
                                alt={sectionTitle}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-[var(--color-primary)] text-white p-8 rounded-xl shadow-2xl">
                            <div className="text-5xl font-bold">{experienceYears}</div>
                            <div className="text-sm font-semibold mt-1">Years Experience</div>
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div>
                            <div className="text-[var(--color-primary)] font-semibold mb-2">About Us</div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">
                                {sectionTitle}
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="w-6 h-6 text-[var(--color-primary)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
