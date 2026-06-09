import { heroSlides } from "./heroSlides.js";

const sf = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif';

function Bubble({ bubble }) {
    const isUser = bubble.from === "user";
    if (isUser) {
        return (
            <div className="chat chat-end">
                <div
                    className="chat-bubble text-white bg-blue-500 px-3 py-2 max-w-[80%] ml-auto"
                    style={{ fontFamily: sf, fontSize: "15px", lineHeight: "1.35" }}
                >
                    {bubble.lines.map((line, i) => (
                        <p key={i} className="m-0">{line.value}</p>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Versiful" src="/logo.svg" />
                </div>
            </div>
            <div
                className="chat-bubble bg-gray-200 text-black px-4 py-3 max-w-[85%]"
                style={{ fontFamily: sf }}
            >
                {bubble.lines.map((line, i) => {
                    if (line.type === "ref") {
                        return (
                            <p key={i} className={`m-0 text-gray-700 ${i > 0 ? "mt-2" : ""}`} style={{ fontSize: "15px", lineHeight: "1.35", fontWeight: 600 }}>
                                {line.value}
                            </p>
                        );
                    }
                    if (line.type === "verse") {
                        return (
                            <p key={i} className={`m-0 text-gray-800 ${i > 0 ? "mt-2" : ""}`} style={{ fontSize: "15px", lineHeight: "1.35" }}>
                                {line.value}
                            </p>
                        );
                    }
                    return (
                        <p key={i} className={`m-0 text-gray-700 ${i > 0 ? "mt-3" : ""}`} style={{ fontSize: "15px", lineHeight: "1.35" }}>
                            {line.value}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}

// Generalized phone mockup: pass a `slide` (see heroSlides.js) to control the
// conversation shown. Falls back to the first slide if none is provided.
//
// The screen (.display) is locked to an iPhone-like aspect ratio (~9:19.5) so
// the device frame stays identical as slides rotate — only the screen content
// changes. Longer conversations scroll within the screen instead of stretching
// the frame.
export default function Phone({ slide = heroSlides[0] }) {
    return (
        <div className="mockup-phone block w-full mx-auto">
            <div className="camera"></div>
            <div
                className="display w-full flex flex-col overflow-hidden"
                style={{ aspectRatio: "9 / 19.5" }}
            >
                {/* Conversation header — pt-8 is the top safe area so the row clears
                    the notch / dynamic island (the .display is pulled up under it). */}
                <div className="bg-gray-200 w-full flex-shrink-0 flex flex-col items-center justify-end pt-8 pb-2 relative">
                    {/* Back button - aligned with the contact row, below the notch */}
                    <div className="absolute left-3 bottom-3">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                    {/* Circle with Image */}
                    <div className="bg-white rounded-full w-10 h-10 p-1 flex items-center justify-center">
                        <img src="/logo.svg" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    {/* Centered Text */}
                    <p className="text-xs text-gray-600" style={{ fontFamily: sf }}>
                        Versiful
                    </p>
                </div>

                {/* Screen body — flexes to fill the fixed-ratio screen */}
                <div className="bg-white flex-1 min-h-0 flex flex-col py-3 px-2" style={{ fontFamily: sf }}>
                    <div className="flex-1 min-h-0 overflow-y-auto space-y-4">
                        {slide.bubbles.map((bubble, i) => (
                            <Bubble key={i} bubble={bubble} />
                        ))}
                    </div>

                    {/* iMessage Input Bar */}
                    <div className="bg-white border-t border-gray-200 px-2 py-2 mt-2 flex-shrink-0">
                        <div className="flex items-end gap-2">
                            <button className="flex-shrink-0 w-7 h-7 rounded-full bg-transparent border-2 border-gray-300 flex items-center justify-center text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>

                            <div className="flex-1 bg-[#E9E9EB] rounded-[18px] px-3 py-1.5 min-h-[32px] flex items-center">
                                <span className="text-[14px] text-gray-400" style={{ fontFamily: sf }}>
                                    Text Versiful
                                </span>
                            </div>

                            <button className="flex-shrink-0 w-7 h-7 rounded-full bg-transparent flex items-center justify-center text-gray-500">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
