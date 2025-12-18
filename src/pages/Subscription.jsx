import SubscriptionCard from "../components/subscription/SubscriptionCard.jsx";
import { useNavigate } from "react-router-dom";

const plans = [
    {
        title: "Free Plan",
        id: "free",
        price: "$0 / mo",
        badge: "Start here",
        description: "Try Versiful with up to three guided Scripture responses each week.",
        features: [
            "3 guided replies per week",
            "SMS only—no app to install",
            "Keep your preferences",
        ],
    },
    {
        title: "Premium Plan",
        id: "monthly",
        price: "$5 / mo",
        badge: "Most popular",
        description: "Unlimited guidance by text with daily verse options and saved history.",
        features: [
            "Unlimited guided replies",
            "Daily verse option",
            "Choose your Bible translation",
            "Cancel anytime",
        ],
        highlighted: true,
    },
    {
        title: "Annual Premium",
        id: "annual",
        price: "$50 / yr",
        badge: "Best value",
        description: "A year of unlimited encouragement and Scripture, with your preferences saved.",
        features: [
            "Unlimited guided replies",
            "Daily verse option",
            "Choose your Bible translation",
            "Cancel anytime",
        ],
    },
];

export default function SubscriptionPage() {
    const navigate = useNavigate();

    const handleSubscribe = async (plan) => {
        const apiUrl = `https://api.${import.meta.env.VITE_DOMAIN}/users`;
        switch (plan.id) {
            case "free":
                try {
                    const response = await fetch(apiUrl, {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            isSubscribed: true,
                            plan: "free",
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    await response.json();
                    navigate("/settings");
                } catch (error) {
                    console.error("Error updating subscription:", error);
                    alert("Failed to subscribe. Please try again.");
                }
                break;
            case "monthly":
                alert("Redirecting to checkout for the Premium Plan...");
                break;
            case "annual":
                alert("Redirecting to checkout for the Annual Premium Plan...");
                break;
            default:
                alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white text-gray-900 py-14 px-6">
            <div className="max-w-5xl mx-auto space-y-10">
                <div className="text-center space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Plans for every pace</p>
                    <h1 className="text-4xl font-bold leading-tight">Choose the guidance that fits you</h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Stay on the free plan or move to unlimited. All plans use simple text messages—no apps to
                        install, no tech learning curve.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <SubscriptionCard key={plan.id} plan={plan} onSubscribe={handleSubscribe} />
                    ))}
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-lg font-semibold text-gray-900">Need help choosing?</p>
                        <p className="text-gray-700">
                            Start free, or upgrade any time. You can change or cancel whenever you like.
                        </p>
                    </div>
                    <div className="text-sm text-gray-600">
                        For questions, email{" "}
                        <a href="mailto:support@versiful.io" className="text-blue-800 font-semibold hover:underline">
                            support@versiful.io
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
