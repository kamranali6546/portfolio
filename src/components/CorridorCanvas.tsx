import React, { useEffect, useRef } from 'react';
import { CorridorScene } from './CorridorScene';
import { CHAPTERS } from '../data/portfolioData';

interface CorridorCanvasProps {
  scrollProgress: number;
  currentChapterIndex: number;
  onChapterChange?: (chapterIndex: number) => void;
  onProgressUpdate?: (progress: number) => void;
}

export const CorridorCanvas: React.FC<CorridorCanvasProps> = ({
  scrollProgress,
  currentChapterIndex,
  onChapterChange,
  onProgressUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<CorridorScene | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const scene = new CorridorScene(containerRef.current, canvasRef.current, {
      onChapterChange,
      onProgressUpdate,
    });
    sceneRef.current = scene;

    const canvas = canvasRef.current;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost, pausing renderer.');
    };
    const handleContextRestored = () => {
      console.info('WebGL context restored, re-initializing.');
      if (containerRef.current && canvasRef.current) {
        sceneRef.current?.destroy();
        sceneRef.current = new CorridorScene(containerRef.current, canvasRef.current, {
          onChapterChange,
          onProgressUpdate,
        });
      }
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      scene.destroy();
      sceneRef.current = null;
    };
  }, [onChapterChange, onProgressUpdate]);

  // Push scroll updates directly to scene
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setScrollProgress(scrollProgress);
    }
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#060608]"
      aria-hidden="true"
    >
      {/* Dynamic Section-Specific Background Image Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {CHAPTERS.map((ch, idx) => {
          const isActive = currentChapterIndex === idx;
          return (
            <div
              key={ch.id}
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out scale-105"
              style={{
                backgroundImage: `url(${ch.backgroundImage})`,
                opacity: isActive ? 0.32 : 0,
                filter: isActive ? 'blur(1px) brightness(0.75)' : 'blur(8px) brightness(0.3)',
              }}
            />
          );
        })}
        {/* Cinematic Vignette & Atmospheric Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/60 to-[#060608]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#060608_90%)]" />
      </div>

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full block"
      />
    </div>
  );
};
