import { Link } from "react-router-dom";

const OptInForm = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Versiful SMS Registration Form
          </h1>
          <p className="text-lg text-gray-700">
            This page demonstrates the exact opt-in form and consent process that users see when registering for Versiful's SMS service.
          </p>
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p className="text-sm text-gray-800">
              <strong>Note:</strong> This is a demonstration of the registration form. 
              To actually register, users must <Link to="/signin" className="text-blue-600 hover:underline">sign in</Link> and 
              complete the registration at <Link to="/welcome" className="text-blue-600 hover:underline">/welcome</Link>.
            </p>
          </div>
        </div>

        {/* Actual Form Demonstration */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 md:p-8">
          <div className="text-center space-y-1 mb-6">
            <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold">Verify your number</p>
            <h2 className="text-xl font-semibold text-gray-900">So we can text you back</h2>
          </div>

          <form className="space-y-5 pointer-events-none opacity-90">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">First Name (optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Pat"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Last Name (optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Smith"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll use this to send you updates about your account.
              </p>
            </div>

            {/* Phone Number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="1234567890 or (123) 456-7890"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Any 10-digit US number works. No app needed.
              </p>
            </div>

            {/* Bible Version */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Preferred Bible Version</span>
              </label>
              <select
                className="select select-bordered w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled
              >
                <option>KJV - King James Version</option>
                <option>NIV - New International Version</option>
                <option>ESV - English Standard Version</option>
                <option>NLT - New Living Translation</option>
              </select>
            </div>

            {/* SMS Consent - THE KEY FIELD FOR TWILIO */}
            <div className="form-control bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
              <label className="label cursor-pointer justify-start space-x-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  disabled
                />
                <span className="label-text text-sm font-medium">
                  I consent to receive text messages from Versiful at the phone number provided. 
                  I acknowledge that standard SMS/MMS message and data rates charged by my mobile 
                  carrier will apply, and I am responsible for all carrier charges. 
                  Reply STOP to unsubscribe at any time.
                </span>
              </label>
              <p className="text-xs text-gray-700 mt-2 ml-8">
                By checking this box, you agree to our{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-semibold">
                  Terms of Service
                </a>{" "}
                and acknowledge that carrier charges may apply for text messages.
              </p>
              <div className="mt-3 ml-8 text-xs text-gray-600">
                <strong>Required by law:</strong>
                <ul className="list-disc ml-4 mt-1 space-y-1">
                  <li>Express consent to receive automated SMS/MMS messages</li>
                  <li>Acknowledgment of carrier message and data rates</li>
                  <li>Clear opt-out instructions (text STOP to 833-681-1158)</li>
                </ul>
              </div>
            </div>

            {/* Age Consent */}
            <div className="form-control bg-red-50 border-2 border-red-400 rounded-lg p-4">
              <label className="label cursor-pointer justify-start space-x-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  disabled
                />
                <span className="label-text text-sm font-semibold">
                  I certify that I am 18 years of age or older.
                </span>
              </label>
              <p className="text-xs text-gray-700 mt-1 ml-8">
                You must be at least 18 years old to register for and use Versiful's SMS service.
              </p>
              <div className="mt-3 ml-8 text-xs text-gray-600">
                <strong>Age-gated service:</strong> Versiful restricts registration to adults (18+) only.
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="btn btn-primary w-full text-white bg-blue-900 hover:bg-blue-950 transition duration-200"
              disabled
            >
              Continue to Subscription Selection
            </button>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-8 space-y-6">
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              How the Opt-In Process Works
            </h3>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>User creates an account at <code className="bg-gray-200 px-1 rounded">versiful.io/signin</code></li>
              <li>After authentication, user is redirected to <code className="bg-gray-200 px-1 rounded">/welcome</code></li>
              <li>User enters their phone number and other information</li>
              <li>
                <strong>User must check TWO required boxes:</strong>
                <ul className="list-disc ml-6 mt-1">
                  <li>SMS consent (acknowledging carrier charges)</li>
                  <li>Age certification (18+ years old)</li>
                </ul>
              </li>
              <li>Form cannot be submitted unless both boxes are checked</li>
              <li>Upon submission, user receives a welcome SMS and can begin texting</li>
            </ol>
          </div>

          <div className="bg-blue-50 border border-blue-300 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Message Frequency & Plans
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Free Plan:</strong> Up to 5 messages per month</li>
              <li><strong>Starter Plan ($4.99/month):</strong> Up to 40 messages per month</li>
              <li><strong>Premium Plan ($9.99/month):</strong> Unlimited messages</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">
              Users can upgrade, downgrade, or cancel at any time. Texting STOP immediately 
              cancels any active subscription and opts the user out of receiving messages.
            </p>
          </div>

          <div className="bg-green-50 border border-green-300 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Opt-Out Instructions
            </h3>
            <p className="text-gray-700 mb-2">
              Users can opt out at any time by:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Texting <strong>STOP</strong> to 833-681-1158</li>
              <li>Managing their subscription at <a href="/settings" className="text-blue-600 hover:underline">versiful.io/settings</a></li>
            </ul>
            <p className="text-gray-700 mt-3">
              After texting STOP, the user receives one final confirmation message and will not 
              receive any further messages unless they text START to opt back in.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-300 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Keyword Commands
            </h3>
            <div className="space-y-2 text-gray-700">
              <div>
                <strong>STOP:</strong> Unsubscribes from messages and cancels any active subscription
              </div>
              <div>
                <strong>START:</strong> Re-opts in to receive messages (does not restore paid subscription)
              </div>
              <div>
                <strong>HELP:</strong> Displays support information and available commands
              </div>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-8 border-t pt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Related Documentation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/sms-consent"
              className="block p-4 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-md transition"
            >
              <h4 className="font-semibold text-blue-700 mb-1">SMS Program Consent</h4>
              <p className="text-sm text-gray-600">Complete SMS consent terms and legal requirements</p>
            </Link>
            <Link
              to="/terms"
              className="block p-4 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-md transition"
            >
              <h4 className="font-semibold text-blue-700 mb-1">Terms of Service</h4>
              <p className="text-sm text-gray-600">User responsibilities and carrier charge acknowledgment</p>
            </Link>
            <Link
              to="/privacy"
              className="block p-4 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-md transition"
            >
              <h4 className="font-semibold text-blue-700 mb-1">Privacy Policy</h4>
              <p className="text-sm text-gray-600">How we collect, use, and protect your data</p>
            </Link>
            <Link
              to="/traceback-compliance"
              className="block p-4 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-md transition"
            >
              <h4 className="font-semibold text-blue-700 mb-1">Traceback Compliance</h4>
              <p className="text-sm text-gray-600">STI-PA and ITG compliance certification</p>
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center border-t pt-8">
          <p className="text-sm text-gray-600">
            For questions about SMS registration or consent, contact us at <strong>support@versiful.io</strong>
            <br />
            Phone: 833-681-1158 (text only)
          </p>
        </div>
      </div>
    </main>
  );
};

export default OptInForm;

