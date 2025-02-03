// src/pages/Callback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
    const navigate = useNavigate();

    const getUrlHashParams = () => {
        const hash = window.location.hash.substring(1);
        return hash.split("&").reduce((params, param) => {
            const [key, value] = param.split("=");
            params[key] = decodeURIComponent(value);
            return params;
        }, {});
    };

    useEffect(() => {
        const params = getUrlHashParams();

        if (params.id_token && params.access_token && params.refresh_token) {
            // Store tokens securely (use cookies in a production app for better security)
            localStorage.setItem("id_token", params.id_token);
            localStorage.setItem("access_token", params.access_token);
            localStorage.setItem("refresh_token", params.refresh_token);

            // Redirect to home page
            navigate("/home");
        } else {
            console.error("Authentication failed or tokens missing.");
        }
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2>Processing login...</h2>
        </div>
    );
};

export default Callback;
