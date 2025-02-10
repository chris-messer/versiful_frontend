import React from "react";

const SubscriptionCard = ({ plan }) => {
  return (
    <div className="card w-80 bg-base-100 dark:bg-gray-700 shadow-xl border border-gray-200">
      <div className="card-body text-center">
        <h2 className="card-title text-xl font-bold">{plan.title}</h2>
        <p className="text-lg font-semibold text-primary">{plan.price}</p>
        <p>{plan.description}</p>
        <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-left">
          {plan.features.map((feature, index) => (
            <li key={index}>✅ {feature}</li>
          ))}
        </ul>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary w-full">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
