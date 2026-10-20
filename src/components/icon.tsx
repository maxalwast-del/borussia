/**
 * Linien-Symbole im Stil der SF Symbols: gleiche Strichstärke, runde Enden,
 * auf ein 24er-Raster gezeichnet. Farbe kommt immer über `currentColor`.
 */
const ICONS = {
  'chevron-right': <path d="m9.5 5 7 7-7 7" />,
  'chevron-left': <path d="m14.5 5-7 7 7 7" />,
  'chevron-down': <path d="m5 9.5 7 7 7-7" />,
  phone: (
    <path d="M6 3.5h2.6l1.6 4.1-2.1 1.5a12.3 12.3 0 0 0 6.8 6.8l1.5-2.1 4.1 1.6V18a2.5 2.5 0 0 1-2.6 2.5A16.6 16.6 0 0 1 3.5 6.1 2.5 2.5 0 0 1 6 3.5Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </>
  ),
  message: (
    <path d="M5 4.5h14A2.5 2.5 0 0 1 21.5 7v8.5A2.5 2.5 0 0 1 19 18h-8.5L6 21.5V18H5a2.5 2.5 0 0 1-2.5-2.5V7A2.5 2.5 0 0 1 5 4.5Z" />
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.4 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  'calendar-check': (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4M9 15.2l2 2 4-4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.4 2.8 2.8L16.2 9.8" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.4v.1" />
    </>
  ),
  euro: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.2 8.6a4.3 4.3 0 1 0 0 6.8M7.2 10.8h5.8M7.2 13.2h5.8" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="3.1" />
      <path d="M3 19.5a6 6 0 0 1 12 0" />
      <circle cx="16.8" cy="9.2" r="2.5" />
      <path d="M16 14a5 5 0 0 1 5 5" />
    </>
  ),
  home: <path d="M4 10.4 12 4l8 6.4V20h-5.2v-5.6H9.2V20H4Z" />,
  wrench: (
    <path d="M14.6 3.6a5 5 0 0 0-4.3 6.9L3.9 16.9a2.1 2.1 0 0 0 3 3l6.4-6.4a5 5 0 0 0 6.9-4.3l-3.1 3.1-2.9-.6-.6-2.9 3.1-3.1a5 5 0 0 0-2.1-.1Z" />
  ),
  graduation: (
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5Z" />
      <path d="M6.5 11.2v4.4c1.6 1.3 3.5 1.9 5.5 1.9s3.9-.6 5.5-1.9v-4.4M21.5 9v5" />
    </>
  ),
  ruler: (
    <>
      <path d="m3.5 15.5 12-12 5 5-12 12Z" />
      <path d="m7.5 11.5 2 2M10 9l1.5 1.5M12.5 6.5l2 2" />
    </>
  ),
  menu: <path d="M4 9h16M4 15h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className = 'h-5 w-5',
  strokeWidth = 1.7,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}
