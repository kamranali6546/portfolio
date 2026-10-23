import React from "react";
import { profile } from "../../content/profile";
import { ArrowUp, Heart, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-20 pb-12 bg-canvas border-t border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Large Serif Sign-Off */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-hairline">
          <div>
            <span className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink font-normal tracking-tight block">
              Kamran Ali
            </span>
            <span className="font-sans text-sm sm:text-base text-muted mt-2 block">
              Senior Frontend Developer · Architecture, Performance &amp; AI Workflows
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-hairline bg-surface text-xs font-mono text-muted hover:text-ink hover:border-accent transition-colors self-start sm:self-auto focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Colophon Grid */}
        <div id="colophon" className="p-6 sm:p-8 rounded-lg border border-hairline bg-surface-subtle/40 space-y-6">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
              Colophon &amp; Technical Invariants
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>WCAG 2.2 AA Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="space-y-1">
              <span className="font-mono text-muted uppercase tracking-wider block">
                Framework &amp; Core
              </span>
              <p className="font-sans text-ink font-medium">
                React 19 · TypeScript Strict · Vite · App Router Conventions
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-muted uppercase tracking-wider block">
                Design &amp; Styling
              </span>
              <p className="font-sans text-ink font-medium">
                Tailwind CSS v4 · Custom CSS Variables · Hairline Borders · Film Grain
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-muted uppercase tracking-wider block">
                Typefaces
              </span>
              <p className="font-sans text-ink font-medium">
                Fraunces (Display Serif) · Plus Jakarta Sans (UI) · JetBrains Mono
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-muted uppercase tracking-wider block">
                Quality Targets
              </span>
              <p className="font-sans text-ink font-medium">
                LCP &lt; 1.2s · CLS 0.00 · INP &lt; 50ms · 98+ Lighthouse Audit
              </p>
            </div>
          </div>

          <p className="text-xs font-mono text-muted leading-relaxed pt-2 border-t border-hairline/60">
            Hand-crafted with quiet editorial discipline. Motion honors <code>prefers-reduced-motion</code>. Built for Kamran Ali ({profile.email}).
          </p>
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted pt-4">
          <div className="flex items-center gap-3">
            <span>© {currentYear} Kamran Ali</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#hero"
              className="hover:text-ink transition-colors"
            >
              Home
            </a>
            <a
              href="#work"
              className="hover:text-ink transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-ink transition-colors"
            >
              Inquiries
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
