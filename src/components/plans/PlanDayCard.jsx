import { useState } from "react";
import { Card, PrimaryButton, GhostButton, TextField } from "../companion/ui";

export default function PlanDayCard({ day, completed, isToday, locked, onComplete }) {
    const [open, setOpen] = useState(isToday && !completed);
    const [reflection, setReflection] = useState("");

    return (
        <Card className={`overflow-hidden transition-warm
            ${completed ? "border-sage/30 bg-sage/5" : isToday ? "border-terracotta/40 shadow-warm-lg" : ""}`}>
            <button
                onClick={() => !locked && setOpen((o) => !o)}
                className={`w-full flex items-center gap-4 px-5 py-4 text-left ${locked ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={locked}
            >
                <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display font-bold
                    ${completed ? "bg-sage text-cream" : isToday ? "bg-terracotta text-cream" : "bg-terracotta/10 text-terracotta dark:text-terracotta-light"}`}>
                    {completed ? "✓" : day.dayNumber}
                </span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-charcoal dark:text-cream">Day {day.dayNumber}</span>
                        {isToday && !completed && <span className="px-2 py-0.5 rounded-full bg-terracotta/15 text-terracotta dark:text-terracotta-light text-xs font-bold">Today</span>}
                        {locked && <span className="text-xs text-brown/60">🔒</span>}
                    </div>
                    <p className="text-sm text-brown dark:text-brown-light truncate">{day.theme}</p>
                </div>
                <span className="text-sm font-semibold text-terracotta dark:text-terracotta-light">{day.passageRef}</span>
            </button>

            {open && !locked && (
                <div className="px-5 pb-5 pt-1 border-t-2 border-terracotta/10 space-y-4 animate-fade-in-up">
                    <div className="rounded-3xl bg-cream-dark dark:bg-charcoal p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-brown dark:text-brown-light mb-1">Today's passage</p>
                        <p className="font-display text-lg text-charcoal dark:text-cream">{day.passageRef}</p>
                        <p className="text-sm text-brown dark:text-brown-light mt-1">Theme: {day.theme}</p>
                    </div>
                    <div className="rounded-3xl bg-sage/10 border-2 border-sage/20 p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-sage-dark dark:text-sage-light mb-1">Reflection prompt</p>
                        <p className="text-charcoal dark:text-cream leading-relaxed">{day.prompt}</p>
                    </div>
                    {!completed ? (
                        <>
                            <TextField
                                as="textarea"
                                rows={3}
                                label="Your response (optional — saved as a reflection)"
                                placeholder="Write your thoughts…"
                                value={reflection}
                                onChange={(e) => setReflection(e.target.value)}
                            />
                            <div className="flex gap-3">
                                <PrimaryButton onClick={() => onComplete(day.dayNumber, reflection.trim())} className="flex-1">
                                    Mark day complete ✓
                                </PrimaryButton>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm font-semibold text-sage-dark dark:text-sage-light">✓ Completed — well done.</p>
                    )}
                </div>
            )}
        </Card>
    );
}
