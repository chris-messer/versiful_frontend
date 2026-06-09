import { Link } from "react-router-dom";
import { Card } from "../companion/ui";
import PlanProgress from "../plans/PlanProgress";

export default function PlanProgressCard({ enrollment, plan }) {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream">Reading plan</h2>
                <Link to="/plans" className="text-sm font-semibold text-terracotta dark:text-terracotta-light hover:underline">All plans →</Link>
            </div>
            {enrollment && plan ? (
                <Link to={`/plans/${plan.slug}`} className="flex items-center gap-5 group">
                    <PlanProgress completed={enrollment.completedDays.length} total={plan.dayCount} size={96} stroke={9} />
                    <div>
                        <div className="text-3xl mb-1">{plan.emoji}</div>
                        <p className="font-display font-bold text-charcoal dark:text-cream group-hover:text-terracotta transition-warm">{plan.title}</p>
                        <p className="text-sm text-brown dark:text-brown-light">Day {Math.min(enrollment.currentDay, plan.dayCount)} of {plan.dayCount}</p>
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
