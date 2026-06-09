import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useCompanion } from "../context/CompanionContext";
import { CompanionShell, Card, PrimaryButton, GhostButton, StatTile } from "../components/companion/ui";
import PlanProgress from "../components/plans/PlanProgress";
import PlanDayCard from "../components/plans/PlanDayCard";
import EnrollButton from "../components/plans/EnrollButton";

export default function PlanDetail() {
    const { slug } = useParams();
    const { planCatalog, getPlanDays, getEnrollment, enrollPlan, completePlanDay, pausePlan } = useCompanion();

    const plan = planCatalog.find((p) => p.slug === slug);
    const days = getPlanDays(slug);
    const enrollment = getEnrollment(slug);
    const enrolled = !!enrollment && enrollment.status !== "archived";
    const completedDays = enrollment?.completedDays || [];
    const currentDay = enrollment?.currentDay || 1;
    const paused = enrollment?.status === "paused";

    if (!plan) {
        return (
            <CompanionShell>
                <div className="text-center py-20">
                    <p className="font-display text-2xl text-charcoal dark:text-cream">Plan not found</p>
                    <Link to="/plans" className="text-terracotta dark:text-terracotta-light font-semibold hover:underline mt-3 inline-block">← Back to plans</Link>
                </div>
            </CompanionShell>
        );
    }

    const streak = completedDays.length; // simple mock streak

    return (
        <>
            <SEO title={`${plan.title} · Versiful`} description={plan.description} />
            <CompanionShell>
                <Link to="/plans" className="text-sm font-semibold text-brown dark:text-brown-light hover:text-terracotta transition-warm mb-6 inline-block">
                    ← All plans
                </Link>

                <Card className="p-7 mb-8 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                        <div className="flex items-start gap-4">
                            <span className="text-5xl">{plan.emoji}</span>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-widest text-terracotta dark:text-terracotta-light">{plan.dayCount}-day plan</p>
                                <h1 className="font-display text-3xl sm:text-4xl font-bold text-charcoal dark:text-cream leading-tight">{plan.title}</h1>
                                <p className="text-brown dark:text-brown-light mt-2 max-w-xl leading-relaxed">{plan.description}</p>
                            </div>
                        </div>
                        {enrolled ? (
                            <div className="flex-shrink-0 flex flex-col items-center gap-3">
                                <PlanProgress completed={completedDays.length} total={plan.dayCount} label="days" />
                                <GhostButton className="!py-2 !px-4 !text-sm" onClick={() => pausePlan(slug)}>
                                    {paused ? "Resume plan" : "Pause plan"}
                                </GhostButton>
                            </div>
                        ) : (
                            <EnrollButton enrolled={false} onEnroll={() => enrollPlan(slug)} className="flex-shrink-0" />
                        )}
                    </div>
                </Card>

                {enrolled && (
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <StatTile value={`Day ${Math.min(currentDay, plan.dayCount)}`} label="you're on" icon="📍" />
                        <StatTile value={`${streak}`} label="day streak" accent="sage" icon="🔥" />
                        <StatTile value={`${plan.dayCount - completedDays.length}`} label="days left" accent="brown" icon="🌱" />
                    </div>
                )}

                {paused && (
                    <Card className="p-4 mb-6 border-brown/30 bg-brown/5 text-center">
                        <p className="text-brown dark:text-brown-light">This plan is paused. Resume anytime — no pressure.</p>
                    </Card>
                )}

                <h2 className="font-display text-2xl font-bold text-charcoal dark:text-cream mb-4">
                    {enrolled ? "Your journey" : `What's inside · ${plan.dayCount} days`}
                </h2>
                <div className="space-y-3">
                    {days.map((day) => {
                        const completed = completedDays.includes(day.dayNumber);
                        const isToday = enrolled && !completed && day.dayNumber === Math.min(currentDay, plan.dayCount);
                        const locked = enrolled && !completed && !isToday && day.dayNumber > currentDay;
                        return (
                            <PlanDayCard
                                key={day.dayNumber}
                                day={day}
                                completed={completed}
                                isToday={isToday}
                                locked={!enrolled ? false : locked}
                                onComplete={(dayNumber, reflection) => completePlanDay(slug, dayNumber, reflection)}
                            />
                        );
                    })}
                </div>

                {!enrolled && (
                    <div className="mt-8 text-center">
                        <PrimaryButton onClick={() => enrollPlan(slug)}>Start this plan</PrimaryButton>
                    </div>
                )}
            </CompanionShell>
        </>
    );
}
