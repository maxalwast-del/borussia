import type { Metadata } from 'next';
import { BookingFlow } from '@/components/booking-flow';
import { LocalNav } from '@/components/local-nav';

export const metadata: Metadata = {
  title: 'Termin anfragen',
  description:
    'Aufmaßtermin oder telefonische Beratung online anfragen. Sie sehen nur Zeiten, die im Kalender wirklich frei sind.',
};

export default function TerminPage() {
  return (
    <>
      <LocalNav title="Termin anfragen" href="/termin" cta={false} />
      <section className="container-page pb-24 pt-12 sm:pb-32 sm:pt-16">
        <h1 className="t-headline max-w-[760px] text-balance" data-reveal>
          Freie Zeiten.
          <span className="text-mute"> Direkt aus unserem Kalender.</span>
        </h1>
        <p className="t-intro mt-5 max-w-[640px] text-pretty text-mute" data-reveal style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
          Sie wählen eine Zeit aus, wir bestätigen sie. Meistens noch am selben oder am nächsten
          Werktag.
        </p>
        <div className="mt-14 sm:mt-20">
          <BookingFlow />
        </div>
      </section>
    </>
  );
}
