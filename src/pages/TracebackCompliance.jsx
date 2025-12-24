import { Link } from "react-router-dom";

const TracebackCompliance = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Robocall Mitigation & Traceback Compliance
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Compliance Certification
            </h2>
            <p className="text-gray-800 font-medium mb-4">
              Versiful, LLC ("Versiful") certifies that:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-800">
              <li>
                <strong>We are the originator</strong> of all phone calls and text messages sent 
                through our platform to registered users.
              </li>
              <li>
                <strong>We will participate in traceback efforts</strong>, including those initiated by:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>The Secure Telephony Identity Policy Administrator (STI-PA)</li>
                  <li>The US Telecom Industry Traceback Group (ITG)</li>
                  <li>Any lawful regulatory or law enforcement investigation</li>
                </ul>
              </li>
              <li>
                <strong>We implement STIR/SHAKEN</strong> caller ID authentication protocols where 
                applicable and available through our telecommunications providers.
              </li>
              <li>
                <strong>We maintain call records</strong> in accordance with FCC regulations and 
                industry best practices.
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              What is STI-PA?
            </h2>
            <p className="text-gray-700 mb-4">
              The <strong>Secure Telephony Identity Policy Administrator (STI-PA)</strong> is part 
              of the governance framework that oversees the STIR/SHAKEN caller ID authentication 
              system. STI-PA manages the certificate authority infrastructure that enables service 
              providers to digitally sign calls, helping to verify that caller ID information is 
              accurate and has not been spoofed.
            </p>
            <p className="text-gray-700 mb-4">
              The STI-PA is operated by iconectiv on behalf of the Secure Telephone Identity 
              Governance Authority (STI-GA), which is managed by ATIS (Alliance for 
              Telecommunications Industry Solutions).
            </p>
            <p className="text-gray-700">
              Learn more:{" "}
              <a 
                href="https://sti-ga.atis.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://sti-ga.atis.org/
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              What is the Industry Traceback Group?
            </h2>
            <p className="text-gray-700 mb-4">
              The <strong>Industry Traceback Group (ITG)</strong>, established by USTelecom in 2015, 
              is the leading consortium of telecommunications companies working together to identify 
              and stop illegal robocalls and caller ID spoofing.
            </p>
            <p className="text-gray-700 mb-4">
              The ITG traces illegal call campaigns back to their source, working with:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Wireline, wireless, VoIP, and cable providers</li>
              <li>Federal and state law enforcement agencies</li>
              <li>The FCC and FTC</li>
              <li>State attorneys general</li>
            </ul>
            <p className="text-gray-700 mb-4">
              When the ITG identifies an illegal call campaign, participating carriers and providers 
              are required to cooperate by:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Providing call detail records (CDRs) upon request</li>
              <li>Identifying the immediate upstream provider of the traffic</li>
              <li>Taking mitigation actions to block or cease transmitting illegal traffic</li>
            </ul>
            <p className="text-gray-700">
              Learn more:{" "}
              <a 
                href="https://tracebacks.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://tracebacks.org/
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Our Commitment to Legitimate Communications
            </h2>
            <p className="text-gray-700 mb-4">
              Versiful is committed to operating a legitimate SMS/MMS messaging service that:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>
                <strong>Obtains explicit consent:</strong> All users must opt-in to receive messages 
                and certify they are 18+ years of age
              </li>
              <li>
                <strong>Provides clear opt-out:</strong> Users can text STOP at any time to 
                immediately unsubscribe
              </li>
              <li>
                <strong>Sends only authorized content:</strong> We send biblical wisdom, guidance, 
                and account-related messages only to users who have registered
              </li>
              <li>
                <strong>Never spoofs caller ID:</strong> All messages originate from our registered 
                toll-free number (833-681-1158)
              </li>
              <li>
                <strong>Maintains detailed records:</strong> We log all message sends, user consent, 
                and opt-out requests
              </li>
              <li>
                <strong>Complies with TCPA/CTIA regulations:</strong> We follow all federal and 
                industry regulations for SMS messaging
              </li>
            </ul>
          </section>

          <section className="mb-8 bg-green-50 border-l-4 border-green-600 p-6 rounded">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Cooperation with Investigations
            </h2>
            <p className="text-gray-800 mb-4">
              If Versiful receives a traceback request from STI-PA, ITG, law enforcement, or 
              regulatory agencies, we will:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-800">
              <li>Respond promptly within the required timeframe</li>
              <li>Provide accurate call detail records and message logs</li>
              <li>Identify the nature and purpose of any flagged communications</li>
              <li>Cooperate fully with any follow-up requests or investigations</li>
              <li>Take immediate corrective action if any issues are identified</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              STIR/SHAKEN Implementation
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>STIR/SHAKEN</strong> (Secure Telephone Identity Revisited / Signature-based 
              Handling of Asserted information using toKENs) is a framework of technical standards 
              and protocols that allows phone carriers to verify that caller ID information is 
              accurate.
            </p>
            <p className="text-gray-700 mb-4">
              While STIR/SHAKEN primarily applies to voice calls, Versiful works with STIR/SHAKEN-compliant 
              telecommunications providers to ensure our SMS traffic originates from authenticated sources.
            </p>
            <p className="text-gray-700">
              Our carrier partners implement attestation levels (A, B, or C) on voice traffic and 
              follow best practices for SMS/MMS authentication.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Reporting Concerns
            </h2>
            <p className="text-gray-700 mb-4">
              If you receive a suspicious call or message claiming to be from Versiful, or if you 
              have concerns about our messaging practices, please contact us immediately:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Email:</strong> support@versiful.io</li>
              <li><strong>Phone:</strong> Text HELP to 833-681-1158</li>
              <li><strong>Website:</strong> <Link to="/" className="text-blue-600 hover:underline">https://versiful.io</Link></li>
            </ul>
            <p className="text-gray-700">
              To report illegal robocalls or phone scams to authorities:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>FCC:</strong> <a href="https://consumercomplaints.fcc.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://consumercomplaints.fcc.gov</a></li>
              <li><strong>FTC:</strong> <a href="https://reportfraud.ftc.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://reportfraud.ftc.gov</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Related Policies
            </h2>
            <ul className="space-y-2">
              <li>
                <Link to="/sms-consent" className="text-blue-600 hover:underline font-medium">
                  SMS Program Consent & Opt-In Information
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-blue-600 hover:underline font-medium">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-300">
            <p className="text-sm text-gray-600 text-center">
              This compliance statement was last updated: December 23, 2025
              <br />
              Versiful, LLC | support@versiful.io
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

export default TracebackCompliance;

