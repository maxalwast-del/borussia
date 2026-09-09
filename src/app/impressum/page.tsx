import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { company } from '@/config/site';

export const metadata: Metadata = { title: 'Impressum', robots: { index: false } };

/**
 * [PLATZHALTER] Rechtstext-Gerüst nach § 5 DDG.
 * Vor dem Livegang von einer Rechtsanwältin oder einem Rechtsanwalt prüfen lassen –
 * Abmahnungen wegen fehlerhafter Pflichtangaben sind in Deutschland real.
 */
export default function ImpressumPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Impressum" />
      <section className="container-page grid max-w-3xl gap-8 py-16 text-[15px] leading-relaxed text-ink-soft">
        <div>
          <h2 className="heading-md text-xl text-ink">Angaben gemäß § 5 DDG</h2>
          <p className="mt-3">
            {company.legalName}
            <br />
            {company.street}
            <br />
            {company.zip} {company.city}
          </p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Vertreten durch</h2>
          <p className="mt-3">{company.managingDirector}</p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Kontakt</h2>
          <p className="mt-3">
            Telefon: {company.phone}
            <br />
            E-Mail: {company.email}
          </p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Registereintrag</h2>
          <p className="mt-3">{company.register}</p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Umsatzsteuer-Identifikationsnummer</h2>
          <p className="mt-3">Gemäß § 27 a UStG: {company.vatId}</p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Berufsrechtliche Angaben</h2>
          <p className="mt-3">
            Gesetzliche Berufsbezeichnung: Trockenbaumonteur (verliehen in der Bundesrepublik Deutschland)
            <br />
            Zuständige Kammer: {company.chamber}
            <br />
            Es gelten die Handwerksordnung (HwO) sowie die Berufsordnung der zuständigen Handwerkskammer,
            einsehbar unter den Veröffentlichungen der Kammer.
          </p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Verbraucherstreitbeilegung</h2>
          <p className="mt-3">
            Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Haftung für Inhalte und Links</h2>
          <p className="mt-3">
            Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen
            Gesetzen verantwortlich. Für Inhalte externer Links ist der jeweilige Anbieter
            verantwortlich; zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Bei
            Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend.
          </p>
        </div>

        <p className="rounded-xl bg-accent-soft/50 p-5 text-sm">
          Hinweis für die Übernahme: Dieser Text ist ein Gerüst mit Platzhalterdaten. Vor dem Livegang
          durch die tatsächlichen Angaben ersetzen und juristisch prüfen lassen.
        </p>
      </section>
    </>
  );
}
