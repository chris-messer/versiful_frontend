import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [step, setStep] = useState("email"); // 'email' | 'code'
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendCode = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const resp = await fetch(`https://api.${import.meta.env.VITE_DOMAIN}/auth/forgot-password`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email }),
            });

            const data = await resp.json();

            if (!resp.ok) {
                throw new Error(data.error || "Failed to send reset code");
            }

            setSuccess("Reset code sent! Check your email.");
            setStep("code");
        } catch (err) {
            setError(err.message || "Failed to send reset code");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            const resp = await fetch(`https://api.${import.meta.env.VITE_DOMAIN}/auth/reset-password`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, code, password }),
            });

            const data = await resp.json();

            if (!resp.ok) {
                throw new Error(data.error || "Failed to reset password");
            }

            setSuccess("Password reset successful! You can now sign in.");
            setTimeout(() => {
                window.location.href = "/signin";
            }, 2000);
        } catch (err) {
            setError(err.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-14 md:pt-18 px-4">
            <div className="max-w-xl mx-auto py-12 space-y-8">
                <div className="space-y-2 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-400">
                        Reset Password
                    </p>
                    <h1 className="text-3xl font-bold">
                        {step === "email" ? "Forgot your password?" : "Enter reset code"}
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300">
                        {step === "email" 
                            ? "Enter your email and we'll send you a code to reset your password."
                            : "Check your email for the verification code."}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                    {step === "email" ? (
                        <form className="space-y-4" onSubmit={handleSendCode}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            {error && <p className="text-sm text-red-600">{error}</p>}
                            {success && <p className="text-sm text-green-600">{success}</p>}

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-900 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-950 transition disabled:opacity-70"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send reset code"}
                            </button>
                        </form>
                    ) : (
                        <form className="space-y-4" onSubmit={handleResetPassword}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter code from email"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="At least 6 characters"
                                    required
                                    minLength={6}
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Password must be at least 6 characters long
                                </p>
                            </div>

                            {error && <p className="text-sm text-red-600">{error}</p>}
                            {success && <p className="text-sm text-green-600">{success}</p>}

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-900 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-950 transition disabled:opacity-70"
                                disabled={loading}
                            >
                                {loading ? "Resetting..." : "Reset password"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setStep("email");
                                    setCode("");
                                    setPassword("");
                                    setError("");
                                    setSuccess("");
                                }}
                                className="w-full text-sm text-blue-800 dark:text-blue-400 hover:underline"
                            >
                                Resend code
                            </button>
                        </form>
                    )}

                    <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        <Link to="/signin" className="text-blue-800 dark:text-blue-400 font-semibold hover:underline">
                            Back to sign in
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

