/**
 * Platzhalter-Grafik für Projektbilder.
 *
 * [PLATZHALTER] Sobald echte Fotos vorliegen: dieses Element durch
 * `next/image` ersetzen. Bis dahin erzeugt jede Variante ein eigenes,
 * ruhiges Muster – besser als graue Kästen oder Stockfotos.
 */
export function Visual({
  variant = 0,
  label,
  className = '',
}: {
  variant?: number;
  label?: string;
  className?: string;
}) {
  // Vier kühle Abstufungen aus der Blau-Grau-Palette, damit die Kacheln
  // untereinander variieren, ohne aus dem Farbklima zu fallen.
  const palettes = [
    ['#DCE6EF', '#B9CBDD', '#17212B'],
    ['#E3E9EE', '#C3CFDA', '#17212B'],
    ['#D6E4F0', '#AFC7DD', '#17212B'],
    ['#E7ECF1', '#CAD4DE', '#17212B'],
  ];
  const [base, mid, ink] = palettes[variant % palettes.length];
  const id = `v${variant}`;

  return (
    <div className={`relative overflow-hidden bg-gypsum-deep ${className}`}>
      <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label={label ?? 'Projektbild folgt'}>
        <rect width="400" height="300" fill={base} />
        <defs>
          <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0v40" fill="none" stroke={mid} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#${id}-grid)`} />
        {variant % 4 === 0 && (
          <>
            <rect x="40" y="60" width="130" height="200" fill={mid} opacity="0.75" />
            <rect x="190" y="110" width="170" height="150" fill={ink} opacity="0.08" />
            <path d="M40 60h130" stroke={ink} strokeWidth="3" opacity="0.35" />
          </>
        )}
        {variant % 4 === 1 && (
          <>
            <path d="M0 210 200 90l200 120v90H0Z" fill={mid} opacity="0.7" />
            <path d="M200 90 400 210" stroke={ink} strokeWidth="2" opacity="0.3" fill="none" />
          </>
        )}
        {variant % 4 === 2 && (
          <>
            <rect x="0" y="40" width="400" height="26" fill={mid} opacity="0.8" />
            <rect x="0" y="86" width="400" height="26" fill={mid} opacity="0.55" />
            <rect x="0" y="132" width="400" height="26" fill={mid} opacity="0.35" />
            <rect x="240" y="180" width="120" height="120" fill={ink} opacity="0.09" />
          </>
        )}
        {variant % 4 === 3 && (
          <>
            <circle cx="300" cy="90" r="70" fill={mid} opacity="0.6" />
            <rect x="30" y="150" width="220" height="120" fill={ink} opacity="0.08" />
            <path d="M30 150h220" stroke={ink} strokeWidth="3" opacity="0.3" />
          </>
        )}
      </svg>
    </div>
  );
}
