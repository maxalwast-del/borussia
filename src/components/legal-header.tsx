/** Schlichter Kopf für Rechtstexte: links bündig, ohne Vorspann. */
export function LegalHeader({ title }: { title: string }) {
  return (
    <header className="container-text pb-10 pt-16 sm:pt-24">
      <p className="t-small font-semibold text-mute">Rechtliches</p>
      <h1 className="t-headline mt-2">{title}</h1>
    </header>
  );
}
