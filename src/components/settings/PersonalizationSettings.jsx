import { bibleVersions } from "../../constants/bibleVersions";

const PersonalizationSettings = ({ preferences, setPreferences, loading }) => {
    const handleInputChange = (key, value) => {
        setPreferences({ ...preferences, [key]: value });
    }


    return (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Personalization</h2>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Preferred Bible Version:</span>
                </label>
                <select
                    className="select select-bordered w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={preferences.bibleVersion}
                    onChange={(e) => handleInputChange("bibleVersion", e.target.value)}
                    disabled={loading}
                >
                    <option value="" disabled>Select a version</option>
                    {bibleVersions.map((group, groupIndex) => (
                        <optgroup key={groupIndex} label={group.label}>
                            {group.versions.map((version, versionIndex) => (
                                <option key={versionIndex} value={version}>{version}</option>
                            ))}
                        </optgroup>
                    ))}
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
                    disabled={loading}
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
                        disabled={loading}
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
                        disabled={loading}
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
