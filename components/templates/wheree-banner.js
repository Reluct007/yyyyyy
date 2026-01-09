'use client';

export default function WhereeBanner({
    title = "You Voted, We Listened",
    description = "We analyzed the top 10 of the most popular businesses and experiences that customers come most highly reviewed.",
    ctaText = "Learn More",
    ctaHref = "#"
}) {
    return (
        <div className="relative bg-slate-900 rounded-3xl overflow-hidden my-16">
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-slate-300 mb-8">
                        {description}
                    </p>
                    <a
                        href={ctaHref}
                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                    >
                        {ctaText}
                    </a>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
                <div className="absolute top-10 right-10 w-64 h-64 bg-orange-500 rounded-full"></div>
                <div className="absolute bottom-10 right-32 w-48 h-48 bg-orange-400 rounded-full"></div>
            </div>

            {/* Optional: Add background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}></div>
            </div>
        </div>
    );
}
