import React, { createContext, useContext, useState, useEffect } from "react";
import { usePostHog } from "./PostHogContext";
import { identifyInternalUser } from "../utils/posthogHelpers";

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
                
                // Identify user in PostHog for proper tracking
                if (userData && posthog) {
                    // Use userId as distinct_id for consistent tracking
                    const userId = userData.userId;
                    
                    // Build person properties
                    const personProperties = {
                        email: userData.email,
                        is_subscribed: userData.isSubscribed || false,
                        plan: userData.plan || 'free',
                    };
                    
                    // Add optional properties if available
                    if (userData.phoneNumber) personProperties.phone_number = userData.phoneNumber;
                    if (userData.firstName) personProperties.first_name = userData.firstName;
                    if (userData.lastName) personProperties.last_name = userData.lastName;
                    if (userData.bibleVersion) personProperties.bible_version = userData.bibleVersion;
                    if (userData.responseStyle) personProperties.response_style = userData.responseStyle;
                    
                    // Identify user in PostHog
                    posthog.identify(userId, personProperties);
                    
                    // Mark internal users for filtering (sets additional properties)
                    if (userData.email) {
                        identifyInternalUser(posthog, userData.email);
                    }
                }
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
