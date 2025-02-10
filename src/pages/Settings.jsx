import React, { useEffect, useState } from "react";
import SubscriptionManagement from "../components/settings/SubscriptionManagement";
import PersonalizationSettings from "../components/settings/PersonalizationSettings";
import CommunicationPreferences from "../components/settings/CommunicationPreferences";
import AccountSettings from "../components/settings/AccountSettings";

const SettingsPage = () => {
    const [settings, setSettings] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Mock API call to fetch user settings
        const fetchSettings = async () => {
            const mockApiResponse = {
                subscription: {
                    status: "Active",
                    nextBillingDate: "2025-03-01",
                },
                preferences: {
                    bibleVersion: "NIV",
                    responseStyle: "Expanded",
                    dailyInspiration: true,
                    dailyInspirationTime: "morning",
                },
                communication: {
                    method: "SMS",
                    notifications: {
                        updates: true,
                        encouragement: true,
                    },
                },
                account: {
                    email: "user@example.com",
                    phoneNumber: "+1234567890",
                },
            };
            setSettings(mockApiResponse);
        };

        fetchSettings();
    }, []);

    const handleSaveChanges = async () => {
        setIsSaving(true);
        // Mock API call to save settings
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Failed to save settings:", error);
            alert("Error saving settings. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!settings) {
        return <div className="flex justify-center items-center h-screen">Loading settings...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6 mt-16">
            <h1 className="text-3xl font-bold text-center">Settings</h1>
            <SubscriptionManagement subscription={settings.subscription} />
            <PersonalizationSettings
                preferences={settings.preferences}
                setPreferences={(newPreferences) =>
                    setSettings((prev) => ({ ...prev, preferences: newPreferences }))
                }
            />
            {/*<CommunicationPreferences*/}
            {/*    communication={settings.communication}*/}
            {/*    setCommunication={(newCommunication) =>*/}
            {/*        setSettings((prev) => ({ ...prev, communication: newCommunication }))*/}
            {/*    }*/}
            {/*/>*/}
            <AccountSettings account={settings.account} />
            <div className="flex justify-center mt-6">
                <button
                    className={`btn btn-primary ${isSaving ? "loading" : ""}`}
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
