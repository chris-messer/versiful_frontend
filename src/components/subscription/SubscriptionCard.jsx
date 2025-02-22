import React from "react";

const SubscriptionCard = ({ plan, onSubscribe }) => {
  return (
      <div className="card w-80 bg-base-100 dark:bg-gray-700 shadow-xl border border-gray-200">
        <div className="card-body flex flex-col items-center text-center">
          <h2 className="card-title text-xl font-bold text-center w-full">{plan.title}</h2>
          <p className="text-lg font-semibold text-primary">{plan.price}</p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{plan.description}</p>

          <ul className="text-sm text-gray-500 dark:text-gray-400 mt-3 space-y-1 w-full text-left">
            {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  ✅ <span className="ml-2">{feature}</span>
                </li>
            ))}
          </ul>

          {/* Button calls the specific function based on the plan */}
          <div className="card-actions w-full mt-4">
            <button
                className="btn btn-primary w-full"
                onClick={() => onSubscribe(plan)}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
  );
};

export default SubscriptionCard;
