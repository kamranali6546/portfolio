import React, { useEffect, useState } from "react";
import { useCursor } from "../../context/CursorContext";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const CustomCursor: React.FC = () => {
  const { cursorText, cursorVariant } = useCursor();
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer: fine devices
    const mq = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mq.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mq.addEventListener("change", handlePointerChange);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      mq.removeEventListener("change", handlePointerChange);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [visible]);

  if (!isFinePointer || reducedMotion || !visible) {
    return null;
  }

  const isExpanded = cursorVariant === "project" || cursorVariant === "drag";
  const isLink = cursorVariant === "link";

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 flex items-center justify-center ${
          isExpanded
            ? "w-16 h-16 bg-accent text-white border-transparent shadow-lg text-[11px] font-mono tracking-wider font-medium uppercase"
            : isLink
            ? "w-10 h-10 border-accent bg-accent/15 scale-110"
            : "w-5 h-5 border-ink/40 bg-ink/5"
        }`}
      >
        {isExpanded && cursorText && <span>{cursorText}</span>}
      </div>
    </div>
  );
};
