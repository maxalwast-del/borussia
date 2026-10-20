import type { Metadata } from 'next';
import Link from 'next/link';
import { Artwork } from '@/components/artwork';
import { Icon } from '@/components/icon';
import { LocalNav } from '@/components/local-nav';
import { TradeIcon } from '@/components/trade-icon';
import { PageHero, delay } from '@/components/ui';
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

const shortLabels: Record<TradeId, string> = {
  trockenbau: 'Trockenbau',
  fliesen: 'Fliesen',
  maler: 'Maler',
  innenausbau: 'Innenausbau',
  sanierung: 'Sanierung',
  boden: 'Boden',
};

/** Erster Satz fett und schwarz, der Rest grau: das Muster der Produktseiten von apple.com. */
function splitLead(text: string) {
  const index = text.indexOf('. ');
  return index === -1 ? [text, ''] : [text.slice(0, index + 1), text.slice(index + 2)];
}

export default function LeistungenPage() {
  return (
    <>
      <LocalNav
        title="Leistungen"
        href="/leistungen"
        links={trades.map((trade) => ({ href: `#${trade.id}`, label: shortLabels[trade.id] }))}
      />

      <PageHero
        title={
          <>
            Sechs Gewerke.
            <br />
            <span className="text-gradient">Aus einer Hand.</span>
          </>
        }
        lede="Schwerpunkt ist Sanierung und Renovierung im bewohnten Bestand. Wir sagen Ihnen vorher, was sinnvoll ist und was Sie sich sparen können."
      />

      {/* Kapitelleiste wie auf den Produktseiten von apple.com */}
      <nav aria-label="Gewerke" className="border-b border-line" data-reveal style={delay(200)}>
        <ul className="mx-auto flex w-max max-w-full gap-2 overflow-x-auto px-6 pb-6 [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden">
          {trades.map((trade) => (
            <li key={trade.id} className="shrink-0">
              <a
                href={`#${trade.id}`}
                className="group flex w-[84px] flex-col items-center gap-2.5 rounded-ctl py-2 text-center text-ink-soft transition-colors hover:text-accent"
              >
                <span className="grid h-12 w-12 place-items-center">
                  <TradeIcon id={trade.id} className="h-8 w-8 transition-transform duration-300 ease-apple group-hover:-translate-y-0.5" />
                </span>
                <span className="text-[0.75rem] leading-tight">{trade.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((service, index) => {
        const trade = trades.find((entry) => entry.id === service.id)!;
        const [lead, rest] = splitLead(service.body);
        const onCanvas = index % 2 === 1;
        return (
          <section
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-titel`}
            className={`section scroll-mt-[52px] ${onCanvas ? 'bg-canvas' : 'bg-white'}`}
          >
            <div className="container-page">
              <p className="t-eyebrow flex items-center gap-2 text-accent" data-reveal>
                <TradeIcon id={service.id} className="h-5 w-5" />
                {trade.label}
              </p>
              <h2 id={`${service.id}-titel`} className="t-headline mt-3 max-w-[820px] text-balance" data-reveal style={delay(60)}>
                {service.lede}
              </h2>

              <Artwork
                trade={service.id}
                tone={onCanvas ? 'dark' : 'tint'}
                label={`Symbolgrafik ${trade.label}`}
                className="tile mt-12 aspect-[4/3] sm:aspect-[16/7]"
                glyphClassName="w-[24%] max-w-[200px]"
              />

              <div className="mt-12 grid gap-10 md:grid-cols-[1.45fr_1fr] md:gap-16">
                <p className="t-intro text-mute" data-reveal>
                  <strong className="font-semibold text-ink">{lead}</strong> {rest}
                </p>
                <ul className="divide-y divide-line border-y border-line" data-reveal style={delay(80)}>
                  {service.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3 py-4">
                      <Icon name="check-circle" className="mt-[2px] h-5 w-5 shrink-0 text-accent" strokeWidth={1.7} />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section text-center">
        <div className="container-page">
          <h2 className="t-headline text-balance" data-reveal>
            Mehrere Gewerke gleichzeitig?
          </h2>
          <p className="t-intro mx-auto mt-5 max-w-[600px] text-pretty text-mute" data-reveal style={delay(80)}>
            Genau dafür ist der Betrieb aufgestellt. Das Aufmaß vor Ort ist kostenfrei, und Sie
            bekommen ein Angebot, das alle beteiligten Arbeiten abdeckt.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4" data-reveal style={delay(160)}>
            <Link href="/termin" className="btn-primary">
              Aufmaßtermin anfragen
            </Link>
            <Link href="/referenzen" className="btn-secondary">
              Referenzen ansehen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
