import { Card, formatDate } from "../companion/ui";

export default function MilestoneTimeline({ milestones }) {
    const sorted = [...milestones].sort((a, b) => new Date(b.date) - new Date(a.date));
    return (
        <Card className="p-6">
            <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream mb-5">Milestones</h2>
            <div className="relative space-y-5 pl-7 border-l-2 border-terracotta/20">
                {sorted.map((m) => (
                    <div key={m.id} className="relative">
                        <span className="absolute -left-[39px] top-0 w-9 h-9 rounded-full bg-cream dark:bg-charcoal-light border-2 border-terracotta/20 flex items-center justify-center text-lg">
                            {m.icon}
                        </span>
                        <p className="font-display font-bold text-charcoal dark:text-cream">{m.title}</p>
                        <p className="text-sm text-brown dark:text-brown-light">{m.detail}</p>
                        <p className="text-xs text-brown/60 dark:text-brown-light mt-0.5">{formatDate(m.date)}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}
