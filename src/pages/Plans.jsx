import SEO from "../components/SEO";
import { useCompanion } from "../context/CompanionContext";
import { CompanionShell, PageHeader } from "../components/companion/ui";
import PlanCard from "../components/plans/PlanCard";

export default function Plans() {
    const { planCatalog, getEnrollment } = useCompanion();

    return (
        <>
            <SEO title="Reading Plans · Versiful" description="Guided 7 to 30-day journeys on anxiety, grief, marriage, hope, and more." />
            <CompanionShell>
                <PageHeader
                    eyebrow="Reading Plans"
                    title="Walk through it, not just ask once"
                    subtitle="Structured journeys that build a daily habit. Versiful weaves your plan into your conversations and checks in if you miss a day."
                />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {planCatalog.map((plan) => (
                        <PlanCard key={plan.slug} plan={plan} enrollment={getEnrollment(plan.slug)} />
                    ))}
                </div>
            </CompanionShell>
        </>
    );
}
