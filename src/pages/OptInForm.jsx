import { Link } from "react-router-dom";

const OptInForm = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-300 rounded-lg">
          <p className="text-sm text-gray-800 text-center">
            <strong>For Compliance Review:</strong> This is the exact SMS opt-in form users see during registration at <code className="bg-white px-1 rounded">versiful.io/welcome</code> (after authentication).
          </p>
        </div>

        {/* EXACT REPLICA OF REGISTRATION FORM */}
        <div className="bg-white shadow-lg rounded-xl p-8 md:p-10">
          <div className="text-center space-y-1 mb-6">
            <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold">Verify your number</p>
            <h2 className="text-xl font-semibold text-gray-900">So we can text you back</h2>
          </div>

          <form className="space-y-5 pointer-events-none opacity-95">
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

            {/* SMS Consent Checkbox - THE CRITICAL COMPLIANCE FIELD */}
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
            </div>

            {/* Age Consent Checkbox */}
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
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="btn btn-primary w-full text-white bg-blue-900 hover:bg-blue-950 transition duration-200"
              disabled
            >
              Continue
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            After submitting this form, users receive a welcome SMS and can begin texting for biblical guidance.
            <br />
            Support: <strong>support@versiful.io</strong> | Phone: <strong>833-681-1158</strong>
          </p>
        </div>
      </div>
    </main>
  );
};

export default OptInForm;

