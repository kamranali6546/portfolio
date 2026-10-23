import React from "react";

export const PortalArchitectureDiagram: React.FC = () => {
  return (
    <div
      className="p-6 rounded-lg border border-hairline bg-surface space-y-4 my-8"
      role="region"
      aria-label="Multi-portal ecosystem architecture diagram"
    >
      <div className="border-b border-hairline pb-4">
        <span className="font-mono text-xs text-accent font-semibold tracking-wider block">
          SIMPLIFIED ILLUSTRATION
        </span>
        <h4 className="font-serif text-lg font-medium text-ink">
          Multi-Portal Architecture: Public Frontend vs Enterprise Portals
        </h4>
      </div>

      <div className="w-full h-72 sm:h-80 bg-canvas/60 rounded-md border border-hairline p-4 flex items-center justify-center">
        <svg
          viewBox="0 0 680 260"
          className="w-full h-full text-ink"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Public Frontend Client */}
          <g transform="translate(30, 95)">
            <rect width="160" height="70" rx="6" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.5" />
            <text x="80" y="30" textAnchor="middle" className="fill-current font-mono text-xs font-semibold text-accent">
              Public Next.js App
            </text>
            <text x="80" y="50" textAnchor="middle" className="fill-current font-mono text-[10px] text-muted">
              Booking · Search · SEO
            </text>
          </g>

          {/* Central Service / API Hub */}
          <path d="M 195 130 L 265 130" stroke="var(--color-accent)" strokeWidth="1.5" />

          <g transform="translate(270, 75)">
            <rect width="140" height="110" rx="6" fill="var(--color-surface)" stroke="var(--color-hairline)" strokeWidth="1.4" />
            <text x="70" y="35" textAnchor="middle" className="fill-current font-mono text-xs font-bold text-ink">
              Core Backend API
            </text>
            <text x="70" y="55" textAnchor="middle" className="fill-current font-mono text-[10px] text-muted">
              RBAC Auth Layer
            </text>
            <text x="70" y="75" textAnchor="middle" className="fill-current font-mono text-[10px] text-accent">
              Booking State Machine
            </text>
            <text x="70" y="95" textAnchor="middle" className="fill-current font-mono text-[10px] text-muted">
              Fleet Inventory
            </text>
          </g>

          {/* Fan out connectors to Panels */}
          <path d="M 415 110 C 450 110, 450 45, 485 45" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />
          <path d="M 415 130 L 485 130" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />
          <path d="M 415 150 C 450 150, 450 215, 485 215" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />

          {/* Panel 1: Admin Panel */}
          <g transform="translate(490, 20)">
            <rect width="160" height="50" rx="6" fill="var(--color-surface)" stroke="var(--color-hairline)" strokeWidth="1.2" />
            <text x="80" y="24" textAnchor="middle" className="fill-current font-mono text-xs font-medium text-ink">
              Admin Operations
            </text>
            <text x="80" y="38" textAnchor="middle" className="fill-current font-sans text-[10px] text-muted">
              Global Fleet &amp; Rates
            </text>
          </g>

          {/* Panel 2: Partner / Fleet Supplier Panel */}
          <g transform="translate(490, 105)">
            <rect width="160" height="50" rx="6" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.2" />
            <text x="80" y="24" textAnchor="middle" className="fill-current font-mono text-xs font-medium text-accent">
              Partner Portal
            </text>
            <text x="80" y="38" textAnchor="middle" className="fill-current font-sans text-[10px] text-muted">
              Fleet &amp; Driver Onboarding
            </text>
          </g>

          {/* Panel 3: Company / Enterprise Panel */}
          <g transform="translate(490, 190)">
            <rect width="160" height="50" rx="6" fill="var(--color-surface)" stroke="var(--color-brass)" strokeWidth="1.2" />
            <text x="80" y="24" textAnchor="middle" className="fill-current font-mono text-xs font-medium text-brass">
              Corporate Panel
            </text>
            <text x="80" y="38" textAnchor="middle" className="fill-current font-sans text-[10px] text-muted">
              B2B Accounts &amp; Billing
            </text>
          </g>
        </svg>
      </div>

      <p className="text-xs font-mono text-muted leading-relaxed">
        Simplified illustration: High-performance public booking interface decoupled from protected
        internal operations, maintaining tight tenant boundary isolation and unified state management.
      </p>
    </div>
  );
};
