import React, { useState } from "react";
import { skills } from "../../content/skills";
import { ChevronRight, ArrowRight } from "lucide-react";

export const Expertise: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(skills[0].id);

  const activeCategory = skills.find((s) => s.id === selectedId) || skills[0];

  return (
    <section
      id="expertise"
      aria-label="Technical Expertise"
      className="py-20 lg:py-28 border-b border-hairline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-accent font-semibold tracking-wider">
            02 / EXPERTISE
          </span>
          <span className="h-[1px] w-12 bg-hairline" aria-hidden="true" />
          <span className="text-xs font-mono text-muted uppercase tracking-widest">
            Capability Map
          </span>
        </div>

        <div className="mb-10 max-w-2xl">
          <h2 className="heading-section text-ink">
            What I work with.
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2">
            Tooling curated across six years of production systems. Categorized by functional
            discipline without arbitrary percentage bars.
          </p>
        </div>

        {/* Desktop View: Interactive Capability Map */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 items-start">
          {/* Left: Category List */}
          <div className="md:col-span-5 flex flex-col space-y-1" role="tablist" aria-label="Skill Categories">
            {skills.map((cat, idx) => {
              const isActive = cat.id === selectedId;
              return (
                <button
                  key={cat.id}
                  id={`tab-${cat.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => setSelectedId(cat.id)}
                  onFocus={() => setSelectedId(cat.id)}
                  onMouseEnter={() => setSelectedId(cat.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-md flex items-center justify-between transition-all group focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                    isActive
                      ? "bg-surface text-ink border border-hairline font-medium shadow-xs"
                      : "text-muted hover:text-ink hover:bg-surface-subtle/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs ${
                        isActive ? "text-accent font-semibold" : "text-muted/60"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="text-sm font-sans tracking-tight">{cat.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? "text-accent translate-x-0.5" : "text-muted/40 group-hover:text-muted"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Active Detail Panel */}
          <div
            id={`panel-${activeCategory.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory.id}`}
            className="md:col-span-7 p-8 rounded-lg border border-hairline bg-surface min-h-[380px] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-medium">
                  Discipline · {activeCategory.name}
                </span>
                <span className="font-mono text-xs text-muted">
                  {activeCategory.items.length} tools verified
                </span>
              </div>

              {/* Tools list as clean unboxed text elements with typographic separators */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8">
                {activeCategory.items.map((item, idx) => (
                  <React.Fragment key={item}>
                    <span className="font-sans text-sm sm:text-base text-ink font-medium hover:text-accent transition-colors">
                      {item}
                    </span>
                    {idx < activeCategory.items.length - 1 && (
                      <span className="text-muted/40 select-none" aria-hidden="true">
                        /
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* How I Use It Note (grounded solely in Section 5 facts) */}
            <div className="pt-6 border-t border-hairline">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted block mb-1">
                How I apply this in production
              </span>
              <p className="text-sm text-ink leading-relaxed font-sans">
                {activeCategory.howIUseIt}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile View: Clean Accordion */}
        <div className="md:hidden space-y-3">
          {skills.map((cat, idx) => {
            const isOpen = cat.id === selectedId;
            return (
              <div
                key={cat.id}
                className="rounded-lg border border-hairline bg-surface overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(isOpen ? "" : cat.id)}
                  aria-expanded={isOpen}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-accent">0{idx + 1}</span>
                    <span className="text-sm font-medium text-ink">{cat.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-muted transition-transform ${
                      isOpen ? "rotate-90 text-accent" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-hairline/60 bg-surface-subtle/30 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-ink font-medium pt-1">
                      {cat.items.map((item, i) => (
                        <span key={item} className="inline-block">
                          {item}
                          {i < cat.items.length - 1 ? " ·" : ""}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted leading-relaxed pt-1">
                      {cat.howIUseIt}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
