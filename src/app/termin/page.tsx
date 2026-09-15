import type { Metadata } from 'next';
import { BookingFlow } from '@/components/booking-flow';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Termin anfragen',
  description:
    'Aufmaßtermin oder telefonische Beratung online anfragen. Sie sehen nur Zeiten, die im Kalender wirklich frei sind.',
};

export default async function TerminPage({
  searchParams,
}: {
  // Die Startseite reicht eine geprüfte Postleitzahl als ?plz= weiter.
  searchParams: Promise<{ plz?: string }>;
}) {
  const { plz } = await searchParams;
  const initialZip = (plz ?? '').replace(/\D/g, '').slice(0, 5);

  return (
    <>
      <PageHeader
        eyebrow="Termin"
        title="Freie Zeiten, direkt aus unserem Kalender"
        lede="Sie wählen eine Zeit aus, wir bestätigen sie. Meistens noch am selben oder am nächsten Werktag."
      />
      <section className="container-page pb-24">
        <BookingFlow initialZip={initialZip} />
      </section>
    </>
  );
}
