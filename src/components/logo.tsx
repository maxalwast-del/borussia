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
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      {/* Kleines Satteldach links, großes rechts, darunter der Schwung. */}
      <path d="M2 20 11 9.5 20 20v9H2v-9Z" fill="#2E9BE8" />
      <path d="M13 20 25 5.5 37 20v9H13v-9Z" fill="#122C5E" />
      <rect x="22.5" y="15" width="4.6" height="7" fill="#FBFBFD" />
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

/** Kompakte Marke für die Navigationsleiste: Zeichen und Name, sonst nichts. */
export function Wordmark({ withSub = false }: { withSub?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark className="h-[26px] w-[26px] shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-wordmark text-[15px] uppercase leading-none tracking-[0.02em] text-navy">Borussia</span>
        {withSub && (
          <span className="mt-[3px] text-[8.5px] font-semibold uppercase leading-none tracking-[0.16em] text-accent">
            Baudienstleistungen
          </span>
        )}
      </span>
    </span>
  );
}
