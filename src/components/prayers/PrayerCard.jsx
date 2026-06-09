import { useState } from "react";
import { Card, GhostButton, formatDate, relativeDate } from "../companion/ui";
import PrayerReminderToggle from "./PrayerReminderToggle";

const categoryEmoji = {
    Health: "🩺",
    Work: "💼",
    Family: "👨‍👩‍👧",
    General: "🤍",
    Relationships: "💞",
    Faith: "✝️",
};

export default function PrayerCard({ prayer, onPray, onMarkAnswered, onReminderChange, onDelete }) {
    const [expanded, setExpanded] = useState(false);
    const answered = prayer.status === "answered";
    const hasUpcoming = prayer.eventDate && new Date(prayer.eventDate) >= new Date("2026-06-09T00:00:00");

    return (
        <Card className={`p-6 transition-warm hover:shadow-warm-lg animate-fade-in-up ${answered ? "border-sage/30 bg-sage/5" : ""}`}>
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{categoryEmoji[prayer.category] || "🤍"}</span>
                    <div className="min-w-0">
                        <h3 className="font-display text-lg font-bold text-charcoal dark:text-cream leading-snug">
                            {prayer.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap mt-1 text-sm text-brown dark:text-brown-light">
                            <span className="px-2.5 py-0.5 rounded-full bg-sage/15 text-xs font-semibold">{prayer.category}</span>
                            {prayer.people?.length > 0 && <span>for {prayer.people.join(", ")}</span>}
                            {prayer.eventDate && (
                                <span className={hasUpcoming ? "text-terracotta dark:text-terracotta-light font-semibold" : ""}>
                                    {hasUpcoming ? "📅 " : ""}{formatDate(prayer.eventDate, { month: "short", day: "numeric" })}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {answered && <span className="text-xs font-bold uppercase tracking-wide text-sage-dark dark:text-sage-light flex-shrink-0">Answered 🎉</span>}
            </div>

            {prayer.body && (
                <p className="mt-3 text-brown dark:text-brown-light leading-relaxed">{prayer.body}</p>
            )}

            {answered && prayer.answerNote && (
                <div className="mt-3 rounded-3xl bg-sage/10 border-2 border-sage/20 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-sage-dark dark:text-sage-light mb-1">How God answered</p>
                    <p className="text-charcoal dark:text-cream leading-relaxed">{prayer.answerNote}</p>
                    <p className="text-xs text-brown dark:text-brown-light mt-1">{formatDate(prayer.answeredAt)}</p>
                </div>
            )}

            <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-brown dark:text-brown-light">
                    <span className="font-semibold text-terracotta dark:text-terracotta-light">{prayer.prayCount}×</span>
                    <span>prayed</span>
                    {prayer.lastPrayedAt && <span className="text-xs">· last {relativeDate(prayer.lastPrayedAt)}</span>}
                </div>
                {!answered ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onPray(prayer.prayerId)}
                            className="px-4 py-2 rounded-3xl bg-terracotta/10 text-terracotta dark:text-terracotta-light
                                font-display font-semibold text-sm hover:bg-terracotta/20 transition-warm border-2 border-terracotta/20"
                        >
                            🙏 Pray now
                        </button>
                        <GhostButton className="!py-2 !px-4 !text-sm" onClick={() => onMarkAnswered(prayer)}>
                            Mark answered
                        </GhostButton>
                    </div>
                ) : (
                    <button onClick={() => setExpanded((e) => !e)} className="text-sm font-semibold text-brown dark:text-brown-light hover:underline">
                        {expanded ? "Hide options" : "Options"}
                    </button>
                )}
            </div>

            {!answered && (
                <div className="mt-4 pt-4 border-t-2 border-terracotta/10 flex items-center justify-between gap-3 flex-wrap">
                    <PrayerReminderToggle cadence={prayer.reminderCadence} onChange={(c) => onReminderChange(prayer.prayerId, c)} />
                    <button onClick={() => onDelete(prayer.prayerId)} className="text-sm text-brown/60 hover:text-terracotta transition-warm">
                        Remove
                    </button>
                </div>
            )}
            {answered && expanded && (
                <div className="mt-4 pt-4 border-t-2 border-sage/20 flex justify-end">
                    <button onClick={() => onDelete(prayer.prayerId)} className="text-sm text-brown/60 hover:text-terracotta transition-warm">
                        Remove from journal
                    </button>
                </div>
            )}
        </Card>
    );
}
