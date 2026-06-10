import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useCompanion } from "../context/CompanionContext";
import { CompanionShell, PageHeader, Card, PrimaryButton, TextField, LoadingState, ErrorState } from "../components/companion/ui";
import { bibleVersions } from "../constants/bibleVersions";
import CommunicationPreferences from "../components/settings/CommunicationPreferences";
import ResponseStyleSettings from "../components/settings/ResponseStyleSettings";

// Settings (§12). Wired to the real backend: GET /users/preferences on load and
// PUT /users/preferences on save (cookie auth). Only the documented writable
// fields are sent; bibleVersion is normalized to the short code the API accepts.
const VALID_BIBLE_CODES = new Set(["NIV", "ESV", "KJV", "NLT", "NASB", "NKJV", "CSB", "MSG", "AMP", "NRSV"]);
const WRITABLE_PREF_KEYS = [
    "primaryChannel", "dailyVerseEnabled", "dailyVerseTime", "dailyVerseChannel",
    "checkinEnabled", "checkinFrequency", "checkinInactivityDays",
    "readingPlanReminders", "marketingUpdates", "encouragementTips", "responseStyle",
];

const extractCode = (label) => {
    const m = /\(([^)]+)\)/.exec(label || "");
    return m ? m[1].trim().toUpperCase() : (label || "").trim().toUpperCase();
};

const RESPONSE_STYLE_DEFAULT = { tone: "warm", length: "short" };

// Resolve a stored bibleVersion (code or full name) to a select option (full name).
const resolveVersionLabel = (stored) => {
    if (!stored) return "";
    const all = bibleVersions.flatMap((g) => g.versions);
    const exact = all.find((v) => v === stored);
    if (exact) return exact;
    const code = extractCode(stored);
    return all.find((v) => extractCode(v) === code) || "";
};

export default function Settings() {
    const {
        user, isPremium, preferences, preferencesLoading, preferencesError,
        loadPreferences, savePreferences, isLoggedIn, flash,
    } = useCompanion();

    const [draft, setDraft] = useState(null);
    const [bibleVersion, setBibleVersion] = useState("");
    const [savedAt, setSavedAt] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isLoggedIn) loadPreferences();
    }, [isLoggedIn, loadPreferences]);

    // Seed the editable draft once preferences arrive.
    useEffect(() => {
        if (preferences && draft === null) {
            setDraft({ ...preferences, responseStyle: { ...RESPONSE_STYLE_DEFAULT, ...(preferences.responseStyle || {}) } });
            setBibleVersion(resolveVersionLabel(preferences.bibleVersion || user?.bibleVersion));
        }
    }, [preferences, draft, user]);

    const baselineStyle = { ...RESPONSE_STYLE_DEFAULT, ...((preferences && preferences.responseStyle) || {}) };
    const dirty = draft && (
        JSON.stringify({ ...draft }) !== JSON.stringify({ ...preferences, responseStyle: baselineStyle }) ||
        bibleVersion !== resolveVersionLabel(preferences?.bibleVersion || user?.bibleVersion)
    );

    const patch = (changes) => { setDraft((d) => ({ ...d, ...changes })); setSavedAt(null); };
    const patchStyle = (changes) => { setDraft((d) => ({ ...d, responseStyle: { ...d.responseStyle, ...changes } })); setSavedAt(null); };

    const save = async () => {
        if (!draft) return;
        setIsSaving(true);
        const body = {};
        WRITABLE_PREF_KEYS.forEach((k) => { if (draft[k] !== undefined && draft[k] !== null) body[k] = draft[k]; });
        const code = extractCode(bibleVersion);
        if (code && VALID_BIBLE_CODES.has(code)) {
            body.bibleVersion = code;
        } else if (bibleVersion) {
            flash("That Bible version isn't supported yet — other changes saved", "ℹ️");
        }
        try {
            await savePreferences(body);
            setSavedAt(new Date());
        } catch (e) {
            flash(e?.message || "Couldn't save your preferences — try again", "⚠️");
        } finally {
            setIsSaving(false);
        }
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

                {preferencesLoading && !draft ? (
                    <LoadingState label="Loading your settings…" />
                ) : preferencesError && !draft ? (
                    <ErrorState error={preferencesError} onRetry={loadPreferences} />
                ) : !draft ? null : (
                    <div className="grid lg:grid-cols-3 gap-6 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Subscription summary */}
                            <Card className="p-7">
                                <div className="flex items-center justify-between gap-4 flex-wrap">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-widest text-sage-dark dark:text-sage-light">Your plan</p>
                                        <h2 className="font-display text-2xl font-bold text-charcoal dark:text-cream mt-1">
                                            {isPremium ? "Premium · Companion" : "Free plan"}
                                        </h2>
                                        <p className="text-brown dark:text-brown-light mt-1">
                                            {isPremium ? "Full access to your companion features." : "Upgrade to unlock daily verse, journal, memory, and all reading plans."}
                                        </p>
                                    </div>
                                    {isPremium ? (
                                        <span className="px-4 py-2 rounded-full bg-sage/15 text-sage-dark dark:text-sage-light font-display font-bold">Active</span>
                                    ) : (
                                        <Link to="/subscription" className="px-4 py-2 rounded-full bg-terracotta-gradient text-cream font-display font-bold shadow-warm">Upgrade</Link>
                                    )}
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
                                        <option value="">Select a version…</option>
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
                                <TextField label="Email" value={user?.email || ""} readOnly />
                                <TextField label="Phone" value={user?.phoneNumber || "Not linked"} readOnly />
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
                )}
            </CompanionShell>
        </>
    );
}
