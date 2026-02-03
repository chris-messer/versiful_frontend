import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useConfig } from "../hooks/useConfig";

const GettingStarted = () => {
    const { isLoggedIn } = useAuth();
    const { config } = useConfig();
    const navigate = useNavigate();

    const phoneNumber = config?.phone?.sms || "833-681-1158";
    const displayNumber = config?.phone?.display || "(833) 681-1158";

    useEffect(() => {
        // Require auth
        if (!isLoggedIn) {
            navigate('/signin');
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 pt-14 md:pt-18 px-4">
            <div className="max-w-4xl mx-auto py-12 space-y-12">
                
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-2">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">You're All Set!</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Your account is ready. You have <span className="font-semibold text-blue-900 dark:text-blue-400">5 free messages this month</span> to receive biblical guidance via text.
                    </p>
                </div>

                {/* Primary CTA - Text Now */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 space-y-6">
                    <div className="space-y-3 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                            <span className="text-sm font-semibold text-blue-900 dark:text-blue-300">Ready to use right now</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Try Your First Message</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Open your phone's messaging app and text us anything—a worry, a question, or what's on your heart.
                        </p>
                    </div>

                    {/* Large Phone Number Display */}
                    <div className="bg-gradient-to-br from-blue-900 to-blue-950 dark:from-blue-800 dark:to-blue-900 rounded-xl p-8 text-center space-y-4">
                        <p className="text-blue-200 dark:text-blue-300 font-medium uppercase text-sm tracking-wide">Text this number</p>
                        <div className="text-5xl font-bold text-white tracking-tight">
                            {displayNumber}
                        </div>
                        <a 
                            href={`sms:${phoneNumber}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-100 text-blue-900 dark:text-blue-950 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-gray-200 transition-all shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            Open Messaging App
                        </a>
                    </div>

                    {/* Example Messages */}
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">Example messages you could send:</p>
                        <div className="grid gap-3">
                            {[
                                "I'm worried about my health",
                                "How do I forgive someone?",
                                "I feel lonely today",
                                "What does God say about fear?"
                            ].map((example, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                    "{example}"
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upgrade Banner */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 rounded-xl shadow-xl overflow-hidden">
                    <div className="px-6 py-8 sm:px-8 sm:py-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left space-y-2 flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-2">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-white uppercase tracking-wide">Unlimited Access</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white">Want Unlimited Guidance?</h3>
                                <p className="text-white/90 text-base sm:text-lg">
                                    Upgrade to Premium and get unlimited SMS messages, daily verses, and priority support—all for less than a coffee per week.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <Link
                                    to="/subscription"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 dark:text-purple-700 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    View Plans
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">What happens next?</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 dark:bg-blue-700 text-white flex items-center justify-center font-bold">
                                1
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">You send a text</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Share whatever's on your heart in your own words</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 dark:bg-blue-700 text-white flex items-center justify-center font-bold">
                                2
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">We respond with Scripture</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">You'll receive a relevant Bible verse and gentle reflection</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 dark:bg-blue-700 text-white flex items-center justify-center font-bold">
                                3
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">Continue the conversation</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Text back anytime to go deeper or ask follow-up questions</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Free Tier Info */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your Free Plan</h3>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                                    <span><strong>5 messages per month</strong> via SMS</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                                    <span>Biblical guidance from your preferred translation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                                    <span>No credit card required—ever</span>
                                </li>
                            </ul>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                                Need more? <Link to="/subscription" className="text-blue-700 dark:text-blue-400 font-semibold hover:underline">View upgrade options</Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Web Chat Alternative */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                    <div className="text-center space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Prefer to chat on the web?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            You can also use our web chat interface to have conversations right here on the website. 
                            Your web chats don't count toward your SMS message limit.
                        </p>
                        <Link 
                            to="/chat"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            Try Web Chat
                        </Link>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="text-center space-y-3 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link to="/settings" className="text-blue-700 dark:text-blue-400 hover:underline font-medium">
                            Manage Account Settings
                        </Link>
                        <Link to="/subscription" className="text-blue-700 dark:text-blue-400 hover:underline font-medium">
                            View Plans
                        </Link>
                        <Link to="/how-it-works" className="text-blue-700 dark:text-blue-400 hover:underline font-medium">
                            How It Works
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default GettingStarted;

