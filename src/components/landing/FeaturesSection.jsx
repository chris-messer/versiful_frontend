export default function FeaturesSection() {
    const features = [
        { title: "Find Guidance Through Text Messages", description: "Access biblical wisdom on the go. Simply send a text and instantly receive the perfect Bible verse or parable instantly." },
        { title: "Your Bible, Your Way ", description: "Customize your experience by selecting your favorite Bible version. Whether it’s NIV, KJV, ESV, or more, get verses and stories in the translation you love most." },
        { title: "Verses or Parables—Your Choice", description: "Whether you need a quick Bible verse or a deeper lesson through a parable, our app delivers exactly what you’re looking for to inspire and guide you." },
    ];

    return (
        <section id="features" className="py-10">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-200 mb-6">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 bg-white bg-opacity-90 shadow-lg rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
