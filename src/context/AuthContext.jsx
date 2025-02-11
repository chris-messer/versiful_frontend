import React, { createContext, useContext, useState, useEffect } from "react";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const AuthContext = createContext();

// Cognito Configuration (Replace with your actual values)
const poolData = {
    UserPoolId: "us-east-1_XXXXXXX",  // Replace with your Cognito User Pool ID
    ClientId: "XXXXXXXXXXXXX"         // Replace with your Cognito App Client ID
};

const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const CognitoUser = AmazonCognitoIdentity.CognitoUser;

const userPool = new CognitoUserPool(poolData);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const refreshToken = () => {
        const user = userPool.getCurrentUser();

        if (user) {
            user.getSession((err, session) => {
                if (err || !session.isValid()) {
                    console.error("Session is invalid or expired", err);
                    setIsLoggedIn(false);
                    return;
                }

                user.refreshSession(session.getRefreshToken(), (err, newSession) => {
                    if (err) {
                        console.error("Error refreshing token", err);
                        setIsLoggedIn(false);
                        return;
                    }

                    localStorage.setItem("id_token", newSession.getIdToken().getJwtToken());
                    localStorage.setItem("access_token", newSession.getAccessToken().getJwtToken());
                    setIsLoggedIn(true);
                });
            });
        }
    };

    const checkLoginState = () => {
        const idToken = localStorage.getItem("id_token");
        setIsLoggedIn(!!idToken);
    };

    useEffect(() => {
        checkLoginState();

        // Refresh token periodically (every 5 minutes)
        const interval = setInterval(refreshToken, 1000 * 60 * 5);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
