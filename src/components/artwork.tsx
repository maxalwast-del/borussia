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

const TONES: Record<ArtTone, { background: string; fill: string; grid: string; glow: string }> = {
  light: {
    background: 'radial-gradient(120% 120% at 30% 10%, #ffffff 0%, #f4f6f9 45%, #e5eaf1 100%)',
    fill: 'url(#art-glyph)',
    grid: 'rgba(18, 44, 94, 0.05)',
    glow: 'rgba(46, 155, 232, 0.16)',
  },
  tint: {
    background: 'radial-gradient(120% 120% at 70% 0%, #f5faff 0%, #e2eefb 50%, #cfe1f5 100%)',
    fill: 'url(#art-glyph)',
    grid: 'rgba(10, 108, 207, 0.07)',
    glow: 'rgba(255, 255, 255, 0.7)',
  },
  dark: {
    background: 'radial-gradient(120% 120% at 50% 0%, #1c2b47 0%, #0a1222 55%, #000000 100%)',
    fill: 'url(#art-glyph-dark)',
    grid: 'rgba(255, 255, 255, 0.05)',
    glow: 'rgba(46, 155, 232, 0.35)',
  },
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
  const style = TONES[tone];
  return (
    <div
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`relative isolate grid place-items-center overflow-hidden ${className}`}
      style={{ background: style.background }}
    >
      {/* Feines Aufmaßraster, das zum Rand hin ausläuft */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(${style.grid} 1px, transparent 1px), linear-gradient(90deg, ${style.grid} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(60% 60% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(60% 60% at 50% 50%, black 0%, transparent 100%)',
        }}
      />
      {/* Lichthof hinter dem Symbol */}
      <div
        className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: style.glow }}
      />
      <svg
        viewBox="0 0 24 24"
        className={`${glyphClassName} drop-shadow-[0_18px_28px_rgba(10,60,140,0.28)]`}
        fill={style.fill}
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
