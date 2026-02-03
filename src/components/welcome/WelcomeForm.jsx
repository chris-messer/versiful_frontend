import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { bibleVersions } from "../../constants/bibleVersions";
import { useAuth } from "../../context/AuthContext";
import { usePostHog } from "../../context/PostHogContext";

const WelcomeForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        bibleVersion: "KJV",
        smsConsent: false,
        ageConsent: false,
    });

    const [errors, setErrors] = useState({
        phone: "",
        email: "",
        smsConsent: "",
        ageConsent: "",
    });

    const [hasEmail, setHasEmail] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();
    const { user } = useAuth();
    const { posthog } = usePostHog();

    // Fetch user profile to check if email already exists
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const apiUrl = `https://api.${import.meta.env.VITE_DOMAIN}/users`;
                const response = await fetch(apiUrl, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    if (data.email) {
                        setHasEmail(true);
                        setFormData(prev => ({ ...prev, email: data.email }));
                    }
                    if (data.firstName) {
                        setFormData(prev => ({ ...prev, firstName: data.firstName }));
                    }
                    if (data.lastName) {
                        setFormData(prev => ({ ...prev, lastName: data.lastName }));
                    }
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const digitsOnly = formData.phone.replace(/\D/g, "");

        if (digitsOnly.length !== 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phone: "Enter a 10-digit US number (we format it for you).",
            }));
            return;
        }

        // Validate email if we don't already have one
        if (!hasEmail && !formData.email) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Please enter your email address.",
            }));
            return;
        }

        // Validate SMS consent
        if (!formData.smsConsent) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                smsConsent: "Please consent to receive SMS messages to continue.",
            }));
            return;
        }

        // Validate age consent (18+)
        if (!formData.ageConsent) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ageConsent: "You must be 18 or older to use this service.",
            }));
            return;
        }

        const normalizedPhone = `+1${digitsOnly}`;

        setSubmitting(true);
        try {
            const apiUrl = `https://api.${import.meta.env.VITE_DOMAIN}/users`;

            // Ensure the user record exists before updating
            await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });

            const updateData = {
                firstName: formData.firstName || undefined,
                lastName: formData.lastName || undefined,
                phoneNumber: normalizedPhone,
                bibleVersion: formData.bibleVersion,
                isRegistered: true,
            };

            // Only send email if we don't already have one
            if (!hasEmail && formData.email) {
                updateData.email = formData.email;
            }

            const response = await fetch(apiUrl, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("User updated successfully:", data);

            // Update PostHog with phone number and other properties
            // NOTE: SMS history linking is handled by the backend in users/helpers.py
            // Backend reads posthogAnonymousId from DynamoDB and aliases it correctly
            if (posthog && userData && userData.userId) {
                const fullPhoneNumber = `+1${digitsOnly}`;
                
                console.log('📱 Updating PostHog with phone number and email:', {
                    userId: userData.userId,
                    phoneNumber: fullPhoneNumber,
                    email: userData.email,
                    hasEmail: !!userData.email
                });
                
                // Build updated person properties
                const personProperties = {
                    user_id: userData.userId,  // CRITICAL: Store DynamoDB userId for linking to database
                    email: userData.email,  // Include email from userData
                    phone_number: fullPhoneNumber,
                    first_name: formData.firstName || undefined,
                    last_name: formData.lastName || undefined,
                    bible_version: formData.bibleVersion,
                    registration_status: 'registered',
                };
                
                console.log('📊 PostHog personProperties being sent:', personProperties);
                
                // Update PostHog person properties (no aliasing here - backend handles SMS history linking)
                posthog.identify(userData.userId, personProperties);
                
                console.log('✅ PostHog updated with phone number and email');
            } else {
                console.warn('⚠️ PostHog update skipped:', {
                    hasPostHog: !!posthog,
                    hasUserData: !!userData,
                    userId: userData?.userId
                });
            }

            navigate("/getting-started");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user information. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center space-y-1">
                <p className="text-xs uppercase tracking-wide text-blue-700 dark:text-blue-400 font-semibold">Verify your number</p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">So we can text you back</h2>
            </div>

            {loading ? (
                <div className="text-center py-4">
                    <p className="text-gray-600">Loading...</p>
                </div>
            ) : (
                <>
                    {/* Name (optional) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-900 dark:text-gray-100">First Name (optional)</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                placeholder="Pat"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-900 dark:text-gray-100">Last Name (optional)</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                placeholder="Smith"
                            />
                        </div>
                    </div>

                    {/* Email - only show if we don't already have one */}
                    {!hasEmail && (
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-900 dark:text-gray-100">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                required
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">We'll use this to send you updates about your account.</p>
                            {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>
                    )}

                    {/* Phone Number with Masking */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-900 dark:text-gray-100">Phone Number</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="1234567890 or (123) 456-7890"
                            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            inputMode="tel"
                            required
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Any 10-digit US number works. No app needed.</p>
                        {errors.phone && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* Preferred Bible Version */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-900 dark:text-gray-100">Preferred Bible Version</span>
                        </label>
                        <select
                            name="bibleVersion"
                            className="select select-bordered w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            value={formData.bibleVersion}
                            onChange={handleChange}
                        >
                            {bibleVersions.map((group, groupIndex) => (
                                <optgroup key={groupIndex} label={group.label}>
                                    {group.versions.map((version, versionIndex) => (
                                        <option key={versionIndex} value={version}>{version}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>

                    {/* SMS Consent Checkbox */}
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start space-x-3">
                            <input
                                type="checkbox"
                                name="smsConsent"
                                checked={formData.smsConsent}
                                onChange={handleChange}
                                className="checkbox checkbox-primary"
                                required
                            />
                                <span className="label-text text-sm">
                                    I consent to receive text messages from Versiful at the phone number provided. 
                                    I acknowledge that standard SMS/MMS message and data rates charged by my mobile 
                                    carrier will apply, and I am responsible for all carrier charges. 
                                    Reply STOP to unsubscribe at any time.
                                </span>
                            </label>
                            {errors.smsConsent && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.smsConsent}</p>}
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                By checking this box, you agree to our{" "}
                                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">
                                Terms of Service
                            </a>{" "}
                            and acknowledge that carrier charges may apply for text messages.
                        </p>
                    </div>

                    {/* Age Consent Checkbox (18+) */}
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start space-x-3">
                            <input
                                type="checkbox"
                                name="ageConsent"
                                checked={formData.ageConsent}
                                onChange={handleChange}
                                className="checkbox checkbox-primary"
                                required
                            />
                                <span className="label-text text-sm font-medium">
                                    I certify that I am 18 years of age or older.
                                </span>
                            </label>
                            {errors.ageConsent && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.ageConsent}</p>}
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            You must be at least 18 years old to register for and use Versiful's SMS service.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary w-full text-white bg-blue-900 dark:bg-blue-700 hover:bg-blue-950 dark:hover:bg-blue-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {submitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            'Continue'
                        )}
                    </button>
                </>
            )}
        </form>
    );
};

export default WelcomeForm;
