import WelcomeForm from "../components/welcome/WelcomeForm";
import Testimonials from "../components/Testimonials";
import PrivacyNotice from "../components/welcome/PrivacyNotice";

const WelcomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center px-6 mt-16">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
                    📖 Welcome to Versiful!
                </h1>
                <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
                    Register your phone number below to start discovering relevant parables on the go!
                </p>

                {/* Registration Form */}
                <WelcomeForm />

                {/* Social Proof */}
                <Testimonials />

                {/* Privacy Notice */}
                <PrivacyNotice />
            </div>
        </div>
    );
};

export default WelcomePage;
