import { Link } from "react-router-dom";
import { useState } from "react";
import { bibleVersions } from "../constants/bibleVersions";

const OptInForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        bibleVersion: "KJV",
        smsConsent: false,
        ageConsent: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("This is a demonstration form for Twilio compliance review. The actual registration is at /welcome (authentication required).");
    };

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 pt-14 md:pt-18 px-4">
            <div className="max-w-5xl mx-auto py-10 grid lg:grid-cols-[1.1fr,1fr] gap-8 items-start">
                <div className="space-y-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Step 1 of 2</p>
                    <h1 className="text-4xl font-bold leading-tight">Add your number to start receiving guidance</h1>
                    <p className="text-lg text-gray-700">
                        We'll text Scripture and reflections to this number. After you confirm, you can pick a plan and
                        personalize your preferences.
                    </p>
                    <ul className="space-y-3 text-gray-800">
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-green-600"></span>
                            <span>No app to install—just text messages.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-green-600"></span>
                            <span>Your number is used only to send and receive guidance.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-green-600"></span>
                            <span>You'll head to plans next, then to your settings.</span>
                        </li>
                    </ul>
                    <div className="text-sm text-gray-600">
                        Already registered?{" "}
                        <Link to="/settings" className="text-blue-800 font-semibold hover:underline">
                            Go to your account settings
                        </Link>
                        .
                    </div>
                </div>

                <div className="bg-white shadow-lg border border-gray-100 rounded-xl p-6">
                    {/* EXACT REPLICA OF WelcomeForm - FULLY INTERACTIVE */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="text-center space-y-1">
                            <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold">Verify your number</p>
                            <h2 className="text-xl font-semibold text-gray-900">So we can text you back</h2>
                        </div>

                        {/* Name (optional) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">First Name (optional)</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Pat"
                                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Last Name (optional)</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Smith"
                                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">We'll use this to send you updates about your account.</p>
                        </div>

                        {/* Phone Number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="1234567890 or (123) 456-7890"
                                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Any 10-digit US number works. No app needed.</p>
                        </div>

                        {/* Preferred Bible Version */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Preferred Bible Version</span>
                            </label>
                            <select
                                name="bibleVersion"
                                value={formData.bibleVersion}
                                onChange={handleChange}
                                className="select select-bordered w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                            <p className="text-xs text-gray-500 mt-2">
                                By checking this box, you agree to our{" "}
                                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
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
                            <p className="text-xs text-gray-500 mt-1">
                                You must be at least 18 years old to register for and use Versiful's SMS service.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full text-white bg-blue-900 hover:bg-blue-950 transition duration-200"
                        >
                            Continue
                        </button>
                    </form>

                    {/* Note for compliance reviewers */}
                    <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-gray-700">
                        <strong>For Twilio Compliance Review:</strong> This is an exact replica of the SMS opt-in form shown to authenticated users at <code className="bg-white px-1 rounded">versiful.io/welcome</code>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OptInForm;
