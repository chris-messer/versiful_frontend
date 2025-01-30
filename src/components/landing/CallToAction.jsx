export default function CallToAction() {
    const phoneNumber = "833-681-1158";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(phoneNumber);
        alert("Phone number copied to clipboard!");
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="text-center ">
                <p className="mt-2">
                    Text <a
                    href={`sms:${phoneNumber}`}
                    className="font-semibold text-blue-700 underline"
                >
                    {phoneNumber}
                </a> for personalized Bible verses and parables right away.
                </p>
            </div>
        </div>
    );
}
