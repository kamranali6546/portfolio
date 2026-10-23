import React from "react";

export const PaymentFlowDiagram: React.FC = () => {
  return (
    <div
      className="p-6 rounded-lg border border-hairline bg-surface space-y-4 my-8"
      role="region"
      aria-label="Payment flow architecture diagram"
    >
      <div className="border-b border-hairline pb-4">
        <span className="font-mono text-xs text-accent font-semibold tracking-wider block">
          SIMPLIFIED ILLUSTRATION
        </span>
        <h4 className="font-serif text-lg font-medium text-ink">
          Dual Payment Routing: International Stripe &amp; Saudi Mada
        </h4>
      </div>

      <div className="w-full h-64 sm:h-72 bg-canvas/60 rounded-md border border-hairline p-4 flex items-center justify-center">
        <svg
          viewBox="0 0 680 220"
          className="w-full h-full text-ink"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Customer Checkout Entry */}
          <g transform="translate(30, 70)">
            <rect width="130" height="70" rx="6" fill="var(--color-surface)" stroke="var(--color-hairline)" strokeWidth="1.2" />
            <text x="65" y="32" textAnchor="middle" className="fill-current font-mono text-xs font-semibold text-ink">
              Customer
            </text>
            <text x="65" y="50" textAnchor="middle" className="fill-current font-mono text-[10px] text-muted">
              Card Details Input
            </text>
          </g>

          {/* Router / BIN Detection */}
          <path d="M 165 105 L 245 105" stroke="var(--color-accent)" strokeWidth="1.5" />

          <g transform="translate(250, 60)">
            <rect width="150" height="90" rx="6" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.5" />
            <text x="75" y="32" textAnchor="middle" className="fill-current font-mono text-xs font-semibold text-accent">
              Card BIN Router
            </text>
            <text x="75" y="52" textAnchor="middle" className="fill-current font-sans text-[11px] text-muted">
              Identifies Card Origin
            </text>
            <text x="75" y="72" textAnchor="middle" className="fill-current font-mono text-[10px] text-ink">
              Local Mada vs Global
            </text>
          </g>

          {/* Diverging Paths */}
          <path d="M 405 85 C 450 85, 450 50, 485 50" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.4" />
          <path d="M 405 125 C 450 125, 450 160, 485 160" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.4" />

          {/* Branch 1: Mada Gateway */}
          <g transform="translate(490, 20)">
            <rect width="160" height="60" rx="6" fill="var(--color-surface)" stroke="var(--color-brass)" strokeWidth="1.4" />
            <text x="80" y="26" textAnchor="middle" className="fill-current font-mono text-xs font-semibold text-brass">
              Mada Network
            </text>
            <text x="80" y="44" textAnchor="middle" className="fill-current font-sans text-[10px] text-muted">
              Saudi National Card Scheme
            </text>
          </g>

          {/* Branch 2: Stripe Gateway */}
          <g transform="translate(490, 130)">
            <rect width="160" height="60" rx="6" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.4" />
            <text x="80" y="26" textAnchor="middle" className="fill-current font-mono text-xs font-semibold text-accent">
              Stripe International
            </text>
            <text x="80" y="44" textAnchor="middle" className="fill-current font-sans text-[10px] text-muted">
              Visa, Mastercard, Amex
            </text>
          </g>
        </svg>
      </div>

      <p className="text-xs font-mono text-muted leading-relaxed">
        Simplified illustration: Card BIN identification routes Saudi domestic payment transactions
        through local Mada rails while dispatching international card issuers to Stripe, providing
        frictionless conversion.
      </p>
    </div>
  );
};
