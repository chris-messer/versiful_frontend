import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Callback from "./pages/Callback";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import { useEffect, useState } from "react";

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem("theme") === "dark" // Retrieve saved preference
    );

    // Toggle dark mode and save preference
    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    useEffect(() => {
        // Apply or remove the dark class on the root element
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <AuthProvider>
            <Router>
                {/* Default background for light and dark mode */}
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors text-gray-900 dark:text-gray-100">
                    <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/callback" element={<Callback />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/subscription" element={<Subscription />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}
