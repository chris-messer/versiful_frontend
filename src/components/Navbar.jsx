import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useCompanion } from "../context/CompanionContext";

// Marketing IA: lean nav for landing visitors.
const marketingLinks = [
    { to: "/", label: "Home" },
    { to: "/how-it-works", label: "How it works" },
    { to: "/features", label: "Features" },
];

// App IA: companion sections, surfaced for authenticated users (and the
// logged-out demo preview). These map 1:1 to the existing companion screens.
const appLinks = [
    { to: "/walk", label: "Today" },
    { to: "/prayers", label: "Prayers" },
    { to: "/journal", label: "Journal" },
    { to: "/plans", label: "Plans" },
    { to: "/chat", label: "Chat" },
    { to: "/settings", label: "Settings" },
];

// Routes that count as being "in the app" (mock-subscribed context). These let
// logged-out visitors still browse the companion preview via the demo entry.
const appRoutePrefixes = ["/walk", "/prayers", "/journal", "/plans", "/chat", "/settings"];

function matchesAppRoute(pathname) {
    return appRoutePrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, logout, isLoggedIn, user: authUser } = useAuth();
    const { user: mockUser } = useCompanion();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // The companion nav is surfaced whenever the visitor is authenticated, OR
    // when a logged-out visitor is previewing a companion screen (demo entry).
    // Marketing visitors on marketing routes keep the acquisition-focused nav.
    const isAppRoute = matchesAppRoute(location.pathname);
    const isAppContext = isLoggedIn || isAppRoute;
    const isPreview = !isLoggedIn && isAppRoute; // demo browsing, not a real session
    const isFullWidth = location.pathname === "/chat";
    const links = isAppContext ? appLinks : marketingLinks;

    // Header identity: prefer the real signed-in user, fall back to the mock
    // companion profile that powers the (still mock-data) preview screens.
    const profile = authUser || mockUser;

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isActive = (to) =>
        to === "/" ? location.pathname === "/" : location.pathname === to || location.pathname.startsWith(to + "/");

    const navLinkClass = (to) =>
        `relative group transition-warm ${
            isActive(to)
                ? "text-terracotta dark:text-terracotta-light font-semibold"
                : "hover:text-terracotta dark:hover:text-terracotta-light"
        }`;

    // Right-side controls differ by context. For unauthed/marketing visitors we
    // show ONLY acquisition actions — no companion app links (those imply an
    // existing account). The logged-in preview lives behind the Footer demo link.
    const MarketingActions = ({ isMobile = false }) => (
        <div className={`flex ${isMobile ? "flex-col gap-3 w-full" : "items-center gap-4"}`}>
            <Link
                to="/signin"
                onClick={() => setIsMenuOpen(false)}
                className={`font-display font-semibold text-brown dark:text-brown-light hover:text-terracotta
                    dark:hover:text-terracotta-light transition-warm ${isMobile ? "px-5 py-3 text-center" : ""}`}
            >
                Sign in
            </Link>
            <button
                onClick={() => {
                    setIsMenuOpen(false);
                    login();
                }}
                className={`px-6 py-3 rounded-3xl text-cream bg-terracotta-gradient font-bold font-display
                    hover:scale-105 active:scale-95 transition-warm shadow-warm
                    focus:outline-none focus:ring-2 focus:ring-terracotta ${isMobile ? "w-full text-center" : ""}`}
            >
                Start free trial
            </button>
        </div>
    );

    const handleSignOut = () => {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
        logout();
        navigate("/");
    };

    const AppActions = ({ isMobile = false }) => {
        if (isMobile) {
            return (
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex items-center gap-3 px-1 pb-1">
                        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-terracotta text-cream font-bold font-display shadow-warm">
                            {(profile?.firstName || "C").charAt(0)}
                        </span>
                        <div>
                            <p className="font-display font-bold text-charcoal dark:text-cream leading-tight">
                                {profile?.firstName || "Chris"}
                            </p>
                            <p className="text-sm text-brown dark:text-brown-light">{profile?.email || "you@versiful.com"}</p>
                        </div>
                    </div>
                    {isLoggedIn ? (
                        <button
                            onClick={handleSignOut}
                            className="px-5 py-3 rounded-3xl text-cream bg-brown hover:bg-brown-dark transition-warm
                                focus:outline-none focus:ring-2 focus:ring-brown w-full text-center font-semibold font-display"
                        >
                            Sign out
                        </button>
                    ) : (
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-5 py-3 rounded-3xl text-cream bg-brown hover:bg-brown-dark transition-warm
                                focus:outline-none focus:ring-2 focus:ring-brown w-full text-center font-semibold font-display"
                        >
                            Back to site
                        </Link>
                    )}
                </div>
            );
        }
        return (
            <div ref={profileRef} className="relative">
                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border-2 border-terracotta/20
                        hover:border-terracotta/40 hover:bg-terracotta/5 transition-warm
                        focus:outline-none focus:ring-2 focus:ring-terracotta"
                    aria-label="Account menu"
                    aria-expanded={isProfileOpen}
                >
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-terracotta text-cream font-bold font-display shadow-warm">
                        {(profile?.firstName || "C").charAt(0)}
                    </span>
                    <span className="hidden xl:inline font-display font-semibold text-charcoal dark:text-cream">
                        {profile?.firstName || "Chris"}
                    </span>
                    <svg className="w-4 h-4 text-brown dark:text-brown-light" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-cream dark:bg-charcoal-light border-2 border-terracotta/20
                        rounded-3xl shadow-warm-lg py-2 z-50 animate-fade-in-up">
                        <div className="px-5 py-3 border-b-2 border-terracotta/10 mb-1">
                            <p className="font-display font-bold text-charcoal dark:text-cream leading-tight">{profile?.firstName || "Chris"}</p>
                            <p className="text-sm text-brown dark:text-brown-light truncate">{profile?.email || "you@versiful.com"}</p>
                        </div>
                        <Link
                            to="/settings"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-5 py-3 mx-2 rounded-2xl text-charcoal dark:text-cream font-medium font-body
                                hover:bg-terracotta/10 dark:hover:bg-terracotta/20 transition-warm"
                        >
                            Settings
                        </Link>
                        {isLoggedIn ? (
                            <button
                                onClick={handleSignOut}
                                className="w-full text-left px-5 py-3 mx-2 rounded-2xl text-brown dark:text-brown-light font-medium font-body
                                    hover:bg-brown/10 dark:hover:bg-brown/20 transition-warm"
                            >
                                Sign out
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setIsProfileOpen(false);
                                    navigate("/");
                                }}
                                className="w-full text-left px-5 py-3 mx-2 rounded-2xl text-brown dark:text-brown-light font-medium font-body
                                    hover:bg-brown/10 dark:hover:bg-brown/20 transition-warm"
                            >
                                Back to site
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <header className="fixed top-0 inset-x-0 z-50 glass border-b-2 border-terracotta/10 dark:border-terracotta/20">
            <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isFullWidth ? "max-w-full" : "max-w-7xl"}`}>
                <div className="flex h-16 sm:h-20 items-center justify-between">
                    <Link
                        to={isAppContext ? "/walk" : "/"}
                        className="flex items-center gap-3 rounded-3xl px-3 py-2 hover:bg-terracotta/5 transition-warm
                            focus:outline-none focus:ring-2 focus:ring-terracotta"
                    >
                        <img src="/logo.svg" alt="Versiful logo" className="h-10 w-10" />
                        <span className="text-xl sm:text-2xl font-bold font-display text-charcoal dark:text-cream">Versiful</span>
                    </Link>

                    <nav
                        className="hidden lg:flex items-center gap-8 font-body font-medium text-brown dark:text-brown-light"
                        aria-label={isAppContext ? "Versiful navigation" : "Primary navigation"}
                    >
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                aria-current={isActive(link.to) ? "page" : undefined}
                                className={navLinkClass(link.to)}
                            >
                                {link.label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-terracotta transition-all duration-300 ${
                                        isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                                ></span>
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-3">
                        {isAppContext ? <AppActions /> : <MarketingActions />}
                    </div>

                    <div className="flex items-center gap-3 lg:hidden">
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className="inline-flex items-center justify-center rounded-2xl border-2 border-terracotta/20
                                bg-cream dark:bg-charcoal-light p-2.5 text-charcoal dark:text-cream
                                hover:bg-terracotta/10 dark:hover:bg-terracotta/20 transition-warm
                                focus:outline-none focus:ring-2 focus:ring-terracotta"
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
                        className="lg:hidden mt-3 mb-4 rounded-4xl border-2 border-terracotta/20 bg-cream dark:bg-charcoal-light
                            shadow-warm-lg animate-fade-in-up overflow-hidden"
                    >
                        <nav className="flex flex-col divide-y divide-terracotta/10" aria-label="Mobile navigation">
                            {links.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-current={isActive(link.to) ? "page" : undefined}
                                    className={`px-6 py-4 font-medium font-body transition-warm hover:bg-terracotta/10 dark:hover:bg-terracotta/20 ${
                                        isActive(link.to)
                                            ? "text-terracotta dark:text-terracotta-light font-semibold"
                                            : "text-charcoal dark:text-cream"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="px-6 py-5 flex flex-col gap-3 bg-cream-dark dark:bg-charcoal">
                            {isAppContext ? <AppActions isMobile /> : <MarketingActions isMobile />}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
