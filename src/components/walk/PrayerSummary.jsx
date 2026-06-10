import { Link } from "react-router-dom";
import { Card } from "../companion/ui";

// Driven by /walk/summary `prayers`: { active, answered, recentAnswered: [{title, answerNote}] }.
export default function PrayerSummary({ summary }) {
    const active = summary?.active || 0;
    const answered = summary?.answered || 0;
    const recent = (summary?.recentAnswered || [])[0];

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream">Prayers</h2>
                <Link to="/prayers" className="text-sm font-semibold text-terracotta dark:text-terracotta-light hover:underline">Open journal →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-3xl bg-terracotta/10 p-4 text-center">
                    <div className="font-display text-3xl font-black text-terracotta dark:text-terracotta-light">{active}</div>
                    <div className="text-sm text-brown dark:text-brown-light">active</div>
                </div>
                <div className="rounded-3xl bg-sage/15 p-4 text-center">
                    <div className="font-display text-3xl font-black text-sage-dark dark:text-sage-light">{answered}</div>
                    <div className="text-sm text-brown dark:text-brown-light">answered 🎉</div>
                </div>
            </div>
            {recent && (
                <div className="rounded-3xl bg-sage/5 border-2 border-sage/20 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-sage-dark dark:text-sage-light mb-1">Recently answered</p>
                    <p className="font-display font-semibold text-charcoal dark:text-cream">{recent.title}</p>
                    {recent.answerNote && <p className="text-sm text-brown dark:text-brown-light mt-1 line-clamp-2">{recent.answerNote}</p>}
                </div>
            )}
        </Card>
    );
}
