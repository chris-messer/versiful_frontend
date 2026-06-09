// SVG progress ring for a reading plan.
export default function PlanProgress({ completed, total, size = 120, stroke = 10, label }) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const pct = total > 0 ? Math.min(completed / total, 1) : 0;
    const offset = circumference * (1 - pct);

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-terracotta/15" />
                <circle
                    cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke}
                    strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
                    className="text-terracotta transition-all duration-700 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-2xl font-black text-charcoal dark:text-cream">{completed}/{total}</span>
                {label && <span className="text-xs text-brown dark:text-brown-light">{label}</span>}
            </div>
        </div>
    );
}
