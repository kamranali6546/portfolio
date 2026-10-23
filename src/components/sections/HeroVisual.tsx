import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  // Pause calculations when off screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Parallax tracking for pointer on desktop
  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setPointerOffset({ x, y });
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [reducedMotion, isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center select-none"
      aria-label="Component architecture tree diagram"
      role="img"
    >
      {/* Soft ambient radial glow */}
      <div
        className="absolute inset-0 bg-radial from-accent/5 via-transparent to-transparent pointer-events-none rounded-3xl"
        aria-hidden="true"
      />

      <div
        className="w-full h-full transition-transform duration-500 ease-out flex items-center justify-center"
        style={{
          transform: reducedMotion
            ? "none"
            : `translate3d(${pointerOffset.x}px, ${pointerOffset.y}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 600 460"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[560px] text-ink"
          aria-hidden="true"
        >
          {/* Curved Connector Paths */}
          <g stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" strokeLinecap="round">
            {/* Root to Layer 1 */}
            <path d="M 300 75 C 300 115, 160 115, 160 155" />
            <path d="M 300 75 C 300 115, 440 115, 440 155" />

            {/* Layer 1 left to Layer 2 */}
            <path d="M 160 195 C 160 235, 90 235, 90 275" />
            <path d="M 160 195 C 160 235, 230 235, 230 275" />

            {/* Layer 1 right to Layer 2 */}
            <path d="M 440 195 C 440 235, 370 235, 370 275" />
            <path d="M 440 195 C 440 235, 510 235, 510 275" />

            {/* Layer 2 to Leaf / Output */}
            <path d="M 230 315 C 230 355, 300 355, 300 395" />
            <path d="M 370 315 C 370 355, 300 355, 300 395" />
          </g>

          {/* Animated Data Pulses along connectors */}
          {!reducedMotion && isVisible && (
            <g fill="var(--color-accent)">
              <circle r="3" className="opacity-90">
                <animateMotion
                  path="M 300 75 C 300 115, 160 115, 160 155"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" className="opacity-90">
                <animateMotion
                  path="M 300 75 C 300 115, 440 115, 440 155"
                  dur="3.2s"
                  begin="0.8s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" className="opacity-90">
                <animateMotion
                  path="M 160 195 C 160 235, 230 235, 230 275"
                  dur="2.8s"
                  begin="1.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" className="opacity-90">
                <animateMotion
                  path="M 440 195 C 440 235, 370 235, 370 275"
                  dur="2.8s"
                  begin="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          )}

          {/* Node: Root Architecture */}
          <g transform="translate(230, 40)">
            <rect
              width="140"
              height="40"
              rx="6"
              fill="var(--color-canvas)"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
            />
            <text
              x="70"
              y="24"
              textAnchor="middle"
              className="fill-current font-mono text-[11px] font-semibold tracking-wider text-accent"
            >
              &lt;AppRoot /&gt;
            </text>
          </g>

          {/* Nodes: Layer 1 */}
          <g transform="translate(90, 155)">
            <rect
              width="140"
              height="40"
              rx="6"
              fill="var(--color-canvas)"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.2"
            />
            <text
              x="70"
              y="24"
              textAnchor="middle"
              className="fill-current font-mono text-[11px] text-ink"
            >
              SSR Hydrator
            </text>
          </g>

          <g transform="translate(370, 155)">
            <rect
              width="140"
              height="40"
              rx="6"
              fill="var(--color-canvas)"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.2"
            />
            <text
              x="70"
              y="24"
              textAnchor="middle"
              className="fill-current font-mono text-[11px] text-ink"
            >
              Edge Router
            </text>
          </g>

          {/* Nodes: Layer 2 */}
          <g transform="translate(20, 275)">
            <rect
              width="140"
              height="38"
              rx="6"
              fill="var(--color-canvas)"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="1.2"
            />
            <text
              x="70"
              y="23"
              textAnchor="middle"
              className="fill-current font-mono text-[10px] text-muted"
            >
              Design Tokens
            </text>
          </g>

          <g transform="translate(160, 275)">
            <rect
              width="140"
              height="38"
              rx="6"
              fill="var(--color-canvas)"
              stroke="var(--color-accent)"
              strokeOpacity="0.8"
              strokeWidth="1.2"
            />
            <text
              x="70"
              y="23"
              textAnchor="middle"
              className="fill-current font-mono text-[10px] text-accent font-medium"
            >
              State Machine
            </text>
          </g>

          <g transform="translate(300, 275)">
            <rect
              width="140"
              height="38"
              rx="6"
              fill="var(--color-canvas)"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="1.2"
            />
            <text
              x="70"
              y="23"
              textAnchor="middle"
              className="fill-current font-mono text-[10px] text-muted"
            >
              Dual Gateway
            </text>
          </g>

          <g transform="translate(440, 275)">
            <rect
              width="140"
              height="38"
              rx="6"
              fill="var(--color-canvas)"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="1.2"
            />
            <text
              x="70"
              y="23"
              textAnchor="middle"
              className="fill-current font-mono text-[10px] text-muted"
            >
              CDN Edge
            </text>
          </g>

          {/* Nodes: Leaf Output */}
          <g transform="translate(220, 395)">
            <rect
              width="160"
              height="40"
              rx="6"
              fill="var(--color-canvas)"
              stroke="var(--color-brass)"
              strokeWidth="1.4"
            />
            <text
              x="80"
              y="24"
              textAnchor="middle"
              className="fill-current font-mono text-[10px] font-medium text-brass"
            >
              60fps · Zero CLS · AA
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
