import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleRedirect = () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            const error = params.get("error");

            if (error) {
                console.error("Authentication error:", error);
                navigate("/error"); // Navigate to an error page (optional)
                return;
            }

            if (code) {
                console.log("Authorization code received:", code);
                // Perform token exchange or any other logic here
                // Example: send the `code` to your backend
            } else {
                console.warn("No code or error found in the URL.");
            }

            navigate("/"); // Redirect to the home or desired page
        };

        handleRedirect();
    }, [navigate]);

    return (
        <div className="callback-page">
            <h1>Processing your authentication...</h1>
        </div>
    );
};

export default Callback;
