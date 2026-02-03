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
                
                // Update PostHog person properties for logged-in users
                // Note: Don't alias here - aliasing happens at signup/phone-add time only
                if (userData && posthog && userData.userId) {
                    const personProperties = {
                        user_id: userData.userId,  // CRITICAL: Store DynamoDB userId for linking to database
                        email: userData.email,  // Plain email as per PostHog docs
                        plan: userData.plan || 'free',
                        is_subscribed: userData.isSubscribed || false,
                        registration_status: 'registered',
                        channel: 'web',
                    };
                    
                    // Add optional properties if available
                    if (userData.phoneNumber) personProperties.phone_number = userData.phoneNumber;
                    if (userData.firstName) personProperties.first_name = userData.firstName;
                    if (userData.lastName) personProperties.last_name = userData.lastName;
                    if (userData.bibleVersion) personProperties.bible_version = userData.bibleVersion;
                    
                    // Update user properties (no alias - just keeping profile current)
                    posthog.identify(userData.userId, personProperties);
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
