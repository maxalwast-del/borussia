import type { TradeId } from '@/config/site';
import { TRADE_PATHS } from '@/components/trade-icon';

/**
 * Illustrationen für Leistungen und Referenzen.
 *
 * [PLATZHALTER] Sobald echte Projektfotos vorliegen, die Kacheln in
 * Referenzen und Leistungen durch `next/image` ersetzen. Bis dahin zeigt
 * jede Kachel das Symbol des Gewerks groß und mit Verlauf, wie die
 * Funktionskacheln auf apple.com. Das ist erkennbar eine Grafik und gibt
 * nicht vor, ein Foto einer Baustelle zu sein.
 */

export type ArtTone = 'light' | 'tint' | 'dark';

// Hintergründe, Raster und Lichthof je Tonlage stehen in globals.css
// (.art-light, .art-tint, .art-dark), weil sie sich im Dunkelmodus ändern.
const TONE_CLASS: Record<ArtTone, string> = {
  light: 'art-light',
  tint: 'art-tint',
  dark: 'art-dark',
};

/** Verläufe einmal für die ganze Seite. Nicht `display: none`, sonst greifen die Verweise in manchen Browsern nicht. */
export function ArtDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="art-glyph" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">
          <stop offset="0" stopColor="#5DB7F2" />
          <stop offset="0.35" stopColor="#2E9BE8" />
          <stop offset="0.7" stopColor="#0A6CCF" />
          <stop offset="1" stopColor="#122C5E" />
        </linearGradient>
        <linearGradient id="art-glyph-dark" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">
          <stop offset="0" stopColor="#B5E0FF" />
          <stop offset="0.4" stopColor="#5DB7F2" />
          <stop offset="1" stopColor="#0A6CCF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Artwork({
  trade,
  tone = 'light',
  label,
  className = '',
  glyphClassName = 'w-[30%] max-w-[200px]',
}: {
  trade: TradeId;
  tone?: ArtTone;
  label?: string;
  className?: string;
  glyphClassName?: string;
}) {
  return (
    <div
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`relative isolate grid place-items-center overflow-hidden ${TONE_CLASS[tone]} ${className}`}
    >
      {/* Feines Aufmaßraster, das zum Rand hin ausläuft */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(var(--art-grid) 1px, transparent 1px), linear-gradient(90deg, var(--art-grid) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(60% 60% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(60% 60% at 50% 50%, black 0%, transparent 100%)',
        }}
      />
      {/* Lichthof hinter dem Symbol */}
      <div
        className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'var(--art-glow)' }}
      />
      <svg
        viewBox="0 0 24 24"
        className={`art-glyph ${glyphClassName} drop-shadow-[0_18px_28px_rgba(10,60,140,0.28)]`}
        aria-hidden="true"
        focusable="false"
      >
        {TRADE_PATHS[trade]}
      </svg>
    </div>
  );
}

/** Wechselnde Tonlage für Reihen aus mehreren Kacheln. */
export function toneFor(index: number): ArtTone {
  return (['light', 'tint', 'dark'] as const)[index % 3];
}
