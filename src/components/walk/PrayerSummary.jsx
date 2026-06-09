import { Link } from "react-router-dom";
import { Card } from "../companion/ui";

export default function PrayerSummary({ prayers }) {
    const active = prayers.filter((p) => p.status === "active");
    const answered = prayers.filter((p) => p.status === "answered");

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream">Prayers</h2>
                <Link to="/prayers" className="text-sm font-semibold text-terracotta dark:text-terracotta-light hover:underline">Open journal →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-3xl bg-terracotta/10 p-4 text-center">
                    <div className="font-display text-3xl font-black text-terracotta dark:text-terracotta-light">{active.length}</div>
                    <div className="text-sm text-brown dark:text-brown-light">active</div>
                </div>
                <div className="rounded-3xl bg-sage/15 p-4 text-center">
                    <div className="font-display text-3xl font-black text-sage-dark dark:text-sage-light">{answered.length}</div>
                    <div className="text-sm text-brown dark:text-brown-light">answered 🎉</div>
                </div>
            </div>
            {answered[0] && (
                <div className="rounded-3xl bg-sage/5 border-2 border-sage/20 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-sage-dark dark:text-sage-light mb-1">Recently answered</p>
                    <p className="font-display font-semibold text-charcoal dark:text-cream">{answered[0].title}</p>
                    {answered[0].answerNote && <p className="text-sm text-brown dark:text-brown-light mt-1 line-clamp-2">{answered[0].answerNote}</p>}
                </div>
            )}
        </Card>
    );
}
