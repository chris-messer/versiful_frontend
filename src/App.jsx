import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostHogProvider } from "./context/PostHogContext";
import { CompanionProvider } from "./context/CompanionContext";
import { CompanionToast } from "./components/companion/ui";
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
// Companion mockup pages (frontend-only, mock data)
import MyWalk from "./pages/MyWalk";
import Prayers from "./pages/Prayers";
import Journal from "./pages/Journal";
import Plans from "./pages/Plans";
import PlanDetail from "./pages/PlanDetail";

// Layout lives inside the Router so it can react to the current route. The
// /chat screen uses a fixed, full-viewport layout, so we hide the global Footer
// there (it was overlapping the chat) and drop the top padding/scroll.
function AppLayout() {
    const { pathname } = useLocation();
    const isChat = pathname === "/chat";

    return (
        <div
            className={
                isChat
                    ? "h-screen overflow-hidden bg-cream dark:bg-charcoal text-charcoal dark:text-cream font-body"
                    : "min-h-screen bg-cream dark:bg-charcoal transition-colors text-charcoal dark:text-cream pt-16 md:pt-20 font-body"
            }
        >
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
                {/* Companion mockup routes (frontend-only, mock data) */}
                <Route path="/walk" element={<MyWalk />} />
                <Route path="/prayers" element={<Prayers />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/plans/:slug" element={<PlanDetail />} />
            </Routes>
            {!isChat && <Footer />}
            <CookieConsent />
            <CompanionToast />
        </div>
    );
}

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
                <CompanionProvider>
                    <Router>
                        <AppLayout />
                    </Router>
                </CompanionProvider>
            </AuthProvider>
        </PostHogProvider>
    );
}
