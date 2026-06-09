import { useState } from "react";
import SEO from "../components/SEO";
import { useCompanion } from "../context/CompanionContext";
import { CompanionShell, PageHeader, PrimaryButton, Pill } from "../components/companion/ui";
import PrayerList from "../components/prayers/PrayerList";
import AddPrayerModal from "../components/prayers/AddPrayerModal";
import AnsweredCelebration from "../components/prayers/AnsweredCelebration";

const filters = ["All", "Health", "Work", "Family", "Relationships", "Faith", "General"];

export default function Prayers() {
    const { prayers, addPrayer, prayNow, markPrayerAnswered, setReminderCadence, deletePrayer } = useCompanion();
    const [addOpen, setAddOpen] = useState(false);
    const [answering, setAnswering] = useState(null);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("All");

    const filtered = prayers.filter((p) => {
        const matchesFilter = filter === "All" || p.category === filter;
        const matchesQuery = !query ||
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            (p.body || "").toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
    });

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

                <PrayerList
                    prayers={filtered}
                    onPray={prayNow}
                    onMarkAnswered={(p) => setAnswering(p)}
                    onReminderChange={setReminderCadence}
                    onDelete={deletePrayer}
                />
            </CompanionShell>

            <AddPrayerModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={addPrayer} />
            <AnsweredCelebration
                open={!!answering}
                prayer={answering}
                onClose={() => setAnswering(null)}
                onConfirm={markPrayerAnswered}
            />
        </>
    );
}
