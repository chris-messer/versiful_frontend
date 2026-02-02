import React, { createContext, useContext, useState, useEffect } from "react";
import { usePostHog } from "./PostHogContext";

const AuthContext = createContext();

const API_BASE = `https://api.${import.meta.env.VITE_DOMAIN || 'dev.versiful.io'}`;

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const { posthog } = usePostHog();

    const login = () => {
        window.location.href = "/signin";
    };

    const logout = async () => {
        try {
            // Call backend logout endpoint
            await fetch(`${API_BASE}/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            
            // Reset PostHog to unlink future events from this user
            if (posthog) {
                posthog.reset();
            }
            
            // Clear local state
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
            // Still clear local state even if backend call fails
            setIsLoggedIn(false);
            setUser(null);
            if (posthog) {
                posthog.reset();
            }
        }
    };

    const checkLoginState = async () => {
        try {
            // Check if we have valid auth cookies by trying to fetch user data
            const response = await fetch(`${API_BASE}/users`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
                setIsLoggedIn(true);
                setUser(userData);
            } else {
                    setIsLoggedIn(false);
                    setUser(null);
            }
        } catch (error) {
            console.error("Error checking login state:", error);
                        setIsLoggedIn(false);
                        setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkLoginState();
    }, [posthog]); // Re-check when posthog is ready

    if (loading) {
        return null; // or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, checkLoginState, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
