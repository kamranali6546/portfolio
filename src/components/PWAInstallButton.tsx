import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed in standalone mode, hide
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:border-[#ff3d5a]/60 hover:bg-[#ff3d5a]/20 shadow-sm ${className}`}
        title="Install app to your home screen"
      >
        <Download className="h-3.5 w-3.5 text-[#8FD9BE]" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:border-[#ff3d5a]/60 hover:bg-[#ff3d5a]/20 shadow-sm ${className}`}
        >
          <Download className="h-3.5 w-3.5 text-[#8FD9BE]" />
          <span>Install</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-[#14141c] p-6 text-center text-[#f4f1ec] shadow-2xl">
              <h3 className="text-lg font-bold">Install to Home Screen</h3>
              <p className="mt-3 text-sm text-[#a7a6ad] leading-relaxed">
                1. Tap the <strong className="text-white">Share</strong> icon in the Safari toolbar.<br />
                2. Scroll down and tap <strong className="text-white">Add to Home Screen</strong>.
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-white/10 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export default PWAInstallButton;
