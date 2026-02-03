import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePostHog } from "../context/PostHogContext";

export default function SignIn() {
    const { setIsLoggedIn } = useAuth();
    const { posthog } = usePostHog();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [mode, setMode] = useState("signup"); // 'signin' | 'signup'
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
    const [touched, setTouched] = useState({ email: false, password: false });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear errors when user starts typing
        if (error) setError("");
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateField(field);
    };

    const validateField = (field) => {
        let errorMsg = "";
        
        if (field === "email" && !form.email) {
            errorMsg = "Email address is required";
        } else if (field === "password" && !form.password) {
            errorMsg = "Password is required";
        } else if (field === "password" && form.password && form.password.length < 6) {
            errorMsg = "Password must be at least 6 characters";
        }

        setFieldErrors((prev) => ({ ...prev, [field]: errorMsg }));
        return errorMsg === "";
    };

    const validateAllFields = () => {
        const emailValid = validateField("email");
        const passwordValid = validateField("password");
        setTouched({ email: true, password: true });
        return emailValid && passwordValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        // Validate all fields before submission
        if (!validateAllFields()) {
            // Focus on first error field
            if (fieldErrors.email || !form.email) {
                document.querySelector('input[name="email"]')?.focus();
            } else if (fieldErrors.password || !form.password) {
                document.querySelector('input[name="password"]')?.focus();
            }
            return;
        }
        
        setLoading(true);
        try {
            // Smart auto-detection: try login first, then signup if it fails
            let resp = await fetch(`https://api.${import.meta.env.VITE_DOMAIN}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: form.email, password: form.password }),
            });

            // If login fails with 401 (user not found or wrong password), try signup
            if (resp.status === 401 && mode === "signup") {
                resp = await fetch(`https://api.${import.meta.env.VITE_DOMAIN}/auth/signup`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: form.email, password: form.password }),
                });
            }

            if (!resp.ok) {
                // Try to get detailed error message from response
                let errorMessage = mode === "signup" ? "Could not create your account." : "Invalid email or password.";
                try {
                    const errorData = await resp.json();
                    if (errorData.error) {
                        errorMessage = errorData.error;
                    }
                } catch (e) {
                    // If response is not JSON, use default message
                }
                
                if (resp.status === 409) {
                    errorMessage = "An account with this email already exists. Try signing in instead.";
                } else if (resp.status === 401 && mode === "signin") {
                    errorMessage = "Invalid email or password. Please try again.";
                }
                throw new Error(errorMessage);
            }

            const userCheckResponse = await fetch(`https://api.${import.meta.env.VITE_DOMAIN}/users`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!userCheckResponse.ok) {
                throw new Error("Unable to load your account. Please try again.");
            }

            const userData = await userCheckResponse.json();
            setIsLoggedIn(true);

            // Identify user in PostHog with userId and person properties
            if (userData && posthog) {
                const userId = userData.userId;
                const anonymousId = posthog.get_distinct_id();
                
                console.log('🔍 PostHog Identify (SignIn):', {
                    userId,
                    userEmail: userData.email,
                    currentDistinctId: anonymousId,
                    mode
                });
                
                // Build person properties
                const personProperties = {
                    user_id: userId,  // CRITICAL: Store DynamoDB userId for linking to database
                    email: userData.email,  // Plain email as per PostHog docs
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
                console.log('📝 Calling posthog.identify (SignIn)');
                posthog.identify(userId, personProperties);
                
                // Explicitly set person properties using $set to ensure they persist
                console.log('📝 Explicitly setting person properties with $set (SignIn)');
                posthog.capture('$set', {
                    $set: {
                        email: userData.email,
                        user_id: userId,
                        plan: userData.plan || 'free',
                        is_subscribed: userData.isSubscribed || false,
                        registration_status: 'registered'
                    }
                });
                
                // Link anonymous events if this was a signup (new account)
                // Only alias if current distinct_id is different and looks like an anonymous UUID
                if (anonymousId !== userId && anonymousId.includes('-')) {
                    console.log('🔗 Linking anonymous web events to user (SignIn):', {
                        anonymousId,
                        userId
                    });
                    posthog.alias(userId, anonymousId);
                }
            } else {
                console.warn('⚠️ PostHog identify skipped in SignIn:', {
                    hasPostHog: !!posthog,
                    hasUserData: !!userData
                });
            }

            if (!userData.isRegistered) {
                navigate("/welcome");
            } else if (!userData.isSubscribed) {
                navigate("/subscription");
            } else {
                navigate("/settings");
            }
        } catch (err) {
            setError(err.message || "Sign-in failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = () => {
        const domain = import.meta.env.VITE_DOMAIN;
        const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
        const redirectUri = encodeURIComponent(import.meta.env.VITE_CALLBACK_URL);
        const scope = encodeURIComponent("email openid profile");
        window.location.href = `https://auth.${domain}/oauth2/authorize?identity_provider=Google&redirect_uri=${redirectUri}&response_type=code&client_id=${clientId}&scope=${scope}`;
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-14 md:pt-18 px-4">
            <div className="max-w-xl mx-auto py-12 space-y-8">
                <div className="space-y-2 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-400">
                        {mode === "signup" ? "Create account" : "Sign in"}
                    </p>
                    <h1 className="text-3xl font-bold">
                        {mode === "signup" ? "Start with a Versiful account" : "Welcome back to Versiful"}
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300">
                        {mode === "signup"
                            ? "Enter your email and password to get started"
                            : "Use your email and password to continue"}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Email <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                onBlur={() => handleBlur("email")}
                                className={`mt-2 w-full rounded-lg border ${
                                    touched.email && fieldErrors.email 
                                        ? "border-red-500 bg-red-50 dark:bg-red-900/10" 
                                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                } text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 ${
                                    touched.email && fieldErrors.email 
                                        ? "focus:ring-red-500" 
                                        : "focus:ring-blue-500"
                                }`}
                                placeholder="you@example.com"
                                aria-invalid={touched.email && !!fieldErrors.email}
                                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                            />
                            {touched.email && fieldErrors.email && (
                                <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {fieldErrors.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Password <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                onBlur={() => handleBlur("password")}
                                className={`mt-2 w-full rounded-lg border ${
                                    touched.password && fieldErrors.password 
                                        ? "border-red-500 bg-red-50 dark:bg-red-900/10" 
                                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                } text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 ${
                                    touched.password && fieldErrors.password 
                                        ? "focus:ring-red-500" 
                                        : "focus:ring-blue-500"
                                }`}
                                placeholder="At least 6 characters"
                                minLength={6}
                                aria-invalid={touched.password && !!fieldErrors.password}
                                aria-describedby={fieldErrors.password ? "password-error" : "password-hint"}
                            />
                            {touched.password && fieldErrors.password ? (
                                <p id="password-error" className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {fieldErrors.password}
                                </p>
                            ) : (
                                <p id="password-hint" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Password must be at least 6 characters long
                                </p>
                            )}
                        </div>

                        {mode === "signin" && (
                            <div className="flex justify-end">
                                <Link 
                                    to="/forgot-password" 
                                    className="text-sm text-blue-800 dark:text-blue-400 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        )}

                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-900 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-950 transition disabled:opacity-70"
                            disabled={loading}
                        >
                            {loading
                                ? mode === "signup"
                                    ? "Creating account..."
                                    : "Signing in..."
                                : mode === "signup"
                                    ? "Create account"
                                    : "Sign in"}
                        </button>
                        <div className="relative pt-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200 dark:border-gray-600"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">or</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleGoogle}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                        >
                            Continue with Google
                        </button>
                    </form>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                        <span>
                            {mode === "signup"
                                ? "Already have an account? "
                                : "New to Versiful? "}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                setMode(mode === "signup" ? "signin" : "signup");
                                setError("");
                            }}
                            className="text-blue-800 dark:text-blue-400 font-semibold hover:underline underline-offset-2"
                        >
                            {mode === "signup" ? "Sign in" : "Create an account"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

