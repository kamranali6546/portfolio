import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { EASE } from './fx';
import { ResumeSheet } from './ResumeViewer';
import { Download, X } from 'lucide-react';

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex flex-col bg-black/92 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Resume screenplay modal"
    >
      <div className="px-4 sm:px-8 lg:px-12 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-white/10">
        <div>
          <p className="truncate font-display text-2xl tracking-wide text-[#f4f1ec]">
            The Screenplay · Kamran Ali
          </p>
          <span className="text-[10px] font-mono text-[#a7a6ad] uppercase">
            Official Production Notes
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={profile.resumePdf}
            download="Kamran_Ali_CV.pdf"
            className="flex items-center gap-1.5 rounded-md bg-[#f4f1ec] px-4 py-2 text-xs font-bold text-[#07070a] hover:bg-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#f4f1ec] hover:bg-white/20 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <motion.div
        className="px-4 sm:px-8 lg:px-12 flex-1 overflow-y-auto py-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="max-w-4xl mx-auto">
          <ResumeSheet />
        </div>
      </motion.div>
    </motion.div>
  );
}
