const SubscriptionManagement = ({ subscription }) => {
    const handleManageSubscription = () => {
        // Mock logic for managing subscription
        alert("Redirecting to subscription management...");
    };

    const handleChangePaymentMethod = () => {
        // Mock logic for changing payment method
        alert("Redirecting to payment method update...");
    };

    const handleCancelSubscription = () => {
        // Mock logic for cancellation
        const confirmed = window.confirm("Are you sure you want to cancel your subscription?");
        if (confirmed) {
            alert("Subscription cancelled.");
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-xl font-semibold mb-4">Subscription Management</h2>
            <p className="mb-2">Status: <span className="font-bold">{subscription.status}</span></p>
            <p className="mb-4">Next Billing Date: <span className="font-bold">{subscription.nextBillingDate}</span></p>
            <div className="space-x-2">
                <button className="btn btn-primary btn-sm" onClick={handleManageSubscription}>
                    Manage Subscription
                </button>
                {/*<button className="btn btn-secondary btn-sm" onClick={handleChangePaymentMethod}>*/}
                {/*    Change Payment Method*/}
                {/*</button>*/}
                {/*<button className="btn btn-error btn-sm" onClick={handleCancelSubscription}>*/}
                {/*    Cancel Subscription*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default SubscriptionManagement;
