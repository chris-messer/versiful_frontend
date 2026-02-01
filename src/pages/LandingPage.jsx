import { Link } from "react-router-dom";
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
    },
    {
        title: "Receive a verse & reflection",
        description:
            "We send back a short passage and a gentle note that speaks to your moment with clarity and care.",
    },
    {
        title: "Save and revisit",
        description:
            "Create an account for unlimited access, saved conversations, and a place to keep what helps you most.",
    },
];

const samplePrompts = [
    "I’m worried about my family",
    "How do I forgive someone who hurt me?",
    "I feel alone and need reassurance",
    "What does the Bible say about grief?",
];

const reassurances = [
    {
        title: "Text or web—your choice",
        description: "Use SMS from any phone, or chat through our website. Both work great.",
    },
    {
        title: "Plain, gentle language",
        description: "Responses stay simple and kind—no jargon, no heavy tech talk.",
    },
    {
        title: "Scripture first",
        description: "Each reply draws directly from the Bible with a brief, encouraging takeaway.",
    },
    {
        title: "Private and secure",
        description: "Your messages are kept private. We never share what you send.",
    },
    {
        title: "Unlimited with an account",
        description: "Create an account to receive as much guidance as you need, any time.",
    },
    {
        title: "Human-friendly help",
        description: "Designed for all ages, especially those who prefer simple, clear steps.",
    },
];

export default function LandingPage() {
    const { login } = useAuth();
    const { posthog } = usePostHog();
    const { config } = useConfig();
    
    // Use config phone number or fallback
    const phoneNumber = config?.phone?.sms || "833-681-1158";

    const handleGetStarted = (location) => {
        if (posthog) {
            posthog.capture('landing_cta_clicked', {
                cta_location: location,
                cta_type: 'signup',
                device: window.innerWidth < 768 ? 'mobile' : 'desktop'
            });
        }
        login();
    };

    const handleTryText = (source) => {
        if (posthog) {
            posthog.capture('try_text_clicked', {
                source: source,
                device: window.innerWidth < 768 ? 'mobile' : 'desktop'
            });
        }
    };

    return (
        <>
            <SEO {...seoConfig.home} />
            <div className="bg-gradient-to-b from-white via-blue-50/60 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 -mt-16 md:-mt-20">
            <section className="pt-20 pb-12 sm:pt-20 sm:pb-14 lg:bg-gradient-to-br lg:from-blue-50 lg:via-white lg:to-blue-50 dark:lg:from-gray-900 dark:lg:via-gray-950 dark:lg:to-gray-900">
                <div className="container mx-auto max-w-6xl px-6 lg:px-10">
                    {/* MOBILE: Single column centered layout */}
                    <div className="lg:hidden max-w-2xl mx-auto">
                        {/* YOUR HEADLINE */}
                        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900 dark:text-white text-center mb-8">
                            Send a text.<br />
                            Get back a Bible verse.<br />
                            <span className="text-blue-600 dark:text-blue-400">No apps, no distractions.</span>
                        </h1>

                        {/* PHONE COMPONENT - Shows the interface */}
                        <div className="flex justify-center mb-8">
                            <div className="w-full max-w-[320px] sm:max-w-[360px]">
                                <Phone />
                            </div>
                        </div>

                        {/* MOBILE-FIRST CTA BUTTONS */}
                            <div className="space-y-3">
                                {/* PRIMARY CTA - Large */}
                                <button
                                    onClick={() => handleGetStarted('hero')}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white 
                                             py-4 px-8 rounded-xl text-lg sm:text-xl font-bold
                                             shadow-2xl hover:shadow-blue-500/50 
                                             transform hover:scale-105 transition-all duration-200
                                             inline-flex items-center justify-center gap-2"
                                >
                                    <span>Start Free Trial</span>
                                    <span className="text-2xl">→</span>
                                </button>

                            {/* SECONDARY CTA - Try without signup */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400 text-center">or</span>
                                <a
                                    href={`sms:${phoneNumber}?body=Hi Versiful, today I am feeling...`}
                                    onClick={() => handleTryText('hero')}
                                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-base text-center"
                                >
                                    📱 Try it free (no signup)
                                </a>
                            </div>
                        </div>

                        {/* SOCIAL PROOF - Compact */}
                        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-center gap-6 flex-wrap text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">2,000+</span>
                                    <span className="text-gray-600 dark:text-gray-400">messages sent</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">4.9★</span>
                                    <span className="text-gray-600 dark:text-gray-400">rating</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-green-600 dark:text-green-400">FREE</span>
                                    <span className="text-gray-600 dark:text-gray-400">to try</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP: Two column layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
                        {/* LEFT SIDE - Copy & CTAs */}
                        <div className="space-y-6">
                            {/* YOUR HEADLINE */}
                            <h1 className="text-4xl xl:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                                Send a text.<br />
                                Get back a Bible verse.<br />
                                <span className="text-blue-600 dark:text-blue-400">No apps, no distractions.</span>
                            </h1>

                            {/* CTA BUTTONS */}
                            <div className="space-y-3 pt-4">
                                {/* PRIMARY CTA */}
                                <button
                                    onClick={() => handleGetStarted('hero')}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white 
                                             py-4 px-8 rounded-xl text-xl font-bold
                                             shadow-2xl hover:shadow-blue-500/50 
                                             transform hover:scale-105 transition-all duration-200
                                             inline-flex items-center justify-center gap-2"
                                >
                                    <span>Start Free Trial</span>
                                    <span className="text-2xl">→</span>
                                </button>

                                {/* SECONDARY CTA */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">or</span>
                                    <a
                                        href={`sms:${phoneNumber}?body=Hi Versiful, today I am feeling...`}
                                        onClick={() => handleTryText('hero')}
                                        className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-base"
                                    >
                                        📱 Try it free (no signup)
                                    </a>
                                </div>
                            </div>

                            {/* SOCIAL PROOF */}
                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-6 flex-wrap text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">2,000+</span>
                                        <span className="text-gray-600 dark:text-gray-400">messages sent</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">4.9★</span>
                                        <span className="text-gray-600 dark:text-gray-400">rating</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-black text-green-600 dark:text-green-400">FREE</span>
                                        <span className="text-gray-600 dark:text-gray-400">to try</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE - Phone Component */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-full max-w-[360px] xl:max-w-[400px]">
                                <Phone />
                            </div>
                        </div>
                    </div>
                </div>

                {/* TESTIMONIAL - Below hero, full width */}
                <div className="container mx-auto max-w-6xl px-6 lg:px-10 mt-12">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 max-w-3xl mx-auto border border-blue-100 dark:border-blue-800">
                        <div className="flex gap-4 items-start">
                            <div className="text-3xl flex-shrink-0">💬</div>
                            <div className="text-left">
                                <p className="text-base italic text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                                    "I was struggling with anxiety and got a Bible verse that perfectly spoke to my situation. It really helped me find peace."
                                </p>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    — Sarah M., Florida
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-900 py-12 sm:py-14 shadow-inner">
                <div className="container mx-auto max-w-5xl px-6 lg:px-10 space-y-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How it works</h2>
                    <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="h-full rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-6 text-left shadow-sm space-y-3"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex flex-shrink-0 h-10 w-10 items-center justify-center rounded-full bg-blue-900 dark:bg-blue-700 text-white font-semibold">
                                        {index + 1}
                                    </span>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-blue-50 dark:bg-gray-800 py-12 sm:py-14">
                <div className="container mx-auto max-w-5xl px-6 lg:px-10 grid md:grid-cols-2 gap-10 items-start">
                    <div className="space-y-5">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What you can text or chat</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Use your own words via SMS or web chat. Share the situation, a feeling, or a question—Versiful will respond with
                            Scripture and a brief reflection tailored to it.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                            {samplePrompts.map((prompt) => (
                                <div
                                    key={prompt}
                                    className="rounded-xl bg-white dark:bg-gray-700 px-4 py-3 text-left text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-600"
                                >
                                    {prompt}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4 rounded-2xl bg-white dark:bg-gray-700 p-6 shadow-lg border border-gray-100 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">What comes back</h3>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-900 dark:bg-blue-500"></span>
                                <span>A Bible verse or parable that speaks directly to your message.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-900 dark:bg-blue-500"></span>
                                <span>A short, gentle note to help you apply it right now.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-900 dark:bg-blue-500"></span>
                                <span>Links to read more if you'd like to go deeper.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-900 dark:bg-blue-500"></span>
                                <span>Follow-up prompts you can text back anytime.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-900 py-12 sm:py-14">
                <div className="container mx-auto max-w-6xl px-6 lg:px-10 space-y-8">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why people trust Versiful</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Built for older and less technical users who want straightforward help grounded in Scripture.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reassurances.map((item) => (
                            <div
                                key={item.title}
                                className="h-full rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-5 shadow-sm"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-blue-900 dark:bg-blue-950 text-white py-12 sm:py-14">
                <div className="container mx-auto max-w-4xl px-6 lg:px-10 text-center space-y-6">
                    <h3 className="text-3xl font-bold">Ready when you are</h3>
                    <p className="text-lg text-blue-100 dark:text-blue-200 leading-relaxed">
                        Text us now for a Scripture response, or create an account for unlimited guidance through text or web chat and a saved
                        history of every conversation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => handleGetStarted('bottom_cta')}
                            className="inline-flex items-center justify-center rounded-xl bg-white dark:bg-gray-100 px-5 py-3 text-blue-900 dark:text-blue-950 font-semibold shadow-lg hover:bg-blue-50 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
                        >
                            Get started
                        </button>
                    </div>
                    <p className="text-sm text-blue-100 dark:text-blue-200 text-center max-w-2xl mx-auto mt-4">
                        Want to try first? <a 
                            href={`sms:${phoneNumber}`} 
                            onClick={() => handleTryText('bottom_cta')}
                            className="font-semibold underline"
                        >
                            Text {phoneNumber}
                        </a> for a quick reply.
                    </p>
                </div>
            </section>
            </div>
        </>
    );
}
