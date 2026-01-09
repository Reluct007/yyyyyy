'use client';

export default function WhereeHero({
    title = "Where to?",
    subtitle = "Finding reliable dining and accommodation options, as well as your next service",
    showSearch = true
}) {
    return (
        <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    {/* Left: Text Content */}
                    <div className="max-w-xl">
                        <h1 className="text-6xl font-bold text-slate-900 mb-4">
                            {title}
                        </h1>
                        <p className="text-lg text-slate-600">
                            {subtitle}
                        </p>
                    </div>

                    {/* Right: Decorative Icon */}
                    <div className="hidden lg:block">
                        <div className="relative w-64 h-64">
                            {/* Abstract geometric shapes inspired by Wheree */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400 rounded-full opacity-20"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500 rounded-full opacity-30"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg className="w-32 h-32 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar (Optional) */}
                {showSearch && (
                    <div className="mt-12 max-w-3xl">
                        <div className="flex gap-3 bg-white rounded-2xl shadow-lg p-2">
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="flex-1 px-6 py-4 rounded-xl focus:outline-none text-lg"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                className="flex-1 px-6 py-4 rounded-xl focus:outline-none text-lg border-l"
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
                                Search
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
