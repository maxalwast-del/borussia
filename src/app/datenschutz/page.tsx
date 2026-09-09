import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { company } from '@/config/site';

export const metadata: Metadata = { title: 'Datenschutz', robots: { index: false } };

/**
 * [PLATZHALTER] Datenschutzerklärung als Gerüst.
 * Die beschriebenen Verarbeitungen (Google Kalender, Resend, Hosting) entsprechen der
 * tatsächlichen Implementierung – Auftragsverarbeitungsverträge müssen mit den
 * jeweiligen Anbietern abgeschlossen und hier ergänzt werden.
 */
export default function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Datenschutzhinweise" />
      <section className="container-page grid max-w-3xl gap-8 py-16 text-[15px] leading-relaxed text-ink-soft">
        <div>
          <h2 className="heading-md text-xl text-ink">Verantwortlich</h2>
          <p className="mt-3">
            {company.legalName}, {company.street}, {company.zip} {company.city}
            <br />
            Telefon {company.phone}, E-Mail {company.email}
          </p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Terminanfragen</h2>
          <p className="mt-3">
            Wenn Sie über das Buchungsformular einen Termin anfragen, verarbeiten wir Name,
            Telefonnummer, E-Mail-Adresse, Objektanschrift und Ihre Nachricht. Diese Daten werden in
            einen Kalendereintrag bei Google übernommen und dienen ausschließlich der Bearbeitung und
            Durchführung des Termins. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
            Maßnahmen). Die Daten werden gelöscht, sobald sie für die Terminabwicklung nicht mehr
            erforderlich sind und keine handels- oder steuerrechtlichen Aufbewahrungsfristen
            entgegenstehen.
          </p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Kalenderverwaltung</h2>
          <p className="mt-3">
            Zur Terminverwaltung nutzen wir Google Kalender (Google Ireland Limited). Termindaten
            werden dort gespeichert. Eine Übermittlung in Drittländer kann stattfinden; Google stützt
            diese auf Standardvertragsklauseln. Grundlage der Zusammenarbeit ist ein Vertrag zur
            Auftragsverarbeitung.
          </p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">E-Mail-Versand</h2>
          <p className="mt-3">
            Bestätigungs- und Benachrichtigungsmails versenden wir über einen E-Mail-Dienstleister.
            Dabei werden Ihre E-Mail-Adresse und der Inhalt der Nachricht verarbeitet. Auch hier
            besteht ein Vertrag zur Auftragsverarbeitung.
          </p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Kontakt- und Bewerbungsformular</h2>
          <p className="mt-3">
            Angaben aus dem Kontaktformular verarbeiten wir zur Beantwortung Ihrer Anfrage
            (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO). Bewerbungsdaten verarbeiten wir auf Grundlage
            von § 26 BDSG zur Durchführung des Bewerbungsverfahrens und löschen sie spätestens sechs
            Monate nach Abschluss des Verfahrens, sofern Sie keiner längeren Speicherung zugestimmt haben.
          </p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Server-Logfiles</h2>
          <p className="mt-3">
            Beim Aufruf der Website werden technisch notwendige Zugriffsdaten (IP-Adresse, Zeitpunkt,
            abgerufene Seite, Browsertyp) verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO,
            unser berechtigtes Interesse an einem sicheren Betrieb. Zur Missbrauchsabwehr bei
            Formularen wird die IP-Adresse kurzzeitig im Arbeitsspeicher vorgehalten.
          </p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Schriftarten</h2>
          <p className="mt-3">
            Diese Website bindet Schriftarten von Google Fonts ein. Dabei wird Ihre IP-Adresse an
            Google übermittelt. Wenn Sie das vermeiden möchten, können die Schriften auch lokal
            ausgeliefert werden – sprechen Sie uns an.
          </p>
        </div>

        <div>
          <h2 className="heading-md text-xl text-ink">Ihre Rechte</h2>
          <p className="mt-3">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit und Widerspruch. Außerdem können Sie sich bei einer
            Datenschutz-Aufsichtsbehörde beschweren, etwa bei der Berliner Beauftragten für Datenschutz
            und Informationsfreiheit.
          </p>
        </div>

        <p className="rounded-xl bg-accent-soft/50 p-5 text-sm">
          Hinweis für die Übernahme: Dieser Text beschreibt die technisch umgesetzten Verarbeitungen,
          ersetzt aber keine Rechtsberatung. Vor dem Livegang prüfen lassen und um tatsächlich
          eingesetzte Dienste (Analytics, Kartendienste, Cookie-Banner) ergänzen.
        </p>
      </section>
    </>
  );
}
