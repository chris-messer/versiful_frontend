import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const updateLoginState = () => {
        const idToken = localStorage.getItem("id_token");
        setIsLoggedIn(!!idToken);
    };

    useEffect(() => {
        // Check login state on mount
        updateLoginState();

        // Add an event listener to listen for login state changes
        window.addEventListener("loginStateChange", updateLoginState);

        return () => {
            // Clean up event listener
            window.removeEventListener("loginStateChange", updateLoginState);
        };
    }, []);

    const handleLogin = () => {
        window.location.href =
            "https://auth.dev.versiful.io/login?client_id=15hdo10jc5i2hcqtl2dk2ar8n3&response_type=code&scope=email+openid+profile&redirect_uri=https%3A%2F%2Fdev.versiful.io%2Fcallback";
    };

    const handleLogout = () => {
        // Clear tokens
        localStorage.removeItem("id_token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Notify other components of login state change
        window.dispatchEvent(new Event("loginStateChange"));

        // Redirect to root domain
        navigate("/");
    };

    return (
        <header className="bg-white shadow fixed top-0 left-0 w-full">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                    <img src="/logo.svg" alt="Logo" className="h-10" />
                    <span className="text-xl font-bold text-gray-800">Versiful-dev</span>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        {/*<li><a href="#features" className="hover:text-blue-600">Features</a></li>*/}
                        {/*<li><a href="#about" className="hover:text-blue-600">About</a></li>*/}
                        {/*<li><a href="#contact" className="hover:text-blue-600">Contact</a></li>*/}
                    </ul>
                </nav>
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Get Started
                    </button>
                )}
            </div>
        </header>
    );
}
