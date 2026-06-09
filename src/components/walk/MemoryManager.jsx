import { useState } from "react";
import { Card, Modal, PrimaryButton, GhostButton, formatDate } from "../companion/ui";
import { useCompanion } from "../../context/CompanionContext";

// "Things Versiful remembers" — the memory privacy & control surface (§11.2a).
// Lists structured long-term memories grouped by kind with per-item delete and
// clear-all. A secondary tab surfaces saved reflections. All local state.
const kindMeta = {
    life_event: { label: "Life events", icon: "🌟" },
    struggle: { label: "Recurring struggles", icon: "🌧️" },
    relationship: { label: "People in your life", icon: "👥" },
    preference: { label: "How you like to talk", icon: "⚙️" },
    spiritual_state: { label: "Where your heart is", icon: "✝️" },
    goal: { label: "Things you're working toward", icon: "🎯" },
};
const kindOrder = ["life_event", "struggle", "relationship", "spiritual_state", "goal", "preference"];

export default function MemoryManager() {
    const { memories, deleteMemory, clearAllMemories, reflections } = useCompanion();
    const [tab, setTab] = useState("memories");
    const [confirmId, setConfirmId] = useState(null);
    const [confirmClear, setConfirmClear] = useState(false);

    const grouped = kindOrder
        .map((kind) => ({ kind, items: memories.filter((m) => m.kind === kind) }))
        .filter((g) => g.items.length > 0);

    const confirmTarget = memories.find((m) => m.id === confirmId);

    return (
        <Card className="p-6 border-sage/30">
            <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                    <h2 className="font-display text-2xl font-bold text-charcoal dark:text-cream flex items-center gap-2">
                        🧠 Things Versiful remembers
                    </h2>
                    <p className="text-brown dark:text-brown-light mt-1 leading-relaxed max-w-2xl">
                        Everything Versiful is holding onto about your story — in plain sight, and fully in your control.
                        Delete anything, anytime.
                    </p>
                </div>
                {memories.length > 0 && (
                    <button
                        onClick={() => setConfirmClear(true)}
                        className="flex-shrink-0 text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-warm whitespace-nowrap"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <div className="inline-flex gap-1 rounded-3xl bg-cream-dark dark:bg-charcoal p-1 border-2 border-sage/20 my-5">
                {[{ k: "memories", l: `Memories (${memories.length})` }, { k: "reflections", l: `Reflections (${reflections.length})` }].map((t) => (
                    <button
                        key={t.k}
                        onClick={() => setTab(t.k)}
                        className={`px-4 py-2 rounded-2xl text-sm font-semibold font-display transition-warm
                            ${tab === t.k ? "bg-sage text-cream shadow-sage" : "text-brown dark:text-brown-light hover:text-sage-dark"}`}
                    >
                        {t.l}
                    </button>
                ))}
            </div>

            {tab === "memories" ? (
                memories.length === 0 ? (
                    <div className="text-center py-10 text-brown dark:text-brown-light">
                        <div className="text-3xl mb-2">🧹</div>
                        <p className="font-display">Versiful isn't holding any memories right now.</p>
                        <p className="text-sm mt-1">As you talk, the things you share will gather here — and you can clear them whenever you like.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {grouped.map((group) => (
                            <div key={group.kind}>
                                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brown dark:text-brown-light mb-3">
                                    {kindMeta[group.kind].icon} {kindMeta[group.kind].label}
                                </h3>
                                <div className="space-y-2.5">
                                    {group.items.map((m) => (
                                        <div key={m.id} className="flex items-start justify-between gap-4 rounded-3xl bg-cream-dark dark:bg-charcoal px-4 py-3 group">
                                            <div className="min-w-0">
                                                <p className="text-charcoal dark:text-cream font-medium leading-snug">{m.summary}</p>
                                                {m.detail && <p className="text-sm text-brown dark:text-brown-light mt-0.5">{m.detail}</p>}
                                                <div className="flex items-center gap-2 flex-wrap mt-1 text-xs text-brown/70 dark:text-brown-light">
                                                    {m.people?.length > 0 && <span>👤 {m.people.join(", ")}</span>}
                                                    {m.eventDate && <span>📅 {formatDate(m.eventDate, { month: "short", day: "numeric" })}</span>}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setConfirmId(m.id)}
                                                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-brown/50
                                                    hover:bg-terracotta/10 hover:text-terracotta transition-warm sm:opacity-0 group-hover:opacity-100"
                                                aria-label="Delete memory"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div className="space-y-2.5">
                    {reflections.map((r) => (
                        <div key={r.id} className="rounded-3xl bg-cream-dark dark:bg-charcoal px-4 py-3">
                            <p className="text-charcoal dark:text-cream leading-snug">{r.mood} {r.content}</p>
                            <p className="text-xs text-brown/70 dark:text-brown-light mt-1">
                                {r.verseReference ? `📖 ${r.verseReference} · ` : ""}{formatDate(r.createdAt)}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <Modal open={!!confirmId} onClose={() => setConfirmId(null)} title="Delete this memory?" maxWidth="max-w-md">
                <p className="text-brown dark:text-brown-light leading-relaxed">
                    Versiful will forget: <span className="font-semibold text-charcoal dark:text-cream">"{confirmTarget?.summary}"</span>. This can't be undone.
                </p>
                <div className="flex gap-3 mt-6">
                    <PrimaryButton onClick={() => { deleteMemory(confirmId); setConfirmId(null); }} className="flex-1">Delete</PrimaryButton>
                    <GhostButton onClick={() => setConfirmId(null)}>Keep it</GhostButton>
                </div>
            </Modal>

            <Modal open={confirmClear} onClose={() => setConfirmClear(false)} title="Clear all memories?" maxWidth="max-w-md">
                <p className="text-brown dark:text-brown-light leading-relaxed">
                    This erases everything Versiful remembers about your story ({memories.length} items). Your prayers and reflections stay. This can't be undone.
                </p>
                <div className="flex gap-3 mt-6">
                    <PrimaryButton onClick={() => { clearAllMemories(); setConfirmClear(false); }} className="flex-1">Clear everything</PrimaryButton>
                    <GhostButton onClick={() => setConfirmClear(false)}>Cancel</GhostButton>
                </div>
            </Modal>
        </Card>
    );
}
