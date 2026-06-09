import { useState } from "react";
import { Modal, TextField, PrimaryButton, GhostButton, SegmentedControl } from "../companion/ui";

const categories = ["General", "Health", "Work", "Family", "Relationships", "Faith"];
const cadenceOptions = [
    { value: "none", label: "No reminder" },
    { value: "weekly", label: "Weekly" },
    { value: "daily", label: "Daily" },
];

export default function AddPrayerModal({ open, onClose, onAdd }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("General");
    const [people, setPeople] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [reminderCadence, setReminderCadence] = useState("none");

    const reset = () => {
        setTitle(""); setBody(""); setCategory("General"); setPeople(""); setEventDate(""); setReminderCadence("none");
    };

    const submit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({
            title: title.trim(),
            body: body.trim(),
            category,
            people: people.split(",").map((p) => p.trim()).filter(Boolean),
            eventDate: eventDate || null,
            reminderCadence,
        });
        reset();
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} title="Add a prayer">
            <form onSubmit={submit} className="space-y-5">
                <TextField
                    label="What are you praying for?"
                    placeholder="e.g. Mom's surgery"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <TextField
                    as="textarea"
                    rows={3}
                    label="A little more (optional)"
                    placeholder="Add any detail you want to remember…"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <div>
                    <span className="block font-display font-semibold text-sm text-charcoal dark:text-cream mb-2">Category</span>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setCategory(c)}
                                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold font-display border-2 transition-warm
                                    ${category === c ? "bg-terracotta text-cream border-terracotta-dark/20" : "bg-sage/10 text-brown dark:text-cream border-sage/20 hover:border-sage/50"}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
                <TextField
                    label="People (comma separated, optional)"
                    placeholder="Mom, Dad"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                />
                <TextField
                    type="date"
                    label="A date to remember (optional)"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                />
                <div>
                    <span className="block font-display font-semibold text-sm text-charcoal dark:text-cream mb-2">Reminders</span>
                    <SegmentedControl options={cadenceOptions} value={reminderCadence} onChange={setReminderCadence} />
                </div>
                <div className="flex gap-3 pt-2">
                    <PrimaryButton type="submit" className="flex-1">Add to my list 🙏</PrimaryButton>
                    <GhostButton type="button" onClick={onClose}>Cancel</GhostButton>
                </div>
            </form>
        </Modal>
    );
}
