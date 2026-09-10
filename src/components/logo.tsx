import { company } from '@/config/site';

/**
 * Wortmarke als Platzhalter.
 *
 * [PLATZHALTER] Sobald die Logodatei vorliegt (bevorzugt SVG, sonst PNG mit
 * transparentem Hintergrund), diese Komponente durch das echte Logo ersetzen.
 * Die Typografie hier ist dem Schild nachempfunden, ersetzt es aber nicht:
 * Dachsilhouette und Schwung fehlen bewusst, weil sie sich nicht
 * zuverlässig nachzeichnen lassen.
 */

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {/* Kleines Satteldach links, großes rechts, darunter der Schwung. */}
      <path d="M2 20 11 9.5 20 20v9H2v-9Z" fill="#2E9BE8" />
      <path d="M13 20 25 5.5 37 20v9H13v-9Z" fill="#122C5E" />
      <rect x="22.5" y="15" width="4.6" height="7" fill="#F4F7FA" />
      <path
        d="M1.5 32.5c7 3.4 13.2 4.6 18.5 3.6 5.3-1 11-3.6 18.5-8"
        fill="none"
        stroke="#2E9BE8"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white ring-1 ring-navy/10">
        <LogoMark className="h-8 w-8" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-wordmark text-[19px] uppercase leading-none tracking-[0.01em] text-navy">
          Borussia
        </span>
        {!compact && (
          <span className="mt-[3px] text-[9.5px] font-semibold uppercase leading-none tracking-[0.155em] text-brand">
            Baudienstleistungen
          </span>
        )}
      </span>
    </span>
  );
}

/** Die drei Begriffe des Schilds, mit senkrechten Strichen getrennt. */
export function SloganRule({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.2em] ${
        tone === 'dark' ? 'text-brand-bright' : 'text-brand'
      }`}
    >
      {company.sloganParts.map((part, index) => (
        <span key={part} className="flex items-center gap-3">
          {index > 0 && <span className="text-navy-muted/40">|</span>}
          {part}
        </span>
      ))}
    </p>
  );
}
