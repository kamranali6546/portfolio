import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 100 && containerRef.current) {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(textRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut"
      })
      .to(containerRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.8,
        ease: "power4.inOut"
      });
    }
  }, [count, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white text-black h-screen w-screen overflow-hidden"
    >
      <div ref={textRef} className="text-6xl md:text-9xl font-display font-bold tracking-tighter flex items-end">
        <span>{count}</span>
        <span className="text-2xl md:text-4xl mb-2 md:mb-4">%</span>
      </div>
    </div>
  );
};