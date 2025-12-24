import { Link } from "react-router-dom";
import { useConfig } from "../hooks/useConfig";

export default function PrivacyPolicy() {
    const { config } = useConfig();
    const phoneNumber = config?.phone?.sms || "833-681-1158";
    
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto max-w-4xl px-6 py-12 lg:px-10">
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center text-blue-700 hover:text-blue-900 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </div>

                <article className="prose prose-lg max-w-none">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Welcome to Versiful. We respect your privacy and are committed to protecting your personal information. 
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use 
                            our text-based Scripture guidance service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                        
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            When you register for our service, we collect:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li>Phone number (required for SMS service)</li>
                            <li>Email address (for account management and notifications)</li>
                            <li>First and last name (optional)</li>
                            <li>Bible version preference</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Message Content</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We store the messages you send to us and our responses to provide you with conversation history 
                            and improve our service. Your messages may contain personal information or sensitive topics.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Information</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We automatically collect certain information about your device and how you interact with our service, including:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li>Log data (IP address, browser type, pages visited)</li>
                            <li>Device information</li>
                            <li>Usage patterns and preferences</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li>Provide, maintain, and improve our SMS-based Scripture guidance service</li>
                            <li>Send you text messages with Bible verses and reflections in response to your questions</li>
                            <li>Process your subscription and payment information</li>
                            <li>Send you service-related notifications and updates</li>
                            <li>Respond to your inquiries and provide customer support</li>
                            <li>Analyze usage patterns to improve our service</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">SMS/Text Message Terms</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            By providing your phone number and consenting to receive text messages:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li>You agree to receive automated text messages from Versiful at the phone number you provided</li>
                            <li>Message frequency varies based on your usage</li>
                            <li>Message and data rates may apply from your mobile carrier</li>
                            <li>You can opt-out at any time by replying STOP to any message</li>
                            <li>Reply HELP for assistance</li>
                            <li>We use Twilio as our SMS service provider</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We do not sell your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., Twilio for SMS, Stripe for payments, AWS for hosting)</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We implement appropriate technical and organizational security measures to protect your personal 
                            information. However, no method of transmission over the Internet or electronic storage is 100% secure. 
                            While we strive to protect your information, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We retain your personal information for as long as necessary to provide our services and fulfill 
                            the purposes outlined in this Privacy Policy. You may request deletion of your account and data 
                            at any time by contacting us.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Depending on your location, you may have certain rights regarding your personal information, including:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li>Access to your personal information</li>
                            <li>Correction of inaccurate information</li>
                            <li>Deletion of your information</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Data portability</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            To exercise these rights, please contact us using the information below.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use essential cookies to make our website function properly. With your consent, we may also 
                            use analytics cookies to understand how visitors use our site. You can control cookie preferences 
                            through your browser settings or our cookie consent banner.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our service is not intended for children under 13 years of age. We do not knowingly collect 
                            personal information from children under 13. If you believe we have collected information from 
                            a child under 13, please contact us immediately.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We may update this Privacy Policy from time to time. We will notify you of any material changes 
                            by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If you have questions about this Privacy Policy or our privacy practices, please contact us:
                        </p>
                        <ul className="list-none space-y-2 text-gray-700">
                            <li><strong>By SMS:</strong> Text "HELP" to {phoneNumber}</li>
                            <li><strong>By email:</strong> privacy@versiful.com</li>
                        </ul>
                    </section>
                </article>
            </div>
        </div>
    );
}

