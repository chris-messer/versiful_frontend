import { useState } from "react";
import { Card } from "../companion/ui";

// Themes explored as a weighted tag-cloud (§11.1). Tapping shows related verses.
export default function ThemeCloud({ themes, verseHistory }) {
    const [selected, setSelected] = useState(null);
    const max = Math.max(...themes.map((t) => t.count));

    const sizeFor = (count) => {
        const ratio = count / max;
        if (ratio > 0.8) return "text-2xl";
        if (ratio > 0.55) return "text-xl";
        if (ratio > 0.35) return "text-lg";
        return "text-base";
    };

    const related = selected
        ? verseHistory.filter((v) => v.themes.includes(selected))
        : [];

    return (
        <Card className="p-6">
            <h2 className="font-display text-xl font-bold text-charcoal dark:text-cream mb-4">Themes you've explored</h2>
            <div className="flex flex-wrap gap-2.5 items-center">
                {themes.map((t) => (
                    <button
                        key={t.name}
                        onClick={() => setSelected(selected === t.name ? null : t.name)}
                        className={`px-4 py-1.5 rounded-full font-display font-semibold capitalize transition-warm border-2 ${sizeFor(t.count)}
                            ${selected === t.name
                                ? "bg-terracotta text-cream border-terracotta-dark/20 shadow-warm"
                                : "bg-sage/10 text-brown dark:text-cream border-sage/20 hover:border-terracotta/40"}`}
                    >
                        {t.name}
                        <span className="ml-1.5 text-xs opacity-70">{t.count}</span>
                    </button>
                ))}
            </div>
            {selected && (
                <div className="mt-5 pt-5 border-t-2 border-terracotta/10 animate-fade-in-up">
                    <p className="text-sm font-semibold text-brown dark:text-brown-light mb-2 capitalize">Verses on {selected}</p>
                    {related.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {related.map((v) => (
                                <span key={v.reference} className="px-3 py-1 rounded-full bg-terracotta/10 text-terracotta dark:text-terracotta-light text-sm font-semibold">
                                    📖 {v.displayRef}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-brown dark:text-brown-light italic">Verses on this theme will gather here as you explore it.</p>
                    )}
                </div>
            )}
        </Card>
    );
}
