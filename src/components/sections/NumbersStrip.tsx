import React, { useEffect, useState, useRef } from "react";
import { projects } from "../../content/projects";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  caption: string;
}

export const NumbersStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [displayValues, setDisplayValues] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const reducedMotion = useReducedMotion();

  // Exactly computed live projects count from published data
  const liveProjectsCount = projects.filter((p) => p.published).length;

  const stats: StatItem[] = [
    {
      value: 6,
      suffix: "+",
      label: "Years of Experience",
      caption: "Resume verified",
    },
    {
      value: liveProjectsCount,
      suffix: "",
      label: "Live Projects",
      caption: "Computed from portfolio",
    },
    {
      value: 80,
      suffix: "%",
      label: "Mobile Traffic Surge",
      caption: "Gordian Solutions",
    },
    {
      value: 45,
      suffix: "%",
      label: "Faster Page Loads",
      caption: "Gordian Solutions",
    },
    {
      value: 90,
      suffix: "%",
      label: "Fewer Production Bugs",
      caption: "Exion Technologies",
    },
    {
      value: 95,
      suffix: "%",
      label: "Client Satisfaction",
      caption: "Gordian Solutions",
    },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    if (reducedMotion) {
      setDisplayValues(stats.map((s) => s.value));
      return;
    }

    const duration = 1200; // 1.2s count up
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValues(stats.map((s) => Math.round(s.value * easeProgress)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, reducedMotion]);

  return (
    <section
      ref={containerRef}
      aria-label="Verified Metrics"
      className="py-12 border-b border-hairline bg-surface-subtle/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="flex flex-col items-start border-l border-hairline pl-4 py-1"
            >
              <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-ink tabular-nums flex items-baseline">
                <span>{displayValues[idx]}</span>
                <span className="text-accent text-2xl ml-0.5">{stat.suffix}</span>
              </div>
              <span className="text-xs font-medium text-ink mt-1 font-sans">
                {stat.label}
              </span>
              <span className="text-[11px] font-mono text-muted mt-0.5">
                {stat.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
