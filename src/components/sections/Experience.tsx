import React, { useEffect, useRef, useState } from "react";
import { experience, ExperienceItem } from "../../content/experience";
import { Building2, MapPin, Calendar, Clock, AlertCircle } from "lucide-react";

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({
    "exion-technologies": true,
    "gordian-solutions": true,
  });

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;

      // Start line drawing when top of container reaches 70% of window
      const startTrigger = windowHeight * 0.7;
      const current = startTrigger - rect.top;
      const progress = Math.min(1, Math.max(0, current / totalHeight));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper to highlight verified metrics with subtle accent underline
  const renderBullet = (bullet: string) => {
    const regex = /(\b\d+%(?: [^,.]*)?)/g;
    const parts = bullet.split(regex);

    return parts.map((part, i) => {
      if (regex.test(part)) {
        return (
          <span
            key={i}
            className="font-medium text-ink underline decoration-accent/60 underline-offset-4 decoration-1"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      aria-label="Work Experience Timeline"
      className="py-20 lg:py-28 border-b border-hairline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-accent font-semibold tracking-wider">
            03 / EXPERIENCE
          </span>
          <span className="h-[1px] w-12 bg-hairline" aria-hidden="true" />
          <span className="text-xs font-mono text-muted uppercase tracking-widest">
            Career Timeline
          </span>
        </div>

        <div className="mb-12 max-w-2xl">
          <h2 className="heading-section text-ink">
            A living timeline.
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2">
            Progressive senior engineering positions across international teams in Georgia,
            Germany (remote), and Pakistan.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 lg:pl-12">
          {/* Background vertical hairline */}
          <div
            className="absolute left-[11px] sm:left-[19px] lg:left-[23px] top-4 bottom-8 w-[1.5px] bg-hairline"
            aria-hidden="true"
          />

          {/* SVG Animated Scroll Line that draws itself */}
          <div
            className="absolute left-[11px] sm:left-[19px] lg:left-[23px] top-4 bottom-8 w-[2px] bg-accent origin-top transition-all duration-150 ease-out"
            style={{
              height: `${scrollProgress * 100}%`,
            }}
            aria-hidden="true"
          />

          {/* Timeline Role Cards */}
          <div className="space-y-12">
            {experience.map((item, idx) => {
              const isExpanded = expandedRoles[item.id] ?? false;

              return (
                <div key={item.id} className="relative group">
                  {/* Timeline Dot Node */}
                  <div
                    className={`absolute -left-[30px] sm:-left-[38px] lg:-left-[42px] top-6 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                      scrollProgress > (idx + 0.1) / experience.length
                        ? "border-accent bg-canvas"
                        : "border-hairline bg-surface"
                    }`}
                    aria-hidden="true"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full m-auto mt-[3px] transition-colors ${
                        scrollProgress > (idx + 0.1) / experience.length
                          ? "bg-accent"
                          : "bg-transparent"
                      }`}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 rounded-lg border border-hairline bg-surface hover:border-hairline/80 transition-colors">
                    {/* Header: Title, Company, Period */}
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-hairline">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink">
                            {item.title}
                          </h3>
                          {/* Small overlap marker where roles overlap */}
                          {item.hasOverlap && (
                            <span
                              className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-accent/40 text-accent bg-accent/5"
                              title={item.overlapNote}
                            >
                              Concurrent / Overlap
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted">
                          <span className="font-medium text-ink flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                            {item.company}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Date Period */}
                      <div className="flex items-center gap-2 font-mono text-xs text-muted shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
                        <span>{item.formattedPeriod}</span>
                      </div>
                    </div>

                    {/* Expandable toggle on mobile, full view on desktop */}
                    <div className="pt-4">
                      <div className="sm:hidden mb-2">
                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="text-xs font-mono text-accent flex items-center gap-1"
                        >
                          {isExpanded ? "Collapse highlights" : "View highlights"}
                        </button>
                      </div>

                      <div className={`space-y-2.5 ${!isExpanded ? "hidden sm:block" : "block"}`}>
                        {item.bullets.map((bullet, bulletIdx) => (
                          <div
                            key={bulletIdx}
                            className="flex items-start gap-3 text-sm text-muted leading-relaxed"
                          >
                            <span className="text-accent text-xs mt-1.5 select-none" aria-hidden="true">
                              —
                            </span>
                            <p className="flex-1 font-sans">{renderBullet(bullet)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
