import { useConfig } from "../../hooks/useConfig";

export default function CallToAction() {
    const { config } = useConfig();
    const phoneNumber = config?.phone?.sms || "833-681-1158";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(phoneNumber);
        alert("Phone number copied to clipboard!");
    };

    return (
        <div className="flex items-center justify-center">
            <div className="text-center max-w-xl px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 shadow-sm">
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                    Text{" "}
                    <a href={`sms:${phoneNumber}`} className="font-semibold text-blue-700 underline">
                        {phoneNumber}
                    </a>{" "}
                    for personalized Bible verses and parables right away.
                </p>
                <button
                    type="button"
                    onClick={copyToClipboard}
                    className="mt-3 inline-flex items-center justify-center rounded-xl border border-blue-900 px-3 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                >
                    Copy number
                </button>
            </div>
        </div>
    );
}
