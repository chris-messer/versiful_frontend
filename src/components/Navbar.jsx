import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
    { to: "/features", label: "Features" },
    { to: "/how-it-works", label: "How it works" },
];

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, login } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const handleLogout = async () => {
        try {
            await fetch(`https://api.${import.meta.env.VITE_DOMAIN}/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            setIsLoggedIn(false);
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const NavButtons = ({ isMobile = false }) =>
        isLoggedIn ? (
            <div className={`flex ${isMobile ? "flex-col gap-3 w-full" : "items-center gap-3"}`}>
                <Link
                    to="/settings"
                    className={`px-4 py-2 rounded-xl border border-blue-900 text-blue-900 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-white ${isMobile ? "w-full text-center" : ""}`}
                >
                    Settings
                </Link>
                <button
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-xl text-white bg-red-600 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white ${isMobile ? "w-full" : ""}`}
                >
                    Logout
                </button>
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
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 sm:h-16 items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-white"
                    >
                        <img src="/logo.svg" alt="Versiful logo" className="h-9 w-9" />
                        <span className="text-lg sm:text-xl font-semibold text-gray-900">Versiful</span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8 text-sm text-gray-700" aria-label="Primary navigation">
                        {navLinks.map((link) => (
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
                            {navLinks.map((link) => (
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
