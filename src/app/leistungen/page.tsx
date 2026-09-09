import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Visual } from '@/components/visual';

export const metadata: Metadata = {
  title: 'Leistungen',
  description:
    'Trennwände, abgehängte Decken, Dachgeschossausbau, Vorsatzschalen, Feuchtraum und Spachtelarbeiten Q1–Q4 in Berlin und Brandenburg.',
};

const services = [
  {
    title: 'Trennwände & Grundrissänderung',
    lede: 'Wenn der Grundriss nicht mehr zum Leben passt.',
    body: 'Metallständerwände mit ein- oder doppelter Beplankung, auf Wunsch mit erhöhtem Schallschutz. Türöffnungen mit Aussteifung, Anschlüsse an Bestandswände mit Trennschnitt, damit später keine Risse entstehen.',
    facts: ['Einfach- bis Dreifachbeplankung', 'Schallschutz bis 60 dB möglich', 'Statisch ausgesteifte Türöffnungen'],
  },
  {
    title: 'Abgehängte Decken & Akustik',
    lede: 'Leitungen verstecken, Raumklang verbessern.',
    body: 'Abhängungen auf Nonius- oder Direktabhängern, mit Revisionsöffnungen an den richtigen Stellen. Für Praxen, Büros und Gastronomie auch als Akustikdecke mit Lochplatten und Vliesauflage.',
    facts: ['Ausgleich unebener Altbaudecken', 'Lochplatten für Nachhallreduktion', 'Vorbereitung für Spots und Lüftung'],
  },
  {
    title: 'Dachgeschossausbau',
    lede: 'Der größte Raumgewinn pro Euro – wenn die Bauphysik stimmt.',
    body: 'Zwischensparrendämmung, luftdichte Dampfbremse, Dachschrägen- und Kniestockbekleidung. Alle Durchdringungen werden systemkonform ausgeführt und vor dem Beplanken fotografisch dokumentiert.',
    facts: ['Dokumentation der Luftdichtheitsebene', 'Vorbereitung für Blower-Door-Test', 'Kniestockschränke auf Wunsch'],
  },
  {
    title: 'Vorsatzschalen & Schallschutz',
    lede: 'Gegen Lärm von nebenan und für Leitungen an der Wand.',
    body: 'Freistehende oder angesetzte Vorsatzschalen mit Mineralwolle. Entkoppelt vom Bestandsmauerwerk, weil eine starre Verbindung den Schallschutz zunichtemacht.',
    facts: ['Installationsvorwände fürs Bad', 'Entkoppelte Unterkonstruktion', 'Dämmung nach Anforderung'],
  },
  {
    title: 'Feuchtraum & Bad',
    lede: 'Der Untergrund entscheidet, wie lange die Fliesen halten.',
    body: 'Imprägnierte Bauplatten, Verbundabdichtung in den Belastungsklassen nach Norm, engere Ständerabstände für großformatige Fliesen. Nischen und Ablagen planen wir gleich mit ein.',
    facts: ['Verbundabdichtung nach Norm', 'Ebenheitskontrolle vor Übergabe', 'Nischen und Ablagen integriert'],
  },
  {
    title: 'Spachtelarbeiten Q1 – Q4',
    lede: 'Die Oberfläche, die Sie später jeden Tag sehen.',
    body: 'Q2 ist Standard für gewöhnliche Anstriche. Q3 empfiehlt sich bei Streiflicht, Q4 bei glänzenden Beschichtungen oder großflächigem Seitenlicht. Wir sagen Ihnen vorher, welche Stufe Ihr Raum wirklich braucht.',
    facts: ['Beratung zur passenden Qualitätsstufe', 'Streiflichtprüfung vor Abnahme', 'Aufpreise transparent im Angebot'],
  },
];

export default function LeistungenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leistungen"
        title="Trockenbau von der Trennwand bis zur Q4-Oberfläche"
        lede="Schwerpunkt Sanierung im bewohnten Bestand. Wir sagen vorher, was sinnvoll ist – und was Sie sich sparen können."
      />

      <div className="container-page py-16">
        <div className="space-y-20">
          {services.map((service, index) => (
            <section
              key={service.title}
              className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Visual variant={index} label={service.title} className="aspect-[5/4] rounded-card shadow-card" />
              <div>
                <h2 className="heading-lg text-3xl">{service.title}</h2>
                <p className="mt-3 text-lg font-medium text-accent">{service.lede}</p>
                <p className="prose-body mt-4">{service.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {service.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3 text-[15px] text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        <div className="card mt-20 p-8 text-center sm:p-12">
          <h2 className="heading-lg">Unsicher, was Ihr Projekt braucht?</h2>
          <p className="prose-body mx-auto mt-4 max-w-xl">
            Das Aufmaß vor Ort ist kostenfrei und unverbindlich. Danach wissen Sie, was machbar ist und
            was es kostet – schriftlich.
          </p>
          <Link href="/termin" className="btn-accent mt-8">
            Aufmaßtermin anfragen
          </Link>
        </div>
      </div>
    </>
  );
}
