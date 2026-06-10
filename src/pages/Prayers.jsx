import { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { useCompanion } from "../context/CompanionContext";
import { CompanionShell, PageHeader, PrimaryButton, Pill, LoadingState, ErrorState, EmptyState } from "../components/companion/ui";
import PrayerList from "../components/prayers/PrayerList";
import AddPrayerModal from "../components/prayers/AddPrayerModal";
import AnsweredCelebration from "../components/prayers/AnsweredCelebration";

const filters = ["All", "Health", "Work", "Family", "Relationships", "Faith", "General"];

const errToast = (flash, e) => {
    if (e?.isSubscriptionRequired) flash(e.message || "Upgrade to add more prayers", "🔒");
    else if (e?.isServiceUnavailable) flash("Temporarily unavailable — try again", "⚠️");
    else flash(e?.message || "Something went wrong — try again", "⚠️");
};

export default function Prayers() {
    const {
        prayers, prayersLoading, prayersError, loadPrayers,
        addPrayer, prayNow, markPrayerAnswered, setReminderCadence, deletePrayer,
        isLoggedIn, flash,
    } = useCompanion();
    const [addOpen, setAddOpen] = useState(false);
    const [answering, setAnswering] = useState(null);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        if (isLoggedIn) loadPrayers();
    }, [isLoggedIn, loadPrayers]);

    const filtered = prayers.filter((p) => {
        const matchesFilter = filter === "All" || p.category === filter;
        const matchesQuery = !query ||
            (p.title || "").toLowerCase().includes(query.toLowerCase()) ||
            (p.body || "").toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
    });

    const handleAdd = (data) => addPrayer(data).catch((e) => errToast(flash, e));
    const handleAnswer = (id, note) => markPrayerAnswered(id, note).catch((e) => errToast(flash, e));
    const handleReminder = (id, c) => setReminderCadence(id, c).catch((e) => errToast(flash, e));
    const handleDelete = (id) => deletePrayer(id).catch((e) => errToast(flash, e));

    return (
        <>
            <SEO title="Prayer Journal · Versiful" description="Your private, living prayer list — prayed with, not just stored." />
            <CompanionShell>
                <PageHeader
                    eyebrow="Prayer Journal"
                    title="Your prayer list, prayed with"
                    subtitle="Add prayers by text or here on the web. Versiful follows up and celebrates answered prayers with you."
                    action={<PrimaryButton onClick={() => setAddOpen(true)}>+ Add prayer</PrimaryButton>}
                />

                <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search prayers…"
                        className="flex-1 rounded-3xl border-2 border-terracotta/20 bg-cream dark:bg-charcoal-light px-5 py-3
                            text-charcoal dark:text-cream font-body focus:outline-none focus:border-terracotta/60 transition-warm placeholder-brown/50"
                    />
                    <div className="flex flex-wrap gap-2">
                        {filters.map((f) => (
                            <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Pill>
                        ))}
                    </div>
                </div>

                {prayersLoading && prayers.length === 0 ? (
                    <LoadingState label="Loading your prayers…" />
                ) : prayersError ? (
                    <ErrorState error={prayersError} onRetry={loadPrayers} />
                ) : prayers.length === 0 ? (
                    <EmptyState
                        icon="🙏"
                        title="No prayers yet"
                        hint="Add your first prayer — Versiful will help you keep praying and celebrate when it's answered."
                        action={<PrimaryButton onClick={() => setAddOpen(true)}>+ Add a prayer</PrimaryButton>}
                    />
                ) : (
                    <PrayerList
                        prayers={filtered}
                        onPray={prayNow}
                        onMarkAnswered={(p) => setAnswering(p)}
                        onReminderChange={handleReminder}
                        onDelete={handleDelete}
                    />
                )}
            </CompanionShell>

            <AddPrayerModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
            <AnsweredCelebration
                open={!!answering}
                prayer={answering}
                onClose={() => setAnswering(null)}
                onConfirm={handleAnswer}
            />
        </>
    );
}
