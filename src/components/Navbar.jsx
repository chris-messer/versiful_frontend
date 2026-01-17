import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
    { to: "/features", label: "Features" },
    { to: "/how-it-works", label: "How it works" },
];

const loggedInNavLinks = [
    { to: "/chat", label: "Chat" },
    { to: "/features", label: "Features" },
    { to: "/how-it-works", label: "How it works" },
];

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const isFullWidth = location.pathname === '/chat';

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        // Close profile dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const NavButtons = ({ isMobile = false }) =>
        isLoggedIn ? (
            <div className={`flex ${isMobile ? "flex-col gap-3 w-full" : "items-center gap-3"}`}>
                {isMobile ? (
                    <>
                        <Link
                            to="/settings"
                            className="px-4 py-2 rounded-xl border border-blue-900 text-blue-900 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-white w-full text-center"
                        >
                            Account
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-xl text-white bg-red-600 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white w-full"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div ref={profileRef} className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-white font-semibold hover:bg-blue-950 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
                            aria-label="Profile menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                                <Link
                                    to="/settings"
                                    onClick={() => setIsProfileOpen(false)}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Account
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        ) : (
            <button
                onClick={login}
                className={`px-4 py-2 rounded-xl text-white bg-blue-900 hover:bg-blue-950 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-white ${isMobile ? "w-full" : ""}`}
            >
                Get started
            </button>
        );

    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
            <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isFullWidth ? 'max-w-full' : 'max-w-6xl'}`}>
                <div className="flex h-14 sm:h-16 items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-white"
                    >
                        <img src="/logo.svg" alt="Versiful logo" className="h-9 w-9" />
                        <span className="text-lg sm:text-xl font-semibold text-gray-900">Versiful</span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8 text-sm text-gray-700" aria-label="Primary navigation">
                        {(isLoggedIn ? loggedInNavLinks : navLinks).map((link) => (
                            <Link key={link.to} to={link.to} className="hover:text-blue-800 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-3">
                        <NavButtons />
                    </div>

                    <div className="flex items-center gap-3 lg:hidden">
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-white"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div
                        id="mobile-menu"
                        className="lg:hidden mt-2 rounded-2xl border border-gray-100 bg-white shadow-lg ring-1 ring-gray-100"
                    >
                        <nav className="flex flex-col divide-y divide-gray-100" aria-label="Mobile navigation">
                            {(isLoggedIn ? loggedInNavLinks : navLinks).map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-3 text-gray-800 hover:bg-gray-50"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="px-4 py-4 flex flex-col gap-3">
                            <NavButtons isMobile />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
