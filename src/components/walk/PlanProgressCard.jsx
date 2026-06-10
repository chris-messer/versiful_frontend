import { Link } from "react-router-dom";
import { Card } from "../companion/ui";
import PlanProgress from "../plans/PlanProgress";

// Driven by /walk/summary `readingPlan`: { slug, title, currentDay, dayCount, status }.
export default function PlanProgressCard({ readingPlan }) {
    const total = readingPlan?.dayCount || 0;
    // Progress approximated by current day (summary has no completedDays list).
    const completed = Math.max((readingPlan?.currentDay || 1) - 1, 0);

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream">Reading plan</h2>
                <Link to="/plans" className="text-sm font-semibold text-terracotta dark:text-terracotta-light hover:underline">All plans →</Link>
            </div>
            {readingPlan && readingPlan.slug ? (
                <Link to={`/plans/${readingPlan.slug}`} className="flex items-center gap-5 group">
                    <PlanProgress completed={completed} total={total} size={96} stroke={9} />
                    <div>
                        <div className="text-3xl mb-1">📖</div>
                        <p className="font-display font-bold text-charcoal dark:text-cream group-hover:text-terracotta transition-warm">{readingPlan.title}</p>
                        <p className="text-sm text-brown dark:text-brown-light">Day {Math.min(readingPlan.currentDay || 1, total || 1)} of {total}</p>
                    </div>
                </Link>
            ) : (
                <div className="text-center py-4">
                    <p className="text-brown dark:text-brown-light mb-3">No active plan right now.</p>
                    <Link to="/plans" className="text-terracotta dark:text-terracotta-light font-semibold hover:underline">Browse plans →</Link>
                </div>
            )}
        </Card>
    );
}
