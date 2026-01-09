'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function PromoBanner({
    heading = "We've got your back. Guaranteed.",
    description = "Get the best wireless coverage and support when you need it most.",
    image = "/promo/family.jpg",
    ctas = ['Learn more', 'Shop deals'],
    containerWidth = 'full'
}) {
    const getContainerClass = () => {
        switch (containerWidth) {
            case 'full':
                return 'w-full';
            case 'wide':
                return 'max-w-[1400px] mx-auto';
            case 'contained':
            default:
                return 'max-w-7xl mx-auto';
        }
    };

    return (
        <section
            className="py-12 md:py-16"
            style={{ background: 'linear-gradient(135deg, #0057B8 0%, #00388F 100%)' }}
        >
            <div className={getContainerClass()}>
                <div className="px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Left: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-white"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                                {heading}
                            </h2>
                            <p className="text-blue-100 text-base md:text-lg mb-6 leading-relaxed">
                                {description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {ctas.map((cta, index) => (
                                    <Button
                                        key={index}
                                        variant={index === 0 ? 'default' : 'ghost'}
                                        className={
                                            index === 0
                                                ? 'bg-white text-blue-600 hover:bg-blue-50 font-bold text-base h-12 px-8 rounded-full'
                                                : 'border-2 border-white !text-white hover:bg-white/10 font-bold text-base h-12 px-8 rounded-full bg-transparent'
                                        }
                                    >
                                        {cta}
                                    </Button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
                        >
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-sm opacity-75">Promotional Image</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
