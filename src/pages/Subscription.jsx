import SubscriptionCard from "../components/subscription/SubscriptionCard.jsx";

const SubscriptionPage = () => {
    const plans = [
        // {
        //     title: "Basic Plan",
        //     price: "$5/mo",
        //     description: "Receive a daily Bible verse via text.",
        //     features: ["1 daily verse", "Cancel anytime"],
        // },
        {
            title: "Premium Plan",
            price: "$7/mo",
            description: "Unlimited access to personalized Bible verses and parables via SMS.",
            features: [
                "Unlimited parable requests via text",
                "Daily Bible verse sent to your phone",
                "Customize preferred Bible version",
                "Cancel anytime"
            ],
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Subscription</h1>
            <div className="grid grid-cols-1 gap-6">
                {plans.map((plan, index) => (
                    <SubscriptionCard key={index} plan={plan} />
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPage;
