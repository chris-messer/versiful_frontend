import { Card, SegmentedControl } from "../companion/ui";

// Response style control (§12.3) — tone + length. In the real app this injects
// into the system prompt the same way bible_version does.
const toneOptions = [
    { value: "warm", label: "Warm friend" },
    { value: "pastoral", label: "Pastoral" },
    { value: "concise", label: "Concise" },
];

const lengthOptions = [
    { value: "short", label: "Short" },
    { value: "fuller", label: "Fuller" },
];

const toneSample = {
    warm: "Oh Chris, that sounds heavy. We're right here with you—let's bring it to God together.",
    pastoral: "Take heart. Scripture reminds us the Lord is near to the brokenhearted (Psalm 34:18).",
    concise: "God is near. \"Cast all your anxiety on him because he cares for you.\" (1 Peter 5:7)",
};

export default function ResponseStyleSettings({ responseStyle, onChange }) {
    return (
        <Card className="p-7 space-y-6">
            <div>
                <h2 className="font-display text-2xl font-bold text-charcoal dark:text-cream">Response style</h2>
                <p className="text-brown dark:text-brown-light mt-1">How Versiful talks with you.</p>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="font-display font-semibold text-charcoal dark:text-cream">Tone</p>
                <SegmentedControl options={toneOptions} value={responseStyle.tone} onChange={(v) => onChange({ tone: v })} />
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="font-display font-semibold text-charcoal dark:text-cream">Length</p>
                <SegmentedControl options={lengthOptions} value={responseStyle.length} onChange={(v) => onChange({ length: v })} />
            </div>

            <div className="rounded-3xl bg-cream-dark dark:bg-charcoal p-4 border-2 border-terracotta/10">
                <p className="text-xs font-bold uppercase tracking-wide text-brown dark:text-brown-light mb-1.5">Sample reply</p>
                <p className="text-charcoal dark:text-cream italic leading-relaxed">{toneSample[responseStyle.tone]}</p>
            </div>
        </Card>
    );
}
