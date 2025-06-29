export default function Phone() {
    return (
        <div className="mockup-phone">
            <div className="camera"></div>
            <div className="display">
                <div className="bg-gray-200 w-full h-24 flex flex-col items-center justify-end ">
                    {/* Circle with Image */}
                    <div className="bg-white rounded-full w-10 h-10 p-1 flex items-center justify-center">
                        <img
                            src="/logo.svg"
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Centered Text */}
                    <p className="text-xs text-gray-600">Versiful</p>
                </div>
                <div className="artboard bg-white py-3 px-2 phone-1">

                    <div className="chat chat-end text-right text-sm">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Avatar"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>
                        <div className="chat-bubble text-white bg-blue-500">
                            What would jesus say about betrayal?
                        </div>
                    </div>
                    <div className="chat chat-start text-left text-sm whitespace-pre-line">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Logo" src="/logo.svg"/>
                            </div>
                        </div>
                        <div className="chat-bubble bg-gray-200 text-black">
                            <p>The Parable of the Unforgiving Servant (Matthew 18:21-35) <br/><br/>

                                Jesus tells a story about a king who forgives a servant’s enormous debt. However, that
                                same servant refuses to forgive a much smaller debt owed to him by another person. When
                                the king hears of this, he is angry and punishes the unforgiving servant.
                                <br/><br/>
                                The lesson: Just as God forgives us, we should also forgive others, even when they hurt
                                us. Holding onto bitterness harms us, but showing mercy brings peace.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
