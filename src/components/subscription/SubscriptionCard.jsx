export default function SubscriptionCard({ plan, onSubscribe, loading = false, disabled = false }) {
  const isDisabled = loading || disabled;
  
  return (
    <div
      className={`rounded-2xl border ${
        plan.highlighted ? "border-blue-200 dark:border-blue-700 shadow-xl shadow-blue-100 dark:shadow-blue-900/20" : "border-gray-100 dark:border-gray-700 shadow-lg"
      } bg-white dark:bg-gray-800 p-6 flex flex-col h-full`}
    >
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{plan.title}</h2>
        {plan.badge && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
            {plan.badge}
          </span>
        )}
      </div>

      <p className="text-3xl font-bold text-blue-900 dark:text-blue-400 mt-2">{plan.price}</p>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{plan.description}</p>

      <ul className="text-sm text-gray-700 dark:text-gray-300 mt-4 space-y-2">
        {plan.features.length === 0 ? (
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-900 dark:bg-blue-500"></span>
            <span>Includes up to 5 guided responses per month.</span>
          </li>
        ) : (
          plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-blue-900 dark:bg-blue-500"></span>
              <span>{feature}</span>
            </li>
          ))
        )}
      </ul>

      <div className="mt-auto pt-6">
        <button
          className={`w-full rounded-xl px-4 py-3 font-semibold transition ${
            plan.highlighted
              ? "bg-blue-900 dark:bg-blue-700 text-white hover:bg-blue-950 dark:hover:bg-blue-800 shadow"
              : "border border-blue-900 dark:border-blue-700 text-blue-900 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          } ${isDisabled ? "opacity-70 cursor-not-allowed" : ""}`}
          onClick={() => onSubscribe(plan)}
          disabled={isDisabled}
        >
          {loading ? "Processing..." : plan.id === "free" ? "Start for free" : "Subscribe now"}
        </button>
      </div>
    </div>
  );
}
