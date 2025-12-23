import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.dev.versiful.io';

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = () => {
        window.location.href = "/signin";
    };

    const checkLoginState = async () => {
        try {
            // Check if we have valid auth cookies by trying to fetch user data
            const response = await fetch(`${API_BASE}/users`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                    setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Error checking login state:", error);
                        setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkLoginState();
    }, []);

    if (loading) {
        return null; // or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, checkLoginState }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
