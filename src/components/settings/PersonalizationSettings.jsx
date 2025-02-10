const PersonalizationSettings = ({ preferences, setPreferences }) => {
    const handleInputChange = (key, value) => {
        setPreferences({ ...preferences, [key]: value });
    };

    return (
        <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-xl font-semibold mb-4">Personalization Settings</h2>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Preferred Bible Version:</span>
                </label>
                <select
                    className="select select-bordered"
                    value={preferences.bibleVersion}
                    onChange={(e) => handleInputChange("bibleVersion", e.target.value)}
                >
                    <option value="NIV">NIV</option>
                    <option value="KJV">KJV</option>
                    <option value="ESV">ESV</option>
                </select>
            </div>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Response Style:</span>
                </label>
                <select
                    className="select select-bordered"
                    value={preferences.responseStyle}
                    onChange={(e) => handleInputChange("responseStyle", e.target.value)}
                >
                    <option value="Short">Short & Direct</option>
                    <option value="Expanded">Expanded with Explanation</option>
                </select>
            </div>
            <div className="form-control mb-4">
                <label className="label cursor-pointer">
                    <span className="label-text">Daily Inspiration:</span>
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={preferences.dailyInspiration}
                        onChange={(e) => handleInputChange("dailyInspiration", e.target.checked)}
                    />
                </label>
            </div>
            {preferences.dailyInspiration && (
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Preferred Time:</span>
                    </label>
                    <select
                        className="select select-bordered"
                        value={preferences.dailyInspirationTime}
                        onChange={(e) => handleInputChange("dailyInspirationTime", e.target.value)}
                    >
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default PersonalizationSettings;
