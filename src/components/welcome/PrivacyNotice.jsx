import React from "react";

const PrivacyNotice = () => {
    return (
        <div className="mt-6 text-sm text-center text-gray-600 dark:text-gray-300">
            <p>We respect your privacy. Your number is only used for sending messages.</p>
            <div className="flex justify-center space-x-4 mt-2">
                <a href="/privacy" className="link link-hover">Privacy Policy</a>
                <a href="/terms" className="link link-hover">Terms of Service</a>
            </div>
        </div>
    );
};

export default PrivacyNotice;
