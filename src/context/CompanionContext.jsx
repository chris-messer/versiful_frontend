import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { companionApi, ApiError } from "../api/companionApi";

// CompanionContext is the API-backed data layer for the Companion experience.
// It contains NO mock data — every value is loaded from the real dev backend over
// the existing cookie session (credentials: "include", via src/api/companionApi.js).
//
// It exposes, per feature: the loaded data, a `*Loading` flag, a `*Error` (an
// ApiError instance — pages inspect `.isSubscriptionRequired` / `.isServiceUnavailable`
// to render upgrade / unavailable states), a loader the page calls on mount, and
// mutation actions that update local state + surface a toast on success.
const CompanionContext = createContext(null);

const uid = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export function CompanionProvider({ children }) {
    const { user, isLoggedIn } = useAuth();
    const isPremium = !!(user && (user.isSubscribed === true || user.plan === "premium"));

    const [toast, setToast] = useState(null);
    const flash = useCallback((message, icon = "🤍") => {
        setToast({ message, icon, id: uid("toast") });
        window.clearTimeout(flash._t);
        flash._t = window.setTimeout(() => setToast(null), 3200);
    }, []);

    // --- Resource state -----------------------------------------------------
    const [prayers, setPrayers] = useState([]);
    const [prayersLoading, setPrayersLoading] = useState(false);
    const [prayersError, setPrayersError] = useState(null);

    const [reflections, setReflections] = useState([]);
    const [reflectionsLoading, setReflectionsLoading] = useState(false);
    const [reflectionsError, setReflectionsError] = useState(null);

    const [planCatalog, setPlanCatalog] = useState([]);
    const [plansLoading, setPlansLoading] = useState(false);
    const [plansError, setPlansError] = useState(null);

    const [enrolledPlans, setEnrolledPlans] = useState([]);
    const [enrolledLoading, setEnrolledLoading] = useState(false);
    const [enrolledError, setEnrolledError] = useState(null);

    const [dailyVerse, setDailyVerse] = useState(null);
    const [dailyVerseLoading, setDailyVerseLoading] = useState(false);
    const [dailyVerseError, setDailyVerseError] = useState(null);

    const [walkSummary, setWalkSummary] = useState(null);
    const [walkLoading, setWalkLoading] = useState(false);
    const [walkError, setWalkError] = useState(null);

    const [memories, setMemories] = useState([]);
    const [memoriesLoading, setMemoriesLoading] = useState(false);
    const [memoriesError, setMemoriesError] = useState(null);

    const [checkins, setCheckins] = useState([]);
    const [checkinsLoading, setCheckinsLoading] = useState(false);
    const [checkinsError, setCheckinsError] = useState(null);

    const [preferences, setPreferences] = useState(null);
    const [preferencesLoading, setPreferencesLoading] = useState(false);
    const [preferencesError, setPreferencesError] = useState(null);

    // --- Generic loader helper (plain function — no hooks) ------------------
    const runLoad = async (fetcher, setData, setLoading, setError, arg) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetcher(arg);
            setData(data);
            return data;
        } catch (e) {
            const err = e instanceof ApiError ? e : new ApiError(0, "network_error", String(e?.message || e));
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const loadPrayers = useCallback(
        () => runLoad(companionApi.listPrayers, setPrayers, setPrayersLoading, setPrayersError), []);
    const loadReflections = useCallback(
        (params) => runLoad(companionApi.listReflections, setReflections, setReflectionsLoading, setReflectionsError, params), []);
    const loadPlans = useCallback(
        () => runLoad(companionApi.listPlans, setPlanCatalog, setPlansLoading, setPlansError), []);
    const loadEnrolled = useCallback(
        () => runLoad(companionApi.listEnrolledPlans, setEnrolledPlans, setEnrolledLoading, setEnrolledError), []);
    const loadDailyVerse = useCallback(
        () => runLoad(companionApi.getDailyVerse, setDailyVerse, setDailyVerseLoading, setDailyVerseError), []);
    const loadWalk = useCallback(
        () => runLoad(companionApi.getWalkSummary, setWalkSummary, setWalkLoading, setWalkError), []);
    const loadMemories = useCallback(
        () => runLoad(companionApi.listMemories, setMemories, setMemoriesLoading, setMemoriesError), []);
    const loadCheckins = useCallback(
        () => runLoad(companionApi.listCheckins, setCheckins, setCheckinsLoading, setCheckinsError), []);
    const loadPreferences = useCallback(
        () => runLoad(companionApi.getPreferences, setPreferences, setPreferencesLoading, setPreferencesError), []);

    // --- Prayers actions ----------------------------------------------------
    const addPrayer = useCallback(async (data) => {
        const created = await companionApi.createPrayer(data);
        setPrayers((prev) => [created, ...prev]);
        flash("Prayer added to your list", "🙏");
        return created;
    }, [flash]);

    // No backend "pray now" increment endpoint exists; this is a devotional
    // affirmation only — it does NOT fabricate a persisted count.
    const prayNow = useCallback(() => {
        flash("Praying with you 🙏", "🙏");
    }, [flash]);

    const markPrayerAnswered = useCallback(async (prayerId, note) => {
        const updated = await companionApi.answerPrayer(prayerId, note);
        setPrayers((prev) => prev.map((p) => (p.prayerId === prayerId ? updated : p)));
        flash("Answered prayer — praising God with you!", "🎉");
        return updated;
    }, [flash]);

    const setReminderCadence = useCallback(async (prayerId, cadence) => {
        const updated = await companionApi.updatePrayer(prayerId, { reminderCadence: cadence });
        setPrayers((prev) => prev.map((p) => (p.prayerId === prayerId ? updated : p)));
        if (updated.reminderCadence !== cadence && cadence !== "none") {
            flash("Reminders are a premium feature", "🔒");
        }
        return updated;
    }, [flash]);

    const deletePrayer = useCallback(async (prayerId) => {
        await companionApi.deletePrayer(prayerId);
        setPrayers((prev) => prev.filter((p) => p.prayerId !== prayerId));
        flash("Prayer removed", "🗑️");
    }, [flash]);

    // --- Reflections actions ------------------------------------------------
    const addReflection = useCallback(async (data) => {
        const created = await companionApi.createReflection(data);
        setReflections((prev) => [created, ...prev]);
        flash("Reflection saved to your journal", "✍️");
        return created;
    }, [flash]);

    const deleteReflection = useCallback(async (id) => {
        await companionApi.deleteReflection(id);
        setReflections((prev) => prev.filter((r) => r.id !== id));
        flash("Reflection deleted", "🗑️");
    }, [flash]);

    // Save an assistant reply from chat as a reflection (premium-gated server-side).
    const saveReflectionFromChat = useCallback(async (content) => {
        try {
            await companionApi.createReflection({ content, source: "auto_summary" });
            flash("Saved to your journal", "✍️");
            return true;
        } catch (e) {
            if (e instanceof ApiError && e.isSubscriptionRequired) {
                flash("Saving reflections is a premium feature", "🔒");
            } else if (e instanceof ApiError && e.isServiceUnavailable) {
                flash("Journal is temporarily unavailable", "⚠️");
            } else {
                flash("Couldn't save reflection — try again", "⚠️");
            }
            return false;
        }
    }, [flash]);

    // --- Reading plans actions ----------------------------------------------
    const getEnrollment = useCallback(
        (slug) => enrolledPlans.find((p) => p.slug === slug || p.planId === slug),
        [enrolledPlans]
    );

    // Fetch the authored day content for a plan (GET /plans/{slug}).
    const getPlanDays = useCallback(async (slug) => {
        const detail = await companionApi.getPlan(slug);
        return { plan: detail, days: detail?.days || [] };
    }, []);

    const enrollPlan = useCallback(async (slug) => {
        const enrollment = await companionApi.enrollPlan(slug);
        setEnrolledPlans((prev) => {
            const exists = prev.some((p) => (p.slug || p.planId) === (enrollment.slug || enrollment.planId));
            return exists
                ? prev.map((p) => ((p.slug || p.planId) === (enrollment.slug || enrollment.planId) ? enrollment : p))
                : [enrollment, ...prev];
        });
        flash("You're enrolled — day 1 is ready", "🌱");
        return enrollment;
    }, [flash]);

    const completePlanDay = useCallback(async (enrollmentId, dayNumber, reflectionText) => {
        const updated = await companionApi.completePlanDay(enrollmentId, dayNumber, reflectionText);
        setEnrolledPlans((prev) =>
            prev.map((p) => ((p.slug || p.planId) === enrollmentId ? { ...p, ...updated } : p))
        );
        flash(reflectionText ? "Day complete — reflection saved" : "Day complete — nice work", "✅");
        return updated;
    }, [flash]);

    const pausePlan = useCallback(async (enrollmentId, currentlyPaused) => {
        const updated = await companionApi.pausePlan(enrollmentId, !currentlyPaused);
        setEnrolledPlans((prev) =>
            prev.map((p) => ((p.slug || p.planId) === enrollmentId ? { ...p, ...updated } : p))
        );
        flash(updated.status === "paused" ? "Plan paused — resume anytime" : "Plan resumed", "🌱");
        return updated;
    }, [flash]);

    // --- Memories actions ---------------------------------------------------
    const deleteMemory = useCallback(async (id) => {
        await companionApi.deleteMemory(id);
        setMemories((prev) => prev.filter((m) => m.id !== id));
        flash("Memory deleted", "🗑️");
    }, [flash]);

    const clearAllMemories = useCallback(async () => {
        await companionApi.clearMemories();
        setMemories([]);
        flash("All memories cleared", "🧹");
    }, [flash]);

    // --- Preferences actions ------------------------------------------------
    const savePreferences = useCallback(async (patch) => {
        const updated = await companionApi.updatePreferences(patch);
        setPreferences(updated);
        flash("Your preferences are saved", "✅");
        return updated;
    }, [flash]);

    const value = useMemo(() => ({
        // auth-derived
        user,
        isLoggedIn,
        isPremium,
        // toast
        toast,
        flash,
        // prayers
        prayers, prayersLoading, prayersError, loadPrayers,
        addPrayer, prayNow, markPrayerAnswered, setReminderCadence, deletePrayer,
        // reflections
        reflections, reflectionsLoading, reflectionsError, loadReflections,
        addReflection, deleteReflection, saveReflectionFromChat,
        // plans
        planCatalog, plansLoading, plansError, loadPlans,
        enrolledPlans, enrolledLoading, enrolledError, loadEnrolled, getEnrollment,
        getPlanDays, enrollPlan, completePlanDay, pausePlan,
        // daily verse
        dailyVerse, dailyVerseLoading, dailyVerseError, loadDailyVerse,
        // walk
        walkSummary, walkLoading, walkError, loadWalk,
        // memories
        memories, memoriesLoading, memoriesError, loadMemories,
        deleteMemory, clearAllMemories,
        // checkins
        checkins, checkinsLoading, checkinsError, loadCheckins,
        // preferences
        preferences, preferencesLoading, preferencesError, loadPreferences, savePreferences,
    }), [
        user, isLoggedIn, isPremium, toast, flash,
        prayers, prayersLoading, prayersError, loadPrayers, addPrayer, prayNow, markPrayerAnswered, setReminderCadence, deletePrayer,
        reflections, reflectionsLoading, reflectionsError, loadReflections, addReflection, deleteReflection, saveReflectionFromChat,
        planCatalog, plansLoading, plansError, loadPlans, enrolledPlans, enrolledLoading, enrolledError, loadEnrolled, getEnrollment,
        getPlanDays, enrollPlan, completePlanDay, pausePlan,
        dailyVerse, dailyVerseLoading, dailyVerseError, loadDailyVerse,
        walkSummary, walkLoading, walkError, loadWalk,
        memories, memoriesLoading, memoriesError, loadMemories, deleteMemory, clearAllMemories,
        checkins, checkinsLoading, checkinsError, loadCheckins,
        preferences, preferencesLoading, preferencesError, loadPreferences, savePreferences,
    ]);

    return <CompanionContext.Provider value={value}>{children}</CompanionContext.Provider>;
}

export const useCompanion = () => {
    const ctx = useContext(CompanionContext);
    if (!ctx) throw new Error("useCompanion must be used within a CompanionProvider");
    return ctx;
};
