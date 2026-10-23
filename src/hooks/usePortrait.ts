export const DEFAULT_BANNER_PORTRAIT = '/assets/banner-portrait.webp';
export const DEFAULT_ABOUT_PORTRAIT = '/assets/about-portrait.webp';

export function useAboutPortrait() {
  return { src: DEFAULT_ABOUT_PORTRAIT };
}

export function usePortrait() {
  return {
    src: DEFAULT_BANNER_PORTRAIT,
    isCustom: false,
  };
}
