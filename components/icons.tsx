const PATHS = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  down: 'M12 5v14M6 13l6 6 6-6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  play: 'M8 5.5v13l10.5-6.5z',
  pause: 'M8.5 5.5v13M15.5 5.5v13',
  previous: 'M19 12H5M11 6l-6 6 6 6',
  restart: 'M4.5 12a7.5 7.5 0 1 0 2.4-5.5M4.5 4.5v4h4',
};

export default function Icon({ name, className }: { name: keyof typeof PATHS; className?: string }) {
  return (
    <svg className={className ? `icon ${className}` : 'icon'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 21 8l-9 5-9-5z" fill="oklch(0.62 0.19 257)" stroke="oklch(0.62 0.19 257)" strokeWidth="1.2" />
      <path d="M3 12.5l9 5 9-5" stroke="oklch(0.68 0.16 157)" />
      <path d="M3 17l9 5 9-5" stroke="oklch(0.77 0.15 72)" />
    </svg>
  );
}
