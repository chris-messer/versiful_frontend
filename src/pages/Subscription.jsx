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
        description: "Try Versiful with up to 5 guided Scripture responses each month.",
        features: [
            "5 guided replies per month",
            "SMS only—no app to install",
            "Keep your preferences",
        ],
    },
    {
        title: "Premium Plan",
        id: "monthly",
        price: "$9.99 / mo",
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
        price: "$99.99 / yr",
        badge: "Best value",
        description: "A year of unlimited encouragement and Scripture, with your preferences saved.",
        features: [
            "Unlimited guided replies",
            "Daily verse option",
            "Choose your Bible translation",
            "Save 17% vs monthly",
            "Cancel anytime",
        ],
    },
];

export default function SubscriptionPage() {
    const { isLoggedIn, login } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [priceIds, setPriceIds] = useState(null);
    const [fetchingPrices, setFetchingPrices] = useState(true);

    useEffect(() => {
        // Require auth before plan selection
        if (!isLoggedIn) {
            login();
            return; // Don't continue if not logged in
        }
    }, [isLoggedIn, login]);

    // Fetch price IDs from backend (only when logged in)
    useEffect(() => {
        if (!isLoggedIn) {
            return; // Wait until logged in
        }

        const fetchPrices = async () => {
            setFetchingPrices(true);
            try {
                console.log("Fetching prices from:", `https://api.${import.meta.env.VITE_DOMAIN}/subscription/prices`);
                const response = await fetch(
                    `https://api.${import.meta.env.VITE_DOMAIN}/subscription/prices`,
                    {
                        credentials: "include", // Include auth cookies
                    }
                );
                console.log("Price fetch response status:", response.status);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Price data received:", data);
                    setPriceIds(data);
                } else {
                    const errorText = await response.text();
                    console.error("Failed to fetch prices:", response.status, errorText);
                }
            } catch (error) {
                console.error("Error fetching prices:", error);
            } finally {
                setFetchingPrices(false);
            }
        };
        fetchPrices();
    }, [isLoggedIn]);

    const handleSubscribe = async (plan) => {
        const apiUrl = `https://api.${import.meta.env.VITE_DOMAIN}`;
        
        if (plan.id === "free") {
            // Handle free plan - just update user record
            try {
                const response = await fetch(`${apiUrl}/users`, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        isSubscribed: false,
                        plan_monthly_cap: 5,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                await response.json();
                setMessage("You're on the Free Plan. You can start texting right away or adjust your settings.");
            } catch (error) {
                console.error("Error updating subscription:", error);
                alert("Failed to subscribe. Please try again.");
            }
            return;
        }

        // Handle paid plans - redirect to Stripe Checkout
        if (!priceIds) {
            alert("Loading payment information. Please try again in a moment.");
            return;
        }

        setLoading(true);
        try {
            const priceId = plan.id === "monthly" ? priceIds.monthly : priceIds.annual;
            
            // Create checkout session
            const response = await fetch(`${apiUrl}/subscription/checkout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priceId: priceId,
                    successUrl: `${window.location.origin}/settings?subscription=success`,
                    cancelUrl: `${window.location.origin}/subscription?canceled=true`,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create checkout session");
            }

            const { url } = await response.json();

            // Redirect to Stripe Checkout using the URL
            if (url) {
                window.location.href = url;
            } else {
                throw new Error("No checkout URL returned");
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
            alert(`Failed to start checkout: ${error.message}`);
            setLoading(false);
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

                {new URLSearchParams(window.location.search).get("canceled") && (
                    <div className="rounded-xl border border-yellow-200 bg-yellow-50 text-yellow-900 px-4 py-3">
                        <p>Checkout was canceled. You can try again anytime or start with the free plan.</p>
                    </div>
                )}

                <div className="text-center space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Plans for every pace</p>
                    <h1 className="text-4xl font-bold leading-tight">Choose the guidance that fits you</h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Stay on the free plan or upgrade to unlimited. All plans use simple text messages—no apps to
                        install, no tech learning curve.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fetchingPrices ? (
                        <div className="col-span-full text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
                            <p className="mt-4 text-gray-600">Loading subscription options...</p>
                        </div>
                    ) : (
                        plans.map((plan) => (
                            <SubscriptionCard 
                                key={plan.id} 
                                plan={plan} 
                                onSubscribe={handleSubscribe}
                                loading={loading && plan.id !== "free"}
                                disabled={plan.id !== "free" && !priceIds}
                            />
                        ))
                    )}
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
