import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useCompanion } from "../context/CompanionContext";
import { CompanionShell, Card, StatTile } from "../components/companion/ui";
import DailyVerseCard from "../components/walk/DailyVerseCard";
import ThemeCloud from "../components/walk/ThemeCloud";
import PrayerSummary from "../components/walk/PrayerSummary";
import ReflectionSummary from "../components/walk/ReflectionSummary";
import PlanProgressCard from "../components/walk/PlanProgressCard";
import MilestoneTimeline from "../components/walk/MilestoneTimeline";
import MemoryManager from "../components/walk/MemoryManager";

export default function MyWalk() {
    const {
        user, dailyVerse, prayers, reflections, themes, verseHistory, versesReceivedCount,
        milestones, gentlePrompts, upcomingCheckins, enrolledPlans, planCatalog,
    } = useCompanion();

    const activePlan = enrolledPlans.find((p) => p.status === "active");
    const activePlanMeta = activePlan ? planCatalog.find((p) => p.slug === activePlan.slug) : null;

    return (
        <>
            <SEO title="My Walk · Versiful" description="Watch your spiritual journey take shape over time." />
            <CompanionShell>
                {/* Header */}
                <div className="mb-8 animate-fade-in-up">
                    <p className="text-sm font-semibold uppercase tracking-widest text-terracotta dark:text-terracotta-light">Your walk with Versiful</p>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal dark:text-cream leading-tight mt-1">
                        Hi {user.firstName}, here's your journey
                    </h1>
                </div>

                {/* Top stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <StatTile value={`${user.currentStreak} 🔥`} label="day streak" />
                    <StatTile value={user.daysActive} label="days active" accent="sage" />
                    <StatTile value={versesReceivedCount} label="verses received" accent="brown" />
                    <StatTile value={prayers.filter((p) => p.status === "answered").length} label="prayers answered" />
                </div>

                {/* Daily verse + gentle prompts */}
                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2">
                        <DailyVerseCard verse={dailyVerse} />
                    </div>
                    <Card className="p-6 bg-sage/10 border-sage/30">
                        <h2 className="font-display text-lg font-bold text-charcoal dark:text-cream mb-3">A gentle nudge</h2>
                        <div className="space-y-3">
                            {gentlePrompts.map((g) => (
                                <div key={g.id} className="rounded-3xl bg-cream dark:bg-charcoal-light p-4 shadow-sm">
                                    <p className="text-sm text-charcoal dark:text-cream leading-relaxed mb-2">{g.text}</p>
                                    <Link
                                        to={g.slug ? `/plans/${g.slug}` : g.to}
                                        className="text-sm font-semibold text-terracotta dark:text-terracotta-light hover:underline"
                                    >
                                        {g.cta} →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Themes */}
                <div className="mb-6">
                    <ThemeCloud themes={themes} verseHistory={verseHistory} />
                </div>

                {/* Summaries row */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <PrayerSummary prayers={prayers} />
                    <ReflectionSummary reflections={reflections} />
                    <PlanProgressCard enrollment={activePlan} plan={activePlanMeta} />
                </div>

                {/* Milestones + upcoming check-ins */}
                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2">
                        <MilestoneTimeline milestones={milestones} />
                    </div>
                    <Card className="p-6">
                        <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream mb-1">Upcoming check-ins</h2>
                        <p className="text-sm text-brown dark:text-brown-light mb-4">Versiful reaches out gently — you're always in control.</p>
                        <div className="space-y-3">
                            {upcomingCheckins.map((c) => (
                                <div key={c.id} className="rounded-3xl bg-cream-dark dark:bg-charcoal p-4">
                                    <p className="text-xs font-bold uppercase tracking-wide text-terracotta dark:text-terracotta-light">{c.when}</p>
                                    <p className="text-charcoal dark:text-cream mt-1">"{c.preview}"</p>
                                </div>
                            ))}
                        </div>
                        <Link to="/settings" className="text-sm font-semibold text-terracotta dark:text-terracotta-light hover:underline mt-4 inline-block">
                            Manage check-ins →
                        </Link>
                    </Card>
                </div>

                {/* Memory manager */}
                <MemoryManager />
            </CompanionShell>
        </>
    );
}
