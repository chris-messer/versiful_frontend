import { Card } from "../companion/ui";

// Sample personalized daily verse (§6), surfaced on My Walk.
export default function DailyVerseCard({ verse }) {
    return (
        <Card className="p-7 bg-terracotta-gradient text-cream border-terracotta-dark/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-cream blob-shape animate-blob-float" />
            </div>
            <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-widest text-cream/80 mb-3">Today's verse · made for you</p>
                <p className="font-display text-2xl font-bold leading-snug">"{verse.text}"</p>
                <p className="font-display font-semibold mt-3 text-cream/90">{verse.displayRef}</p>
                <p className="font-body mt-4 text-cream/90 leading-relaxed border-t border-cream/20 pt-4">{verse.reflection}</p>
            </div>
        </Card>
    );
}
