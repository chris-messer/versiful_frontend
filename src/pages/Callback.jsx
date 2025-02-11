import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Callback = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const lambdaEndpoint = `https://api.${import.meta.env.VITE_DOMAIN}/users`;

    const exchangeCodeForTokens = async (code) => {
        const clientId = "15hdo10jc5i2hcqtl2dk2ar8n3";
        const redirectUri = import.meta.env.VITE_CALLBACK_URL;
        const tokenEndpoint = "https://auth.dev.versiful.io/oauth2/token";

        const body = new URLSearchParams({
            grant_type: "authorization_code",
            client_id: clientId,
            redirect_uri: redirectUri,
            code: code,
        });

        try {
            console.log("Sending token request:", body.toString());

            const response = await fetch(tokenEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                },
                body: body.toString(),
            });

            // Debugging: Log raw response
            const responseText = await response.text();
            // console.log("Raw response from Cognito:", responseText);

            if (!response.ok) {
                throw new Error(`Failed to exchange code for tokens: ${responseText}`);
            }

            // Parse JSON only after ensuring the response is valid
            const data = JSON.parse(responseText);
            console.log("Token response:", data);

            if (data.error) {
                throw new Error(`Cognito error: ${data.error} - ${data.error_description}`);
            }

            // Store tokens securely
            localStorage.setItem("id_token", data.id_token);
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);

            setIsLoggedIn(true);

            // Extract Cognito User ID from ID Token
            const decodedToken = JSON.parse(atob(data.id_token.split(".")[1]));
            const userId = decodedToken.sub;
            console.log("Extracted User ID:", userId);

            // Check if the user exists, and create if not
            await checkAndCreateUser(userId, data.access_token);
        } catch (error) {
            console.error("Error exchanging code for tokens:", error);
        }
    };

    // Function to check if the user exists, and create them if not
    const checkAndCreateUser = async (userId, token) => {
        try {
            const response = await fetch(lambdaEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) throw new Error("Failed to check/create user");

            const data = await response.json();
            console.log("User API Response:", data);

            if (data.exists) {
                navigate("/settings");
            } else {
                navigate("/welcome");
            }
        } catch (error) {
            console.error("Error checking or creating user:", error);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            console.log("Authorization Code:", code);

            // Check if the code was already used
            if (sessionStorage.getItem("used_code") === code) {
                console.warn("Authorization code has already been used. Ignoring duplicate request.");
                return;
            }

            sessionStorage.setItem("used_code", code); // Mark the code as used
            exchangeCodeForTokens(code);
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
