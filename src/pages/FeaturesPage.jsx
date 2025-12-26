const features = [
    {
        title: "Guidance by text or web",
        description: "Send any concern in a simple text or through our web chat and receive Scripture with a gentle reflection back.",
    },
    {
        title: "Choose your translation",
        description: "Pick the Bible version you're most comfortable with for every response.",
    },
    {
        title: "Verses and parables",
        description: "Receive either a concise verse or a short parable summary suited to your moment.",
    },
    {
        title: "Unlimited with an account",
        description: "Create an account to save history and receive as much guidance as you need.",
    },
    {
        title: "Works on any device",
        description: "No app to install. Text from any phone, or use our web chat from your browser.",
    },
    {
        title: "Private and respectful",
        description: "Your messages stay private. We never share what you send.",
    },
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-16 md:pt-20">
            <section className="container mx-auto max-w-5xl px-6 lg:px-10 py-14 space-y-10">
                <header className="space-y-3 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-400">Features</p>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Everything you need, kept simple</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        Versiful is built for people who just want clear, timely Scripture-based guidance without any
                        extra steps. Use SMS from any phone or our web chat from your browser.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm p-6 space-y-2"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

