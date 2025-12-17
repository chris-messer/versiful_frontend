import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        const authDomain = import.meta.env.VITE_DOMAIN;
        const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
        const redirectUri = encodeURIComponent(import.meta.env.VITE_CALLBACK_URL);

        window.location.href = `https://auth.${authDomain}/login?client_id=${clientId}&response_type=code&scope=email+openid+profile&redirect_uri=${redirectUri}`;
    };

    const handleLogout = async () => {
        try {
            // Hit the logout API route
            await fetch(`https://api.${import.meta.env.VITE_DOMAIN}/auth/logout`, {
                method: "POST", // Use POST if your API expects it
                credentials: "include", // 🔥 Ensures cookies are sent
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Update state
            setIsLoggedIn(false);

            // Redirect to root domain
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link to="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-white rounded-lg">
                    <img src="/logo.svg" alt="Versiful logo" className="h-9 w-9" />
                    <span className="text-lg md:text-xl font-semibold text-gray-900">Versiful</span>
                </Link>

                <nav aria-label="Primary navigation">
                    <ul className="flex items-center space-x-4 text-sm text-gray-700">
                        <li>
                            <Link to="/features" className="hover:text-blue-800 transition-colors">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link to="/how-it-works" className="hover:text-blue-800 transition-colors">
                                How it works
                            </Link>
                        </li>
                    </ul>
                </nav>

                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="px-4 py-2 rounded-lg text-white bg-blue-900 hover:bg-blue-950 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-white"
                    >
                        Get Started
                    </button>
                )}
            </div>
        </header>
    );
}
