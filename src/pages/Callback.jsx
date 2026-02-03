import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePostHog } from "../context/PostHogContext";

const Callback = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();
    const { posthog } = usePostHog();
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const hasAttemptedAuth = useRef(false); // Prevent double execution in dev mode

    const backendAuthEndpoint = `https://api.${import.meta.env.VITE_DOMAIN}/auth/callback`;
    const userCheckEndpoint = `https://api.${import.meta.env.VITE_DOMAIN}/users`;

    const handleAuth = async (code) => {
        try {
            setIsProcessing(true);
            setError(null);
            
            // Send authorization code to backend
            const authResponse = await fetch(backendAuthEndpoint, {
                method: "POST",
                credentials: "include",  // Ensures cookies are included in future requests
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code, redirectUri: import.meta.env.VITE_CALLBACK_URL}),
            });

            if (!authResponse.ok) {
                const errorData = await authResponse.json().catch(() => ({}));
                throw new Error(errorData.error || "Authentication failed");
            }

            // User is now authenticated, set login state
            setIsLoggedIn(true);

            // Now check if user exists
            const userCheckResponse = await fetch(userCheckEndpoint, {
                method: "POST",
                credentials: "include", // Includes auth cookies
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!userCheckResponse.ok) {
                const errorData = await userCheckResponse.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to check user registration");
            }

            const userData = await userCheckResponse.json();

            // Identify user in PostHog with userId and person properties
            if (userData && posthog) {
                const userId = userData.userId;
                const anonymousId = posthog.get_distinct_id();
                
                console.log('🔍 PostHog Identify (Callback):', {
                    userId,
                    userEmail: userData.email,
                    currentDistinctId: anonymousId
                });
                
                // Build person properties
                const personProperties = {
                    user_id: userId,  // CRITICAL: Store DynamoDB userId for linking to database
                    email: userData.email,
                    plan: userData.plan || 'free',
                    is_subscribed: userData.isSubscribed || false,
                    registration_status: 'registered',
                    channel: 'web',
                };
                
                // Add optional properties if available
                if (userData.phoneNumber) personProperties.phone_number = userData.phoneNumber;
                if (userData.firstName) personProperties.first_name = userData.firstName;
                if (userData.lastName) personProperties.last_name = userData.lastName;
                if (userData.bibleVersion) personProperties.bible_version = userData.bibleVersion;
                if (userData.createdAt) personProperties.created_at = userData.createdAt;
                
                // Identify user with their userId (DynamoDB UUID)
                console.log('📝 Calling posthog.identify (Callback)');
                posthog.identify(userId, personProperties);
                
                // Link anonymous events (for new signups via OAuth)
                if (anonymousId !== userId && anonymousId.includes('-')) {
                    console.log('🔗 Linking anonymous web events to user (Callback):', {
                        anonymousId,
                        userId
                    });
                    posthog.alias(userId, anonymousId);
                }
            } else {
                console.warn('⚠️ PostHog identify skipped in Callback:', {
                    hasPostHog: !!posthog,
                    hasUserData: !!userData
                });
            }

            // Navigate based on user state
            if (!userData.isRegistered) {
                console.log("User is not registered", userData);
                navigate("/welcome", { replace: true });
            } else if (!userData.isSubscribed) {
                // User is on free tier - check if they've exhausted their messages
                const smsUsage = userData.smsUsage;
                if (smsUsage && smsUsage.messagesSent >= smsUsage.messageLimit) {
                    console.log("User has exhausted free tier messages", userData);
                    navigate("/subscription?exhausted=true", { replace: true });
                } else {
                    console.log("User is registered but not subscribed", userData);
                    navigate("/getting-started", { replace: true });
                }
            } else {
                console.log("User is fully set up", userData);
                navigate("/chat", { replace: true });
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            setError(error.message || "Authentication failed. Please try again.");
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        // Prevent double execution in React Strict Mode (dev)
        if (hasAttemptedAuth.current) {
            return;
        }
        
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            hasAttemptedAuth.current = true;
            handleAuth(code);
        } else {
            console.error("No authorization code found in the URL.");
            setError("No authorization code found. Please try signing in again.");
            setIsProcessing(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run only once on mount

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                {error && !isProcessing ? (
                    // Error state - only show if not processing
                    <div className="space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30">
                            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Authentication Failed</h2>
                        <p className="text-gray-600 dark:text-gray-400">{error}</p>
                        <button
                            onClick={() => navigate('/signin')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 dark:bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-950 dark:hover:bg-blue-800 transition-all shadow-lg"
                        >
                            Back to Sign In
                        </button>
                    </div>
                ) : (
                    // Loading state - show while processing
                    <div className="space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30">
                            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Signing you in...</h2>
                        <p className="text-gray-600 dark:text-gray-400">Just a moment</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Callback;
