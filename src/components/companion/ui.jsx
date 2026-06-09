import { useEffect } from "react";
import { useCompanion } from "../../context/CompanionContext";

// Shared warm-styled building blocks for the Companion mockup pages. These reuse
// the existing design tokens (cream / terracotta / sage, font-display, rounded-4xl,
// shadow-warm, glass, blob shapes) so the new pages feel like the same product.

export function CompanionShell({ children }) {
    return (
        <div className="bg-cream dark:bg-charcoal-dark font-body -mt-16 md:-mt-20 pt-24 md:pt-28 pb-20 min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 -right-40 w-96 h-96 bg-terracotta/10 blob-shape animate-blob-float"></div>
                <div className="absolute top-72 -left-32 w-80 h-80 bg-sage/15 blob-shape-2 animate-blob-float" style={{ animationDelay: "6s" }}></div>
                <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-brown/10 blob-shape animate-blob-float" style={{ animationDelay: "11s" }}></div>
            </div>
            <div className="relative container mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
                {children}
            </div>
        </div>
    );
}

export function PageHeader({ eyebrow, title, subtitle, action }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 animate-fade-in-up">
            <div className="space-y-2">
                {eyebrow && (
                    <p className="text-sm font-semibold uppercase tracking-widest text-terracotta dark:text-terracotta-light">
                        {eyebrow}
                    </p>
                )}
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal dark:text-cream leading-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="font-body text-lg text-brown dark:text-brown-light max-w-2xl leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
        </div>
    );
}

export function Card({ children, className = "", as: Tag = "div", ...rest }) {
    return (
        <Tag
            className={`rounded-4xl border-2 border-terracotta/15 bg-cream dark:bg-charcoal-light shadow-warm ${className}`}
            {...rest}
        >
            {children}
        </Tag>
    );
}

export function Pill({ children, active = false, onClick }) {
    const base = "px-4 py-1.5 rounded-full text-sm font-semibold font-display transition-warm border-2";
    const palette = active
        ? "bg-terracotta text-cream border-terracotta-dark/20 shadow-warm"
        : "bg-sage/10 text-brown dark:text-cream border-sage/20 hover:border-sage/50";
    return (
        <button type="button" onClick={onClick} className={`${base} ${palette}`}>
            {children}
        </button>
    );
}

export function Toggle({ checked, onChange, label, description }) {
    return (
        <label className="flex items-start justify-between gap-4 cursor-pointer group py-2">
            <span className="flex-1">
                <span className="block font-display font-semibold text-charcoal dark:text-cream">{label}</span>
                {description && (
                    <span className="block text-sm text-brown dark:text-brown-light mt-0.5 leading-relaxed">{description}</span>
                )}
            </span>
            <span
                role="switch"
                aria-checked={checked}
                tabIndex={0}
                onClick={() => onChange(!checked)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange(!checked); } }}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-warm mt-1
                    ${checked ? "bg-terracotta shadow-warm" : "bg-brown/25 dark:bg-brown/40"}`}
            >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-cream shadow transition-warm
                    ${checked ? "translate-x-6" : "translate-x-1"}`} />
            </span>
        </label>
    );
}

export function SegmentedControl({ options, value, onChange }) {
    return (
        <div className="inline-flex flex-wrap gap-1 rounded-3xl bg-cream-dark dark:bg-charcoal p-1 border-2 border-terracotta/15">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => onChange(opt.value)}
                    className={`px-4 py-2 rounded-2xl text-sm font-semibold font-display transition-warm
                        ${value === opt.value
                            ? "bg-terracotta text-cream shadow-warm"
                            : "text-brown dark:text-brown-light hover:text-terracotta dark:hover:text-terracotta-light"}`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

export function Modal({ open, onClose, title, children, maxWidth = "max-w-lg" }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6">
            <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
            <div className={`relative w-full ${maxWidth} bg-cream dark:bg-charcoal-light rounded-t-4xl sm:rounded-4xl
                border-2 border-terracotta/20 shadow-warm-lg animate-fade-in-up max-h-[92vh] overflow-y-auto`}>
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b-2 border-terracotta/10 sticky top-0 bg-cream dark:bg-charcoal-light rounded-t-4xl">
                    <h3 className="font-display text-2xl font-bold text-charcoal dark:text-cream">{title}</h3>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-brown dark:text-brown-light
                            hover:bg-terracotta/10 transition-warm text-xl"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
                <div className="px-6 py-6">{children}</div>
            </div>
        </div>
    );
}

export function PrimaryButton({ children, className = "", ...rest }) {
    return (
        <button
            className={`bg-terracotta-gradient text-cream py-3 px-6 rounded-3xl font-bold font-display
                shadow-warm hover:shadow-warm-lg transform hover:scale-105 active:scale-95 transition-warm
                border-2 border-terracotta-dark/20 inline-flex items-center justify-center gap-2
                disabled:opacity-50 disabled:hover:scale-100 ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}

export function GhostButton({ children, className = "", ...rest }) {
    return (
        <button
            className={`py-3 px-6 rounded-3xl font-semibold font-display border-2 border-terracotta/30
                text-terracotta dark:text-terracotta-light hover:bg-terracotta/10 transition-warm
                inline-flex items-center justify-center gap-2 ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}

export function TextField({ label, as = "input", className = "", ...rest }) {
    const Tag = as;
    return (
        <label className="block space-y-1.5">
            {label && <span className="block font-display font-semibold text-sm text-charcoal dark:text-cream">{label}</span>}
            <Tag
                className={`w-full rounded-3xl border-2 border-terracotta/20 bg-cream-dark dark:bg-charcoal
                    px-4 py-3 text-charcoal dark:text-cream font-body
                    focus:outline-none focus:border-terracotta/60 transition-warm placeholder-brown/50 ${className}`}
                {...rest}
            />
        </label>
    );
}

export function CompanionToast() {
    const { toast } = useCompanion();
    if (!toast) return null;
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] animate-fade-in-up">
            <div className="flex items-center gap-3 rounded-3xl bg-charcoal dark:bg-cream text-cream dark:text-charcoal
                px-6 py-3.5 shadow-warm-lg border-2 border-terracotta/20">
                <span className="text-xl">{toast.icon}</span>
                <span className="font-display font-semibold">{toast.message}</span>
            </div>
        </div>
    );
}

export function StatTile({ value, label, accent = "terracotta", icon }) {
    const accentText = accent === "sage" ? "text-sage-dark dark:text-sage-light" : accent === "brown" ? "text-brown dark:text-brown-light" : "text-terracotta dark:text-terracotta-light";
    return (
        <Card className="p-5 text-center">
            {icon && <div className="text-2xl mb-1">{icon}</div>}
            <div className={`font-display text-3xl font-black ${accentText}`}>{value}</div>
            <div className="text-sm text-brown dark:text-brown-light mt-1">{label}</div>
        </Card>
    );
}

export function formatDate(iso, opts) {
    if (!iso) return "";
    try {
        return new Date(iso).toLocaleDateString("en-US", opts || { month: "short", day: "numeric", year: "numeric" });
    } catch {
        return iso;
    }
}

export function relativeDate(iso) {
    if (!iso) return "";
    const now = new Date("2026-06-09T12:00:00");
    const then = new Date(iso);
    const diffDays = Math.round((now - then) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "Last week";
    return formatDate(iso, { month: "short", day: "numeric" });
}
