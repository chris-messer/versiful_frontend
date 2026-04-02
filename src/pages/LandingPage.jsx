import { useAuth } from "../context/AuthContext";
import { usePostHog } from "../context/PostHogContext";
import Phone from "../components/landing/hero/Phone.jsx";
import { useConfig } from "../hooks/useConfig";
import SEO, { seoConfig } from "../components/SEO";

const steps = [
    {
        title: "Send a text or message",
        description:
            "Share what you're facing in a simple text message or through our web chat—no app to install.",
        icon: "💬",
    },
    {
        title: "Receive a verse & reflection",
        description:
            "We send back a short passage and a gentle note that speaks to your moment with clarity and care.",
        icon: "📖",
    },
    {
        title: "Save and revisit",
        description:
            "Create an account for unlimited access, saved conversations, and a place to keep what helps you most.",
        icon: "🤍",
    },
];

const samplePrompts = [
    "I'm worried about my family",
    "How do I forgive someone who hurt me?",
    "I feel alone and need reassurance",
    "What does the Bible say about grief?",
];

const reassurances = [
    {
        title: "Text or web—your choice",
        description: "Use SMS from any phone, or chat through our website. Both work great.",
        icon: "📱",
    },
    {
        title: "Plain, gentle language",
        description: "Responses stay simple and kind—no jargon, no heavy tech talk.",
        icon: "💭",
    },
    {
        title: "Scripture first",
        description: "Each reply draws directly from the Bible with a brief, encouraging takeaway.",
        icon: "✨",
    },
    {
        title: "Private and secure",
        description: "Your messages are kept private. We never share what you send.",
        icon: "🔒",
    },
    {
        title: "Unlimited with an account",
        description: "Create an account to receive as much guidance as you need, any time.",
        icon: "∞",
    },
    {
        title: "Human-friendly help",
        description: "Designed for all ages, especially those who prefer simple, clear steps.",
        icon: "🤝",
    },
];

export default function LandingPage() {
    const { login } = useAuth();
    const { posthog } = usePostHog();
    const { config } = useConfig();

    // Use config phone number or fallback
    const phoneNumber = config?.phone?.sms || "833-681-1158";

    const handleGetStarted = (location) => {
        // PostHog tracking
        if (posthog) {
            posthog.capture('landing_cta_clicked', {
                cta_location: location,
                cta_type: 'signup',
                device: window.innerWidth < 768 ? 'mobile' : 'desktop'
            });
        }

        // Meta Pixel - track signup initiation
        if (window.fbq) {
            window.fbq('track', 'InitiateCheckout', {
                content_name: 'Start Subscription',
                content_category: location
            });
        }

        login();
    };

    const handleTryText = (source) => {
        // PostHog tracking
        if (posthog) {
            posthog.capture('try_text_clicked', {
                source: source,
                device: window.innerWidth < 768 ? 'mobile' : 'desktop'
            });
        }

        // Meta Pixel conversion event
        if (window.fbq) {
            window.fbq('trackCustom', 'TryFreeSMSClicked', {
                content_name: 'Try Free SMS',
                content_category: source,
                value: 1.00,
                currency: 'USD'
            });
        }
    };

    return (
        <>
            <SEO {...seoConfig.home} />
            <div className="bg-cream dark:bg-charcoal-dark font-body -mt-16 md:-mt-20 relative overflow-hidden">

                {/* Decorative organic blobs - background layer */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 -right-40 w-96 h-96 bg-terracotta/10 blob-shape animate-blob-float"></div>
                    <div className="absolute top-60 -left-32 w-80 h-80 bg-sage/15 blob-shape-2 animate-blob-float" style={{ animationDelay: '5s' }}></div>
                    <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-brown/10 blob-shape animate-blob-float" style={{ animationDelay: '10s' }}></div>
                </div>

                {/* Hero Section */}
                <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-10">
                        {/* MOBILE: Single column centered layout */}
                        <div className="lg:hidden max-w-2xl mx-auto">
                            <div className="space-y-8 animate-fade-in-up">
                                {/* Headline */}
                                <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight text-charcoal dark:text-cream text-center">
                                    Send a text.
                                    <br />
                                    Get back a{" "}
                                    <span className="text-terracotta dark:text-terracotta-light">Bible verse.</span>
                                    <br />
                                    <span className="text-2xl sm:text-3xl font-medium text-brown dark:text-brown-light">
                                        No apps, no distractions.
                                    </span>
                                </h1>

                                {/* Phone mockup */}
                                <div className="flex justify-center my-10">
                                    <div className="w-full max-w-[320px] sm:max-w-[360px] relative">
                                        <div className="absolute -inset-4 bg-gradient-to-br from-terracotta/20 to-sage/20 rounded-5xl blur-2xl"></div>
                                        <div className="relative">
                                            <Phone />
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                    {/* Primary CTA */}
                                    <a
                                        href={`sms:${phoneNumber}?body=Hi Versiful, today I am feeling...`}
                                        onClick={() => handleTryText('hero')}
                                        className="group w-full bg-terracotta-gradient text-cream
                                                 py-5 px-8 rounded-3xl text-xl font-bold font-display
                                                 shadow-warm-lg hover:shadow-warm
                                                 transform hover:scale-105 active:scale-95
                                                 transition-warm
                                                 inline-flex items-center justify-center gap-3
                                                 border-2 border-terracotta-dark/20"
                                    >
                                        <span>Try it free now</span>
                                        <span className="text-2xl group-hover:animate-soft-bounce">💬</span>
                                    </a>

                                    {/* Secondary option */}
                                    <div className="flex items-center justify-center gap-3 text-charcoal-light dark:text-charcoal-light">
                                        <div className="h-px bg-brown/30 flex-1"></div>
                                        <span className="text-sm font-medium">or</span>
                                        <div className="h-px bg-brown/30 flex-1"></div>
                                    </div>

                                    <button
                                        onClick={() => handleGetStarted('hero')}
                                        className="w-full bg-sage text-cream
                                                 py-4 px-8 rounded-3xl text-lg font-semibold font-display
                                                 shadow-sage hover:shadow-warm
                                                 transform hover:scale-105 active:scale-95
                                                 transition-warm
                                                 border-2 border-sage-dark/20"
                                    >
                                        Sign up for unlimited access
                                    </button>
                                </div>

                                {/* Social proof */}
                                <div className="pt-10 mt-10 border-t border-brown/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                    <div className="flex items-center justify-center gap-8 flex-wrap">
                                        <div className="text-center">
                                            <div className="text-3xl font-black font-display text-terracotta dark:text-terracotta-light">2,000+</div>
                                            <div className="text-sm text-brown dark:text-brown-light">messages sent</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-black font-display text-terracotta dark:text-terracotta-light">4.9★</div>
                                            <div className="text-sm text-brown dark:text-brown-light">rating</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-black font-display text-sage dark:text-sage-light">FREE</div>
                                            <div className="text-sm text-brown dark:text-brown-light">to try</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DESKTOP: Two column layout */}
                        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left side - copy */}
                            <div className="space-y-8 animate-fade-in-up">
                                <h1 className="font-display text-5xl xl:text-6xl font-bold leading-tight text-charcoal dark:text-cream">
                                    Send a text.
                                    <br />
                                    Get back a{" "}
                                    <span className="text-terracotta dark:text-terracotta-light">Bible verse.</span>
                                    <br />
                                    <span className="text-3xl xl:text-4xl font-medium text-brown dark:text-brown-light mt-4 block">
                                        No apps, no distractions.
                                    </span>
                                </h1>

                                {/* CTA buttons */}
                                <div className="space-y-4 pt-4">
                                    <button
                                        onClick={() => handleGetStarted('hero')}
                                        className="group w-full bg-terracotta-gradient text-cream
                                                 py-5 px-10 rounded-3xl text-xl font-bold font-display
                                                 shadow-warm-lg hover:shadow-warm
                                                 transform hover:scale-105 active:scale-95
                                                 transition-warm
                                                 inline-flex items-center justify-center gap-3
                                                 border-2 border-terracotta-dark/20"
                                    >
                                        <span>Start Free Trial</span>
                                        <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                                    </button>

                                    <p className="text-center text-sm text-brown dark:text-brown-light">
                                        Or{" "}
                                        <a
                                            href={`sms:${phoneNumber}`}
                                            onClick={() => handleTryText('hero')}
                                            className="font-semibold text-terracotta dark:text-terracotta-light hover:underline"
                                        >
                                            text {phoneNumber}
                                        </a>{" "}
                                        for a quick reply
                                    </p>
                                </div>

                                {/* Social proof */}
                                <div className="pt-8 border-t border-brown/20">
                                    <div className="flex items-center gap-8 flex-wrap">
                                        <div className="text-center">
                                            <div className="text-3xl font-black font-display text-terracotta dark:text-terracotta-light">2,000+</div>
                                            <div className="text-sm text-brown dark:text-brown-light">messages sent</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-black font-display text-terracotta dark:text-terracotta-light">4.9★</div>
                                            <div className="text-sm text-brown dark:text-brown-light">rating</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-black font-display text-sage dark:text-sage-light">FREE</div>
                                            <div className="text-sm text-brown dark:text-brown-light">to try</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - phone */}
                            <div className="flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <div className="w-full max-w-[360px] xl:max-w-[420px] relative">
                                    <div className="absolute -inset-6 bg-gradient-to-br from-terracotta/20 to-sage/20 rounded-5xl blur-3xl"></div>
                                    <div className="relative">
                                        <Phone />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="container mx-auto max-w-6xl px-6 lg:px-10 mt-16">
                        <div className="glass rounded-4xl p-8 max-w-3xl mx-auto border-2 border-terracotta/10 shadow-warm">
                            <div className="flex gap-5 items-start">
                                <div className="text-4xl flex-shrink-0 animate-soft-bounce">💬</div>
                                <div className="text-left">
                                    <p className="text-lg font-body text-charcoal dark:text-cream mb-3 leading-relaxed">
                                        "I was struggling with anxiety and got a Bible verse that perfectly spoke to my situation. It really helped me find peace."
                                    </p>
                                    <p className="text-sm font-semibold font-display text-brown dark:text-brown-light">
                                        — Sarah M., Florida
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className="relative bg-cream-dark dark:bg-charcoal py-16 sm:py-20">
                    <div className="container mx-auto max-w-6xl px-6 lg:px-10 space-y-12">
                        <h2 className="font-display text-4xl font-bold text-charcoal dark:text-cream text-center">
                            How it works
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {steps.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="group rounded-4xl border-2 border-terracotta/20 bg-cream dark:bg-charcoal-light
                                             px-7 py-8 shadow-warm hover:shadow-warm-lg
                                             transform hover:scale-105 transition-warm
                                             animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="mb-5 flex items-center gap-4">
                                        <span className="text-4xl group-hover:animate-soft-bounce">
                                            {step.icon}
                                        </span>
                                        <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center
                                                       rounded-full bg-terracotta text-cream font-bold font-display text-xl">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <h3 className="font-display text-xl font-bold text-charcoal dark:text-cream mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="font-body text-brown dark:text-brown-light leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What you can text */}
                <section className="relative py-16 sm:py-20">
                    <div className="container mx-auto max-w-6xl px-6 lg:px-10 grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6">
                            <h2 className="font-display text-4xl font-bold text-charcoal dark:text-cream">
                                What you can text or chat
                            </h2>
                            <p className="font-body text-lg text-brown dark:text-brown-light leading-relaxed">
                                Use your own words via SMS or web chat. Share the situation, a feeling, or a question—Versiful will respond with
                                Scripture and a brief reflection tailored to it.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {samplePrompts.map((prompt, index) => (
                                    <div
                                        key={prompt}
                                        className="rounded-3xl bg-cream-dark dark:bg-charcoal-light
                                                 px-5 py-4 text-charcoal dark:text-cream
                                                 shadow-sm border-2 border-sage/20
                                                 hover:border-sage/40 hover:shadow-sage
                                                 transition-warm font-body
                                                 animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        "{prompt}"
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-4xl bg-sage/10 dark:bg-sage/5 p-8 border-2 border-sage/30 shadow-sage">
                            <h3 className="font-display text-2xl font-bold text-charcoal dark:text-cream mb-6">
                                What comes back
                            </h3>
                            <ul className="space-y-4 font-body text-brown dark:text-brown-light">
                                <li className="flex items-start gap-4">
                                    <span className="mt-1.5 h-3 w-3 rounded-full bg-terracotta flex-shrink-0"></span>
                                    <span>A Bible verse or parable that speaks directly to your message.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="mt-1.5 h-3 w-3 rounded-full bg-terracotta flex-shrink-0"></span>
                                    <span>A short, gentle note to help you apply it right now.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="mt-1.5 h-3 w-3 rounded-full bg-terracotta flex-shrink-0"></span>
                                    <span>Links to read more if you'd like to go deeper.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="mt-1.5 h-3 w-3 rounded-full bg-terracotta flex-shrink-0"></span>
                                    <span>Follow-up prompts you can text back anytime.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Why people trust */}
                <section className="relative bg-cream-dark dark:bg-charcoal py-16 sm:py-20">
                    <div className="container mx-auto max-w-6xl px-6 lg:px-10 space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="font-display text-4xl font-bold text-charcoal dark:text-cream">
                                Why people trust Versiful
                            </h2>
                            <p className="font-body text-lg text-brown dark:text-brown-light leading-relaxed max-w-3xl mx-auto">
                                Built for everyone who wants straightforward help grounded in Scripture.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reassurances.map((item, index) => (
                                <div
                                    key={item.title}
                                    className="group rounded-4xl border-2 border-brown/20 bg-cream dark:bg-charcoal-light
                                             px-6 py-7 shadow-sm hover:shadow-warm
                                             transform hover:scale-105 transition-warm
                                             animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="text-3xl mb-3 group-hover:animate-soft-bounce">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-display text-lg font-bold text-charcoal dark:text-cream mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="font-body text-brown dark:text-brown-light leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="relative bg-terracotta-gradient text-cream py-16 sm:py-20 overflow-hidden">
                    {/* Decorative blobs for depth */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                        <div className="absolute top-10 right-20 w-64 h-64 bg-cream blob-shape animate-blob-float"></div>
                        <div className="absolute bottom-10 left-20 w-48 h-48 bg-sage blob-shape-2 animate-blob-float" style={{ animationDelay: '7s' }}></div>
                    </div>

                    <div className="relative container mx-auto max-w-4xl px-6 lg:px-10 text-center space-y-8">
                        <h3 className="font-display text-4xl sm:text-5xl font-bold">
                            Ready when you are
                        </h3>
                        <p className="font-body text-xl text-cream/90 leading-relaxed max-w-2xl mx-auto">
                            Text us now for a Scripture response, or create an account for unlimited guidance through text or web chat and a saved
                            history of every conversation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <button
                                onClick={() => handleGetStarted('bottom_cta')}
                                className="group inline-flex items-center justify-center rounded-3xl
                                         bg-cream text-terracotta-dark px-8 py-4 font-bold font-display text-lg
                                         shadow-warm-lg hover:shadow-warm hover:bg-cream-dark
                                         transform hover:scale-105 active:scale-95 transition-warm"
                            >
                                <span>Get started</span>
                                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                        <p className="font-body text-sm text-cream/80 text-center max-w-2xl mx-auto">
                            Want to try first?{" "}
                            <a
                                href={`sms:${phoneNumber}`}
                                onClick={() => handleTryText('bottom_cta')}
                                className="font-semibold underline hover:text-cream transition-colors"
                            >
                                Text {phoneNumber}
                            </a>{" "}
                            for a quick reply.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
