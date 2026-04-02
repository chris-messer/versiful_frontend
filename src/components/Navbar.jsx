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
    const { isLoggedIn, logout, login } = useAuth();
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
                            className="px-5 py-3 rounded-3xl border-2 border-terracotta/30 text-terracotta dark:text-terracotta-light
                                     hover:bg-terracotta/10 dark:hover:bg-terracotta/20
                                     transition-warm focus:outline-none focus:ring-2 focus:ring-terracotta
                                     w-full text-center font-semibold font-display"
                        >
                            Account
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-5 py-3 rounded-3xl text-cream bg-brown hover:bg-brown-dark
                                     transition-warm focus:outline-none focus:ring-2 focus:ring-brown
                                     w-full font-semibold font-display"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div ref={profileRef} className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center justify-center w-11 h-11 rounded-full
                                     bg-terracotta text-cream font-semibold
                                     hover:bg-terracotta-dark hover:scale-105
                                     transition-warm focus:outline-none focus:ring-2 focus:ring-terracotta shadow-warm"
                            aria-label="Profile menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-cream dark:bg-charcoal-light
                                          border-2 border-terracotta/20 rounded-3xl shadow-warm-lg py-2 z-50
                                          animate-fade-in-up">
                                <Link
                                    to="/settings"
                                    onClick={() => setIsProfileOpen(false)}
                                    className="block px-5 py-3 text-charcoal dark:text-cream font-medium font-body
                                             hover:bg-terracotta/10 dark:hover:bg-terracotta/20 transition-warm
                                             rounded-2xl mx-2"
                                >
                                    Account
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full text-left px-5 py-3 text-brown dark:text-brown-light font-medium font-body
                                             hover:bg-brown/10 dark:hover:bg-brown/20 transition-warm
                                             rounded-2xl mx-2"
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
                className={`px-6 py-3 rounded-3xl text-cream bg-terracotta-gradient font-bold font-display
                          hover:scale-105 active:scale-95 transition-warm shadow-warm
                          focus:outline-none focus:ring-2 focus:ring-terracotta
                          ${isMobile ? "w-full" : ""}`}
            >
                Get started
            </button>
        );

    return (
        <header className="fixed top-0 inset-x-0 z-50 glass border-b-2 border-terracotta/10 dark:border-terracotta/20">
            <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isFullWidth ? 'max-w-full' : 'max-w-7xl'}`}>
                <div className="flex h-16 sm:h-20 items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-3 rounded-3xl px-3 py-2
                                 hover:bg-terracotta/5 transition-warm
                                 focus:outline-none focus:ring-2 focus:ring-terracotta"
                    >
                        <img src="/logo.svg" alt="Versiful logo" className="h-10 w-10" />
                        <span className="text-xl sm:text-2xl font-bold font-display text-charcoal dark:text-cream">
                            Versiful
                        </span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8 font-body font-medium text-brown dark:text-brown-light"
                         aria-label="Primary navigation">
                        {(isLoggedIn ? loggedInNavLinks : navLinks).map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="hover:text-terracotta dark:hover:text-terracotta-light
                                         transition-warm relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta
                                               group-hover:w-full transition-all duration-300"></span>
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
                            className="inline-flex items-center justify-center rounded-2xl
                                     border-2 border-terracotta/20 bg-cream dark:bg-charcoal-light
                                     p-2.5 text-charcoal dark:text-cream
                                     hover:bg-terracotta/10 dark:hover:bg-terracotta/20
                                     transition-warm focus:outline-none focus:ring-2 focus:ring-terracotta"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div
                        id="mobile-menu"
                        className="lg:hidden mt-3 mb-4 rounded-4xl border-2 border-terracotta/20
                                 bg-cream dark:bg-charcoal-light shadow-warm-lg
                                 animate-fade-in-up overflow-hidden"
                    >
                        <nav className="flex flex-col divide-y divide-terracotta/10" aria-label="Mobile navigation">
                            {(isLoggedIn ? loggedInNavLinks : navLinks).map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-6 py-4 text-charcoal dark:text-cream font-medium font-body
                                             hover:bg-terracotta/10 dark:hover:bg-terracotta/20
                                             transition-warm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="px-6 py-5 flex flex-col gap-3 bg-cream-dark dark:bg-charcoal">
                            <NavButtons isMobile />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
