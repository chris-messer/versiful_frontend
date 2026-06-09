import { Card, formatDate } from "../companion/ui";

const sourceLabels = {
    auto_summary: { label: "From a chat", icon: "💬" },
    manual: { label: "Written by you", icon: "✍️" },
    reading_plan: { label: "Reading plan", icon: "📖" },
};

export default function ReflectionEntry({ reflection, onDelete }) {
    const src = sourceLabels[reflection.source] || sourceLabels.manual;
    return (
        <Card className="p-6 animate-fade-in-up group">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-brown dark:text-brown-light">
                    <span className="text-lg">{reflection.mood || "🤍"}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sage/15 text-xs font-semibold">{src.icon} {src.label}</span>
                </div>
                <span className="text-sm text-brown/70 dark:text-brown-light">{formatDate(reflection.createdAt)}</span>
            </div>
            <p className="mt-3 text-charcoal dark:text-cream leading-relaxed text-[17px]">{reflection.content}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
                {reflection.verseReference ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta dark:text-terracotta-light">
                        📖 {reflection.verseReference}
                    </span>
                ) : <span />}
                {onDelete && (
                    <button
                        onClick={() => onDelete(reflection.id)}
                        className="text-sm text-brown/50 hover:text-terracotta transition-warm opacity-0 group-hover:opacity-100"
                    >
                        Delete
                    </button>
                )}
            </div>
        </Card>
    );
}
