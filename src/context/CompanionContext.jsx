import { createContext, useContext, useMemo, useState, useCallback } from "react";
import {
    mockUser,
    mockPreferences,
    mockDailyVerse,
    mockPrayers,
    mockReflections,
    mockPlanCatalog,
    mockPlanDays,
    mockEnrolledPlans,
    mockMemories,
    mockThemes,
    mockVerseHistory,
    mockVersesReceivedCount,
    mockMilestones,
    mockGentlePrompts,
    mockUpcomingCheckins,
    mockChatMessages,
    planTopicColors,
} from "../mocks/companionData";

// CompanionContext is a frontend-only, mock-data store for the Companion UI
// preview. It seeds from the mock module and mutates local React state only —
// there are no network calls anywhere in this provider. New companion pages read
// from here instead of the real (auth-gated) AuthContext so they're directly
// browsable on localhost without logging in.
const CompanionContext = createContext(null);

const uid = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export function CompanionProvider({ children }) {
    const [user] = useState(mockUser);
    const [preferences, setPreferences] = useState(mockPreferences);
    const [dailyVerse] = useState(mockDailyVerse);
    const [prayers, setPrayers] = useState(mockPrayers);
    const [reflections, setReflections] = useState(mockReflections);
    const [memories, setMemories] = useState(mockMemories);
    const [enrolledPlans, setEnrolledPlans] = useState(mockEnrolledPlans);
    const [chatMessages, setChatMessages] = useState(mockChatMessages);
    const [toast, setToast] = useState(null);

    const flash = useCallback((message, icon = "🤍") => {
        setToast({ message, icon, id: uid("toast") });
        window.clearTimeout(flash._t);
        flash._t = window.setTimeout(() => setToast(null), 3200);
    }, []);

    // ---- Preferences (§12) ----
    const updatePreferences = useCallback((patch) => {
        setPreferences((prev) => ({ ...prev, ...patch }));
    }, []);

    const updateResponseStyle = useCallback((patch) => {
        setPreferences((prev) => ({ ...prev, responseStyle: { ...prev.responseStyle, ...patch } }));
    }, []);

    // ---- Prayers (§7) ----
    const addPrayer = useCallback((data) => {
        const prayer = {
            prayerId: uid("pr"),
            title: data.title,
            body: data.body || "",
            category: data.category || "General",
            people: data.people || [],
            status: "active",
            eventDate: data.eventDate || null,
            reminderCadence: data.reminderCadence || "none",
            prayCount: 0,
            lastPrayedAt: null,
            source: "web",
            createdAt: new Date().toISOString(),
            answerNote: null,
            answeredAt: null,
        };
        setPrayers((prev) => [prayer, ...prev]);
        flash("Prayer added to your list", "🙏");
        return prayer;
    }, [flash]);

    const prayNow = useCallback((prayerId) => {
        setPrayers((prev) => prev.map((p) =>
            p.prayerId === prayerId
                ? { ...p, prayCount: p.prayCount + 1, lastPrayedAt: new Date().toISOString() }
                : p));
    }, []);

    const markPrayerAnswered = useCallback((prayerId, note) => {
        setPrayers((prev) => prev.map((p) =>
            p.prayerId === prayerId
                ? { ...p, status: "answered", answerNote: note || "", answeredAt: new Date().toISOString() }
                : p));
        flash("Answered prayer — praising God with you!", "🎉");
    }, [flash]);

    const setReminderCadence = useCallback((prayerId, cadence) => {
        setPrayers((prev) => prev.map((p) =>
            p.prayerId === prayerId ? { ...p, reminderCadence: cadence } : p));
    }, []);

    const deletePrayer = useCallback((prayerId) => {
        setPrayers((prev) => prev.filter((p) => p.prayerId !== prayerId));
    }, []);

    // ---- Reflections (§8) ----
    const addReflection = useCallback((data) => {
        const reflection = {
            id: uid("rf"),
            content: data.content,
            source: data.source || "manual",
            verseReference: data.verseReference || null,
            mood: data.mood || null,
            createdAt: new Date().toISOString(),
        };
        setReflections((prev) => [reflection, ...prev]);
        flash("Reflection saved to your journal", "✍️");
        return reflection;
    }, [flash]);

    const deleteReflection = useCallback((id) => {
        setReflections((prev) => prev.filter((r) => r.id !== id));
    }, []);

    // ---- Memories (§11.2a) ----
    const deleteMemory = useCallback((id) => {
        setMemories((prev) => prev.filter((m) => m.id !== id));
        flash("Memory deleted", "🗑️");
    }, [flash]);

    const clearAllMemories = useCallback(() => {
        setMemories([]);
        flash("All memories cleared", "🧹");
    }, [flash]);

    // ---- Reading plans (§9) ----
    const getPlanDays = useCallback((slug) => {
        if (mockPlanDays[slug]) return mockPlanDays[slug];
        const meta = mockPlanCatalog.find((p) => p.slug === slug);
        const count = meta?.dayCount || 7;
        // Generate believable placeholder days for plans without authored content.
        return Array.from({ length: count }, (_, i) => ({
            dayNumber: i + 1,
            passageRef: `Day ${i + 1} passage`,
            theme: `${meta?.title || "Reading"} — day ${i + 1}`,
            prompt: "Sit with today's passage. What is one line that stands out, and why?",
        }));
    }, []);

    const isEnrolled = useCallback((slug) => enrolledPlans.some((p) => p.slug === slug && p.status !== "archived"), [enrolledPlans]);

    const getEnrollment = useCallback((slug) => enrolledPlans.find((p) => p.slug === slug), [enrolledPlans]);

    const enrollPlan = useCallback((slug) => {
        setEnrolledPlans((prev) => {
            if (prev.some((p) => p.slug === slug)) {
                return prev.map((p) => p.slug === slug ? { ...p, status: "active" } : p);
            }
            return [...prev, {
                planId: slug,
                slug,
                status: "active",
                currentDay: 1,
                startedAt: new Date().toISOString().slice(0, 10),
                lastDeliveredDay: 1,
                deliveryTime: "08:00",
                completedDays: [],
            }];
        });
        flash("You're enrolled — day 1 is ready", "🌱");
    }, [flash]);

    const completePlanDay = useCallback((slug, dayNumber, reflectionText) => {
        setEnrolledPlans((prev) => prev.map((p) => {
            if (p.slug !== slug) return p;
            const completedDays = p.completedDays.includes(dayNumber)
                ? p.completedDays
                : [...p.completedDays, dayNumber].sort((a, b) => a - b);
            const days = getPlanDays(slug);
            const status = completedDays.length >= days.length ? "completed" : "active";
            const currentDay = Math.min(Math.max(p.currentDay, dayNumber + 1), days.length);
            return { ...p, completedDays, currentDay, status, lastDeliveredDay: currentDay };
        }));
        if (reflectionText) {
            addReflection({
                content: reflectionText,
                source: "reading_plan",
                verseReference: getPlanDays(slug).find((d) => d.dayNumber === dayNumber)?.passageRef || null,
                mood: "🌱",
            });
        } else {
            flash("Day complete — nice work", "✅");
        }
    }, [getPlanDays, addReflection, flash]);

    const pausePlan = useCallback((slug) => {
        setEnrolledPlans((prev) => prev.map((p) => p.slug === slug ? { ...p, status: p.status === "paused" ? "active" : "paused" } : p));
    }, []);

    // ---- Chat (§8 / §5.4) ----
    const sendChatMessage = useCallback((text) => {
        const userMsg = { role: "user", content: text, timestamp: new Date().toISOString() };
        setChatMessages((prev) => [...prev, userMsg]);
        // Canned, local-only assistant reply so the mockup feels alive (no network).
        window.setTimeout(() => {
            const reply = {
                role: "assistant",
                content: "We hear you. Let's bring that to God together — \"Cast all your anxiety on him because he cares for you.\" (1 Peter 5:7). What feels heaviest right now?",
                timestamp: new Date().toISOString(),
            };
            setChatMessages((prev) => [...prev, reply]);
        }, 650);
    }, []);

    const saveReflectionFromChat = useCallback((content) => {
        addReflection({ content, source: "auto_summary" });
    }, [addReflection]);

    const value = useMemo(() => ({
        user,
        preferences,
        updatePreferences,
        updateResponseStyle,
        dailyVerse,
        prayers,
        addPrayer,
        prayNow,
        markPrayerAnswered,
        setReminderCadence,
        deletePrayer,
        reflections,
        addReflection,
        deleteReflection,
        memories,
        deleteMemory,
        clearAllMemories,
        planCatalog: mockPlanCatalog,
        enrolledPlans,
        getPlanDays,
        isEnrolled,
        getEnrollment,
        enrollPlan,
        completePlanDay,
        pausePlan,
        themes: mockThemes,
        verseHistory: mockVerseHistory,
        versesReceivedCount: mockVersesReceivedCount,
        milestones: mockMilestones,
        gentlePrompts: mockGentlePrompts,
        upcomingCheckins: mockUpcomingCheckins,
        chatMessages,
        sendChatMessage,
        saveReflectionFromChat,
        planTopicColors,
        toast,
        flash,
    }), [user, preferences, updatePreferences, updateResponseStyle, dailyVerse, prayers, addPrayer, prayNow,
        markPrayerAnswered, setReminderCadence, deletePrayer, reflections, addReflection, deleteReflection,
        memories, deleteMemory, clearAllMemories, enrolledPlans, getPlanDays, isEnrolled, getEnrollment,
        enrollPlan, completePlanDay, pausePlan, chatMessages, sendChatMessage, saveReflectionFromChat, toast, flash]);

    return <CompanionContext.Provider value={value}>{children}</CompanionContext.Provider>;
}

export const useCompanion = () => {
    const ctx = useContext(CompanionContext);
    if (!ctx) throw new Error("useCompanion must be used within a CompanionProvider");
    return ctx;
};
