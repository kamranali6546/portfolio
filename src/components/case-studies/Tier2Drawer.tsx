import React, { useEffect } from "react";
import { Project } from "../../content/projects";
import { X, ExternalLink, ArrowUpRight } from "lucide-react";

interface Tier2DrawerProps {
  project: Project;
  onClose: () => void;
}

export const Tier2Drawer: React.FC<Tier2DrawerProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-canvas/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tier2-drawer-title"
    >
      <div
        className="w-full max-w-lg bg-surface border-l border-hairline h-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-hairline">
            <span className="font-mono text-xs text-accent font-semibold tracking-wider">
              PROJECT OVERVIEW · TIER 2
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="p-1.5 rounded-md border border-hairline text-muted hover:text-ink transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted block">
              {project.category}
            </span>
            <h3 id="tier2-drawer-title" className="heading-card text-ink">
              {project.name}
            </h3>
            <p className="font-serif text-muted italic text-base">
              &ldquo;{project.tagline}&rdquo;
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs uppercase tracking-wider text-accent block">
              Engineering Scope
            </span>
            <p className="text-sm text-ink leading-relaxed font-sans">
              {project.work}
            </p>
          </div>

          {project.stack && project.stack.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-hairline">
              <span className="font-mono text-xs uppercase tracking-wider text-muted block">
                Technologies
              </span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-ink">
                {project.stack.map((item, idx) => (
                  <React.Fragment key={item}>
                    <span>{item}</span>
                    {idx < project.stack.length - 1 && (
                      <span className="text-muted/40 select-none">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-hairline">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-accent text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <span>Visit live site</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
