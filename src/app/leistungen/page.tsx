import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Visual } from '@/components/visual';

export const metadata: Metadata = {
  title: 'Leistungen',
  description:
    'Trennwände, abgehängte Decken, Dachgeschossausbau, Vorsatzschalen, Feuchtraum und Spachtelarbeiten Q1 bis Q4 in Berlin und Brandenburg.',
};

const services = [
  {
    title: 'Trennwände & Grundrissänderung',
    lede: 'Wenn der Grundriss nicht mehr zum Leben passt.',
    body: 'Metallständerwände mit ein- oder doppelter Beplankung, auf Wunsch mit erhöhtem Schallschutz. Türöffnungen bekommen eine Aussteifung, Anschlüsse an Bestandswände einen Trennschnitt. Das ist die Stelle, an der Altbauwände sonst nach einem Jahr aufreißen.',
    facts: ['Einfach- bis Dreifachbeplankung', 'Schallschutz bis 60 dB möglich', 'Statisch ausgesteifte Türöffnungen'],
  },
  {
    title: 'Abgehängte Decken & Akustik',
    lede: 'Leitungen verstecken, Raumklang verbessern.',
    body: 'Abhängungen auf Nonius- oder Direktabhängern. Revisionsöffnungen setzen wir dorthin, wo später wirklich jemand ranmuss, nicht dorthin, wo sie am wenigsten stören. Für Praxen und Büros auch als Akustikdecke mit Lochplatten und Vliesauflage.',
    facts: ['Ausgleich unebener Altbaudecken', 'Lochplatten für Nachhallreduktion', 'Vorbereitung für Spots und Lüftung'],
  },
  {
    title: 'Dachgeschossausbau',
    lede: 'Viel Raumgewinn, wenn die Bauphysik stimmt.',
    body: 'Zwischensparrendämmung, luftdichte Dampfbremse, Dachschrägen- und Kniestockbekleidung. Jede Durchdringung führen wir systemkonform aus und fotografieren sie, bevor wir beplanken. Wer die Dampfbremse pfuscht, sieht den Schaden erst nach drei Wintern.',
    facts: ['Dokumentation der Luftdichtheitsebene', 'Vorbereitung für Blower-Door-Test', 'Kniestockschränke auf Wunsch'],
  },
  {
    title: 'Vorsatzschalen & Schallschutz',
    lede: 'Gegen Lärm von nebenan und für Leitungen an der Wand.',
    body: 'Freistehende oder angesetzte Vorsatzschalen mit Mineralwolle, entkoppelt vom Bestandsmauerwerk. Eine einzige starre Verbindung reicht, um den Schallschutz wieder aufzuheben.',
    facts: ['Installationsvorwände fürs Bad', 'Entkoppelte Unterkonstruktion', 'Dämmung nach Anforderung'],
  },
  {
    title: 'Feuchtraum & Bad',
    lede: 'Am Untergrund hängt, wie lange die Fliesen halten.',
    body: 'Imprägnierte Bauplatten und Verbundabdichtung in der passenden Belastungsklasse. Für großformatige Fliesen setzen wir die Ständer enger. Nischen und Ablagen planen wir gleich mit, weil sie nachträglich teuer werden.',
    facts: ['Verbundabdichtung nach Norm', 'Ebenheitskontrolle vor Übergabe', 'Nischen und Ablagen integriert'],
  },
  {
    title: 'Spachtelarbeiten Q1 bis Q4',
    lede: 'Die Oberfläche, die Sie später jeden Tag sehen.',
    body: 'Q2 reicht für gewöhnliche Anstriche. Q3 wird bei Streiflicht sinnvoll, Q4 bei glänzenden Beschichtungen. Wir schauen uns die Lichtsituation an und sagen Ihnen, welche Stufe Ihr Raum braucht. Meistens ist es eine niedrigere, als Sie erwarten.',
    facts: ['Beratung zur passenden Qualitätsstufe', 'Streiflichtprüfung vor Abnahme', 'Aufpreise transparent im Angebot'],
  },
];

export default function LeistungenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leistungen"
        title="Trockenbau von der Trennwand bis zur Q4-Oberfläche"
        lede="Schwerpunkt ist Sanierung im bewohnten Bestand. Wir sagen Ihnen vorher, was sinnvoll ist und was Sie sich sparen können."
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
            Das Aufmaß vor Ort ist kostenfrei und unverbindlich. Danach wissen Sie schriftlich,
            was machbar ist und was es kostet.
          </p>
          <Link href="/termin" className="btn-accent mt-8">
            Aufmaßtermin anfragen
          </Link>
        </div>
      </div>
    </>
  );
}
