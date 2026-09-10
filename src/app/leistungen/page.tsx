import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Visual } from '@/components/visual';
import { TradeIcon } from '@/components/trade-icon';
import { trades, type TradeId } from '@/config/site';

export const metadata: Metadata = {
  title: 'Leistungen',
  description:
    'Trockenbau, Fliesenarbeiten, Malerarbeiten, Innenausbau, Sanierung und Bodenlegerarbeiten in Berlin und Brandenburg. Sechs Gewerke aus einer Hand.',
};

type Service = {
  id: TradeId;
  lede: string;
  body: string;
  facts: string[];
};

const services: Service[] = [
  {
    id: 'trockenbau',
    lede: 'Wenn der Grundriss nicht mehr zum Leben passt.',
    body: 'Metallständerwände mit ein- oder doppelter Beplankung, abgehängte Decken, Vorsatzschalen und Dachschrägen. Türöffnungen bekommen eine Aussteifung, Anschlüsse an Bestandswände einen Trennschnitt. Das ist die Stelle, an der Altbauwände sonst nach einem Jahr aufreißen.',
    facts: [
      'Schallschutz bis 60 dB möglich',
      'Ausgleich unebener Altbaudecken',
      'Spachtelqualität Q1 bis Q4',
    ],
  },
  {
    id: 'fliesen',
    lede: 'Am Untergrund hängt, wie lange die Fliesen halten.',
    body: 'Bad, Küche, Flur und Bodenflächen. Vor der ersten Fliese kommt die Verbundabdichtung in der passenden Belastungsklasse. Bei großformatigen Platten setzen wir den Untergrund enger und prüfen die Ebenheit, bevor wir anfangen, statt hinterher zu spachteln.',
    facts: [
      'Verbundabdichtung nach Norm',
      'Großformat bis 120 × 120 cm',
      'Silikonfugen und Übergänge inklusive',
    ],
  },
  {
    id: 'maler',
    lede: 'Der Teil, den am Ende jeder sieht.',
    body: 'Spachteln, Grundieren, Streichen, Tapezieren. In bewohnten Wohnungen arbeiten wir mit Abklebung und Abdeckung bis in die Ecken, nicht nur über der Mitte des Raums. Treppenhäuser und Hausflure machen wir abschnittsweise, damit die Bewohner durchkommen.',
    facts: [
      'Anstriche, Raufaser und Vliestapeten',
      'Farbberatung vor der Bestellung',
      'Treppenhäuser im laufenden Betrieb',
    ],
  },
  {
    id: 'innenausbau',
    lede: 'Aus Rohbau wird Wohnraum.',
    body: 'Dachgeschossausbau mit Zwischensparrendämmung und luftdichter Dampfbremse, Kniestockschränke, Innentüren, Einbauten. Jede Durchdringung der Dampfbremse führen wir systemkonform aus und fotografieren sie, bevor wir beplanken. Wer hier pfuscht, sieht den Schaden erst nach drei Wintern.',
    facts: [
      'Dokumentation der Luftdichtheitsebene',
      'Vorbereitung für Blower-Door-Test',
      'Türen, Zargen und Einbauten',
    ],
  },
  {
    id: 'sanierung',
    lede: 'Eine Wohnung, ein Ansprechpartner, ein Termin.',
    body: 'Komplettsanierung von Wohnungen und Häusern. Wir übernehmen die Gewerke, die wir selbst ausführen, und koordinieren Elektro und Sanitär mit festen Partnerbetrieben aus der Region. Sie bekommen einen Bauzeitenplan und rufen bei Rückfragen nicht vier Nummern an.',
    facts: [
      'Bauzeitenplan über alle Gewerke',
      'Feste Partner für Elektro und Sanitär',
      'Auch im bewohnten Zustand möglich',
    ],
  },
  {
    id: 'boden',
    lede: 'Der Boden verzeiht nichts, was darunter schiefgeht.',
    body: 'Parkett, Vinyl, Laminat und Designbeläge. Vorher messen wir die Restfeuchte des Estrichs, grundieren und spachteln den Untergrund. Ein Belag auf zu feuchtem oder unebenem Estrich wirft sich, und dann liegt es nie am Belag.',
    facts: [
      'Restfeuchtemessung vor Verlegung',
      'Spachteln und Grundieren im Angebot',
      'Sockelleisten und Übergangsprofile',
    ],
  },
];

export default function LeistungenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leistungen"
        title="Sechs Gewerke aus einer Hand"
        lede="Schwerpunkt ist Sanierung und Renovierung im bewohnten Bestand. Wir sagen Ihnen vorher, was sinnvoll ist und was Sie sich sparen können."
      />

      <div className="container-page py-16">
        {/* Übersicht der Gewerke, in derselben Reihenfolge wie auf dem Firmenschild */}
        <nav aria-label="Gewerke" className="grid gap-px overflow-hidden rounded-card border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
          {trades.map((trade) => (
            <a
              key={trade.id}
              href={`#${trade.id}`}
              className="group flex items-center gap-4 bg-white p-5 transition hover:bg-paper"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                <TradeIcon id={trade.id} className="h-5 w-5" />
              </span>
              <span className="font-semibold">{trade.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-20 space-y-20">
          {services.map((service, index) => {
            const trade = trades.find((entry) => entry.id === service.id)!;
            return (
              <section
                key={service.id}
                id={service.id}
                className={`grid scroll-mt-24 gap-10 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <Visual variant={index} label={trade.label} className="aspect-[5/4] rounded-card shadow-card" />
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
                    <TradeIcon id={service.id} className="h-6 w-6" />
                  </span>
                  <h2 className="heading-lg mt-5 text-3xl">{trade.label}</h2>
                  <p className="mt-3 text-lg font-medium text-brand">{service.lede}</p>
                  <p className="prose-body mt-4">{service.body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {service.facts.map((fact) => (
                      <li key={fact} className="flex items-start gap-3 text-[15px] text-navy-soft">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        <div className="card mt-20 p-8 text-center sm:p-12">
          <h2 className="heading-lg">Mehrere Gewerke gleichzeitig?</h2>
          <p className="prose-body mx-auto mt-4 max-w-xl">
            Genau dafür ist der Betrieb aufgestellt. Das Aufmaß vor Ort ist kostenfrei, und Sie
            bekommen ein Angebot, das alle beteiligten Arbeiten abdeckt.
          </p>
          <Link href="/termin" className="btn-accent mt-8">
            Aufmaßtermin anfragen
          </Link>
        </div>
      </div>
    </>
  );
}
