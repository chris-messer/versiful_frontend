import { useState, useEffect } from "react";

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setShowBanner(false);
        // PostHog tracking will be enabled based on this consent
    };

    const declineCookies = () => {
        localStorage.setItem("cookieConsent", "declined");
        setShowBanner(false);
        // PostHog tracking will remain disabled
    };

    const minimizeBanner = () => {
        setIsMinimized(true);
        // Auto-save as declined after 30 days if user never makes a choice
        setTimeout(() => {
            const currentConsent = localStorage.getItem("cookieConsent");
            if (currentConsent === null) {
                localStorage.setItem("cookieConsent", "declined");
                setShowBanner(false);
            }
        }, 30 * 24 * 60 * 60 * 1000);
    };

    if (!showBanner) return null;

    return (
        <div
            className={`fixed z-50 transition-all duration-300 ${
                isMinimized 
                    ? 'bottom-4 right-4 w-auto' 
                    : 'bottom-4 right-4 max-w-sm'
            }`}
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
        >
            {isMinimized ? (
                <button
                    onClick={() => setIsMinimized(false)}
                    className="bg-gray-900 dark:bg-gray-950 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2 border border-gray-700"
                    aria-label="Expand cookie settings"
                >
                    🍪 Cookie Settings
                </button>
            ) : (
                <div className="bg-gray-900 dark:bg-gray-950 text-white p-4 rounded-lg shadow-2xl border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-sm font-semibold">🍪 Cookies</h3>
                        <button
                            onClick={minimizeBanner}
                            className="text-gray-400 hover:text-white -mt-1 -mr-1 p-1"
                            aria-label="Minimize banner"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                        We use cookies for analytics.{" "}
                        <a href="/privacy" className="underline hover:text-white">
                            Learn more
                        </a>
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={declineCookies}
                            className="flex-1 px-3 py-1.5 text-xs rounded border border-gray-600 hover:bg-gray-800 transition-colors"
                        >
                            Decline
                        </button>
                        <button
                            onClick={acceptCookies}
                            className="flex-1 px-3 py-1.5 text-xs rounded bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

