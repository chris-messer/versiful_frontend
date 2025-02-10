import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    console.log("Vite ENV Variables:", import.meta.env);

    const handleLogin = () => {
        const authDomain = import.meta.env.VITE_DOMAIN;
        const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
        const redirectUri = encodeURIComponent(import.meta.env.VITE_CALLBACK_URL);

        window.location.href = `https://auth.${authDomain}/login?client_id=${clientId}&response_type=code&scope=email+openid+profile&redirect_uri=${redirectUri}`;
    };

    const handleLogout = () => {
        // Clear tokens
        localStorage.removeItem("id_token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Update state
        setIsLoggedIn(false);

        // Redirect to root domain
        navigate("/home");
    };

    return (
        <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                    <img src="/logo.svg" alt="Logo" className="h-10" />
                    <span className="text-xl font-bold text-gray-800">Versiful-dev</span>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        {/* Add other navigation links here */}
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
