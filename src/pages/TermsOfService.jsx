import { Link } from "react-router-dom";

export default function TermsOfService() {
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                    <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            By accessing or using Versiful's SMS-based Scripture guidance service ("Service"), you agree to be 
                            bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Versiful provides an SMS-based service that responds to user messages with relevant Bible verses, 
                            reflections, and spiritual guidance. The Service uses AI technology to provide personalized Scripture-based 
                            responses to your questions and situations.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            <strong>Important:</strong> Versiful is a spiritual guidance tool and should not be considered a 
                            substitute for professional counseling, therapy, medical advice, or pastoral care. If you are 
                            experiencing a mental health crisis, please contact a mental health professional or crisis hotline immediately.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Eligibility</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You must be at least 13 years of age to use this Service. By using the Service, you represent and 
                            warrant that you meet this age requirement. If you are under 18, you should have parental or guardian 
                            permission to use this Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. SMS Terms and Conditions</h2>
                        
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Consent to Receive Messages</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            By providing your phone number and checking the consent box, you agree to receive automated text 
                            messages from Versiful at the phone number provided. Your consent is not a condition of purchase.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Message Frequency</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Message frequency varies based on your usage. You will receive responses to the messages you send us, 
                            and occasional service-related notifications.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Carrier Charges - Important Acknowledgment</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            <strong>By using this Service, you acknowledge and agree that:</strong>
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li>Standard SMS and MMS message and data rates may apply as determined by your mobile carrier</li>
                            <li>You are solely responsible for any and all charges incurred from your mobile carrier for text messages sent to and received from Versiful</li>
                            <li>Versiful is not responsible for any carrier charges, fees, or billing disputes with your mobile service provider</li>
                            <li>Message delivery and timing are subject to your carrier's network and may vary</li>
                            <li>You should consult your mobile carrier's pricing plan to determine applicable rates for SMS and MMS messages</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            <strong>Note:</strong> Depending on your mobile plan, each text message exchange may incur charges. 
                            If you do not have an unlimited texting plan, these charges may add up quickly. Please check with 
                            your carrier before using this Service.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Opt-Out Instructions</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You may opt-out of receiving text messages at any time by:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li>Replying STOP to any message from Versiful</li>
                            <li>Managing your communication preferences in your account settings</li>
                            <li>Contacting our support team</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            After you send STOP, we will send you a confirmation message and you will no longer receive messages 
                            from us. To restart receiving messages, text START or sign up again.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Help</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            For help, reply HELP to any message or contact us at support@versiful.com.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Supported Carriers</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our Service is available on major U.S. carriers. Carriers are not liable for delayed or undelivered messages.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Accounts and Registration</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            To access certain features, you must create an account. You agree to:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li>Provide accurate, current, and complete information</li>
                            <li>Maintain the security of your account credentials</li>
                            <li>Notify us immediately of any unauthorized use of your account</li>
                            <li>Be responsible for all activities that occur under your account</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Subscription and Billing</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Versiful offers subscription plans for unlimited access to the Service. By subscribing, you agree to:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li>Pay all fees associated with your selected subscription plan</li>
                            <li>Automatic renewal of your subscription unless you cancel</li>
                            <li>Our use of third-party payment processors (e.g., Stripe) to process payments</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You may cancel your subscription at any time through your account settings. Cancellations take 
                            effect at the end of your current billing period. We do not provide refunds for partial billing periods.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Acceptable Use</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You agree not to use the Service to:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li>Violate any applicable laws or regulations</li>
                            <li>Send spam, harassment, or abusive messages</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Interfere with the proper functioning of the Service</li>
                            <li>Use the Service for any commercial purpose without our permission</li>
                            <li>Impersonate others or provide false information</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            The Service, including all content, features, and functionality, is owned by Versiful and is 
                            protected by copyright, trademark, and other intellectual property laws. Bible translations are 
                            the property of their respective copyright holders.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You retain ownership of the messages you send to us, but you grant us a license to use, store, 
                            and process your messages to provide and improve the Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Privacy</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Your privacy is important to us. Please review our{" "}
                            <Link to="/privacy" className="text-blue-700 hover:underline">Privacy Policy</Link> to understand 
                            how we collect, use, and protect your personal information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Disclaimers</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. 
                            WE DO NOT WARRANT THAT:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                            <li>The Service will be uninterrupted, secure, or error-free</li>
                            <li>The results obtained from the Service will be accurate or reliable</li>
                            <li>Any AI-generated content will be theologically accurate or appropriate for your situation</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            <strong>Spiritual Guidance Disclaimer:</strong> Responses provided by Versiful are generated by AI 
                            and should be used for informational and devotional purposes only. They do not constitute professional 
                            religious counseling, therapy, or medical advice. Always consult with qualified religious leaders or 
                            mental health professionals for serious concerns.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Limitation of Liability</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, VERSIFUL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                            SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED 
                            DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM 
                            YOUR USE OF THE SERVICE.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Termination</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We may suspend or terminate your access to the Service at any time, with or without notice, for any 
                            reason, including violation of these Terms. You may terminate your account at any time by contacting us 
                            or through your account settings.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We reserve the right to modify these Terms at any time. We will notify you of material changes by 
                            posting the updated Terms on our website and updating the "Last updated" date. Your continued use of 
                            the Service after changes are posted constitutes acceptance of the modified Terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Governing Law</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            These Terms shall be governed by and construed in accordance with the laws of the United States, 
                            without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If you have questions about these Terms, please contact us:
                        </p>
                        <ul className="list-none space-y-2 text-gray-700">
                            <li><strong>By SMS:</strong> Text "HELP" to 833-681-1158</li>
                            <li><strong>By email:</strong> support@versiful.com</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Severability</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be 
                            limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in 
                            full force and effect.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Entire Agreement</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            These Terms, together with our Privacy Policy, constitute the entire agreement between you and 
                            Versiful regarding the use of the Service.
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}

