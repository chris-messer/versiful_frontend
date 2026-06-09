import { useEffect, useRef, useState } from "react";
import Phone from "./Phone.jsx";
import { heroSlides } from "./heroSlides.js";

const AUTO_ADVANCE_MS = 5000;

// Auto-advancing carousel of phone mockups, each showing a different companion
// interaction. Includes prev/next arrows, dots, accessible labels, pause on
// hover/focus, and respects prefers-reduced-motion (no auto-advance + no fade).
export default function PhoneCarousel({ slides = heroSlides }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const liveRef = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReducedMotion(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (reducedMotion || paused) return;
        const id = window.setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, AUTO_ADVANCE_MS);
        return () => window.clearInterval(id);
    }, [reducedMotion, paused, slides.length]);

    const go = (next) => setIndex(((next % slides.length) + slides.length) % slides.length);
    const prev = () => go(index - 1);
    const next = () => go(index + 1);

    const current = slides[index];

    return (
        <div
            className="relative w-full"
            role="group"
            aria-roledescription="carousel"
            aria-label="Examples of Versiful in action"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            {/* Glow behind the phone */}
            <div className="absolute -inset-6 bg-gradient-to-br from-terracotta/20 to-sage/20 rounded-5xl blur-3xl pointer-events-none"></div>

            <div className="relative">
                {/* Caption pill */}
                <div className="flex justify-center mb-4">
                    <span
                        key={`cap-${current.id}`}
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream dark:bg-charcoal-light
                            border-2 border-terracotta/20 text-sm font-semibold font-display text-terracotta dark:text-terracotta-light
                            shadow-warm ${reducedMotion ? "" : "animate-fade-in-up"}`}
                    >
                        {current.caption}
                    </span>
                </div>

                {/* Phone + arrows */}
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous example"
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-cream dark:bg-charcoal-light border-2 border-terracotta/20
                            text-terracotta dark:text-terracotta-light shadow-warm hover:scale-110 hover:bg-terracotta/10
                            transition-warm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-terracotta"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="w-full max-w-[300px] sm:max-w-[320px]">
                        <div
                            key={current.id}
                            className={reducedMotion ? "" : "animate-fade-in-up"}
                            aria-roledescription="slide"
                            aria-label={`${index + 1} of ${slides.length}: ${current.label}`}
                        >
                            <Phone slide={current} />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next example"
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-cream dark:bg-charcoal-light border-2 border-terracotta/20
                            text-terracotta dark:text-terracotta-light shadow-warm hover:scale-110 hover:bg-terracotta/10
                            transition-warm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-terracotta"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Label + dots */}
                <div className="mt-5 text-center">
                    <p className="font-body text-brown dark:text-brown-light mb-3 min-h-[1.5rem]">{current.label}</p>
                    <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Choose example">
                        {slides.map((s, i) => (
                            <button
                                key={s.id}
                                type="button"
                                role="tab"
                                aria-selected={i === index}
                                aria-label={s.caption}
                                onClick={() => go(i)}
                                className={`h-2.5 rounded-full transition-warm focus:outline-none focus:ring-2 focus:ring-terracotta
                                    ${i === index ? "w-7 bg-terracotta" : "w-2.5 bg-brown/30 hover:bg-brown/50"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Polite live region for screen readers */}
            <div ref={liveRef} className="sr-only" aria-live="polite">
                {`Showing ${current.label}`}
            </div>
        </div>
    );
}
