import { Card, Toggle, SegmentedControl } from "../companion/ui";

// Communication preferences (§12.2) wired to the companion mock prefs. These are
// the same attributes the §5.4 account-management chat tools would write — chat
// and web stay in parity. All local state in this mockup.
const channelOptions = [
    { value: "sms", label: "SMS" },
    { value: "web", label: "Web" },
];

const checkinOptions = [
    { value: "off", label: "Off" },
    { value: "weekly", label: "Weekly" },
    { value: "biweekly", label: "Biweekly" },
];

const inactivityOptions = [
    { value: 3, label: "3 days" },
    { value: 4, label: "4 days" },
    { value: 7, label: "7 days" },
];

export default function CommunicationPreferences({ preferences, onChange }) {
    const p = preferences;
    const checkinFreq = p.checkinEnabled ? p.checkinFrequency : "off";

    return (
        <Card className="p-7 space-y-6">
            <div>
                <h2 className="font-display text-2xl font-bold text-charcoal dark:text-cream">Communication preferences</h2>
                <p className="text-brown dark:text-brown-light mt-1">How and when Versiful reaches out. Turning anything off is always safe.</p>
            </div>

            {/* Primary channel */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <p className="font-display font-semibold text-charcoal dark:text-cream">Primary channel</p>
                    <p className="text-sm text-brown dark:text-brown-light">Where you'd like to hear from Versiful most.</p>
                </div>
                <SegmentedControl options={channelOptions} value={p.primaryChannel} onChange={(v) => onChange({ primaryChannel: v })} />
            </div>

            <div className="border-t-2 border-terracotta/10 pt-5 space-y-4">
                {/* Daily verse */}
                <Toggle
                    label="Daily verse"
                    description="One personalized verse each morning—made for you, never repeated."
                    checked={p.dailyVerseEnabled}
                    onChange={(v) => onChange({ dailyVerseEnabled: v })}
                />
                {p.dailyVerseEnabled && (
                    <div className="pl-1 flex items-center gap-4 flex-wrap animate-fade-in-up">
                        <label className="flex items-center gap-2 text-sm text-brown dark:text-brown-light">
                            <span className="font-semibold">Time</span>
                            <input
                                type="time"
                                value={p.dailyVerseTime}
                                onChange={(e) => onChange({ dailyVerseTime: e.target.value })}
                                className="rounded-2xl border-2 border-terracotta/20 bg-cream-dark dark:bg-charcoal px-3 py-1.5 text-charcoal dark:text-cream focus:outline-none focus:border-terracotta/60"
                            />
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-brown dark:text-brown-light">Channel</span>
                            <SegmentedControl options={channelOptions} value={p.dailyVerseChannel} onChange={(v) => onChange({ dailyVerseChannel: v })} />
                        </div>
                    </div>
                )}
            </div>

            {/* Check-ins */}
            <div className="border-t-2 border-terracotta/10 pt-5 space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                        <p className="font-display font-semibold text-charcoal dark:text-cream">Gentle check-ins</p>
                        <p className="text-sm text-brown dark:text-brown-light">A warm message if you go quiet, or after a big moment you mentioned. This is a ceiling, not a target.</p>
                    </div>
                    <SegmentedControl
                        options={checkinOptions}
                        value={checkinFreq}
                        onChange={(v) => onChange(v === "off" ? { checkinEnabled: false } : { checkinEnabled: true, checkinFrequency: v })}
                    />
                </div>
                {p.checkinEnabled && (
                    <div className="pl-1 flex items-center gap-3 flex-wrap animate-fade-in-up">
                        <span className="text-sm font-semibold text-brown dark:text-brown-light">Reach out after quiet for</span>
                        <SegmentedControl options={inactivityOptions} value={p.checkinInactivityDays} onChange={(v) => onChange({ checkinInactivityDays: v })} />
                    </div>
                )}
            </div>

            {/* Other toggles */}
            <div className="border-t-2 border-terracotta/10 pt-5 space-y-2">
                <Toggle
                    label="Reading plan reminders"
                    description="A nudge for your daily plan passage."
                    checked={p.readingPlanReminders}
                    onChange={(v) => onChange({ readingPlanReminders: v })}
                />
                <Toggle
                    label="Encouragement & tips"
                    description="Occasional spiritual encouragement."
                    checked={p.encouragementTips}
                    onChange={(v) => onChange({ encouragementTips: v })}
                />
                <Toggle
                    label="Product & marketing updates"
                    description="Kept separate from spiritual content, for your peace of mind."
                    checked={p.marketingUpdates}
                    onChange={(v) => onChange({ marketingUpdates: v })}
                />
            </div>
        </Card>
    );
}
