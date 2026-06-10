import { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useCompanion } from "../context/CompanionContext";
import { CompanionShell, Card, StatTile, LoadingState, ErrorState, UpgradeCard, formatDate } from "../components/companion/ui";
import DailyVerseCard from "../components/walk/DailyVerseCard";
import ThemeCloud from "../components/walk/ThemeCloud";
import PrayerSummary from "../components/walk/PrayerSummary";
import ReflectionSummary from "../components/walk/ReflectionSummary";
import PlanProgressCard from "../components/walk/PlanProgressCard";
import MilestoneTimeline from "../components/walk/MilestoneTimeline";
import MemoryManager from "../components/walk/MemoryManager";

const humanizeCheckin = (selector) => {
    if (!selector) return "A gentle check-in";
    return String(selector).replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export default function MyWalk() {
    const {
        user, isLoggedIn,
        walkSummary, walkLoading, walkError, loadWalk,
        dailyVerse, dailyVerseError, loadDailyVerse,
        memories, memoriesLoading, memoriesError, loadMemories, deleteMemory, clearAllMemories,
    } = useCompanion();

    useEffect(() => {
        if (!isLoggedIn) return;
        loadWalk();
        loadDailyVerse();
        loadMemories();
    }, [isLoggedIn, loadWalk, loadDailyVerse, loadMemories]);

    const firstName = user?.firstName || "friend";
    const premium = walkSummary && walkSummary.isPremium && !walkSummary.teaser;

    const handleDeleteMemory = (id) => deleteMemory(id).catch(() => {});
    const handleClearMemories = () => clearAllMemories().catch(() => {});

    return (
        <>
            <SEO title="My Walk · Versiful" description="Watch your spiritual journey take shape over time." />
            <CompanionShell>
                <div className="mb-8 animate-fade-in-up">
                    <p className="text-sm font-semibold uppercase tracking-widest text-terracotta dark:text-terracotta-light">Your walk with Versiful</p>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal dark:text-cream leading-tight mt-1">
                        Hi {firstName}, here's your journey
                    </h1>
                </div>

                {walkLoading && !walkSummary ? (
                    <LoadingState label="Gathering your walk…" />
                ) : walkError ? (
                    <ErrorState error={walkError} onRetry={loadWalk} />
                ) : !walkSummary ? null : (
                    <>
                        {/* Top stats (available for free + premium) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            <StatTile value={`${walkSummary.streak ?? 0} 🔥`} label="day streak" />
                            <StatTile value={walkSummary.daysActive ?? 0} label="days active" accent="sage" />
                            <StatTile value={walkSummary.verses?.count ?? 0} label="verses received" accent="brown" />
                            <StatTile value={walkSummary.prayers?.answered ?? 0} label="prayers answered" />
                        </div>

                        {!premium ? (
                            // Free-tier teaser: show what's possible, prompt to upgrade.
                            <>
                                {walkSummary.themes?.length > 0 && (
                                    <div className="mb-6">
                                        <ThemeCloud themes={walkSummary.themes} />
                                    </div>
                                )}
                                <UpgradeCard
                                    title="See your full walk"
                                    message={walkSummary.upgradeMessage || "Subscribe to see your themes, milestones, answered prayers, daily verse, and everything Versiful remembers."}
                                />
                            </>
                        ) : (
                            <>
                                {/* Daily verse + gentle prompt */}
                                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                                    <div className="lg:col-span-2">
                                        {dailyVerse ? (
                                            <DailyVerseCard verse={dailyVerse} />
                                        ) : dailyVerseError && dailyVerseError.isSubscriptionRequired ? (
                                            <UpgradeCard title="Daily verse is premium" message={dailyVerseError.message} />
                                        ) : (
                                            <Card className="p-7"><LoadingState label="Loading today's verse…" /></Card>
                                        )}
                                    </div>
                                    <Card className="p-6 bg-sage/10 border-sage/30">
                                        <h2 className="font-display text-lg font-bold text-charcoal dark:text-cream mb-3">A gentle nudge</h2>
                                        {walkSummary.gentlePrompt ? (
                                            <div className="rounded-3xl bg-cream dark:bg-charcoal-light p-4 shadow-sm">
                                                <p className="text-sm text-charcoal dark:text-cream leading-relaxed">{walkSummary.gentlePrompt}</p>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-brown dark:text-brown-light leading-relaxed">
                                                You're walking steadily. Keep going — we're right here with you.
                                            </p>
                                        )}
                                    </Card>
                                </div>

                                {/* Themes */}
                                <div className="mb-6">
                                    <ThemeCloud themes={walkSummary.themes} />
                                </div>

                                {/* Summaries row */}
                                <div className="grid md:grid-cols-3 gap-6 mb-6">
                                    <PrayerSummary summary={walkSummary.prayers} />
                                    <ReflectionSummary summary={walkSummary.reflections} />
                                    <PlanProgressCard readingPlan={walkSummary.readingPlan} />
                                </div>

                                {/* Milestones + upcoming check-ins */}
                                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                                    <div className="lg:col-span-2">
                                        <MilestoneTimeline milestones={walkSummary.milestones} />
                                    </div>
                                    <Card className="p-6">
                                        <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream mb-1">Upcoming check-ins</h2>
                                        <p className="text-sm text-brown dark:text-brown-light mb-4">Versiful reaches out gently — you're always in control.</p>
                                        <div className="space-y-3">
                                            {(walkSummary.upcomingCheckins || []).length === 0 ? (
                                                <p className="text-sm text-brown dark:text-brown-light italic">No check-ins scheduled right now.</p>
                                            ) : walkSummary.upcomingCheckins.map((c) => (
                                                <div key={c.checkinId} className="rounded-3xl bg-cream-dark dark:bg-charcoal p-4">
                                                    <p className="text-xs font-bold uppercase tracking-wide text-terracotta dark:text-terracotta-light">{humanizeCheckin(c.contextSelector)}</p>
                                                    {c.scheduledFor && <p className="text-charcoal dark:text-cream mt-1 text-sm">{formatDate(c.scheduledFor, { weekday: "short", month: "short", day: "numeric" })}</p>}
                                                </div>
                                            ))}
                                        </div>
                                        <Link to="/settings" className="text-sm font-semibold text-terracotta dark:text-terracotta-light hover:underline mt-4 inline-block">
                                            Manage check-ins →
                                        </Link>
                                    </Card>
                                </div>

                                {/* Memory manager */}
                                <MemoryManager
                                    memories={memories}
                                    loading={memoriesLoading}
                                    error={memoriesError}
                                    onRetry={loadMemories}
                                    onDelete={handleDeleteMemory}
                                    onClear={handleClearMemories}
                                    reflections={walkSummary.reflections?.recent || []}
                                />
                            </>
                        )}
                    </>
                )}
            </CompanionShell>
        </>
    );
}
