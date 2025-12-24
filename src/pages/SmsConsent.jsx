import { Link } from "react-router-dom";
import { useConfig } from "../hooks/useConfig";

const SmsConsent = () => {
  const { config } = useConfig();
  const phoneNumber = config?.phone?.sms || "833-681-1158";
  
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          SMS Program Consent
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Versiful SMS/MMS Program
            </h2>
            <p className="text-gray-700 mb-4">
              By providing your mobile phone number and checking the consent box during registration, 
              you expressly consent to receive automated text messages (SMS/MMS) from Versiful at the 
              phone number provided. These messages may include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Biblical wisdom and guidance in response to your questions</li>
              <li>Daily or weekly Scripture reflections (based on your preferences)</li>
              <li>Account notifications and service updates</li>
              <li>Subscription and billing information</li>
            </ul>
          </section>

          <section className="mb-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Required Consent Language
            </h3>
            <p className="text-gray-800 mb-3">
              <strong>By registering, you acknowledge and agree that:</strong>
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-800">
              <li>You consent to receive automated SMS/MMS messages from Versiful</li>
              <li>Message and data rates may apply per your carrier's plan</li>
              <li>You are responsible for all carrier charges, including standard SMS/MMS message and data rates</li>
              <li>Message frequency varies based on your subscription plan and usage</li>
              <li>Consent is not a condition of purchase</li>
            </ol>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Opt-Out Instructions
            </h3>
            <p className="text-gray-700 mb-2">
              You may opt out of receiving text messages at any time by:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>
                <strong>Text "STOP"</strong> to our phone number ({phoneNumber}) - This will 
                immediately unsubscribe you from messages AND cancel your subscription
              </li>
              <li>
                <strong>Manage your account</strong> via the website at{" "}
                <Link to="/settings" className="text-blue-600 hover:underline">
                  https://versiful.io/settings
                </Link>
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              After texting STOP, you will receive one final confirmation message, and then 
              you will not receive any further messages unless you opt back in.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Opt-In Instructions
            </h3>
            <p className="text-gray-700 mb-4">
              If you previously opted out and wish to receive messages again, text{" "}
              <strong>"START"</strong> to {phoneNumber}. Note: This will only restore your 
              ability to receive messages; it will NOT automatically restore a paid subscription. 
              You must re-subscribe via the website.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Help & Support
            </h3>
            <p className="text-gray-700 mb-4">
              For help, text <strong>"HELP"</strong> to {phoneNumber} or contact us at:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Email: support@versiful.io</li>
              <li>Website: <a href="https://versiful.io" className="text-blue-600 hover:underline">https://versiful.io</a></li>
            </ul>
          </section>

          <section className="mb-8 bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              ⚠️ Carrier Charges
            </h3>
            <p className="text-gray-800 font-medium mb-2">
              IMPORTANT: Standard SMS/MMS message and data rates may apply based on your 
              mobile carrier's plan.
            </p>
            <p className="text-gray-700">
              If you do not have an unlimited texting plan, you may incur charges from your 
              carrier for each message sent and received. Versiful is not responsible for any 
              carrier charges. Please check with your mobile carrier for details about your 
              messaging plan.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Message Frequency
            </h3>
            <p className="text-gray-700 mb-4">
              Message frequency varies based on your plan:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Free Plan:</strong> Up to 5 messages per month</li>
              <li><strong>Starter Plan:</strong> Up to 40 messages per month</li>
              <li><strong>Premium Plan:</strong> Unlimited messages</li>
            </ul>
            <p className="text-gray-700">
              Additional messages may be sent for account notifications, service updates, or 
              in response to your questions.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Privacy & Data
            </h3>
            <p className="text-gray-700 mb-4">
              Your phone number and message content are used solely to provide our service. 
              We do not sell or share your information with third parties for marketing purposes. 
              For complete details, please review our{" "}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Terms of Service
            </h3>
            <p className="text-gray-700 mb-4">
              By using Versiful's SMS service, you agree to our{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>, which includes additional details about carrier charges and your 
              responsibilities.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-300">
            <p className="text-sm text-gray-600 text-center">
              This consent information applies to SMS/MMS services provided by Versiful.
              <br />
              For questions, contact us at support@versiful.io
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SmsConsent;

