import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Phone from "../components/landing/hero/Phone.jsx";

const phoneNumber = "833-681-1158";

const steps = [
    {
        title: "Send a text",
        description:
            "Share what you’re facing in a simple text message—no app to install or account required to try it.",
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
        title: "Made for every phone",
        description: "If you can text, you can use Versiful. Nothing new to download or learn.",
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

    return (
        <div className="bg-gradient-to-b from-white via-blue-50/60 to-white text-gray-900">
            <section className="pt-14 pb-12 sm:pt-16 sm:pb-14">
                <div className="container mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-left">
                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
                            Text-based Scripture guidance
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                            Guidance from the Word, Right When You Need It
                        </h1>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">
                            Share what you're facing and receive a Bible passage with a gentle reflection—delivered to your phone.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <button
                                onClick={login}
                                className="inline-flex items-center justify-center rounded-xl bg-blue-900 px-5 py-3 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                            >
                                Get started
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                <span>No app to install—just text.</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                <span>Unlimited guidance with an account.</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px]">
                            <Phone />
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-500 text-center mt-6 px-6 leading-relaxed">
                    Prefer to try first?{" "}
                    <a href={`sms:${phoneNumber}`} className="font-semibold text-blue-700 hover:underline">
                        Text {phoneNumber}
                    </a>{" "}
                    for a quick reply before you set up your account.
                </p>
            </section>

            <section className="bg-white py-12 sm:py-14 shadow-inner">
                <div className="container mx-auto max-w-5xl px-6 lg:px-10 space-y-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
                    <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="h-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-6 text-left shadow-sm space-y-3"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-white font-semibold">
                                        {index + 1}
                                    </span>
                                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-blue-50 py-12 sm:py-14">
                <div className="container mx-auto max-w-5xl px-6 lg:px-10 grid md:grid-cols-2 gap-10 items-start">
                    <div className="space-y-5">
                        <h2 className="text-3xl font-bold text-gray-900">What you can text</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Use your own words. Share the situation, a feeling, or a question—Versiful will respond with
                            Scripture and a brief reflection tailored to it.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                            {samplePrompts.map((prompt) => (
                                <div
                                    key={prompt}
                                    className="rounded-xl bg-white px-4 py-3 text-left text-gray-800 shadow-sm border border-gray-100"
                                >
                                    {prompt}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4 rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900">What comes back</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-900"></span>
                                <span>A Bible verse or parable that speaks directly to your message.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-900"></span>
                                <span>A short, gentle note to help you apply it right now.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-900"></span>
                                <span>Links to read more if you’d like to go deeper.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-900"></span>
                                <span>Follow-up prompts you can text back anytime.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-white py-12 sm:py-14">
                <div className="container mx-auto max-w-6xl px-6 lg:px-10 space-y-8">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl font-bold text-gray-900">Why people trust Versiful</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Built for older and less technical users who want straightforward help grounded in Scripture.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reassurances.map((item) => (
                            <div
                                key={item.title}
                                className="h-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-5 shadow-sm"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-700 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-blue-900 text-white py-12 sm:py-14">
                <div className="container mx-auto max-w-4xl px-6 lg:px-10 text-center space-y-6">
                    <h3 className="text-3xl font-bold">Ready when you are</h3>
                    <p className="text-lg text-blue-100 leading-relaxed">
                        Text us now for a Scripture response, or create an account for unlimited guidance and a saved
                        history of every conversation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={login}
                            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-blue-900 font-semibold shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
                        >
                            Get started
                        </button>
                    </div>
                    <p className="text-sm text-blue-100 text-center max-w-2xl mx-auto mt-4">
                        Want to try first? <a href={`sms:${phoneNumber}`} className="font-semibold underline">Text {phoneNumber}</a> for a quick reply.
                    </p>
                </div>
            </section>
        </div>
    );
}
