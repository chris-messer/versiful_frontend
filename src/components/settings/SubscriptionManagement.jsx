import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionManagement({ subscription, loading }) {
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleManagePlan = async () => {
    setRedirecting(true);
    try {
      const apiUrl = `https://api.${import.meta.env.VITE_DOMAIN}`;
      const response = await fetch(`${apiUrl}/subscription/portal`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create portal session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error opening customer portal:", error);
      alert("Failed to open subscription management. Please try again.");
      setRedirecting(false);
    }
  };

  const displayStatus = subscription?.isSubscribed ? "Premium" : "Free";
  const displayPlan = subscription?.isSubscribed 
    ? (subscription.plan || "Premium") 
    : "Free Plan (5 messages/month)";
  
  const isCanceling = subscription?.cancelAtPeriodEnd === true;

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-3">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Subscription</h2>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isCanceling ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
          {loading ? "..." : isCanceling ? "Canceling" : displayStatus}
        </span>
      </div>
      <p className="text-sm text-gray-700">
        Plan: <span className="font-semibold">{loading ? "Loading..." : displayPlan}</span>
      </p>
      {subscription?.isSubscribed && subscription?.nextBillingDate && (
        <p className="text-sm text-gray-700">
          {isCanceling ? "Access until:" : "Next billing:"} <span className="font-semibold">{subscription.nextBillingDate}</span>
        </p>
      )}
      {isCanceling && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            ⚠️ Your subscription will end on {subscription.nextBillingDate}. You'll still have access to Premium features until then.
          </p>
        </div>
      )}
      {subscription?.isSubscribed && (
        <p className="text-sm text-gray-700">
          Messages: <span className="font-semibold">Unlimited</span>
        </p>
      )}
      {!subscription?.isSubscribed && (
        <p className="text-sm text-gray-700">
          Messages remaining: <span className="font-semibold">
            {subscription?.plan_monthly_cap || 5} this month
          </span>
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        {subscription?.isSubscribed ? (
          <button
            className="flex-1 rounded-lg bg-blue-900 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-950 transition disabled:opacity-70"
            onClick={handleManagePlan}
            disabled={loading || redirecting}
          >
            {redirecting ? "Opening portal..." : "Manage subscription"}
          </button>
        ) : (
          <button
            className="flex-1 rounded-lg bg-blue-900 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-950 transition"
            onClick={() => navigate("/subscription")}
            disabled={loading}
          >
            Upgrade to Premium
          </button>
        )}
      </div>
    </div>
  );
}
