import { bibleVersions } from "../../constants/bibleVersions";

const PersonalizationSettings = ({ preferences, setPreferences, loading }) => {
    const handleInputChange = (key, value) => {
        setPreferences({ ...preferences, [key]: value });
    }


    return (
        <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm p-5 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personalization</h2>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text text-gray-900 dark:text-gray-100">Preferred Bible Version:</span>
                </label>
                <select
                    className="select select-bordered w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
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
        </div>
    );
};

export default PersonalizationSettings;
