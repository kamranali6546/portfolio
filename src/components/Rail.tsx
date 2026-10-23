import React, { useEffect, useState, type RefObject } from 'react';

/** Desktop arrow controls for a horizontal rail. Hidden on touch, where swiping is native. */
export function RailButtons({ rail }: { rail: RefObject<HTMLDivElement | null> }) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 8);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [rail]);

  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const base =
    'absolute top-8 bottom-8 z-20 hidden w-12 min-w-10 items-center justify-center bg-gradient-to-r text-3xl text-[#f4f1ec] opacity-0 transition duration-300 group-hover/rail:opacity-100 hover:text-white [@media(hover:hover)]:flex focus:outline-none';

  return (
    <>
      {canLeft && (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => page(-1)}
          className={`${base} left-0 from-[#07070a]/90 to-transparent`}
        >
          ‹
        </button>
      )}
      {canRight && (
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => page(1)}
          className={`${base} right-0 from-transparent to-[#07070a]/90`}
        >
          ›
        </button>
      )}
    </>
  );
}
