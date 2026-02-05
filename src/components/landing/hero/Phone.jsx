export default function Phone() {
    return (
        <div className="mockup-phone">
            <div className="camera"></div>
            <div className="display">
                <div className="bg-gray-200 w-full h-24 flex flex-col items-center justify-end pb-2 relative">
                    {/* Back button - slightly below center */}
                    <div className="absolute left-3 top-[55%] -translate-y-1/2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
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
                <div className="artboard bg-white py-3 px-2 phone-1 flex flex-col" style={{ height: 'calc(100% - 96px)' }}>
                    <div className="flex-1 overflow-y-auto space-y-4">
                        <div className="chat chat-end">
                            <div className="chat-bubble text-white bg-blue-500 text-sm px-3 py-2 max-w-[80%] ml-auto">
                                My dad was just diagnosed with cancer. I don't know how to handle this
                            </div>
                        </div>
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Logo" src="/logo.svg"/>
                                </div>
                            </div>
                            <div className="chat-bubble bg-gray-200 text-black text-sm px-4 py-3 leading-relaxed max-w-[85%]">
                                <p className="m-0 text-gray-700">
                                    Isaiah 41:10
                                </p>
                                <p className="m-0 mt-2 text-gray-800">
                                    "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you."
                                </p>
                                <p className="m-0 mt-3 text-gray-700">
                                    This is heavy news. God's promise here is clear: He's with you, and He will strengthen both you and your dad through this. You don't have to figure it all out right now. Take it one day at a time.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* iMessage Input Bar */}
                    <div className="bg-white border-t border-gray-200 px-2 py-2 mt-2">
                        <div className="flex items-end gap-2">
                            {/* Plus button */}
                            <button className="flex-shrink-0 w-7 h-7 rounded-full bg-transparent border-2 border-gray-300 flex items-center justify-center text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>

                        {/* Message Input */}
                        <div className="flex-1 bg-[#E9E9EB] rounded-[18px] px-3 py-1.5 min-h-[32px] flex items-center">
                            <span className="text-[14px] text-gray-400">SMS</span>
                        </div>

                            {/* Microphone button */}
                            <button className="flex-shrink-0 w-7 h-7 rounded-full bg-transparent flex items-center justify-center text-gray-500">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
