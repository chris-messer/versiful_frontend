import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [mode, setMode] = useState("signup"); // 'signin' | 'signup'
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const endpoint =
                mode === "signup"
                    ? `https://api.${import.meta.env.VITE_DOMAIN}/auth/signup`
                    : `https://api.${import.meta.env.VITE_DOMAIN}/auth/login`;

            const resp = await fetch(endpoint, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: form.email, password: form.password }),
            });

            if (!resp.ok) {
                if (resp.status === 409) {
                    throw new Error("That email is already registered. Try signing in.");
                }
                throw new Error(mode === "signup" ? "Could not create your account." : "Invalid email or password.");
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
                            ? "Takes under a minute. You can also continue with Google."
                            : "Use your email and password to continue."}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your password"
                                required
                            />
                        </div>

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
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span>
                            {mode === "signup"
                                ? "Already have an account?"
                                : "New to Versiful?"}
                        </span>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                                className="text-blue-800 dark:text-blue-400 font-semibold hover:underline underline-offset-2"
                            >
                                {mode === "signup" ? "Switch to Sign in" : "Create an account"}
                            </button>
                            <button
                                type="button"
                                onClick={handleGoogle}
                                className="text-blue-800 dark:text-blue-400 font-semibold hover:underline underline-offset-2"
                            >
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

