import { useState } from "react";
import { Modal, TextField, PrimaryButton, GhostButton } from "../companion/ui";

// Celebration flow when a prayer is marked answered (§7.1): capture a note, then
// show a thanksgiving verse generated "by the agent" (mocked) before closing.
export default function AnsweredCelebration({ open, prayer, onClose, onConfirm }) {
    const [note, setNote] = useState("");
    const [stage, setStage] = useState("note"); // note | celebrate

    const close = () => {
        setNote("");
        setStage("note");
        onClose();
    };

    const confirm = () => {
        onConfirm(prayer.prayerId, note.trim());
        setStage("celebrate");
    };

    if (!prayer) return null;

    return (
        <Modal open={open} onClose={close} title={stage === "note" ? "A prayer answered" : "🎉 Praise God!"}>
            {stage === "note" ? (
                <div className="space-y-5">
                    <p className="text-brown dark:text-brown-light leading-relaxed">
                        Wonderful. How did God answer <span className="font-semibold text-charcoal dark:text-cream">"{prayer.title}"</span>?
                    </p>
                    <TextField
                        as="textarea"
                        rows={4}
                        label="Your thanksgiving note"
                        placeholder="Write what happened and what you're grateful for…"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        autoFocus
                    />
                    <div className="flex gap-3">
                        <PrimaryButton onClick={confirm} className="flex-1">Mark answered 🎉</PrimaryButton>
                        <GhostButton onClick={close}>Cancel</GhostButton>
                    </div>
                </div>
            ) : (
                <div className="space-y-5 text-center">
                    <div className="text-5xl animate-soft-bounce">🎉</div>
                    <p className="text-brown dark:text-brown-light leading-relaxed">
                        Celebrating with you, Chris. Here's a verse of thanksgiving:
                    </p>
                    <div className="rounded-4xl bg-sage/10 border-2 border-sage/30 p-6 text-left">
                        <p className="font-display text-lg text-charcoal dark:text-cream italic leading-relaxed">
                            "Give thanks to the Lord, for he is good; his love endures forever."
                        </p>
                        <p className="text-sm font-semibold text-sage-dark dark:text-sage-light mt-2">— Psalm 107:1 (NIV)</p>
                    </div>
                    <p className="text-sm text-brown dark:text-brown-light">
                        Saved to your reflections and verse history.
                    </p>
                    <PrimaryButton onClick={close} className="w-full">Amen</PrimaryButton>
                </div>
            )}
        </Modal>
    );
}
