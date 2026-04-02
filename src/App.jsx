import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostHogProvider } from "./context/PostHogContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import Callback from "./pages/Callback";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import Welcome from "./pages/Welcome";
import GettingStarted from "./pages/GettingStarted";
import Chat from "./pages/Chat";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import SmsConsent from "./pages/SmsConsent";
import OptInForm from "./pages/OptInForm";
import TracebackCompliance from "./pages/TracebackCompliance";
import ForgotPassword from "./pages/ForgotPassword";
import { useEffect } from "react";
import SignIn from "./pages/SignIn";

export default function App() {
    useEffect(() => {
        // Sync theme with system preference
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const applyTheme = () => {
            document.documentElement.classList.toggle("dark", mediaQuery.matches);
        };

        applyTheme();
        mediaQuery.addEventListener("change", applyTheme);
        return () => mediaQuery.removeEventListener("change", applyTheme);
    }, []);

    return (
        <PostHogProvider>
            <AuthProvider>
                <Router>
                    {/* Updated background with warm theme */}
                    <div className="min-h-screen bg-cream dark:bg-charcoal transition-colors text-charcoal dark:text-cream pt-16 md:pt-20 font-body">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/features" element={<FeaturesPage />} />
                            <Route path="/how-it-works" element={<HowItWorksPage />} />
                            <Route path="/callback" element={<Callback />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/subscription" element={<Subscription />} />
                            <Route path="/welcome" element={<Welcome />} />
                            <Route path="/getting-started" element={<GettingStarted />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms" element={<TermsOfService />} />
                            <Route path="/sms-consent" element={<SmsConsent />} />
                            <Route path="/opt-in-form" element={<OptInForm />} />
                            <Route path="/traceback-compliance" element={<TracebackCompliance />} />
                        </Routes>
                        <Footer />
                        <CookieConsent />
                    </div>
                </Router>
            </AuthProvider>
        </PostHogProvider>
    );
}
