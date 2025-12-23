import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="center-bottom bg-black text-white py-10">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">About Versiful</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Text-based Scripture guidance delivered to your phone. 
                            Share what you're facing and receive personalized Bible verses with gentle reflections.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <a href="sms:833-681-1158" className="text-gray-400 hover:text-white transition-colors">
                                    Try It Now
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Legal & Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <a href="mailto:support@versiful.com" className="text-gray-400 hover:text-white transition-colors">
                                    Contact Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} Versiful. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Made with care for those seeking guidance</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
