import React, { useRef, useState } from "react";
import { Project } from "../../content/projects";
import { useCursor } from "../../context/CursorContext";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ArrowUpRight, BookOpen, Layers } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenCaseStudy }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { setCursorVariant, setCursorText } = useCursor();
  const reducedMotion = useReducedMotion();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const isTier1 = project.tier === 1;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Maximum 4 degrees tilt
    const rotateX = -((y - centerY) / centerY) * 3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    setRotate({ x: rotateX, y: rotateY });
    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
    setCursorVariant("default");
    setCursorText(null);
  };

  const handleMouseEnter = () => {
    setCursorVariant("project");
    setCursorText(isTier1 ? "Study" : "View");
  };

  // Up to 3 stack tags
  const displayStack = (project.stack && project.stack.length > 0)
    ? project.stack.slice(0, 3)
    : ["TypeScript", "Responsive", "Web"];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: reducedMotion
          ? "none"
          : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-xl border border-hairline bg-surface hover:border-accent/40 shadow-xs transition-colors h-[480px] w-[340px] sm:w-[380px] shrink-0 select-none overflow-hidden"
    >
      {/* Soft spotlight following pointer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, var(--color-accent), transparent 60%)`,
          opacity: spotlight.opacity,
        }}
        aria-hidden="true"
      />

      <div className="space-y-4">
        {/* Device-Framed Screenshot / Preview Frame */}
        <div className="relative w-full h-44 rounded-lg border border-hairline bg-canvas/80 overflow-hidden flex flex-col justify-between p-3.5 shadow-inner group-hover:border-accent/30 transition-colors">
          {/* Device header bar */}
          <div className="flex items-center justify-between border-b border-hairline/60 pb-2">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-ink/20" />
              <span className="w-2 h-2 rounded-full bg-ink/20" />
              <span className="w-2 h-2 rounded-full bg-ink/20" />
            </div>
            <span className="font-mono text-[10px] text-muted truncate max-w-[180px]">
              {project.url.replace(/^https?:\/\//, "")}
            </span>
            <div className="w-2" />
          </div>

          {/* Device Mockup Body */}
          <div className="flex-1 flex flex-col items-center justify-center text-center p-3">
            <span className="font-serif text-lg font-medium text-ink group-hover:text-accent transition-colors">
              {project.name}
            </span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase mt-0.5">
              {isTier1 ? "Tier 1 Case Study" : "Tier 2 Live Platform"}
            </span>
          </div>

          {/* Device status footer */}
          <div className="flex items-center justify-between pt-2 border-t border-hairline/40 text-[10px] font-mono text-muted">
            <span>Production Build</span>
            <span>SSR / Edge Ready</span>
          </div>
        </div>

        {/* Category & Project Title */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {project.category}
            </span>
            {isTier1 && (
              <span className="font-mono text-[10px] text-accent font-semibold uppercase tracking-wider">
                Case Study
              </span>
            )}
          </div>
          <h3 className="font-serif text-2xl font-normal text-ink group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Card Footer: 3 unboxed tech tags & Action link */}
      <div className="pt-4 border-t border-hairline space-y-3">
        {/* Unboxed tech tags with separators */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted">
          {displayStack.map((tech, i) => (
            <React.Fragment key={tech}>
              <span>{tech}</span>
              {i < displayStack.length - 1 && <span aria-hidden="true">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-1">
          {isTier1 ? (
            <button
              type="button"
              onClick={() => onOpenCaseStudy(project)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline font-semibold focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Read case study</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenCaseStudy(project)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-ink font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              <span>View details</span>
            </button>
          )}

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Visit live website for ${project.name}`}
            className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface-subtle transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
