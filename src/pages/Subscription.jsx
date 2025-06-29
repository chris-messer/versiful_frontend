import SubscriptionCard from "../components/subscription/SubscriptionCard.jsx";
import {useNavigate} from "react-router-dom";

const SubscriptionPage = () => {
    const navigate = useNavigate();
    const plans = [
        // {
        //     title: "Basic Plan",
        //     price: "$5/mo",
        //     description: "Receive a daily Bible verse via text.",
        //     features: ["1 daily verse", "Cancel anytime"],
        // },
        {
            title: "Free Plan",
            id: "free",
            price: "$0/mo",
            description: "Up to three personalized Bible verses or parables delivered to you per week!",
            features: [
            ],
        },
        {
            title: "Premium Plan",
            id: "monthly",
            price: "$5/mo",
            description: "Unlimited access to personalized Bible verses and parables via SMS.",
            features: [
                "Unlimited parable requests via text",
                "Daily Bible verse sent to your phone",
                "Customize preferred Bible version",
                "Cancel anytime"
            ],
        },
        {
            title: "Annual Premium Plan",
            id: "annual",
            price: "$50/year",
            description: "Unlimited access to personalized Bible verses and parables via SMS.",
            features: [
                "Unlimited parable requests via text",
                "Daily Bible verse sent to your phone",
                "Customize preferred Bible version",
                "Cancel anytime"
            ],
        }
    ];

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
                            plan: "free"
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                    // alert("Successfully subscribed to the Free Plan!");
                    console.log("Subscription Updated:", data);
                    navigate("/settings");
                } catch (error) {
                    console.error("Error updating subscription:", error);
                    alert("Failed to subscribe. Please try again.");
                }
                break;
            case "monthly":
                alert("Redirecting to checkout for the Premium Plan...");
                // Replace with actual navigation or API call
                break;
            case "annual":
                alert("Redirecting to checkout for the Annual Premium Plan...");
                // Replace with actual navigation or API call
                break;
            default:
                alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Subscription</h1>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <SubscriptionCard key={index} plan={plan} onSubscribe={handleSubscribe} />
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPage;
