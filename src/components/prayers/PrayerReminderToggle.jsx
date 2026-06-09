import { SegmentedControl } from "../companion/ui";

const options = [
    { value: "none", label: "Off" },
    { value: "weekly", label: "Weekly" },
    { value: "daily", label: "Daily" },
];

export default function PrayerReminderToggle({ cadence, onChange }) {
    return (
        <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-brown dark:text-brown-light">Reminders</span>
            <SegmentedControl options={options} value={cadence || "none"} onChange={onChange} />
        </div>
    );
}
