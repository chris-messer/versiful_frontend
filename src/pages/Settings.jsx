import { useEffect, useState } from "react";
import SubscriptionManagement from "../components/settings/SubscriptionManagement";
import PersonalizationSettings from "../components/settings/PersonalizationSettings";
import AccountSettings from "../components/settings/AccountSettings";

const skeleton = {
    subscription: { status: "...", nextBillingDate: "..." },
    preferences: {
        bibleVersion: "",
    },
    account: {
        email: "",
        phoneNumber: "",
    },
};

export default function SettingsPage() {
    const [settings, setSettings] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isPhoneSaving, setIsPhoneSaving] = useState(false);
    const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

    useEffect(() => {
        // Check for subscription success from URL params
        const params = new URLSearchParams(window.location.search);
        if (params.get('subscription') === 'success') {
            setSubscriptionSuccess(true);
            // Clean up URL
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, []);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const apiUrl = `https://api.${import.meta.env.VITE_DOMAIN}/users`;
                const resp = await fetch(apiUrl, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                if (!resp.ok) {
                    throw new Error(`HTTP error ${resp.status}`);
                }

                const data = await resp.json();
                
                console.log("Raw user data from backend:", data);
                console.log("isSubscribed:", data.isSubscribed);
                console.log("plan:", data.plan);
                console.log("currentPeriodEnd:", data.currentPeriodEnd);

                // Convert currentPeriodEnd timestamp to readable date
                let nextBillingDate = skeleton.subscription.nextBillingDate;
                if (data.currentPeriodEnd) {
                    const timestamp = parseInt(data.currentPeriodEnd);
                    const date = new Date(timestamp * 1000); // Convert from Unix timestamp to milliseconds
                    nextBillingDate = date.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    });
                    console.log("Formatted next billing date:", nextBillingDate);
                }

                const subscription = {
                    status: data.isSubscribed ? "Active" : "Free",
                    nextBillingDate: nextBillingDate,
                    plan: data.plan
                        ? data.plan.charAt(0).toUpperCase() + data.plan.slice(1)
                        : data.isSubscribed
                            ? "Premium"
                            : "Free",
                    isSubscribed: data.isSubscribed,
                    plan_monthly_cap: data.plan_monthly_cap,
                    cancelAtPeriodEnd: data.cancelAtPeriodEnd || false,
                };
                
                console.log("Formatted subscription object:", subscription);

                const preferences = {
                    bibleVersion: data.bibleVersion || skeleton.preferences.bibleVersion,
                };

                const account = {
                    email: data.email || "",
                    phoneNumber: data.phoneNumber || "",
                };

                setSettings({ subscription, preferences, account });
            } catch (err) {
                console.error("Failed to load settings", err);
                setSettings(skeleton);
            }
        };

        fetchSettings();
    }, []);

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate API delay
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdatePhoneNumber = async (phoneNumber) => {
        const digits = (phoneNumber || "").replace(/\D/g, "");
        if (digits.length !== 10) {
            alert("Please enter a 10-digit US phone number.");
            return;
        }
        const normalized = `+1${digits}`;
        setIsPhoneSaving(true);
        try {
            const apiUrl = `https://api.${import.meta.env.VITE_DOMAIN}/users`;
            const resp = await fetch(apiUrl, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: normalized }),
            });
            if (!resp.ok) {
                throw new Error(`HTTP error ${resp.status}`);
            }
            setSettings((prev) =>
                prev
                    ? { ...prev, account: { ...prev.account, phoneNumber: normalized } }
                    : prev
            );
        } catch (err) {
            console.error("Failed to update phone", err);
            alert("Could not update your phone number. Please try again.");
        } finally {
            setIsPhoneSaving(false);
        }
    };

    const data = settings || skeleton;

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white text-gray-900 py-14 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Your account</p>
                    <h1 className="text-3xl md:text-4xl font-bold">Manage your account</h1>
                    <p className="text-gray-700 max-w-3xl mx-auto">
                        Update your plan, preferences, and contact info. Changes save instantly.
                    </p>
                </div>

                {subscriptionSuccess && (
                    <div className="rounded-xl border border-green-200 bg-green-50 text-green-900 px-4 py-3">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-semibold">🎉 Subscription Activated!</p>
                                <p className="text-sm mt-1">
                                    Welcome to Premium! You now have unlimited messages. Your subscription details will appear below.
                                </p>
                            </div>
                            <button
                                onClick={() => setSubscriptionSuccess(false)}
                                className="text-green-900 hover:text-green-950"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">{/* Rest of the content */}
                    <div className="lg:col-span-2 space-y-6">
                        <SubscriptionManagement subscription={data.subscription} loading={!settings} />
                        <PersonalizationSettings
                            preferences={data.preferences}
                            setPreferences={(newPreferences) =>
                                setSettings((prev) => ({ ...(prev || {}), preferences: newPreferences }))
                            }
                            loading={!settings}
                        />
                        <AccountSettings
                            account={data.account}
                            loading={!settings || isPhoneSaving}
                            onSavePhone={handleUpdatePhoneNumber}
                        />
                        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-lg font-semibold text-gray-900">Save your updates</p>
                                <p className="text-sm text-gray-700">Changes to your plan and preferences save here.</p>
                            </div>
                            <button
                                className={`rounded-xl px-4 py-3 font-semibold text-white bg-blue-900 hover:bg-blue-950 transition ${
                                    isSaving ? "opacity-80" : ""
                                }`}
                                onClick={handleSaveChanges}
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    </div>

                    <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Need a hand?</h3>
                        <p className="text-sm text-gray-700">
                            Email{" "}
                            <a href="mailto:support@versiful.io" className="text-blue-800 font-semibold hover:underline">
                                support@versiful.io
                            </a>{" "}
                            and we’ll make these changes for you.
                        </p>
                        <div className="text-xs text-gray-600 space-y-1">
                            <p>• Change or cancel your plan anytime.</p>
                            <p>• Your number stays private—used only to send guidance.</p>
                            <p>• Preferences save automatically.</p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
