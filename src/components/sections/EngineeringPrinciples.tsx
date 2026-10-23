import React from "react";
import { engineeringPrinciples, PrincipleItem } from "../../content/principles";

export const EngineeringPrinciples: React.FC = () => {
  const renderSvgIcon = (type: PrincipleItem["svgIcon"]) => {
    switch (type) {
      case "performance":
        return (
          <svg viewBox="0 0 40 40" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="20" cy="20" r="16" strokeDasharray="80" strokeOpacity="0.3" />
            <path d="M 20 20 L 28 14" strokeWidth="2" strokeLinecap="round" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
        );
      case "ssr":
        return (
          <svg viewBox="0 0 40 40" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="6" y="8" width="28" height="18" rx="3" />
            <path d="M 14 32 L 26 32 M 20 26 L 20 32" strokeLinecap="round" />
            <path d="M 12 16 L 16 16 M 12 19 L 24 19" strokeOpacity="0.5" strokeLinecap="round" />
          </svg>
        );
      case "seo":
        return (
          <svg viewBox="0 0 40 40" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="18" cy="18" r="11" />
            <path d="M 26 26 L 34 34" strokeWidth="2" strokeLinecap="round" />
            <path d="M 14 18 L 22 18 M 18 14 L 18 22" strokeOpacity="0.6" strokeLinecap="round" />
          </svg>
        );
      case "a11y":
        return (
          <svg viewBox="0 0 40 40" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="20" cy="11" r="4" />
            <path d="M 9 20 L 31 20 M 20 15 L 20 33 M 14 33 L 26 33" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "responsive":
        return (
          <svg viewBox="0 0 40 40" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="8" width="18" height="24" rx="2" strokeOpacity="0.5" />
            <rect x="17" y="14" width="18" height="18" rx="2" strokeWidth="1.8" />
          </svg>
        );
      case "architecture":
        return (
          <svg viewBox="0 0 40 40" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="8" y="6" width="10" height="10" rx="2" />
            <rect x="22" y="6" width="10" height="10" rx="2" strokeOpacity="0.5" />
            <rect x="15" y="24" width="10" height="10" rx="2" />
            <path d="M 13 16 L 20 24 M 27 16 L 20 24" strokeOpacity="0.4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="engineering"
      aria-label="Engineering Principles"
      className="py-20 lg:py-28 border-b border-hairline bg-surface-subtle/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-accent font-semibold tracking-wider">
            05 / HOW I BUILD
          </span>
          <span className="h-[1px] w-12 bg-hairline" aria-hidden="true" />
          <span className="text-xs font-mono text-muted uppercase tracking-widest">
            Engineering Principles
          </span>
        </div>

        <div className="mb-12 max-w-2xl">
          <h2 className="heading-section text-ink">
            Proven standards in practice.
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2">
            The technical invariants enforced across every repository, client project, and design system.
          </p>
        </div>

        {/* 6 Grid Entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {engineeringPrinciples.map((principle) => (
            <div
              key={principle.id}
              className="p-6 sm:p-7 rounded-lg border border-hairline bg-surface flex flex-col justify-between space-y-4 hover:border-accent/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-md bg-surface-subtle border border-hairline">
                    {renderSvgIcon(principle.svgIcon)}
                  </div>
                  <span className="font-mono text-xs text-accent font-semibold">
                    {principle.number}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-ink font-medium">
                  {principle.title}
                </h3>

                <p className="text-sm text-ink leading-relaxed font-sans">
                  {principle.summary}
                </p>

                <p className="text-xs text-muted leading-relaxed font-sans pt-1">
                  {principle.technicalDetails}
                </p>
              </div>

              <div className="pt-4 border-t border-hairline">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted block mb-1">
                  Measured Production Evidence
                </span>
                <span className="font-mono text-xs text-accent font-medium leading-tight">
                  {principle.evidence}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
