// Content for the hero phone carousel. Each slide showcases a different
// companion interaction. A bubble's `lines` are typed so the phone can render a
// reference (bold), a verse quote, and a plain note distinctly — matching the
// existing iMessage styling.
//
// line.type: 'text' | 'ref' | 'verse'
// bubble.from: 'user' | 'versiful'

export const heroSlides = [
    {
        id: "guidance",
        label: "Scripture for what you're facing",
        caption: "Guidance in the moment",
        bubbles: [
            {
                from: "user",
                lines: [{ type: "text", value: "I'm so overwhelmed with work and I can't sleep." }],
            },
            {
                from: "versiful",
                lines: [
                    { type: "ref", value: "Matthew 11:28" },
                    { type: "verse", value: "\u201CCome to me, all you who are weary and burdened, and I will give you rest.\u201D" },
                    { type: "text", value: "You weren't meant to carry all of it tonight. Set one worry down with Him before you close your eyes." },
                ],
            },
        ],
    },
    {
        id: "daily-verse",
        label: "A verse each morning, made for you",
        caption: "Personalized daily verse",
        bubbles: [
            {
                from: "versiful",
                lines: [
                    { type: "text", value: "Morning, Chris. As you head into your mom's surgery today —" },
                    { type: "ref", value: "Isaiah 43:2 (NIV)" },
                    { type: "verse", value: "\u201CWhen you pass through the waters, I will be with you; they will not sweep over you.\u201D" },
                    { type: "text", value: "You don't walk in alone today. We're praying alongside you." },
                ],
            },
        ],
    },
    {
        id: "reading-plan",
        label: "Guided reading plans",
        caption: "Today's reading plan",
        bubbles: [
            {
                from: "versiful",
                lines: [
                    { type: "text", value: "Day 3 of Finding Peace in Anxiety \uD83C\uDF0A" },
                    { type: "ref", value: "Matthew 6:26" },
                    { type: "verse", value: "\u201CLook at the birds of the air\u2026 your heavenly Father feeds them. Are you not much more valuable?\u201D" },
                    { type: "text", value: "Reflection: where has God already provided for you this week, even in a small way?" },
                ],
            },
        ],
    },
    {
        id: "checkin",
        label: "Checks in when life gets hard",
        caption: "A gentle check-in",
        bubbles: [
            {
                from: "versiful",
                lines: [{ type: "text", value: "It's been a few days \u2014 how did your mom's surgery go? We've been thinking of you both. \uD83E\uDD0D" }],
            },
            {
                from: "user",
                lines: [{ type: "text", value: "It went really well, thank you. She's home resting now." }],
            },
            {
                from: "versiful",
                lines: [{ type: "text", value: "That's such good news. Praising God with you \u2014 we'll keep her recovery on your prayer list." }],
            },
        ],
    },
    {
        id: "memory",
        label: "Stays with your story",
        caption: "Answered prayer",
        bubbles: [
            {
                from: "user",
                lines: [{ type: "text", value: "I got the job!! I can't believe it." }],
            },
            {
                from: "versiful",
                lines: [{ type: "text", value: "Chris, that's wonderful! \uD83C\uDF89 A few weeks ago you said you wanted to trust God with the timing \u2014 and here it is. Want us to mark \u201Cnew job\u201D as an answered prayer?" }],
            },
        ],
    },
];
