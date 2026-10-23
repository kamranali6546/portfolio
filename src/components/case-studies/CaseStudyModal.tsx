import React, { useEffect } from "react";
import { Project, projects } from "../../content/projects";
import { CsrVsSsrDiagram } from "./diagrams/CsrVsSsrDiagram";
import { PaymentFlowDiagram } from "./diagrams/PaymentFlowDiagram";
import { PortalArchitectureDiagram } from "./diagrams/PortalArchitectureDiagram";
import { X, ArrowUpRight, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

interface CaseStudyModalProps {
  project: Project;
  onClose: () => void;
  onSelectProject: (slug: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  const tier1Projects = projects.filter((p) => p.tier === 1 && p.published);
  const currentIndex = tier1Projects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIndex > 0 ? tier1Projects[currentIndex - 1] : tier1Projects[tier1Projects.length - 1];
  const nextProject =
    currentIndex < tier1Projects.length - 1 ? tier1Projects[currentIndex + 1] : tier1Projects[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && prevProject) onSelectProject(prevProject.slug);
      if (e.key === "ArrowRight" && nextProject) onSelectProject(nextProject.slug);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, prevProject, nextProject, onSelectProject]);

  const { caseStudy } = project;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-canvas/95 backdrop-blur-xl animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      {/* Top sticky navigation bar */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-canvas/80 border-b border-hairline">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-ink transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to gallery (Esc)</span>
          </button>

          <div className="flex items-center gap-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <span>Visit live site</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="p-1.5 rounded-md border border-hairline text-muted hover:text-ink hover:border-accent transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Case Study Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16 space-y-16">
        {/* Section 1: Hero */}
        <header className="space-y-6 border-b border-hairline pb-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent font-semibold tracking-wider">
              CASE STUDY · TIER 1
            </span>
            <span className="h-[1px] w-12 bg-hairline" aria-hidden="true" />
            <span className="text-xs font-mono text-muted uppercase tracking-widest">
              {project.category}
            </span>
          </div>

          <h1 id="case-study-title" className="heading-section text-ink">
            {project.name}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-muted italic">
            &ldquo;{project.tagline}&rdquo;
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted">
              <span className="font-semibold text-ink">Role: Senior Frontend Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Next.js App / TypeScript</span>
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-white font-medium text-xs hover:opacity-90 transition-opacity"
            >
              <span>Visit live site</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </header>

        {/* Section 2: Overview */}
        {caseStudy && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-muted tracking-wider uppercase">
              <span>01 / System Overview</span>
            </div>
            <p className="text-base sm:text-lg text-ink font-sans leading-relaxed">
              {caseStudy.overview}
            </p>
          </section>
        )}

        {/* Section 3: What I built (Technical paragraphs in professional voice) */}
        {caseStudy && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted tracking-wider uppercase">
              <span>02 / What Was Engineered</span>
            </div>
            <div className="space-y-4">
              {caseStudy.whatIBuilt.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base text-muted font-sans leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Technical Diagram (if applicable) */}
        {caseStudy?.diagramType === "csr-vs-ssr" && <CsrVsSsrDiagram />}
        {caseStudy?.diagramType === "payment-flow" && <PaymentFlowDiagram />}
        {caseStudy?.diagramType === "portal-architecture" && <PortalArchitectureDiagram />}

        {/* Section 4: Engineering Decisions (Callout blocks) */}
        {caseStudy?.engineeringDecisions && caseStudy.engineeringDecisions.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted tracking-wider uppercase">
              <span>03 / Engineering Decisions</span>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {caseStudy.engineeringDecisions.map((decision, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg border border-hairline bg-surface space-y-2.5"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-lg font-medium text-ink">
                      {decision.title}
                    </h3>
                    <span className="font-mono text-xs text-accent">Decision 0{idx + 1}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed font-sans">
                    {decision.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Stack & Tooling (Unboxed text) */}
        <section className="space-y-4 pt-4 border-t border-hairline">
          <div className="flex items-center gap-2 text-xs font-mono text-muted tracking-wider uppercase">
            <span>04 / Stack &amp; Tooling</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink font-mono font-medium">
            {project.stack.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span>{tech}</span>
                {idx < project.stack.length - 1 && (
                  <span className="text-muted/40 select-none" aria-hidden="true">
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Section 6: Next and Previous Navigation */}
        <footer className="pt-10 border-t border-hairline flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelectProject(prevProject.slug)}
            className="p-4 rounded-lg border border-hairline hover:border-accent text-left group transition-colors flex-1"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted group-hover:text-accent mb-1">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Previous Project</span>
            </div>
            <div className="font-serif text-lg text-ink font-medium">
              {prevProject.name}
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSelectProject(nextProject.slug)}
            className="p-4 rounded-lg border border-hairline hover:border-accent text-right group transition-colors flex-1"
          >
            <div className="flex items-center justify-end gap-1.5 text-xs font-mono text-muted group-hover:text-accent mb-1">
              <span>Next Project</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <div className="font-serif text-lg text-ink font-medium">
              {nextProject.name}
            </div>
          </button>
        </footer>
      </article>
    </div>
  );
};
