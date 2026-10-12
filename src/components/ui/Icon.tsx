// Line icons drawn for this site (24px grid, current colour).
const paths = {
  ai: 'M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM9.5 9.5h5v5h-5z',
  vision: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  multimodal: 'M4 6h7v5H4zM13 13h7v5h-7zM4 15h5M4 18h3M15 6h5M15 9h3M11 8.5h2a2 2 0 0 1 2 2V13M13 15.5h-2a2 2 0 0 1-2-2V11',
  software: 'M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14',
  consulting: 'M4 19V9M10 19V5M16 19v-7M22 19H2M18.5 8.5l2-2M20.5 6.5h-3M20.5 6.5v3',
  research: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 14h9',
  capture: 'M4 8h3l1.5-2h7L17 8h3v11H4zM12 10.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z',
  deploy: 'M4 7h16v4H4zM4 13h16v4H4zM7 9h.01M7 15h.01M11 9h5M11 15h5',
  city: 'M3 21h18M5 21V10l5-3v14M10 21V4l6 3v14M16 21v-9l3 2v7M7.5 12h.01M7.5 15h.01M12.5 9h.01M12.5 12h.01M12.5 15h.01',
  building: 'M4 21h16M6 21V7l6-4 6 4v14M9 10h2M13 10h2M9 14h2M13 14h2M10.5 21v-3h3v3',
  health: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10zM9 11h2V9h2v2h2v2h-2v2h-2v-2H9z',
  factory: 'M3 21h18M4 21V11l5 3v-3l5 3v-3l5 3v7M16 8V3h3v8',
  education: 'M2 9l10-5 10 5-10 5L2 9zM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6',
  heritage: 'M4 21h16M5 21V11M19 21V11M3 11h18M12 3c3 2 5 4 5 8H7c0-4 2-6 5-8zM9 21v-5h6v5',
  retail: 'M4 7h16l-1.5 9h-13zM9 7V5a3 3 0 0 1 6 0v2M8 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM16 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  shield: 'M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3zM9 12l2 2 4-4',
  linkedin: 'M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7',
  chat: 'M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-7l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 9.5h8M8 12.5h5',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  phone: 'M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9M12 3C9.5 5.6 8.2 8.6 8.2 12s1.3 6.4 3.8 9',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  up: 'M12 19V5M6 11l6-6 6 6',
} satisfies Record<string, string>;

export type IconName = keyof typeof paths;

export function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
