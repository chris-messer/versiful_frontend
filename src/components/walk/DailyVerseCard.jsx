import { Card } from "../companion/ui";

// Personalized daily verse (§6), surfaced on My Walk. The verse TEXT is generated
// server-side at delivery and is intentionally NOT in the API — we show the
// reference, the personalized reflection, and the accompanying message.
export default function DailyVerseCard({ verse }) {
    if (!verse) return null;
    const ref = verse.displayRef || verse.reference;
    return (
        <Card className="p-7 bg-terracotta-gradient text-cream border-terracotta-dark/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-cream blob-shape animate-blob-float" />
            </div>
            <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-widest text-cream/80 mb-3">Today's verse · made for you</p>
                {ref && <p className="font-display text-3xl font-bold leading-snug">{ref}</p>}
                {verse.reflection && (
                    <p className="font-body mt-4 text-cream/95 leading-relaxed">{verse.reflection}</p>
                )}
                {verse.message && verse.message !== verse.reflection && (
                    <p className="font-body mt-4 text-cream/90 leading-relaxed border-t border-cream/20 pt-4">{verse.message}</p>
                )}
                {Array.isArray(verse.themes) && verse.themes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                        {verse.themes.map((t) => (
                            <span key={t} className="px-3 py-1 rounded-full bg-cream/15 text-cream text-xs font-semibold capitalize">{t}</span>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
}
