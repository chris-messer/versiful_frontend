import { useState } from "react";
import SEO from "../components/SEO";
import { useCompanion } from "../context/CompanionContext";
import { CompanionShell, PageHeader, Card, PrimaryButton, TextField } from "../components/companion/ui";
import { bibleVersions } from "../constants/bibleVersions";
import CommunicationPreferences from "../components/settings/CommunicationPreferences";
import ResponseStyleSettings from "../components/settings/ResponseStyleSettings";

// Settings (§12). Wired to the local CompanionContext (mock). "Save changes"
// commits pending edits into context and reflects saved state — replacing the
// old fake setTimeout handler.
export default function Settings() {
    const { user, preferences, updatePreferences } = useCompanion();

    // Local pending state so "Save changes" is meaningful (unsaved vs saved).
    const [draft, setDraft] = useState(preferences);
    const [bibleVersion, setBibleVersion] = useState(user.bibleVersion);
    const [savedAt, setSavedAt] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const dirty = JSON.stringify(draft) !== JSON.stringify(preferences) || bibleVersion !== user.bibleVersion;

    const patch = (changes) => { setDraft((d) => ({ ...d, ...changes })); setSavedAt(null); };
    const patchStyle = (changes) => { setDraft((d) => ({ ...d, responseStyle: { ...d.responseStyle, ...changes } })); setSavedAt(null); };

    const save = () => {
        setIsSaving(true);
        // Local-only "persist" (no network). Reflect saved state immediately.
        window.setTimeout(() => {
            updatePreferences(draft);
            user.bibleVersion = bibleVersion; // mock user object update
            setIsSaving(false);
            setSavedAt(new Date());
        }, 500);
    };

    return (
        <>
            <SEO title="Settings · Versiful" />
            <CompanionShell>
                <PageHeader
                    eyebrow="Your account"
                    title="Settings"
                    subtitle="Manage your plan, how Versiful talks with you, and when it reaches out. Change these by text, too—chat and web stay in sync."
                />

                <div className="grid lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Subscription summary */}
                        <Card className="p-7">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-widest text-sage-dark dark:text-sage-light">Your plan</p>
                                    <h2 className="font-display text-2xl font-bold text-charcoal dark:text-cream mt-1">Premium · Companion</h2>
                                    <p className="text-brown dark:text-brown-light mt-1">$9.99/mo · renews Jul 2, 2026</p>
                                </div>
                                <span className="px-4 py-2 rounded-full bg-sage/15 text-sage-dark dark:text-sage-light font-display font-bold">Active</span>
                            </div>
                            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-brown dark:text-brown-light">
                                {["Unlimited guidance", "Memory across conversations", "Personalized daily verse", "Prayer journal + check-ins", "All reading plans", "My Walk + full history"].map((f) => (
                                    <li key={f} className="flex items-center gap-2"><span className="text-terracotta">✓</span>{f}</li>
                                ))}
                            </ul>
                        </Card>

                        {/* Personalization: Bible version */}
                        <Card className="p-7 space-y-4">
                            <h2 className="font-display text-2xl font-bold text-charcoal dark:text-cream">Personalization</h2>
                            <label className="block space-y-1.5">
                                <span className="block font-display font-semibold text-sm text-charcoal dark:text-cream">Preferred Bible version</span>
                                <select
                                    value={bibleVersion}
                                    onChange={(e) => { setBibleVersion(e.target.value); setSavedAt(null); }}
                                    className="w-full rounded-3xl border-2 border-terracotta/20 bg-cream-dark dark:bg-charcoal px-4 py-3 text-charcoal dark:text-cream font-body focus:outline-none focus:border-terracotta/60 transition-warm"
                                >
                                    {bibleVersions.map((group, gi) => (
                                        <optgroup key={gi} label={group.label}>
                                            {group.versions.map((v, vi) => <option key={vi} value={v}>{v}</option>)}
                                        </optgroup>
                                    ))}
                                </select>
                            </label>
                        </Card>

                        <ResponseStyleSettings responseStyle={draft.responseStyle} onChange={patchStyle} />

                        <CommunicationPreferences preferences={draft} onChange={patch} />

                        {/* Save bar */}
                        <Card className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky bottom-4 z-20">
                            <div>
                                <p className="font-display font-bold text-charcoal dark:text-cream">
                                    {dirty ? "You have unsaved changes" : savedAt ? "All changes saved" : "Save your updates"}
                                </p>
                                <p className="text-sm text-brown dark:text-brown-light">
                                    {savedAt ? `Saved at ${savedAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}` : "Your preferences update here."}
                                </p>
                            </div>
                            <PrimaryButton onClick={save} disabled={!dirty || isSaving} className={!dirty && savedAt ? "opacity-60" : ""}>
                                {isSaving ? "Saving…" : savedAt && !dirty ? "Saved ✓" : "Save changes"}
                            </PrimaryButton>
                        </Card>
                    </div>

                    {/* Account sidebar */}
                    <aside className="space-y-6">
                        <Card className="p-6 space-y-3">
                            <h3 className="font-display text-lg font-bold text-charcoal dark:text-cream">Account</h3>
                            <TextField label="Email" value={user.email} readOnly />
                            <TextField label="Phone" value={user.phoneNumber} readOnly />
                            <p className="text-xs text-brown dark:text-brown-light">Member since Nov 2025</p>
                        </Card>
                        <Card className="p-6">
                            <h3 className="font-display text-lg font-bold text-charcoal dark:text-cream mb-2">Change by text</h3>
                            <p className="text-sm text-brown dark:text-brown-light leading-relaxed">
                                You can change any of these by chatting too—just say "turn off my morning verse" or "switch me to ESV."
                                Versiful will confirm what changed and how to undo it.
                            </p>
                        </Card>
                    </aside>
                </div>
            </CompanionShell>
        </>
    );
}
