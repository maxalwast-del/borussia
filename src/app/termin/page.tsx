import type { Metadata } from 'next';
import { BookingFlow } from '@/components/booking-flow';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Termin anfragen',
  description:
    'Aufmaßtermin oder telefonische Beratung online anfragen. Sie sehen nur Zeiten, die im Kalender wirklich frei sind.',
};

export default function TerminPage() {
  return (
    <>
      <PageHeader
        eyebrow="Termin"
        title="Freie Zeiten, direkt aus unserem Kalender"
        lede="Kein Rückrufversprechen ins Leere: Sie wählen einen Slot, wir bestätigen ihn – in der Regel innerhalb eines Werktages."
      />
      <section className="container-page pb-24">
        <BookingFlow />
      </section>
    </>
  );
}
