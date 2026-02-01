import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePostHog } from '../context/PostHogContext';
import { useConfig } from '../hooks/useConfig';

/**
 * Mobile sticky CTA bar that appears after scrolling
 * Shows "Start Trial" and "Try Free" buttons at bottom of screen
 * Only visible on mobile devices (<768px)
 */
export default function MobileStickyCTA() {
    const { login } = useAuth();
    const { posthog } = usePostHog();
    const { config } = useConfig();
    const [show, setShow] = useState(false);
    const phoneNumber = config?.phone?.sms || "833-681-1158";

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 300px down
            setShow(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGetStarted = () => {
        if (posthog) {
            posthog.capture('landing_cta_clicked', {
                cta_location: 'mobile_sticky',
                cta_type: 'signup',
                device: 'mobile'
            });
        }
        login();
    };

    const handleTryText = () => {
        if (posthog) {
            posthog.capture('try_text_clicked', {
                source: 'mobile_sticky',
                device: 'mobile'
            });
        }
    };

    // Don't render if not shown or on desktop
    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-3 shadow-2xl z-50 md:hidden">
            <div className="flex gap-2">
                <button
                    onClick={handleGetStarted}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-center hover:bg-blue-700 transition-colors"
                >
                    Start Trial
                </button>
                <a
                    href={`sms:${phoneNumber}?body=Hi Versiful, today I am feeling...`}
                    onClick={handleTryText}
                    className="flex-1 border-2 border-blue-600 text-blue-600 dark:text-blue-400 py-3 px-4 rounded-lg font-bold text-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                    Try Free
                </a>
            </div>
        </div>
    );
}

