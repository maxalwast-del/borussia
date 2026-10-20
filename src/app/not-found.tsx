import Link from 'next/link';
import { MoreLink } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[65vh] place-items-center py-24 text-center">
      <div className="max-w-[560px]">
        <p className="text-gradient text-[5rem] font-semibold leading-none tracking-[-0.02em] sm:text-[7rem]">404</p>
        <h1 className="t-section mt-6 text-balance">Diese Seite gibt es leider nicht.</h1>
        <p className="t-intro mt-4 text-mute">
          Womöglich hat sich die Adresse geändert. Über die Startseite finden Sie alles Weitere.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link href="/" className="btn-primary">
            Zur Startseite
          </Link>
          <MoreLink href="/termin">Termin anfragen</MoreLink>
        </div>
      </div>
    </section>
  );
}
