import { useState } from "react";
import SEO from "../components/SEO";
import { useCompanion } from "../context/CompanionContext";
import { CompanionShell, PageHeader, PrimaryButton, Pill } from "../components/companion/ui";
import ReflectionTimeline from "../components/journal/ReflectionTimeline";
import AddReflectionModal from "../components/journal/AddReflectionModal";

const sourceFilters = [
    { value: "all", label: "All" },
    { value: "auto_summary", label: "From chats" },
    { value: "reading_plan", label: "Reading plans" },
    { value: "manual", label: "Written by me" },
];

export default function Journal() {
    const { reflections, addReflection, deleteReflection } = useCompanion();
    const [addOpen, setAddOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [source, setSource] = useState("all");

    const filtered = reflections.filter((r) => {
        const matchesSource = source === "all" || r.source === source;
        const matchesQuery = !query ||
            r.content.toLowerCase().includes(query.toLowerCase()) ||
            (r.verseReference || "").toLowerCase().includes(query.toLowerCase());
        return matchesSource && matchesQuery;
    });

    return (
        <>
            <SEO title="Reflection Log · Versiful" description="A searchable record of your spiritual takeaways — mostly assembled for you." />
            <CompanionShell>
                <PageHeader
                    eyebrow="Reflection Log"
                    title="Your spiritual journal"
                    subtitle="A searchable record of takeaways — saved from chats, gathered from reading plans, or written in your own words."
                    action={<PrimaryButton onClick={() => setAddOpen(true)}>+ New reflection</PrimaryButton>}
                />

                <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search your reflections…"
                        className="flex-1 rounded-3xl border-2 border-terracotta/20 bg-cream dark:bg-charcoal-light px-5 py-3
                            text-charcoal dark:text-cream font-body focus:outline-none focus:border-terracotta/60 transition-warm placeholder-brown/50"
                    />
                    <div className="flex flex-wrap gap-2">
                        {sourceFilters.map((f) => (
                            <Pill key={f.value} active={source === f.value} onClick={() => setSource(f.value)}>{f.label}</Pill>
                        ))}
                    </div>
                </div>

                <ReflectionTimeline reflections={filtered} onDelete={deleteReflection} />
            </CompanionShell>

            <AddReflectionModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={addReflection} />
        </>
    );
}
