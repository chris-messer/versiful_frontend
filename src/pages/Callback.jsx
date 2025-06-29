import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Callback = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const backendAuthEndpoint = `https://api.${import.meta.env.VITE_DOMAIN}/auth/callback`;
    const userCheckEndpoint = `https://api.${import.meta.env.VITE_DOMAIN}/users`;

    const handleAuth = async (code) => {
        try {
            // Send authorization code to backend
            const authResponse = await fetch(backendAuthEndpoint, {
                method: "POST",
                credentials: "include",  // Ensures cookies are included in future requests
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code, redirectUri: import.meta.env.VITE_CALLBACK_URL}),
            });

            if (!authResponse.ok) {
                throw new Error("Authentication failed");
            }

            // User is now authenticated, set login state
            setIsLoggedIn(true);

            // Now check if user exists
            const userCheckResponse = await fetch(userCheckEndpoint, {
                method: "POST",
                credentials: "include", // Includes auth cookies
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!userCheckResponse.ok) {
                throw new Error("Failed to check user registration");
            }

            const userData = await userCheckResponse.json();

            if (!userData.isRegistered) {
                console.log("User is registered", userData);
                navigate("/welcome");
            } else if (!userData.isSubscribed) {
                console.log("User is registered", userData);
                navigate("/subscription");
            } else {
                navigate("/settings");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            handleAuth(code);
        } else {
            console.error("No authorization code found in the URL.");
        }
    }, [navigate, setIsLoggedIn]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2>Processing login...</h2>
        </div>
    );
};

export default Callback;
