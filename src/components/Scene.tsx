import React, { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTrackProgress } from '../hooks/sectionProgress';

/**
 * A section of the series. Fades up out of black with a smooth blur-to-focus,
 * and reports viewing progress for the Continue Exploring row.
 */
export default function Scene({
  id,
  children,
  className = '',
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useTrackProgress(id, ref);
  const isOriginals = id === 'originals';
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.6'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  if (isOriginals) {
    return (
      <section
        id={id}
        ref={ref}
        className={`relative scroll-mt-20 !py-0 sm:!py-0 ${className}`}
      >
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity, scale }}
      className={`relative scroll-mt-20 py-16 sm:py-24 cv-section ${className}`}
    >
      {children}
    </motion.section>
  );
}
