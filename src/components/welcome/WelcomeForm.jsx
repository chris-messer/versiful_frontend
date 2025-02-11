import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { bibleVersions } from "../../constants/bibleVersions";

const WelcomeForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        confirmPhone: "",
        bibleVersion: "NIV",
        dailyInspiration: false,
        inspirationTime: "morning",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.phone !== formData.confirmPhone) {
            alert("Phone numbers do not match!");
            return;
        }
        alert("Welcome.jsx! Your preferences have been saved.");
        console.log("User Data:", formData);
        navigate("/subscribe");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Your Name</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Phone Number</span>
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Confirm Phone Number</span>
                </label>
                <input
                    type="tel"
                    name="confirmPhone"
                    value={formData.confirmPhone}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Preferred Bible Version:</span>
                </label>
                <select
                    name="bibleVersion"
                    className="select select-bordered w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <div className="form-control flex flex-row justify-between items-center">
                <span className="label-text">Receive Daily Inspiration?</span>
                <input
                    type="checkbox"
                    name="dailyInspiration"
                    checked={formData.dailyInspiration}
                    onChange={handleChange}
                    className="toggle"
                />
            </div>

            {formData.dailyInspiration && (
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Preferred Time</span>
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

            <button type="submit" className="btn btn-primary w-full">
                Get Started
            </button>
        </form>
    );
};

export default WelcomeForm;
