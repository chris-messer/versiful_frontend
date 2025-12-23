import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import Callback from "./pages/Callback";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import Welcome from "./pages/Welcome";
import Chat from "./pages/Chat";
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
        <AuthProvider>
            <Router>
                {/* Default background for light and dark mode */}
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors text-gray-900 dark:text-gray-100 pt-16 md:pt-20">
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
                        <Route path="/signin" element={<SignIn />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}
