import PrayerCard from "./PrayerCard";

export default function PrayerList({ prayers, onPray, onMarkAnswered, onReminderChange, onDelete }) {
    const active = prayers.filter((p) => p.status === "active");
    const answered = prayers.filter((p) => p.status === "answered");

    return (
        <div className="space-y-10">
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <h2 className="font-display text-2xl font-bold text-charcoal dark:text-cream">Active</h2>
                    <span className="px-3 py-0.5 rounded-full bg-terracotta/15 text-terracotta dark:text-terracotta-light text-sm font-bold">{active.length}</span>
                </div>
                {active.length === 0 ? (
                    <p className="text-brown dark:text-brown-light italic">No active prayers yet — add one above.</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-5">
                        {active.map((p) => (
                            <PrayerCard key={p.prayerId} prayer={p} onPray={onPray} onMarkAnswered={onMarkAnswered} onReminderChange={onReminderChange} onDelete={onDelete} />
                        ))}
                    </div>
                )}
            </section>

            {answered.length > 0 && (
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <h2 className="font-display text-2xl font-bold text-charcoal dark:text-cream">Answered</h2>
                        <span className="px-3 py-0.5 rounded-full bg-sage/20 text-sage-dark dark:text-sage-light text-sm font-bold">{answered.length}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                        {answered.map((p) => (
                            <PrayerCard key={p.prayerId} prayer={p} onPray={onPray} onMarkAnswered={onMarkAnswered} onReminderChange={onReminderChange} onDelete={onDelete} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
