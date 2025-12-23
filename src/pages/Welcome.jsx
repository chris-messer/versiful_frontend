import { useEffect } from "react";
import { Link } from "react-router-dom";
import WelcomeForm from "../components/welcome/WelcomeForm";
import Testimonials from "../components/Testimonials";
import PrivacyNotice from "../components/welcome/PrivacyNotice";
import { useAuth } from "../context/AuthContext";

const WelcomePage = () => {
    const { isLoggedIn, login } = useAuth();

    useEffect(() => {
        // Require auth before phone capture
        if (!isLoggedIn) {
            login();
        }
    }, [isLoggedIn, login]);

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 pt-14 md:pt-18 px-4">
            <div className="max-w-5xl mx-auto py-10 grid lg:grid-cols-[1.1fr,1fr] gap-8 items-start">
                <div className="space-y-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Step 1 of 2</p>
                    <h1 className="text-4xl font-bold leading-tight">Add your number to start receiving guidance</h1>
                    <p className="text-lg text-gray-700">
                        We’ll text Scripture and reflections to this number. After you confirm, you can pick a plan and
                        personalize your preferences.
                    </p>
                    <ul className="space-y-3 text-gray-800">
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-green-600"></span>
                            <span>No app to install—just text messages.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-green-600"></span>
                            <span>Your number is used only to send and receive guidance.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-green-600"></span>
                            <span>You’ll head to plans next, then to your settings.</span>
                        </li>
                    </ul>
                    <div className="text-sm text-gray-600">
                        Already registered?{" "}
                        <Link to="/settings" className="text-blue-800 font-semibold hover:underline">
                            Go to your account settings
                        </Link>
                        .
                    </div>
                </div>

                <div className="bg-white shadow-lg border border-gray-100 rounded-xl p-6">
                    <WelcomeForm />
                    <Testimonials />
                    <PrivacyNotice />
                </div>
            </div>
        </main>
    );
};

export default WelcomePage;
