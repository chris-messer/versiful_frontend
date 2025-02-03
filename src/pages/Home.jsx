import { useEffect, useState } from "react";

const Home = () => {
    const [tokens, setTokens] = useState({
        idToken: "",
        accessToken: "",
        refreshToken: "",
    });

    useEffect(() => {
        const idToken = localStorage.getItem("id_token");
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        setTokens({ idToken, accessToken, refreshToken });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-white">
            <h1>Welcome to Home</h1>
            <div className="mt-4">
                <p><strong>ID Token:</strong> {tokens.idToken}</p>
                <p><strong>Access Token:</strong> {tokens.accessToken}</p>
                <p><strong>Refresh Token:</strong> {tokens.refreshToken}</p>
            </div>
        </div>
    );
};

export default Home;
