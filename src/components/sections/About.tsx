import React from "react";
import { profile } from "../../content/profile";
import { Cpu, Terminal } from "lucide-react";

export const About: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="About Kamran Ali"
      className="py-20 lg:py-28 border-b border-hairline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-accent font-semibold tracking-wider">
            01 / ABOUT
          </span>
          <span className="h-[1px] w-12 bg-hairline" aria-hidden="true" />
          <span className="text-xs font-mono text-muted uppercase tracking-widest">
            Engineering Philosophy
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: First-Person Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="heading-section text-ink">
              Building interfaces that endure, scale, and perform.
            </h2>

            <div className="space-y-4 text-muted text-base leading-relaxed">
              <p>
                I have spent over six years architecting user interfaces that balance rigorous
                engineering discipline with subtle aesthetic precision. My work centers on
                large-scale web applications where maintainability, crawling efficiency, and
                render speed translate directly into business viability.
              </p>
              <p>
                Whether migrating multilingual booking engines from single-page architectures to
                server-side rendered Next.js or structuring multi-portal ecosystems for car rentals
                and educational institutes, I focus on building foundation-level resilience.
              </p>
              <p>
                Education: {profile.education.degree} from {profile.education.institution},{" "}
                {profile.education.location} ({profile.education.years}).
              </p>
            </div>

            {/* AI-Assisted Engineering Stance Block */}
            <div className="pt-4 p-5 rounded-lg border border-hairline bg-surface-subtle/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-ink">
                <Cpu className="w-4 h-4 text-accent" aria-hidden="true" />
                <span>AI-Assisted Engineering Stance</span>
              </div>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                I leverage modern AI accelerators including <strong className="text-ink font-medium">Claude, Cursor, Antigravity, Copilot, v0, Gemini, and ChatGPT</strong> for rapid prototyping, syntax scaffolding, and edge-case testing. However, my operating rule remains uncompromising: <em className="text-ink not-italic font-medium">faster delivery, with every line explained, benchmarked, and owned</em>.
              </p>
            </div>
          </div>

          {/* Right Column: Three Core Principles */}
          <div className="lg:col-span-7 space-y-8">
            {/* Principle 1 */}
            <div className="space-y-3">
              <div className="border-b border-hairline pb-2 flex items-baseline justify-between">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink">
                  Architecture first.
                </h3>
                <span className="font-mono text-xs text-accent">01</span>
              </div>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Software must remain understandable as teams expand and complexity compounds. I
                draw strict component boundaries, decouple presentation from state machines, and
                enforce predictable one-way data flows. Clean directory conventions and typed API
                contracts prevent technical debt before it starts.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="space-y-3">
              <div className="border-b border-hairline pb-2 flex items-baseline justify-between">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink">
                  Performance is a feature.
                </h3>
                <span className="font-mono text-xs text-accent">02</span>
              </div>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Rather than treating optimization as a pre-launch patch, I establish strict performance
                budgets from day one. Measuring Core Web Vitals (LCP, INP, CLS) and addressing
                bottlenecks at the data fetching and rendering layers ensures sites stay fast on
                constrained mobile connections.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="space-y-3">
              <div className="border-b border-hairline pb-2 flex items-baseline justify-between">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink">
                  Accessible and responsive by default.
                </h3>
                <span className="font-mono text-xs text-accent">03</span>
              </div>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Every user is entitled to a functional experience. I rely on semantic HTML5 landmarks,
                rigorous keyboard focus loops, color contrast that respects WCAG 2.2 AA, and fluid
                mathematical clamp systems that resize seamlessly across viewports from 320px to ultra-wide.
              </p>
            </div>

            {/* Subtle Terminal Quote */}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-muted/70">
              <Terminal className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>&ldquo;Simplicity is prerequisite for reliability.&rdquo;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
