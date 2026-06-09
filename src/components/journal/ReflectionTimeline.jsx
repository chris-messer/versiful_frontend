import ReflectionEntry from "./ReflectionEntry";
import { formatDate } from "../companion/ui";

// Reverse-chronological timeline, grouped by month, with a warm timeline rail.
export default function ReflectionTimeline({ reflections, onDelete }) {
    if (reflections.length === 0) {
        return (
            <div className="text-center py-16 text-brown dark:text-brown-light">
                <div className="text-4xl mb-3">✍️</div>
                <p className="font-display text-lg">No reflections yet</p>
                <p className="text-sm mt-1">Save a takeaway from a chat, or add one of your own.</p>
            </div>
        );
    }

    const groups = reflections.reduce((acc, r) => {
        const key = formatDate(r.createdAt, { month: "long", year: "numeric" });
        (acc[key] = acc[key] || []).push(r);
        return acc;
    }, {});

    return (
        <div className="space-y-10">
            {Object.entries(groups).map(([month, items]) => (
                <div key={month}>
                    <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brown dark:text-brown-light mb-4">{month}</h3>
                    <div className="relative space-y-5 pl-6 border-l-2 border-terracotta/20">
                        {items.map((r) => (
                            <div key={r.id} className="relative">
                                <span className="absolute -left-[31px] top-6 w-3.5 h-3.5 rounded-full bg-terracotta border-2 border-cream dark:border-charcoal-light" />
                                <ReflectionEntry reflection={r} onDelete={onDelete} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
