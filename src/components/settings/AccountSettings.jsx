const AccountSettings = ({ account }) => {
    const handleChangeEmail = () => {
        // Mock logic for changing email
        alert("Redirecting to email update...");
    };

    const handleChangePhoneNumber = () => {
        // Mock logic for changing phone number
        alert("Redirecting to phone number update...");
    };

    const handleDeleteAccount = () => {
        // Mock logic for account deletion
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );
        if (confirmed) {
            alert("Account deleted.");
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p className="mb-2">Email: <span className="font-bold">{account.email}</span></p>
            <p className="mb-4">Phone Number: <span className="font-bold">{account.phoneNumber}</span></p>
            <div className="space-x-2">
                <button className="btn btn-primary btn-sm" onClick={handleChangeEmail}>
                    Change Email
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleChangePhoneNumber}>
                    Change Phone Number
                </button>
                <button className="btn btn-error btn-sm" onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default AccountSettings;
