const steps = [
    {
        title: "Text what’s on your mind",
        description: "Share a concern, feeling, or question in plain words—no special format needed.",
    },
    {
        title: "Receive Scripture and a note",
        description: "We send back a Bible passage and a short, gentle reflection that fits your situation.",
    },
    {
        title: "Save and return anytime",
        description: "Create an account to keep your history, revisit what helped, and get unlimited responses.",
    },
];

const tips = [
    "Use everyday language; no keywords required.",
    "Ask about feelings (worry, grief, forgiveness) or situations (family, work, health).",
    "Reply back with follow-up questions at any time.",
    "Choose the translation you prefer for every response.",
];

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 pt-16 md:pt-20">
            <section className="container mx-auto max-w-5xl px-6 lg:px-10 py-14 space-y-10">
                <header className="space-y-3 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">How it works</p>
                    <h1 className="text-4xl font-bold">Scripture guidance in three simple steps</h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        If you can text, you can use Versiful. No app to install—just send a message and receive
                        Scripture-centered guidance back.
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 space-y-3 h-full"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-white font-semibold">
                                    {index + 1}
                                </span>
                                <h2 className="text-xl font-semibold text-gray-900">{step.title}</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900">Tips for better replies</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {tips.map((tip) => (
                            <li key={tip}>{tip}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}

