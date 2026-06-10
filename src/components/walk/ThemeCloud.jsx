import { Card, EmptyState } from "../companion/ui";

// Themes explored as a weighted tag-cloud (§11.1), built from the real
// /walk/summary `themes` array: [{ label, count }].
export default function ThemeCloud({ themes = [] }) {
    if (!themes.length) {
        return (
            <Card className="p-6">
                <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream mb-2">Themes you've explored</h2>
                <EmptyState icon="🧭" hint="As you talk and read, the themes you explore will gather here." />
            </Card>
        );
    }
    const max = Math.max(...themes.map((t) => t.count || 1));

    const sizeFor = (count) => {
        const ratio = (count || 1) / max;
        if (ratio > 0.8) return "text-2xl";
        if (ratio > 0.55) return "text-xl";
        if (ratio > 0.35) return "text-lg";
        return "text-base";
    };

    return (
        <Card className="p-6">
            <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream mb-4">Themes you've explored</h2>
            <div className="flex flex-wrap gap-2.5 items-center">
                {themes.map((t) => (
                    <span
                        key={t.label}
                        className={`px-4 py-1.5 rounded-full font-display font-semibold capitalize border-2
                            bg-sage/10 text-brown dark:text-cream border-sage/20 ${sizeFor(t.count)}`}
                    >
                        {t.label}
                        <span className="ml-1.5 text-xs opacity-70">{t.count}</span>
                    </span>
                ))}
            </div>
        </Card>
    );
}
