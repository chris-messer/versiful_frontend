// src/pages/Callback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
    const navigate = useNavigate();

    const exchangeCodeForTokens = async (code) => {
        const clientId = "15hdo10jc5i2hcqtl2dk2ar8n3";
        const redirectUri = "https://dev.versiful.io/callback";
        const tokenEndpoint = "https://auth.dev.versiful.io/oauth2/token";

        const body = new URLSearchParams({
            grant_type: "authorization_code",
            client_id: clientId,
            redirect_uri: redirectUri,
            code: code,
        });

        try {
            const response = await fetch(tokenEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body.toString(),
            });

            if (!response.ok) {
                throw new Error("Failed to exchange code for tokens.");
            }

            const data = await response.json();

            // Store tokens securely (use cookies in production for better security)
            localStorage.setItem("id_token", data.id_token);
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);

            // Redirect to home page
            navigate("/home");
        } catch (error) {
            console.error("Error exchanging code for tokens:", error);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            exchangeCodeForTokens(code);
        } else {
            console.error("No authorization code found in the URL.");
        }
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2>Processing login...</h2>
        </div>
    );
};

export default Callback;
