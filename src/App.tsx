/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { CHAPTERS } from './data/portfolioData';
import { detectDeviceCapabilities, DeviceCapability } from './utils/deviceTier';
import { audioEngine } from './utils/audio';
import { TopBar } from './components/TopBar';
import { CorridorCanvas } from './components/CorridorCanvas';
import { ChapterHUD } from './components/ChapterHUD';
import { KineticOverlays } from './components/KineticOverlays';
import { StructuredReadView } from './components/StructuredReadView';

export default function App() {
  const [deviceCaps, setDeviceCaps] = useState<DeviceCapability | null>(null);
  const [mode, setMode] = useState<'3d' | 'reader'>('3d');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const lenisRef = useRef<Lenis | null>(null);
  const prevChapterRef = useRef<number>(0);

  // 1. Initial Device Capability Assessment
  useEffect(() => {
    const caps = detectDeviceCapabilities();
    setDeviceCaps(caps);

    // Read stored user preference if present
    const savedMode = localStorage.getItem('portfolio_view_mode') as '3d' | 'reader' | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      setMode(caps.recommendedMode);
    }
  }, []);

  // 2. Initialize Lenis Smooth Scroll Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
        setScrollProgress(progress);
        audioEngine.updateProgress(progress);
      }
    };

    lenis.on('scroll', onScroll);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [mode]);

  // 3. Handle Chapter Threshold Crossings & Audio Cues
  const handleChapterChange = useCallback((newIdx: number) => {
    setCurrentChapterIndex(newIdx);
    if (newIdx !== prevChapterRef.current) {
      prevChapterRef.current = newIdx;
      // Play tactile spatial portal transition chime
      audioEngine.playThresholdChime(1 + newIdx * 0.12);
    }
  }, []);

  // 4. Toggle between 3D Spatial Walkthrough & Structured Read mode
  const handleToggleMode = () => {
    const nextMode = mode === '3d' ? 'reader' : '3d';
    setMode(nextMode);
    localStorage.setItem('portfolio_view_mode', nextMode);
    // Reset scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. Toggle Spatial Ambience Audio
  const handleToggleAudio = () => {
    const newMuted = !isAudioMuted;
    setIsAudioMuted(newMuted);
    audioEngine.setMuted(newMuted);
  };

  // 6. Navigation: jump to specific chapter
  const handleNavigateChapter = (chapterIdx: number) => {
    if (mode === '3d') {
      const chapter = CHAPTERS[chapterIdx];
      if (!chapter) return;
      const targetRatio = (chapter.scrollRange[0] + chapter.scrollRange[1]) / 2;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetScrollY = targetRatio * maxScroll;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetScrollY, { duration: 1.4 });
      } else {
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    } else {
      // Reader mode: scroll to section id
      const chapter = CHAPTERS[chapterIdx];
      if (!chapter) return;
      const el = document.getElementById(chapter.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // 7. Keyboard Navigation (Arrow keys, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode !== '3d') return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        if (currentChapterIndex < CHAPTERS.length - 1) {
          handleNavigateChapter(currentChapterIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        if (currentChapterIndex > 0) {
          handleNavigateChapter(currentChapterIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, currentChapterIndex]);

  return (
    <div className="relative min-h-screen bg-[#070709] text-slate-100">
      {/* Universal Top Bar */}
      <TopBar
        currentChapterIndex={currentChapterIndex}
        activeMode={mode}
        onToggleMode={handleToggleMode}
        isMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onNavigateChapter={handleNavigateChapter}
      />

      {/* 3D MODE: Full Viewport Architectural Gallery */}
      {mode === '3d' && (
        <>
          {/* Three.js Corridor Canvas */}
          <CorridorCanvas
            scrollProgress={scrollProgress}
            currentChapterIndex={currentChapterIndex}
            onChapterChange={handleChapterChange}
          />

          {/* Kinetic Semantic Text Overlays */}
          <KineticOverlays
            currentChapterIndex={currentChapterIndex}
            scrollProgress={scrollProgress}
          />

          {/* Bottom HUD Controller */}
          <ChapterHUD
            currentChapterIndex={currentChapterIndex}
            scrollProgress={scrollProgress}
            onNavigateChapter={handleNavigateChapter}
          />

          {/* Virtual Scroll Height (680vh enables comfortable, disciplined dollying through all 8 rooms) */}
          <div
            className="w-full pointer-events-none"
            style={{ height: '680vh' }}
            aria-hidden="true"
          />
        </>
      )}

      {/* STRUCTURED READ MODE: Accessible, Fast, Mobile-Optimized Stacked Reading */}
      {mode === 'reader' && (
        <StructuredReadView
          onSwitchTo3D={() => {
            setMode('3d');
            localStorage.setItem('portfolio_view_mode', '3d');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          supportsWebGL={Boolean(deviceCaps?.supportsWebGL)}
        />
      )}
    </div>
  );
}
