import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CHAPTERS } from '../data/portfolioData';

interface ChapterHUDProps {
  currentChapterIndex: number;
  scrollProgress: number;
  onNavigateChapter: (chapterIndex: number) => void;
}

export const ChapterHUD: React.FC<ChapterHUDProps> = ({
  currentChapterIndex,
  scrollProgress,
  onNavigateChapter,
}) => {
  const chapter = CHAPTERS[currentChapterIndex] || CHAPTERS[0];

  const goNext = () => {
    if (currentChapterIndex < CHAPTERS.length - 1) {
      onNavigateChapter(currentChapterIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentChapterIndex > 0) {
      onNavigateChapter(currentChapterIndex - 1);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 right-6 z-40 pointer-events-none flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      {/* Chapter Title & Indicator */}
      <div className="pointer-events-auto rounded-xl border border-white/10 bg-[#08080a]/85 p-4 backdrop-blur-md shadow-2xl transition-all duration-300 max-w-sm">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-400">
          <span style={{ color: chapter.accentColor }}>{chapter.number}</span>
          <span aria-hidden="true">/</span>
          <span>08 Chapters</span>
          <span aria-hidden="true">·</span>
          <span>{chapter.subtitle}</span>
        </div>
        <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-white">
          {chapter.title}
        </h2>
      </div>

      {/* Progress Track & Quick Step Controls */}
      <div className="pointer-events-auto flex items-center gap-4 rounded-xl border border-white/10 bg-[#08080a]/85 px-4 py-3 backdrop-blur-md shadow-2xl">
        {/* Navigation Step Arrows */}
        <div className="flex items-center gap-1 border-r border-white/10 pr-3">
          <button
            onClick={goPrev}
            disabled={currentChapterIndex === 0}
            className="flex h-7 w-7 items-center justify-center rounded text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
            title="Previous chapter"
            aria-label="Previous chapter"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            onClick={goNext}
            disabled={currentChapterIndex === CHAPTERS.length - 1}
            className="flex h-7 w-7 items-center justify-center rounded text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
            title="Next chapter"
            aria-label="Next chapter"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* 8-Segment Interactive Chapter Timeline */}
        <div className="flex items-center gap-1.5">
          {CHAPTERS.map((ch, idx) => {
            const isCurrent = currentChapterIndex === idx;
            const isPassed = currentChapterIndex > idx;

            return (
              <button
                key={ch.id}
                onClick={() => onNavigateChapter(idx)}
                className="group relative flex flex-col items-center py-2"
                title={`${ch.number} · ${ch.title}`}
                aria-label={`Jump to chapter ${ch.number}: ${ch.title}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'w-7'
                      : isPassed
                      ? 'w-3 bg-white/40'
                      : 'w-3 bg-white/15 hover:bg-white/30'
                  }`}
                  style={{
                    backgroundColor: isCurrent ? ch.accentColor : undefined,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Numeric Progress Percentage */}
        <div className="border-l border-white/10 pl-3 font-mono text-xs tabular-nums text-slate-400">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>
    </div>
  );
};
