/**
 * Grundriss als Titelgrafik: Bestandswände in Grau, zwei alte Wände lösen
 * sich auf, die neuen Trockenbauwände zeichnen sich in Blau ein. Das ist die
 * Kernaussage „Neue Räume im alten Grundriss" als Bild.
 *
 * Die Zeichnung ist eine Illustration, kein Plan eines echten Projekts.
 * Bei reduzierter Bewegung steht sofort der Endzustand.
 */

// Strichfarben kommen aus globals.css (--fp-*), damit der Plan im
// Dunkelmodus hell auf dunkel steht.
const WALL = { stroke: 'var(--fp-wall)' };
const INNER = { stroke: 'var(--fp-inner)' };
const FIXTURE = { stroke: 'var(--fp-fixture)' };
const FURNITURE = { stroke: 'var(--fp-furniture)' };

export function FloorPlan({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 600"
      className={className}
      role="img"
      aria-label="Grundriss einer Altbauwohnung: Zwei alte Zwischenwände entfallen, neue Trockenbauwände schaffen einen offenen Wohnbereich und ein abgetrenntes Arbeitszimmer."
    >
      <g fill="none" strokeLinecap="square">
        {/* Möbel, ganz hinten */}
        <g style={FURNITURE} strokeWidth="2">
          <rect x="104" y="78" width="150" height="170" rx="8" />
          <path d="M104 118h150" />
          <rect x="84" y="490" width="120" height="46" rx="16" />
          <rect x="438" y="462" width="190" height="56" rx="12" />
          <path d="M448 462v-14h170v14" />
          <circle cx="545" cy="160" r="40" />
          <circle cx="545" cy="100" r="9" />
          <circle cx="545" cy="220" r="9" />
          <circle cx="485" cy="160" r="9" />
          <circle cx="605" cy="160" r="9" />
          <rect x="770" y="496" width="140" height="38" rx="4" />
          <circle cx="840" cy="472" r="12" />
        </g>

        {/* Küchenzeile */}
        <path d="M700 62h218v168h-30V92H700Z" style={FIXTURE} strokeWidth="2" strokeLinejoin="round" />

        {/* Türen mit Schwenkbereich */}
        <g style={FIXTURE} strokeWidth="2">
          <path d="M260 320v-60M260 260a60 60 0 0 1 60 60" />
          <path d="M380 440h60M440 440a60 60 0 0 0-60-60" />
          <path d="M220 460h-60M160 460a60 60 0 0 1 60-60" />
          <path d="M360 550v-60M360 490a60 60 0 0 0-60 60" />
        </g>

        {/* Bestandswände innen */}
        <g style={INNER} strokeWidth="7">
          <path d="M380 50v330M380 440v110" />
          <path d="M70 320h190M320 320h60" />
          <path d="M220 320v80M220 460v90" />
        </g>

        {/* Wände, die entfallen: erst massiv, dann nur noch gestrichelt */}
        <g>
          <path d="M650 50v280M380 330h550" style={FIXTURE} strokeWidth="2.5" strokeDasharray="10 8" strokeLinecap="butt" />
          <path className="fp-remove" d="M650 50v280M380 330h550" style={INNER} strokeWidth="7" />
        </g>

        {/* Neue Trockenbauwände */}
        <g stroke="url(#fp-new)" strokeWidth="9" strokeLinecap="butt">
          <path className="fp-new" pathLength={1} d="M730 550V360h70" />
          <path className="fp-new fp-new-2" pathLength={1} d="M880 360h50" />
        </g>
        {/* Schiebetür */}
        <path className="fp-new fp-new-3" pathLength={1} d="M792 370h96" style={{ stroke: 'var(--fp-new-b)' }} strokeWidth="3" strokeLinecap="butt" />

        {/* Außenwände mit Fensteröffnungen */}
        <g style={WALL} strokeWidth="12">
          <path d="M64 50h86M260 50h210M580 50h180M870 50h66" />
          <path d="M930 44v126M930 280v276" />
          <path d="M64 550h236M360 550h160M640 550h296" />
          <path d="M70 44v86M70 230v326" />
        </g>
        <g style={FIXTURE} strokeWidth="2">
          <path d="M150 46h110M150 54h110M470 46h110M470 54h110M760 46h110M760 54h110" />
          <path d="M926 170v110M934 170v110" />
          <path d="M520 546h120M520 554h120" />
          <path d="M66 130v100M74 130v100" />
        </g>
      </g>

      <defs>
        <linearGradient id="fp-new" gradientUnits="userSpaceOnUse" x1="730" y1="560" x2="940" y2="350">
          <stop offset="0" style={{ stopColor: 'var(--fp-new-a)' }} />
          <stop offset="1" style={{ stopColor: 'var(--fp-new-b)' }} />
        </linearGradient>
      </defs>

      {/* Raumbezeichnungen, auf kleinen Bildschirmen ausgeblendet */}
      <g className="fp-label" fontSize="17" fontWeight="500" style={{ fill: 'rgb(var(--c-mute))' }} textAnchor="middle" fontFamily="inherit">
        <text x="180" y="290">Schlafen</text>
        <text x="120" y="372">Bad</text>
        <text x="300" y="414">Flur</text>
        <text x="545" y="380">Wohnen &amp; Essen</text>
        <text x="790" y="170">Küche</text>
        <text x="830" y="440" style={{ fill: 'rgb(var(--c-accent))' }} fontWeight="600">
          Arbeiten
        </text>
      </g>
    </svg>
  );
}

export function FloorPlanLegend({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 t-caption text-mute ${className}`}>
      <li className="flex items-center gap-2">
        <span className="h-[3px] w-5 rounded-full" style={{ background: 'var(--fp-inner)' }} aria-hidden="true" />
        Bestand
      </li>
      <li className="flex items-center gap-2">
        <span
          className="h-[2px] w-5"
          style={{ backgroundImage: 'linear-gradient(90deg, var(--fp-fixture) 60%, transparent 60%)', backgroundSize: '8px 2px' }}
          aria-hidden="true"
        />
        entfällt
      </li>
      <li className="flex items-center gap-2">
        <span className="h-[3px] w-5 rounded-full bg-accent" aria-hidden="true" />
        neu im Trockenbau
      </li>
    </ul>
  );
}
