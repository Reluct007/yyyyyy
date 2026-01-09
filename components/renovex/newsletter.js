'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RenovexNewsletter({ content, containerWidth = 'container' }) {
    const {
        title = "Stay Updated",
        description = "Join our newsletter for industry insights and updates.",
        placeholder = "Enter your email",
        ctaText = "Subscribe",
        backgroundColor = "gradient"
    } = content || {};

    const [email, setEmail] = useState('');

    const getContainerClass = () => {
        if (containerWidth === 'full') {
            return 'w-full px-4';
        }
        return 'container mx-auto px-4 max-w-7xl';
    };

    const getBackgroundClass = () => {
        switch (backgroundColor) {
            case 'white':
                return 'bg-white';
            case 'blue':
                return 'bg-gradient-to-r from-blue-600 to-blue-700';
            case 'gradient':
            default:
                return 'bg-gradient-to-br from-blue-600 to-cyan-500';
        }
    };

    const getTextColorClass = () => {
        return backgroundColor === 'white' ? 'text-slate-900' : 'text-white';
    };

    const getDescriptionColorClass = () => {
        return backgroundColor === 'white' ? 'text-slate-600' : 'text-blue-100';
    };

    const getButtonClass = () => {
        return backgroundColor === 'white'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-white text-blue-600 hover:bg-blue-50';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Newsletter signup:', email);
        setEmail('');
    };

    return (
        <section className={`py-16 ${getBackgroundClass()}`}>
            <div className={getContainerClass()}>
                <div className="max-w-3xl mx-auto text-center">
                    {backgroundColor !== 'white' && (
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                    )}
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${getTextColorClass()}`}>
                        {title}
                    </h2>
                    <p className={`text-xl mb-8 ${getDescriptionColorClass()}`}>
                        {description}
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={placeholder}
                            required
                            className={`flex-1 h-12 ${backgroundColor === 'white'
                                    ? 'bg-white border-slate-300 text-slate-900'
                                    : 'bg-white/90 border-0 text-slate-900 placeholder:text-slate-500'
                                }`}
                        />
                        <Button type="submit" className={`${getButtonClass()} font-semibold h-12 px-8`}>
                            {ctaText}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
