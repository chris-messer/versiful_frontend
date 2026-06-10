import { Card, formatDate, EmptyState } from "../companion/ui";

// Auto-generated highlight reel from /walk/summary `milestones`: [{ type, label, at }].
const ICON_BY_TYPE = {
    prayer_answered: "🙏",
    reading_plan: "📖",
    reflection: "✍️",
    streak: "🔥",
    memory: "🧠",
};

export default function MilestoneTimeline({ milestones = [] }) {
    if (!milestones.length) {
        return (
            <Card className="p-6">
                <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream mb-2">Milestones</h2>
                <EmptyState icon="🌱" hint="Answered prayers, completed plans, and saved reflections will show up here over time." />
            </Card>
        );
    }
    const sorted = [...milestones].sort((a, b) => new Date(b.at || 0) - new Date(a.at || 0));
    return (
        <Card className="p-6">
            <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream mb-5">Milestones</h2>
            <div className="relative space-y-5 pl-7 border-l-2 border-terracotta/20">
                {sorted.map((m, i) => (
                    <div key={`${m.type}-${i}`} className="relative">
                        <span className="absolute -left-[39px] top-0 w-9 h-9 rounded-full bg-cream dark:bg-charcoal-light border-2 border-terracotta/20 flex items-center justify-center text-lg">
                            {ICON_BY_TYPE[m.type] || "✨"}
                        </span>
                        <p className="font-display font-bold text-charcoal dark:text-cream">{m.label}</p>
                        {m.at && <p className="text-xs text-brown/60 dark:text-brown-light mt-0.5">{formatDate(m.at)}</p>}
                    </div>
                ))}
            </div>
        </Card>
    );
}
