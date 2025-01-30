export default function Phone() {
    return (
        <div className="mockup-phone">
            <div className="camera"></div>
            <div className="display">
                <div className="artboard bg-white py-10 px-2 phone-1">
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
                            My friend has been very rude to me and hurt my feelings
                        </div>
                    </div>
                    <div className="chat chat-start text-left text-sm whitespace-pre-line">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Logo" src="/logo.svg" />
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
