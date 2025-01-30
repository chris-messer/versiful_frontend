export default function CallToAction() {
    const phoneNumber = "833-681-1158";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(phoneNumber);
        alert("Phone number copied to clipboard!");
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="text-center ">
                {/*<h2 className="text-2xl font-bold text-brown">Get Guidance Instantly</h2>*/}
                <p className="mt-2">
                    Text <span className="font-semibold text-blue-700">{phoneNumber}</span> with your situation to
                    receive personalized Bible verses and parables right away.
                </p>
            </div>
        </div>
    );
}
