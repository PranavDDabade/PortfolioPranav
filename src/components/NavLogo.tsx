import { Link } from "wouter";

export function NavLogo() {
  return (
    <Link href="/" className="group flex items-center gap-3.5 select-none">
      {/* Badge mark */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-all duration-500 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="badge-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <linearGradient id="badge-shine" x1="0" y1="0" x2="40" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="badge-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#7c3aed" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Rounded square */}
        <rect width="40" height="40" rx="11" fill="url(#badge-bg)" filter="url(#badge-shadow)" />
        {/* Shine overlay */}
        <rect width="40" height="40" rx="11" fill="url(#badge-shine)" />
        {/* Subtle border */}
        <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="10.4" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />

        {/* Bold "P" */}
        <text
          x="10"
          y="29"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="800"
          fontSize="26"
          fill="white"
          letterSpacing="-1"
        >
          P
        </text>

        {/* Small superscript dot accent */}
        <circle cx="32" cy="10" r="3.5" fill="white" fillOpacity="0.35" />
        <circle cx="32" cy="10" r="2" fill="white" fillOpacity="0.8" />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-[1.15]">
        <span className="font-display font-bold text-[17px] tracking-[-0.03em] text-foreground group-hover:text-primary transition-colors duration-300">
          Pranav Dabade
        </span>
        <span className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground font-medium group-hover:text-primary/60 transition-colors duration-300">
          MERN Stack Dev
        </span>
      </div>
    </Link>
  );
}
