import { PrimaryButton, GhostButton } from "../companion/ui";

export default function EnrollButton({ enrolled, onEnroll, className = "" }) {
    return enrolled ? (
        <GhostButton className={className} disabled>
            ✓ Enrolled
        </GhostButton>
    ) : (
        <PrimaryButton className={className} onClick={onEnroll}>
            Start this plan
        </PrimaryButton>
    );
}
