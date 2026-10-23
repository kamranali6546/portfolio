import React, { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface IntroOverlayProps {
  onComplete: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"drawing" | "lifting" | "done">("drawing");

  useEffect(() => {
    // If reduced motion or already seen in this browser session, skip immediately
    if (reducedMotion || sessionStorage.getItem("ka-intro-seen")) {
      onComplete();
      return;
    }

    // Step 1: Draw monogram for 650ms
    const drawTimer = setTimeout(() => {
      setPhase("lifting");
    }, 650);

    // Step 2: Lift curtain away (transition lasts 450ms, total under 1150ms < 1.2s)
    const doneTimer = setTimeout(() => {
      sessionStorage.setItem("ka-intro-seen", "true");
      setPhase("done");
      onComplete();
    }, 1120);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sessionStorage.setItem("ka-intro-seen", "true");
        setPhase("done");
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete, reducedMotion]);

  if (phase === "done") return null;

  const handleSkip = () => {
    sessionStorage.setItem("ka-intro-seen", "true");
    setPhase("done");
    onComplete();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        phase === "lifting" ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-label="Welcome intro"
      role="region"
    >
      <div className="flex flex-col items-center">
        {/* Monogram KA SVG drawing */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 sm:w-28 sm:h-28 text-accent"
          aria-hidden="true"
        >
          {/* Outer hairline circle */}
          <circle
            cx="60"
            cy="60"
            r="56"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.3"
            strokeDasharray="360"
            className="animate-[dash_0.8s_ease-out_forwards]"
          />
          {/* Monogram Letter K */}
          <path
            d="M 40 32 L 40 88 M 40 60 L 58 32 M 43 56 L 60 88"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="200"
            strokeDashoffset={phase === "drawing" ? 0 : 0}
            className="transition-all duration-700 ease-out"
          />
          {/* Monogram Letter A */}
          <path
            d="M 64 88 L 78 32 L 92 88 M 69 72 L 87 72"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="200"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <span className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
          Kamran Ali
        </span>
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-8 text-xs font-mono text-muted hover:text-ink transition-colors px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      >
        Skip intro (Esc)
      </button>
    </div>
  );
};
