import { Link } from "react-router-dom";
import SEO, { seoConfig } from "../components/SEO";

const steps = [
    {
        icon: "💬",
        title: "Share what you're facing",
        description: "Text or chat in your own words—a worry, a loss, a question, a celebration. No app to install, no special format.",
    },
    {
        icon: "📖",
        title: "Receive Scripture and a gentle word",
        description: "Versiful responds with a passage in your translation and a short, warm reflection that fits the moment you're in.",
    },
    {
        icon: "🤍",
        title: "It stays with your story",
        description: "The things you share—your prayers, what you're walking through—are remembered, so the next conversation isn't a fresh start.",
    },
    {
        icon: "🌅",
        title: "Daily verse and gentle check-ins",
        description: "Get a personalized verse each morning, and a kind message when life gets heavy or a big day you mentioned arrives.",
    },
    {
        icon: "🌱",
        title: "See your walk over time",
        description: "Prayers prayed and answered, reflections saved, plans completed, themes explored—your journey, gathered in one place.",
    },
];

const reassurances = [
    "Use everyday language—no keywords or commands needed.",
    "Works over SMS from any phone, or in the web chat from your browser.",
    "Choose your Bible translation for every response.",
    "You're always in control—see what's remembered and clear it anytime.",
];

export default function HowItWorksPage() {
    return (
        <>
            <SEO {...seoConfig.howItWorks} />
            <main className="bg-cream dark:bg-charcoal-dark font-body -mt-16 md:-mt-20 pt-24 md:pt-28 pb-20 min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-16 -left-40 w-96 h-96 bg-sage/15 blob-shape animate-blob-float"></div>
                    <div className="absolute bottom-20 -right-32 w-80 h-80 bg-terracotta/10 blob-shape-2 animate-blob-float" style={{ animationDelay: "7s" }}></div>
                </div>

                <section className="relative container mx-auto max-w-5xl px-6 lg:px-10 space-y-12">
                    <header className="space-y-4 text-center animate-fade-in-up">
                        <p className="text-sm font-semibold uppercase tracking-widest text-terracotta dark:text-terracotta-light">How it works</p>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal dark:text-cream leading-tight">
                            A companion that walks with you
                        </h1>
                        <p className="font-body text-lg text-brown dark:text-brown-light max-w-3xl mx-auto leading-relaxed">
                            If you can send a text, you can use Versiful. Here's what it feels like to have Scripture, prayer,
                            and encouragement close at hand.
                        </p>
                    </header>

                    <div className="space-y-5">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="flex items-start gap-5 rounded-4xl border-2 border-terracotta/15 bg-cream dark:bg-charcoal-light
                                    px-6 py-6 shadow-warm hover:shadow-warm-lg transition-warm animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.06}s` }}
                            >
                                <div className="flex-shrink-0 flex items-center gap-3">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta text-cream font-bold font-display text-xl">
                                        {index + 1}
                                    </span>
                                    <span className="text-3xl">{step.icon}</span>
                                </div>
                                <div>
                                    <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream mb-1">{step.title}</h2>
                                    <p className="font-body text-brown dark:text-brown-light leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-4xl bg-sage/10 dark:bg-sage/5 border-2 border-sage/30 shadow-sage p-7 space-y-4">
                        <h3 className="font-display text-2xl font-bold text-charcoal dark:text-cream">Good to know</h3>
                        <ul className="space-y-3 font-body text-brown dark:text-brown-light">
                            {reassurances.map((tip) => (
                                <li key={tip} className="flex items-start gap-3">
                                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-terracotta flex-shrink-0"></span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/walk"
                            className="inline-flex items-center justify-center gap-2 bg-terracotta-gradient text-cream
                                py-4 px-8 rounded-3xl text-lg font-bold font-display shadow-warm-lg hover:shadow-warm
                                transform hover:scale-105 active:scale-95 transition-warm border-2 border-terracotta-dark/20"
                        >
                            <span>Explore My Walk</span>
                            <span>→</span>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
