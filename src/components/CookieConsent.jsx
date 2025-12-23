import { useState, useEffect } from "react";

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setShowBanner(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookieConsent", "declined");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-2xl border-t border-gray-700"
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent banner"
        >
            <div className="container mx-auto px-4 py-4 sm:py-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold">We value your privacy</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            We use essential cookies to make our site work. We'd also like to set optional 
                            analytics cookies to help us improve it. We won't set optional cookies unless 
                            you enable them.{" "}
                            <a
                                href="/privacy"
                                className="underline hover:text-white transition-colors"
                            >
                                Learn more in our Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <button
                            onClick={declineCookies}
                            className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            Essential only
                        </button>
                        <button
                            onClick={acceptCookies}
                            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            Accept all
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

