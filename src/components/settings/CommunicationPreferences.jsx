const CommunicationPreferences = ({ communication, setCommunication }) => {
    const handleInputChange = (key, value) => {
        setCommunication({ ...communication, [key]: value });
    };

    const handleNotificationChange = (key, value) => {
        setCommunication({
            ...communication,
            notifications: {
                ...communication.notifications,
                [key]: value,
            },
        });
    };

    return (
        <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-xl font-semibold mb-4">Communication Preferences</h2>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Receive Messages Via:</span>
                </label>
                <select
                    className="select select-bordered"
                    value={communication.method}
                    onChange={(e) => handleInputChange("method", e.target.value)}
                >
                    <option value="SMS">SMS</option>
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                </select>
            </div>
            <div className="form-control mb-4">
                <label className="label cursor-pointer">
                    <span className="label-text">Important Updates:</span>
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={communication.notifications.updates}
                        onChange={(e) => handleNotificationChange("updates", e.target.checked)}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Tips & Encouragement:</span>
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={communication.notifications.encouragement}
                        onChange={(e) => handleNotificationChange("encouragement", e.target.checked)}
                    />
                </label>
            </div>
        </div>
    );
};

export default CommunicationPreferences;
