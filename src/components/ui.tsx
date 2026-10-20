import Link from 'next/link';
import { Icon } from '@/components/icon';

/** „Mehr erfahren ›": Textlink mit kleinem Pfeil, wie auf apple.com. */
export function MoreLink({
  href,
  children,
  dark = false,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`inline-flex items-center gap-0.5 ${dark ? 'link-dark' : 'link'} ${className}`}>
      {children}
      <Icon name="chevron-right" className="h-[0.78em] w-[0.78em] translate-y-[0.5px]" strokeWidth={2.6} />
    </Link>
  );
}

/** Seitenkopf der Unterseiten: große, zentrierte Überschrift mit kurzem Vorspann. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="container-page pb-14 pt-16 text-center sm:pb-20 sm:pt-24">
      {eyebrow && (
        <p className="t-eyebrow text-accent" data-reveal>
          {eyebrow}
        </p>
      )}
      <h1 className={`t-headline mx-auto max-w-[860px] text-balance ${eyebrow ? 'mt-3' : ''}`} data-reveal>
        {title}
      </h1>
      {lede && (
        <p
          className="t-intro mx-auto mt-5 max-w-[692px] text-pretty text-mute"
          data-reveal
          style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
        >
          {lede}
        </p>
      )}
      {children && (
        <div data-reveal style={{ '--reveal-delay': '160ms' } as React.CSSProperties}>
          {children}
        </div>
      )}
    </section>
  );
}

/** Abschnittsüberschrift: fett, mit grauer Fortsetzung im selben Satz. */
export function SectionTitle({
  children,
  sub,
  as: Tag = 'h2',
  className = '',
  center = false,
}: {
  children: React.ReactNode;
  sub?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  center?: boolean;
}) {
  return (
    <Tag className={`t-section text-balance ${center ? 'mx-auto text-center' : ''} ${className}`} data-reveal>
      {children}
      {sub && <span className="text-mute"> {sub}</span>}
    </Tag>
  );
}

/** Verzögerung für Elemente, die nacheinander einblenden. */
export function delay(ms: number) {
  return { '--reveal-delay': `${ms}ms` } as React.CSSProperties;
}
