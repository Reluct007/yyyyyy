import WhereeHero from '@/components/templates/wheree-hero';
import WhereeCard from '@/components/templates/wheree-card';
import WhereeBanner from '@/components/templates/wheree-banner';
import WhereeCategoryGrid from '@/components/templates/wheree-category-grid';

export const metadata = {
    title: 'Wheree Template - Poker Kit',
    description: 'Modern layout template inspired by Wheree.com',
};

export default function WhereeTemplatePage() {
    // Sample data
    const topProducts = [
        {
            image: '/product/poker-set-1.jpg',
            category: 'Poker Sets',
            title: 'Professional Poker Set',
            subtitle: 'Complete 500-piece set',
            href: '/product/professional-poker-set'
        },
        {
            image: '/product/poker-chips-1.jpg',
            category: 'Poker Chips',
            title: 'Clay Poker Chips',
            subtitle: 'Casino-grade quality',
            href: '/product/clay-poker-chips'
        },
        {
            image: '/product/poker-table-1.jpg',
            category: 'Poker Tables',
            title: 'Folding Poker Table',
            subtitle: 'Professional felt surface',
            href: '/product/folding-poker-table'
        },
        {
            image: '/product/cards-1.jpg',
            category: 'Playing Cards',
            title: 'Premium Playing Cards',
            subtitle: 'Plastic-coated deck',
            href: '/product/premium-cards'
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <WhereeHero
                title="Find Your Perfect Poker Set"
                subtitle="Browse our collection of professional poker equipment and accessories"
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">

                {/* Top Products Section */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Top Products
                        </h2>
                        <a href="/collection" className="text-orange-500 hover:text-orange-600 font-semibold">
                            See more →
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topProducts.map((product, index) => (
                            <WhereeCard key={index} {...product} />
                        ))}
                    </div>
                </section>

                {/* Feature Banner */}
                <WhereeBanner
                    title="Premium Quality Guaranteed"
                    description="All our poker sets are carefully selected and tested to ensure the best gaming experience for professionals and enthusiasts alike."
                    ctaText="Shop Now"
                    ctaHref="/collection"
                />

                {/* Categories Grid */}
                <section>
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                        Browse by Category
                    </h2>
                    <WhereeCategoryGrid />
                </section>

            </div>
        </div>
    );
}
