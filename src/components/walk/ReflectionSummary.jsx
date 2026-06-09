import { Link } from "react-router-dom";
import { Card, relativeDate } from "../companion/ui";

export default function ReflectionSummary({ reflections }) {
    const recent = reflections.slice(0, 3);
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream">Reflections</h2>
                <Link to="/journal" className="text-sm font-semibold text-terracotta dark:text-terracotta-light hover:underline">Open journal →</Link>
            </div>
            <p className="text-brown dark:text-brown-light mb-4">
                <span className="font-display text-3xl font-black text-terracotta dark:text-terracotta-light">{reflections.length}</span> takeaways saved
            </p>
            <div className="space-y-3">
                {recent.map((r) => (
                    <div key={r.id} className="rounded-3xl bg-cream-dark dark:bg-charcoal p-3">
                        <p className="text-sm text-charcoal dark:text-cream line-clamp-2 leading-relaxed">{r.mood} {r.content}</p>
                        <p className="text-xs text-brown/70 dark:text-brown-light mt-1">{relativeDate(r.createdAt)}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}
