import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../components/subscription/SubscriptionCard.jsx";
import { useAuth } from "../context/AuthContext";

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
    const { isLoggedIn, login } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Require auth before plan selection
        if (!isLoggedIn) {
            login();
        }
    }, [isLoggedIn, login]);

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
                    setMessage("You’re on the Free Plan. You can start texting right away or adjust your settings.");
                } catch (error) {
                    console.error("Error updating subscription:", error);
                    alert("Failed to subscribe. Please try again.");
                }
                break;
            case "monthly":
                setMessage("Premium checkout is coming soon. Please start on the Free Plan today.");
                break;
            case "annual":
                setMessage("Annual checkout is coming soon. Please start on the Free Plan today.");
                break;
            default:
                alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white text-gray-900 py-14 px-6">
            <div className="max-w-5xl mx-auto space-y-10">
                {message && (
                    <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 px-4 py-3">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <span>{message}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate("/settings")}
                                    className="rounded-lg px-4 py-2 text-sm font-semibold bg-blue-900 text-white hover:bg-blue-950"
                                >
                                    Go to settings
                                </button>
                                <a
                                    href="sms:833-681-1158"
                                    className="rounded-lg px-4 py-2 text-sm font-semibold border border-blue-900 text-blue-900 hover:bg-blue-100"
                                >
                                    Text now
                                </a>
                            </div>
                        </div>
                    </div>
                )}
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
