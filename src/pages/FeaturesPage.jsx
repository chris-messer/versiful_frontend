import { Link } from "react-router-dom";
import SEO, { seoConfig } from "../components/SEO";

const features = [
    {
        icon: "🧠",
        title: "Remembers your story",
        description: "Tell it once. Versiful holds onto what matters—your mom's surgery, the worry you keep returning to, the prayers you've shared—so every conversation picks up where your life actually is.",
    },
    {
        icon: "🌅",
        title: "A personalized daily verse",
        description: "A verse each morning, chosen for what you're walking through right now and never repeated—gentle encouragement to start the day.",
    },
    {
        icon: "🙏",
        title: "A prayer list, prayed with",
        description: "Add prayers by text or on the web. Versiful follows up, and celebrates with you when a prayer is answered—keeping a record of God's faithfulness.",
    },
    {
        icon: "📚",
        title: "Guided reading plans",
        description: "7-day to 30-day journeys on anxiety, grief, marriage, hope, gratitude, and more—with a passage and a reflection prompt each day.",
    },
    {
        icon: "💞",
        title: "Gentle check-ins",
        description: "After a hard day or a big moment you mentioned, Versiful reaches out with a warm word. Always optional, never pushy, and easy to pause.",
    },
    {
        icon: "🌱",
        title: "See your walk",
        description: "My Walk gathers your prayers, reflections, themes, and milestones into one view—so you can watch your faith take shape over time.",
    },
    {
        icon: "📖",
        title: "In your translation",
        description: "Choose the Bible version you're most at home in—NIV, ESV, KJV, NLT, and more—for every response.",
    },
    {
        icon: "🔒",
        title: "Private, and in your control",
        description: "Your conversations stay private. See everything Versiful remembers about you, and delete any of it—or all of it—anytime.",
    },
];

export default function FeaturesPage() {
    return (
        <>
            <SEO {...seoConfig.features} />
            <main className="bg-cream dark:bg-charcoal-dark font-body -mt-16 md:-mt-20 pt-24 md:pt-28 pb-20 min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 -right-40 w-96 h-96 bg-terracotta/10 blob-shape animate-blob-float"></div>
                    <div className="absolute top-72 -left-32 w-80 h-80 bg-sage/15 blob-shape-2 animate-blob-float" style={{ animationDelay: "6s" }}></div>
                </div>

                <section className="relative container mx-auto max-w-6xl px-6 lg:px-10 space-y-12">
                    <header className="space-y-4 text-center animate-fade-in-up">
                        <p className="text-sm font-semibold uppercase tracking-widest text-terracotta dark:text-terracotta-light">Features</p>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal dark:text-cream leading-tight">
                            A companion for your faith, every day
                        </h1>
                        <p className="font-body text-lg text-brown dark:text-brown-light max-w-3xl mx-auto leading-relaxed">
                            Versiful brings Scripture, prayer, and gentle encouragement together—rooted in your real life and
                            available by text or on the web, whenever you need it.
                        </p>
                    </header>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="group rounded-4xl border-2 border-terracotta/15 bg-cream dark:bg-charcoal-light
                                    px-6 py-7 shadow-warm hover:shadow-warm-lg transform hover:scale-105 transition-warm animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="text-3xl mb-3 group-hover:animate-soft-bounce">{feature.icon}</div>
                                <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream mb-2">{feature.title}</h2>
                                <p className="font-body text-brown dark:text-brown-light leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center pt-4">
                        <Link
                            to="/walk"
                            className="inline-flex items-center justify-center gap-2 bg-terracotta-gradient text-cream
                                py-4 px-8 rounded-3xl text-lg font-bold font-display shadow-warm-lg hover:shadow-warm
                                transform hover:scale-105 active:scale-95 transition-warm border-2 border-terracotta-dark/20"
                        >
                            <span>See it in action</span>
                            <span>→</span>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
