import { useState } from "react";
import { Modal, TextField, PrimaryButton, GhostButton } from "../companion/ui";

const moods = ["🤍", "🙏", "🌱", "✨", "😮‍💨", "😢", "🔥", "🕊️"];

export default function AddReflectionModal({ open, onClose, onAdd }) {
    const [content, setContent] = useState("");
    const [verseReference, setVerseReference] = useState("");
    const [mood, setMood] = useState("🤍");

    const reset = () => { setContent(""); setVerseReference(""); setMood("🤍"); };

    const submit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        onAdd({ content: content.trim(), verseReference: verseReference.trim() || null, mood, source: "manual" });
        reset();
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} title="New reflection">
            <form onSubmit={submit} className="space-y-5">
                <TextField
                    as="textarea"
                    rows={5}
                    label="What do you want to remember?"
                    placeholder="A takeaway, a prayer, something God showed you…"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    autoFocus
                />
                <TextField
                    label="Linked verse (optional)"
                    placeholder="e.g. Philippians 4:6-7"
                    value={verseReference}
                    onChange={(e) => setVerseReference(e.target.value)}
                />
                <div>
                    <span className="block font-display font-semibold text-sm text-charcoal dark:text-cream mb-2">Mood</span>
                    <div className="flex flex-wrap gap-2">
                        {moods.map((m) => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setMood(m)}
                                className={`w-11 h-11 rounded-2xl text-xl border-2 transition-warm
                                    ${mood === m ? "bg-terracotta/15 border-terracotta/50 scale-110" : "bg-cream-dark dark:bg-charcoal border-terracotta/15 hover:border-terracotta/30"}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex gap-3 pt-2">
                    <PrimaryButton type="submit" className="flex-1">Save reflection ✍️</PrimaryButton>
                    <GhostButton type="button" onClick={onClose}>Cancel</GhostButton>
                </div>
            </form>
        </Modal>
    );
}
