
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundBehavior?: 'none' | 'end-vertical' | 'both-vertical';
}

export const HorizontalSection: React.FC<HorizontalSectionProps> = ({ 
  children, 
  className = "",
  backgroundBehavior = 'none' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const wrapper = wrapperRef.current;
      
      if (!container || !wrapper) return;

      const getScrollAmount = () => {
        let itemsWidth = wrapper.scrollWidth;
        // Subtract window width to get travel distance, plus a small buffer to ensure end visibility
        return -(itemsWidth - window.innerWidth + 20); 
      };

      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
      });

      // Horizontal Scroll Trigger
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`, 
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

    }, containerRef);

    // Refresh ScrollTrigger to ensure accurate dimensions after render
    const timer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    return () => {
        ctx.revert();
        clearTimeout(timer);
    };
  }, [backgroundBehavior]);

  return (
    <div ref={containerRef} className={`relative h-screen overflow-hidden bg-transparent ${className}`}>
      {/* Background is now Global, so this container is transparent */}
      <div ref={wrapperRef} className="flex h-full w-max relative z-10"> 
        {children}
      </div>
    </div>
  );
};
