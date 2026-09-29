/**
 * WaveDivider — soft wavy section divider (SPYLT pattern), rendered as a
 * gentle warm motif wave on bone. Static, decorative, aria-hidden.
 */
export default function WaveDivider({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${flip ? "rotate-180" : ""} ${className}`}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-8 w-full lg:h-12">
        <path
          d="M0 40 C240 10 480 10 720 40 C960 70 1200 70 1440 40 L1440 60 L0 60 Z"
          fill="var(--buttermilk)"
        />
        <path
          d="M0 40 C240 10 480 10 720 40 C960 70 1200 70 1440 40"
          fill="none"
          stroke="var(--motif)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
