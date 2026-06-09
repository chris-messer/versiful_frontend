// Mock data for the Versiful Companion UI mockup.
// Frontend-only: nothing here touches the network. The CompanionContext seeds
// its React state from these objects and mutates copies locally.

// A believable subscribed user so every gated screen renders fully alive.
export const mockUser = {
    userId: "mock-chris-0001",
    firstName: "Chris",
    lastName: "Bennett",
    email: "chris@example.com",
    phoneNumber: "+18335551158",
    plan: "premium",
    isSubscribed: true,
    bibleVersion: "New International Version (NIV)",
    timezone: "America/Denver",
    memberSince: "2025-11-02",
    daysActive: 47,
    currentStreak: 6,
};

// Communication / companion preferences (mirrors the attributes the spec stores
// on the DynamoDB users item — §4.4 / §12).
export const mockPreferences = {
    primaryChannel: "sms", // sms | web
    dailyVerseEnabled: true,
    dailyVerseTime: "08:00",
    dailyVerseChannel: "sms",
    checkinEnabled: true,
    checkinFrequency: "weekly", // off | weekly | biweekly
    checkinInactivityDays: 4,
    readingPlanReminders: true,
    marketingUpdates: false,
    encouragementTips: true,
    responseStyle: {
        tone: "warm", // warm | pastoral | concise
        length: "short", // short | fuller
    },
};

// The personalized daily verse surfaced on My Walk + represented by Settings (§6).
export const mockDailyVerse = {
    reference: "Isaiah 43:2",
    displayRef: "Isaiah 43:2 (NIV)",
    text: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you.",
    reflection: "As you head into your mom's surgery today, you don't walk in alone. He goes ahead of you and stays beside you.",
    themes: ["comfort", "fear", "presence"],
    sentAt: "2026-06-09T08:00:00",
};

// Prayer journal (§7). Mix of active + answered with dates and notes.
export const mockPrayers = [
    {
        prayerId: "pr-001",
        title: "Mom's surgery",
        body: "Mom is having surgery on her knee. Praying it goes smoothly and recovery is quick.",
        category: "Health",
        people: ["Mom"],
        status: "active",
        eventDate: "2026-06-09",
        reminderCadence: "daily",
        prayCount: 12,
        lastPrayedAt: "2026-06-09T07:30:00",
        source: "sms",
        createdAt: "2026-06-02T19:14:00",
        answerNote: null,
        answeredAt: null,
    },
    {
        prayerId: "pr-002",
        title: "Job interview at Trailhead",
        body: "Big interview Thursday for a role I'd really love. Praying for calm and clarity.",
        category: "Work",
        people: [],
        status: "active",
        eventDate: "2026-06-11",
        reminderCadence: "weekly",
        prayCount: 5,
        lastPrayedAt: "2026-06-08T22:05:00",
        source: "web",
        createdAt: "2026-06-05T09:40:00",
        answerNote: null,
        answeredAt: null,
    },
    {
        prayerId: "pr-003",
        title: "Patience with the kids",
        body: "That I'd be slow to anger and full of grace at the end of long days.",
        category: "Family",
        people: ["Ella", "Sam"],
        status: "active",
        eventDate: null,
        reminderCadence: "none",
        prayCount: 23,
        lastPrayedAt: "2026-06-07T21:00:00",
        source: "chat",
        createdAt: "2026-05-20T20:11:00",
        answerNote: null,
        answeredAt: null,
    },
    {
        prayerId: "pr-004",
        title: "New job",
        body: "Praying for the right next role after the layoff in the spring.",
        category: "Work",
        people: [],
        status: "answered",
        eventDate: null,
        reminderCadence: "none",
        prayCount: 41,
        lastPrayedAt: "2026-05-28T08:00:00",
        source: "sms",
        createdAt: "2026-03-15T12:00:00",
        answerNote: "Got the offer at Trailhead! Started two weeks ago. So grateful — God provided right on time.",
        answeredAt: "2026-05-29T16:30:00",
    },
    {
        prayerId: "pr-005",
        title: "Dad's recovery",
        body: "After Dad's heart procedure last winter — praying for full strength.",
        category: "Health",
        people: ["Dad"],
        status: "answered",
        eventDate: null,
        reminderCadence: "none",
        prayCount: 30,
        lastPrayedAt: "2026-04-10T08:00:00",
        source: "sms",
        createdAt: "2026-01-08T18:20:00",
        answerNote: "Dad's cardiologist cleared him at his check-up. Walking two miles a day now. Thank you, Lord.",
        answeredAt: "2026-04-12T11:00:00",
    },
];

// Reflection log (§8). Some linked to verses, some from a reading plan.
export const mockReflections = [
    {
        id: "rf-001",
        content: "I keep trying to control the timing of everything. Today I felt God asking me to trust Him with the 'when,' not just the 'what.'",
        source: "auto_summary",
        verseReference: "Proverbs 3:5-6",
        mood: "🙏",
        createdAt: "2026-06-08T22:10:00",
    },
    {
        id: "rf-002",
        content: "Day 3 of the anxiety plan: 'God's provision.' I wrote down three ways He already provided this week that I'd overlooked.",
        source: "reading_plan",
        verseReference: "Matthew 6:26",
        mood: "🌱",
        createdAt: "2026-06-07T08:45:00",
    },
    {
        id: "rf-003",
        content: "Forgiving someone doesn't mean what they did was okay — it means I'm handing the weight of it to God instead of carrying it.",
        source: "manual",
        verseReference: "Colossians 3:13",
        mood: "🤍",
        createdAt: "2026-06-01T19:30:00",
    },
    {
        id: "rf-004",
        content: "Anxiety hit hard Sunday night again. The verse about not worrying for tomorrow actually loosened my chest a little.",
        source: "auto_summary",
        verseReference: "Matthew 6:34",
        mood: "😮‍💨",
        createdAt: "2026-05-25T21:50:00",
    },
    {
        id: "rf-005",
        content: "Started keeping a gratitude list. It's amazing how naming small things shifts the whole evening.",
        source: "manual",
        verseReference: "1 Thessalonians 5:18",
        mood: "✨",
        createdAt: "2026-05-18T20:05:00",
    },
];

// Reading plan catalog (§9.1).
export const mockPlanCatalog = [
    { slug: "anxiety-7", title: "Finding Peace in Anxiety", dayCount: 7, topic: "anxiety", emoji: "🌊", description: "Seven days of Scripture for an anxious heart — trading worry for the peace of God." },
    { slug: "grief-14", title: "Walking Through Grief", dayCount: 14, topic: "grief", emoji: "🕊️", description: "A gentle fourteen-day companion for loss, lament, and the slow return of hope." },
    { slug: "new-believer-30", title: "First Steps with Jesus", dayCount: 30, topic: "new_believer", emoji: "🌅", description: "A thirty-day on-ramp to faith — who Jesus is and what it means to follow Him." },
    { slug: "forgiveness-7", title: "The Freedom of Forgiveness", dayCount: 7, topic: "forgiveness", emoji: "🔓", description: "Seven days to lay down resentment and walk in the freedom God offers." },
    { slug: "marriage-14", title: "Strengthening Your Marriage", dayCount: 14, topic: "marriage", emoji: "💍", description: "Two weeks of Scripture and prompts to nurture love, patience, and partnership." },
    { slug: "gratitude-7", title: "A Heart of Gratitude", dayCount: 7, topic: "gratitude", emoji: "🌾", description: "Seven days to cultivate thankfulness and notice God's goodness daily." },
    { slug: "hope-10", title: "Holding On to Hope", dayCount: 10, topic: "hope", emoji: "⚓", description: "Ten days anchoring your heart in the steady hope of Christ." },
];

// Per-day content for plans the user can open. Other plans get generated placeholder days.
export const mockPlanDays = {
    "anxiety-7": [
        { dayNumber: 1, passageRef: "Philippians 4:6-7", theme: "Bring it to God", prompt: "What worry can you hand to God in prayer right now, naming it specifically?" },
        { dayNumber: 2, passageRef: "Matthew 6:25-34", theme: "One day at a time", prompt: "Where are you borrowing tomorrow's worry today? What would it look like to stay in just today?" },
        { dayNumber: 3, passageRef: "Matthew 6:26", theme: "God's provision", prompt: "Name three ways God has already provided for you this week, even small ones." },
        { dayNumber: 4, passageRef: "Psalm 94:19", theme: "Consolation in anxiety", prompt: "When anxiety is greatest, where have you felt even a flicker of God's comfort?" },
        { dayNumber: 5, passageRef: "1 Peter 5:7", theme: "He cares for you", prompt: "Write a sentence to God casting one specific care onto Him." },
        { dayNumber: 6, passageRef: "Isaiah 41:10", theme: "Do not fear", prompt: "What fear loses some of its grip when you remember God is with you?" },
        { dayNumber: 7, passageRef: "John 14:27", theme: "A peace the world can't give", prompt: "Looking back over the week, what has shifted in how you carry anxiety?" },
    ],
    "gratitude-7": [
        { dayNumber: 1, passageRef: "Psalm 100", theme: "Enter with thanksgiving", prompt: "What's one thing you're thankful for this morning?" },
        { dayNumber: 2, passageRef: "1 Thessalonians 5:16-18", theme: "Give thanks in all", prompt: "Can you thank God inside a hard circumstance today?" },
        { dayNumber: 3, passageRef: "Psalm 103:1-5", theme: "Forget not His benefits", prompt: "List benefits from God you tend to forget." },
        { dayNumber: 4, passageRef: "Colossians 3:15-17", theme: "Thankful hearts", prompt: "Who could you thank today, out loud?" },
        { dayNumber: 5, passageRef: "Luke 17:11-19", theme: "The one who returned", prompt: "What good thing have you received but not yet thanked God for?" },
        { dayNumber: 6, passageRef: "Philippians 4:11-13", theme: "Contentment", prompt: "Where do you sense God growing contentment in you?" },
        { dayNumber: 7, passageRef: "Psalm 136:1", theme: "His love endures", prompt: "Write a short psalm of thanks in your own words." },
    ],
};

// The user is mid-way through the anxiety plan (§ "day 3 of 7").
export const mockEnrolledPlans = [
    {
        planId: "anxiety-7",
        slug: "anxiety-7",
        status: "active",
        currentDay: 3,
        startedAt: "2026-06-05",
        lastDeliveredDay: 3,
        deliveryTime: "08:00",
        completedDays: [1, 2],
    },
];

// "Things Versiful remembers" — long-term memory manager (§11.2a).
export const mockMemories = [
    {
        id: "mem-001",
        kind: "life_event",
        summary: "Mom is having knee surgery",
        detail: "Scheduled for June 9. Chris is anxious about the recovery.",
        people: ["Mom"],
        eventDate: "2026-06-09",
        salience: 0.9,
        status: "active",
        createdAt: "2026-06-02T19:14:00",
    },
    {
        id: "mem-002",
        kind: "struggle",
        summary: "Returns to anxiety about work, especially Sunday nights",
        detail: "Recurring theme over several conversations.",
        people: [],
        eventDate: null,
        salience: 0.82,
        status: "active",
        createdAt: "2026-04-30T21:00:00",
    },
    {
        id: "mem-003",
        kind: "life_event",
        summary: "Was laid off in the spring, then hired at Trailhead",
        detail: "Job search was a major source of stress; resolved with a new role.",
        people: [],
        eventDate: "2026-05-29",
        salience: 0.6,
        status: "active",
        createdAt: "2026-03-15T12:00:00",
    },
    {
        id: "mem-004",
        kind: "relationship",
        summary: "Married to Hannah; two kids, Ella (7) and Sam (4)",
        detail: null,
        people: ["Hannah", "Ella", "Sam"],
        eventDate: null,
        salience: 0.75,
        status: "active",
        createdAt: "2026-02-10T18:00:00",
    },
    {
        id: "mem-005",
        kind: "relationship",
        summary: "Dad recovered from a heart procedure last winter",
        detail: null,
        people: ["Dad"],
        eventDate: "2026-04-12",
        salience: 0.5,
        status: "active",
        createdAt: "2026-01-08T18:20:00",
    },
    {
        id: "mem-006",
        kind: "preference",
        summary: "Prefers shorter responses, one verse at a time",
        detail: null,
        people: [],
        eventDate: null,
        salience: 0.55,
        status: "active",
        createdAt: "2026-03-01T09:00:00",
    },
    {
        id: "mem-007",
        kind: "spiritual_state",
        summary: "Wants to trust God with timing rather than control outcomes",
        detail: "Came up around the job search and again recently.",
        people: [],
        eventDate: null,
        salience: 0.68,
        status: "active",
        createdAt: "2026-06-08T22:10:00",
    },
    {
        id: "mem-008",
        kind: "goal",
        summary: "Building a daily habit of gratitude journaling",
        detail: null,
        people: [],
        eventDate: null,
        salience: 0.45,
        status: "active",
        createdAt: "2026-05-18T20:05:00",
    },
];

// Themes explored, derived for My Walk (verse_history.themes + memory kinds).
export const mockThemes = [
    { name: "anxiety", count: 14 },
    { name: "hope", count: 9 },
    { name: "forgiveness", count: 6 },
    { name: "gratitude", count: 5 },
    { name: "provision", count: 4 },
    { name: "patience", count: 4 },
    { name: "comfort", count: 7 },
    { name: "rest", count: 3 },
];

// Verse history (received verses) for My Walk count + favorites (§11).
export const mockVerseHistory = [
    { reference: "Isaiah 43:2", displayRef: "Isaiah 43:2", themes: ["comfort", "fear"], context: "daily_verse", sentAt: "2026-06-09T08:00:00", favorite: true },
    { reference: "Matthew 6:26", displayRef: "Matthew 6:26", themes: ["provision", "anxiety"], context: "reading_plan", sentAt: "2026-06-07T08:45:00", favorite: false },
    { reference: "Proverbs 3:5-6", displayRef: "Proverbs 3:5-6", themes: ["trust"], context: "chat", sentAt: "2026-06-08T22:00:00", favorite: true },
    { reference: "Philippians 4:6-7", displayRef: "Philippians 4:6-7", themes: ["anxiety", "peace"], context: "reading_plan", sentAt: "2026-06-05T08:00:00", favorite: true },
    { reference: "Psalm 23", displayRef: "Psalm 23", themes: ["comfort", "rest"], context: "chat", sentAt: "2026-05-30T07:50:00", favorite: false },
    { reference: "Colossians 3:13", displayRef: "Colossians 3:13", themes: ["forgiveness"], context: "chat", sentAt: "2026-06-01T19:00:00", favorite: false },
    { reference: "1 Thessalonians 5:18", displayRef: "1 Thessalonians 5:18", themes: ["gratitude"], context: "chat", sentAt: "2026-05-18T20:00:00", favorite: false },
];

export const mockVersesReceivedCount = 128;

// Auto-generated milestones timeline (§11.1).
export const mockMilestones = [
    { id: "ms-1", icon: "🙏", title: "Prayer answered: New job", detail: "You celebrated God's provision at Trailhead.", date: "2026-05-29" },
    { id: "ms-2", icon: "🌊", title: "Started 'Finding Peace in Anxiety'", detail: "Day 1 of a 7-day plan.", date: "2026-06-05" },
    { id: "ms-3", icon: "❤️‍🩹", title: "Prayer answered: Dad's recovery", detail: "Cleared by his cardiologist.", date: "2026-04-12" },
    { id: "ms-4", icon: "✍️", title: "First reflection saved", detail: "You began keeping a journal.", date: "2026-05-18" },
    { id: "ms-5", icon: "🔥", title: "6-day streak", detail: "Six days walking with Versiful in a row.", date: "2026-06-09" },
];

// Gentle, suggested next steps (§11.1 gentle prompts).
export const mockGentlePrompts = [
    { id: "gp-1", text: "You've explored anxiety and hope a lot. Have you ever sat with gratitude? Try the 7-day plan.", cta: "A Heart of Gratitude", slug: "gratitude-7" },
    { id: "gp-2", text: "It's been a few days since you saved a reflection. Want to capture what's on your heart today?", cta: "New reflection", to: "/journal" },
];

// Upcoming check-ins preview (§10.7) — transparency surface.
export const mockUpcomingCheckins = [
    { id: "ci-1", when: "Tomorrow", context: "prayer_followup", preview: "How did your mom's surgery go?" },
    { id: "ci-2", when: "If you go quiet a few days", context: "general", preview: "We've been thinking of you — how's your heart?" },
];

// Seed chat messages for the mockup Chat (includes a save-able assistant reply
// and a canned account-management exchange — §8 / §5.4).
export const mockChatMessages = [
    {
        role: "assistant",
        content: "Morning, Chris. As you head into your mom's surgery today — \"When you pass through the waters, I will be with you.\" (Isaiah 43:2, NIV). You don't walk in alone today.",
        timestamp: "2026-06-09T08:00:00",
    },
    {
        role: "user",
        content: "Thank you. I'm trying so hard not to spiral about it.",
        timestamp: "2026-06-09T08:02:00",
    },
    {
        role: "assistant",
        content: "That makes sense — this matters to you. Remember Philippians 4:6-7: bring the worry to God in prayer, and the peace that doesn't quite make sense will guard your heart. You don't have to hold today perfectly. You just have to hold His hand.",
        timestamp: "2026-06-09T08:03:00",
    },
    {
        role: "user",
        content: "Can you turn off my morning verse for a little while? Things are a lot right now.",
        timestamp: "2026-06-09T08:05:00",
    },
    {
        role: "assistant",
        content: "Done — we'll pause your daily verse for now. Text anytime (or flip it back on in Settings) and we'll start sending it again. We're here whenever you want to talk.",
        timestamp: "2026-06-09T08:05:30",
        accountAction: { label: "Daily verse paused", icon: "🔕" },
    },
];

export const planTopicColors = {
    anxiety: "sage",
    grief: "brown",
    new_believer: "terracotta",
    forgiveness: "sage",
    marriage: "terracotta",
    gratitude: "brown",
    hope: "sage",
};
