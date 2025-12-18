export default function SubscriptionManagement({ subscription, loading }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-3">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Plan</h2>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">
          {loading ? "..." : subscription.plan || subscription.status}
        </span>
      </div>
      <p className="text-sm text-gray-700">
        Status: <span className="font-semibold">{loading ? "Loading..." : subscription.status}</span>
      </p>
      <p className="text-sm text-gray-700">
        Next billing: <span className="font-semibold">{loading ? "Loading..." : subscription.nextBillingDate}</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <button
          className="flex-1 rounded-lg bg-blue-900 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-950 transition"
          onClick={() => alert("Redirecting to subscription management...")}
          disabled={loading}
        >
          Manage plan
        </button>
        <button
          className="flex-1 rounded-lg border border-blue-900 text-blue-900 px-4 py-2 text-sm font-semibold hover:bg-blue-50 transition"
          onClick={() => alert("Redirecting to payment method update...")}
          disabled={loading}
        >
          Update payment
        </button>
      </div>
    </div>
  );
}
