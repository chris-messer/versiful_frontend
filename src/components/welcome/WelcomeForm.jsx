import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { bibleVersions } from "../../constants/bibleVersions";

const WelcomeForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        bibleVersion: "KJV",
    });

    const [errors, setErrors] = useState({
        phone: "",
        email: "",
    });

    const [hasEmail, setHasEmail] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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
                    const userData = await response.json();
                    if (userData.email) {
                        setHasEmail(true);
                        setFormData(prev => ({ ...prev, email: userData.email }));
                    }
                    if (userData.firstName) {
                        setFormData(prev => ({ ...prev, firstName: userData.firstName }));
                    }
                    if (userData.lastName) {
                        setFormData(prev => ({ ...prev, lastName: userData.lastName }));
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

        const normalizedPhone = `+1${digitsOnly}`;

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

            navigate("/subscription");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user information. Please try again.");
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center space-y-1">
                <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold">Verify your number</p>
                <h2 className="text-xl font-semibold text-gray-900">So we can text you back</h2>
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
                                <span className="label-text font-medium">First Name (optional)</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                                placeholder="Pat"
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
                                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                                placeholder="Smith"
                            />
                        </div>
                    </div>

                    {/* Email - only show if we don't already have one */}
                    {!hasEmail && (
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
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">We'll use this to send you updates about your account.</p>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                    )}

                    {/* Phone Number with Masking */}
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
                            inputMode="tel"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Any 10-digit US number works. No app needed.</p>
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* Preferred Bible Version */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Preferred Bible Version</span>
                        </label>
                        <select
                            name="bibleVersion"
                            className="select select-bordered w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full text-white bg-blue-900 hover:bg-blue-950 transition duration-200"
                    >
                        Continue
                    </button>
                </>
            )}
        </form>
    );
};

export default WelcomeForm;
