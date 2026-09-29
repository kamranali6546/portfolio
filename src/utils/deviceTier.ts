export interface DeviceCapability {
  supportsWebGL: boolean;
  prefersReducedMotion: boolean;
  isMobileOrLowPower: boolean;
  recommendedMode: '3d' | 'reader';
}

export function detectDeviceCapabilities(): DeviceCapability {
  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check WebGL support
  let supportsWebGL = false;
  if (typeof window !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      supportsWebGL = Boolean(gl);
    } catch {
      supportsWebGL = false;
    }
  }

  // Check mobile device or low memory / low hardware concurrency
  const isTouch =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const isSmallScreen =
    typeof window !== 'undefined' && window.innerWidth < 768;

  const lowMemory =
    typeof navigator !== 'undefined' &&
    'deviceMemory' in navigator &&
    (navigator as unknown as { deviceMemory: number }).deviceMemory < 4;

  const lowCpu =
    typeof navigator !== 'undefined' &&
    'hardwareConcurrency' in navigator &&
    navigator.hardwareConcurrency < 4;

  const isMobileOrLowPower = (isTouch && isSmallScreen) || lowMemory || lowCpu;

  // Determine recommendation
  const recommendedMode: '3d' | 'reader' =
    !supportsWebGL || prefersReducedMotion || isMobileOrLowPower
      ? 'reader'
      : '3d';

  return {
    supportsWebGL,
    prefersReducedMotion,
    isMobileOrLowPower,
    recommendedMode,
  };
}
