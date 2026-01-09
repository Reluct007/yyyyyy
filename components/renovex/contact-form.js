'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function RenovexContactForm({ content, containerWidth = 'container' }) {
    const {
        title = "Get In Touch",
        description = "Have a project in mind? Let's discuss how we can help.",
        contactInfo = {
            email: "info@rnvx.com",
            phone: "+1 (555) 123-4567",
            address: "123 Business St, Suite 100, City, State 12345"
        }
    } = content || {};

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const getContainerClass = () => {
        if (containerWidth === 'full') {
            return 'w-full px-4';
        }
        return 'container mx-auto px-4 max-w-7xl';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section className="py-20 bg-slate-50">
            <div className={getContainerClass()}>
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left - Contact Info */}
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            {title}
                        </h2>
                        <p className="text-lg text-slate-600 mb-8">
                            {description}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-[var(--color-primary)]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                                    <p className="text-slate-600">{contactInfo.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-[var(--color-primary)]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                                    <p className="text-slate-600">{contactInfo.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                                    <p className="text-slate-600">{contactInfo.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Phone
                                </label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Message
                                </label>
                                <Textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full"
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white font-semibold py-6 text-lg"
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
