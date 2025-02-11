import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Callback = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();



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
                    "Accept": "application/json"
                },
                body: body.toString(),
            });

            // Debugging: Log raw response
            const responseText = await response.text();
            console.log("Raw response from Cognito:", responseText);

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
            navigate("/home");
        } catch (error) {
            console.error("Error exchanging code for tokens:", error);
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

};

export default Callback;
