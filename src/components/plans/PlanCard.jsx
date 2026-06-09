import { Link } from "react-router-dom";
import { Card } from "../companion/ui";

export default function PlanCard({ plan, enrollment }) {
    const inProgress = enrollment && enrollment.status === "active";
    const completed = enrollment?.completedDays?.length || 0;

    return (
        <Link
            to={`/plans/${plan.slug}`}
            className="block group animate-fade-in-up"
        >
            <Card className="p-6 h-full transition-warm group-hover:shadow-warm-lg group-hover:scale-[1.02]">
                <div className="flex items-start justify-between gap-3">
                    <span className="text-4xl">{plan.emoji}</span>
                    <span className="px-3 py-1 rounded-full bg-sage/15 text-sage-dark dark:text-sage-light text-xs font-bold uppercase tracking-wide">
                        {plan.dayCount} days
                    </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-charcoal dark:text-cream leading-snug">{plan.title}</h3>
                <p className="mt-2 text-brown dark:text-brown-light leading-relaxed text-sm">{plan.description}</p>

                {inProgress ? (
                    <div className="mt-4 pt-4 border-t-2 border-terracotta/10">
                        <div className="flex items-center justify-between text-sm mb-1.5">
                            <span className="font-semibold text-terracotta dark:text-terracotta-light">In progress</span>
                            <span className="text-brown dark:text-brown-light">{completed}/{plan.dayCount} days</span>
                        </div>
                        <div className="h-2 rounded-full bg-terracotta/15 overflow-hidden">
                            <div className="h-full bg-terracotta-gradient rounded-full transition-all duration-700" style={{ width: `${(completed / plan.dayCount) * 100}%` }} />
                        </div>
                    </div>
                ) : (
                    <p className="mt-4 text-sm font-semibold text-terracotta dark:text-terracotta-light group-hover:underline">
                        View plan →
                    </p>
                )}
            </Card>
        </Link>
    );
}
