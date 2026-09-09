import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div className="max-w-md">
        <p className="eyebrow">Fehler 404</p>
        <h1 className="heading-lg mt-4">Diese Seite gibt es nicht</h1>
        <p className="prose-body mt-4">
          Womöglich hat sich die Adresse geändert. Über die Startseite finden Sie alles Weitere.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Zur Startseite
          </Link>
          <Link href="/termin" className="btn-ghost">
            Termin anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
