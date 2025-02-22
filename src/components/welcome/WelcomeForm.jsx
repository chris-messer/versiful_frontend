import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import { bibleVersions } from "../../constants/bibleVersions";

const WelcomeForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        confirmPhone: "",
        bibleVersion: "KJV",
        dailyInspiration: false,
        inspirationTime: "morning",
    });

    const [errors, setErrors] = useState({
        phone: "",
        confirmPhone: ""
    });

    const navigate = useNavigate();

    const validatePhoneNumber = (phone) => {
        // Ensure correct phone format (XXX) XXX-XXXX
        const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
        return phonePattern.test(phone);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        if (name === "phone" || name === "confirmPhone") {
            if (!validatePhoneNumber(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Invalid phone format. Use (123) 456-7890.",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePhoneNumber(formData.phone)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phone: "Please enter a valid phone number in (123) 456-7890 format.",
            }));
            return;
        }

        if (formData.phone !== formData.confirmPhone) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPhone: "Phone numbers do not match.",
            }));
            return;
        }

        try {
            const response = await fetch(`https://api.${import.meta.env.VITE_DOMAIN}/users`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    bibleVersion: formData.bibleVersion,
                    dailyInspiration: formData.dailyInspiration,
                    inspirationTime: formData.dailyInspiration ? formData.inspirationTime : null,
                    isRegistered: true,
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("User updated successfully:", data);

            // alert("Your information has been updated successfully!");
            navigate("/subscription");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user information. Please try again.");
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Register</h2>

            {/* First Name */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium">First Name</span>
                </label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* Last Name */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium">Last Name</span>
                </label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* Phone Number with Masking */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium">Phone Number</span>
                </label>
                <InputMask
                    mask="(999) 999-9999"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                    required
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Confirm Phone Number */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium">Confirm Phone Number</span>
                </label>
                <InputMask
                    mask="(999) 999-9999"
                    type="tel"
                    name="confirmPhone"
                    value={formData.confirmPhone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                    required
                />
                {errors.confirmPhone && <p className="text-red-500 text-sm mt-1">{errors.confirmPhone}</p>}
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
                    <option value="" disabled></option>
                    {bibleVersions.map((group, groupIndex) => (
                        <optgroup key={groupIndex} label={group.label}>
                            {group.versions.map((version, versionIndex) => (
                                <option key={versionIndex} value={version}>{version}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>

            {/* Receive Daily Inspiration Toggle */}
            <div className="form-control flex flex-row justify-between items-center">
                <span className="label-text font-medium">Receive Daily Inspiration?</span>
                <input
                    type="checkbox"
                    name="dailyInspiration"
                    checked={formData.dailyInspiration}
                    onChange={handleChange}
                    className="toggle"
                />
            </div>

            {/* Preferred Time Selection (if daily inspiration is checked) */}
            {formData.dailyInspiration && (
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Preferred Time</span>
                    </label>
                    <select
                        name="inspirationTime"
                        value={formData.inspirationTime}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                    </select>
                </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full text-white bg-blue-600 hover:bg-blue-700 transition duration-200">
                Get Started
            </button>
        </form>
    );
};

export default WelcomeForm;
