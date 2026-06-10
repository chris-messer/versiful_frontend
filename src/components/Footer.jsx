import { Link } from "react-router-dom";
import { useConfig } from "../hooks/useConfig";

export default function Footer() {
    const { config } = useConfig();
    const phoneNumber = config?.phone?.sms || "833-681-1158";

    return (
        <footer className="bg-charcoal dark:bg-charcoal-dark text-cream py-12 sm:py-16 relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 blob-shape opacity-50 -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    {/* About Section */}
                    <div>
                        <h3 className="font-display text-xl font-bold mb-4 text-terracotta-light">
                            About Versiful
                        </h3>
                        <p className="font-body text-cream/80 leading-relaxed">
                            Text-based Scripture guidance delivered to your phone.
                            Share what you're facing and receive personalized Bible verses with gentle reflections.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-display text-xl font-bold mb-4 text-terracotta-light">
                            Quick Links
                        </h3>
                        <ul className="space-y-3 font-body">
                            <li>
                                <Link
                                    to="/features"
                                    className="text-cream/80 hover:text-cream hover:translate-x-1 inline-block transition-warm"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/how-it-works"
                                    className="text-cream/80 hover:text-cream hover:translate-x-1 inline-block transition-warm"
                                >
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <a
                                    href={`sms:${phoneNumber}`}
                                    className="text-cream/80 hover:text-cream hover:translate-x-1 inline-block transition-warm"
                                >
                                    Try It Now
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Contact */}
                    <div>
                        <h3 className="font-display text-xl font-bold mb-4 text-terracotta-light">
                            Legal & Support
                        </h3>
                        <ul className="space-y-3 font-body">
                            <li>
                                <Link
                                    to="/privacy"
                                    className="text-cream/80 hover:text-cream hover:translate-x-1 inline-block transition-warm"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="text-cream/80 hover:text-cream hover:translate-x-1 inline-block transition-warm"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/sms-consent"
                                    className="text-cream/80 hover:text-cream hover:translate-x-1 inline-block transition-warm"
                                >
                                    SMS Consent
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/traceback-compliance"
                                    className="text-cream/80 hover:text-cream hover:translate-x-1 inline-block transition-warm"
                                >
                                    Traceback Compliance
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="mailto:support@versiful.com"
                                    className="text-cream/80 hover:text-cream hover:translate-x-1 inline-block transition-warm"
                                >
                                    Contact Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-body text-cream/60 text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} Versiful. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 font-body text-sm text-cream/60">
                        <span>Made with</span>
                        <span className="text-terracotta-light text-lg animate-soft-bounce">🤍</span>
                        <span>for those seeking guidance</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
