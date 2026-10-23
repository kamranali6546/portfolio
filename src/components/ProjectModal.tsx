import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';
import { projects } from '../data/portfolio';
import { EASE } from './fx';
import { CsrVsSsrDiagram } from './case-studies/diagrams/CsrVsSsrDiagram';
import { PaymentFlowDiagram } from './case-studies/diagrams/PaymentFlowDiagram';
import { PortalArchitectureDiagram } from './case-studies/diagrams/PortalArchitectureDiagram';
import { ExternalLink, X, ArrowLeft, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export default function ProjectModal({
  project,
  onClose,
  onSwitch,
}: {
  project: Project;
  onClose: () => void;
  onSwitch: (p: Project) => void;
}) {
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onSwitch(prevProject);
      if (e.key === 'ArrowRight') onSwitch(nextProject);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onSwitch, prevProject, nextProject]);

  const accent = project.palette.accent;
  const isDarkAccent = ['#D4AF37', '#FFB800', '#00C896', '#C9A56A', '#EAB308', '#84CC16'].includes(accent);

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-black/85 backdrop-blur-xl p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0b0710] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] cursor-default select-text"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-[#f4f1ec] backdrop-blur-md border border-white/20 hover:bg-black hover:scale-105 transition-all focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Billboard Image Header */}
        <div
          className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-t-2xl"
          style={{
            background: `linear-gradient(135deg, ${project.palette.from} 0%, ${project.palette.via} 50%, ${project.palette.to} 100%)`,
          }}
        >
          {/* Hero Project Screenshot */}
          {project.posterImage ? (
            <img
              src={project.posterImage}
              alt={`${project.title} Showcase`}
              className="h-full w-full object-cover object-top filter contrast-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-black/40" />
          )}

          {/* Smooth Bottom Gradient Vignette */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0b0710] via-[#0b0710]/60 to-transparent"
          />

          {/* Header Title & Details Overlay */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 right-6 z-10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad]">
              <span className="font-bold" style={{ color: accent }}>KA ORIGINAL</span>
              <span aria-hidden="true">·</span>
              <span className="text-white/80 font-bold">{project.year}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold" style={{ color: accent }}>{project.genre}</span>
            </div>

            <h2
              id="modal-project-title"
              className="font-display text-3xl sm:text-5xl text-[#f4f1ec] leading-[0.95] drop-shadow-md"
            >
              {project.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: accent,
                    color: isDarkAccent ? '#07070a' : '#ffffff',
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-bold text-xs shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Visit Production Platform</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-9">
          {/* Synopsis */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#8FD9BE]">
              Production Synopsis
            </h3>
            <p className="text-base sm:text-lg text-[#f4f1ec]/90 leading-relaxed font-serif italic">
              &ldquo;{project.logline}&rdquo;
            </p>
          </div>

          {/* Key Metrics Strip */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
              {project.metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <span className="font-mono text-2xl font-bold text-[#8FD9BE] block">
                    {m.value}
                  </span>
                  <span className="text-[11px] font-mono text-[#a7a6ad] uppercase mt-0.5 block">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* What Was Built */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest" style={{ color: accent }}>
              What Was Engineered
            </h3>
            <div className="space-y-2.5">
              {project.build.map((b, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#f4f1ec]/85 leading-relaxed font-sans">
                  <span className="mt-1 select-none font-mono" style={{ color: accent }}>▸</span>
                  <p>{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#8FD9BE]">
                Key Capabilities
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {project.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-[#a7a6ad]">
                    <CheckCircle2 className="w-4 h-4 text-[#8FD9BE] shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Simplified Architecture Diagrams */}
          {project.diagramType === 'csr-vs-ssr' && <CsrVsSsrDiagram />}
          {project.diagramType === 'payment-flow' && <PaymentFlowDiagram />}
          {project.diagramType === 'portal-architecture' && <PortalArchitectureDiagram />}

          {/* Technical Stack Tags */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#6d6c75]">
              Technologies &amp; Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium text-[#f4f1ec] bg-white/[0.06] border border-white/10"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Next / Prev Project Navigation */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onSwitch(prevProject)}
              className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad] hover:text-[#f4f1ec] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous: {prevProject.title}</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitch(nextProject)}
              className="flex items-center gap-2 text-xs font-mono text-[#a7a6ad] hover:text-[#f4f1ec] transition-colors"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
