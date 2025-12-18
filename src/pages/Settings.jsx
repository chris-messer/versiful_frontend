import { useEffect, useState } from "react";
import SubscriptionManagement from "../components/settings/SubscriptionManagement";
import PersonalizationSettings from "../components/settings/PersonalizationSettings";
import AccountSettings from "../components/settings/AccountSettings";

const skeleton = {
    subscription: { status: "...", nextBillingDate: "..." },
    preferences: {
        bibleVersion: "",
        responseStyle: "Expanded",
        dailyInspiration: false,
        dailyInspirationTime: "morning",
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

    useEffect(() => {
        // Mock API call to fetch user settings
        const fetchSettings = async () => {
            const mockApiResponse = {
                subscription: {
                    status: "Active",
                    nextBillingDate: "2025-03-01",
                    plan: "Premium",
                },
                preferences: {
                    bibleVersion: "NIV",
                    responseStyle: "Expanded",
                    dailyInspiration: true,
                    dailyInspirationTime: "morning",
                },
                account: {
                    email: "user@example.com",
                    phoneNumber: "+1 (555) 555-1234",
                },
            };
            setSettings(mockApiResponse);
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
        if (!phoneNumber || phoneNumber.length < 7) return;
        setIsPhoneSaving(true);
        try {
            const apiUrl = `https://api.${import.meta.env.VITE_DOMAIN}/users`;
            const resp = await fetch(apiUrl, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber }),
            });
            if (!resp.ok) {
                throw new Error(`HTTP error ${resp.status}`);
            }
            setSettings((prev) =>
                prev
                    ? { ...prev, account: { ...prev.account, phoneNumber } }
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
                    <h1 className="text-3xl md:text-4xl font-bold">Manage your guidance settings</h1>
                    <p className="text-gray-700 max-w-3xl mx-auto">
                        Update your plan, preferences, and contact info. Changes save instantly—no need to re-enter
                        them later.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
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
