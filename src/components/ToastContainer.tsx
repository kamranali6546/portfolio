import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePortfolio();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none select-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className="pointer-events-auto p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 shadow-xl flex items-center justify-between gap-3 text-xs text-neutral-200 animate-slide-up"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {t.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
            {t.type === 'info' && <Info className="w-4 h-4 text-indigo-400 shrink-0" />}
            <span className="truncate">{t.message}</span>
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="p-1 rounded text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
