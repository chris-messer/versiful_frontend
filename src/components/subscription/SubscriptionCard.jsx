export default function SubscriptionCard({ plan, onSubscribe }) {
  return (
    <div
      className={`rounded-2xl border ${
        plan.highlighted ? "border-blue-200 shadow-xl shadow-blue-100" : "border-gray-100 shadow-lg"
      } bg-white p-6 flex flex-col h-full`}
    >
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-bold text-gray-900">{plan.title}</h2>
        {plan.badge && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {plan.badge}
          </span>
        )}
      </div>

      <p className="text-3xl font-bold text-blue-900 mt-2">{plan.price}</p>
      <p className="mt-2 text-gray-700">{plan.description}</p>

      <ul className="text-sm text-gray-700 mt-4 space-y-2">
        {plan.features.length === 0 ? (
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-900"></span>
            <span>Includes up to three guided responses per week.</span>
          </li>
        ) : (
          plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-blue-900"></span>
              <span>{feature}</span>
            </li>
          ))
        )}
      </ul>

      <div className="mt-auto pt-6">
        <button
          className={`w-full rounded-xl px-4 py-3 font-semibold transition ${
            plan.highlighted
              ? "bg-blue-900 text-white hover:bg-blue-950 shadow"
              : "border border-blue-900 text-blue-900 hover:bg-blue-50"
          }`}
          onClick={() => onSubscribe(plan)}
        >
          {plan.id === "free" ? "Start for free" : "Choose plan"}
        </button>
        {plan.id !== "free" && (
          <p className="text-xs text-gray-600 mt-2 text-center">Cancel anytime.</p>
        )}
      </div>
    </div>
  );
}
