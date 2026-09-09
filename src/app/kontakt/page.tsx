import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { ContactForm } from '@/components/contact-form';
import { company } from '@/config/site';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: `Trockenbau in Berlin und Brandenburg. Telefon ${company.phone}, E-Mail ${company.email} oder Kontaktformular.`,
};

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Rufen Sie an, das geht meistens schneller"
        lede="Für einen konkreten Termin ist die Online-Anfrage besser. Dort sehen Sie sofort, wann wir Zeit haben."
      />

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-8">
            <div className="card p-7">
              <h2 className="heading-md text-xl">Direkt erreichbar</h2>
              <div className="mt-5 space-y-4 text-[15px]">
                <p>
                  <span className="block text-sm text-ink-muted">Telefon</span>
                  <a href={`tel:${company.phoneHref}`} className="font-semibold hover:text-accent">
                    {company.phone}
                  </a>
                </p>
                <p>
                  <span className="block text-sm text-ink-muted">E-Mail</span>
                  <a href={`mailto:${company.email}`} className="font-semibold hover:text-accent">
                    {company.email}
                  </a>
                </p>
                <p>
                  <span className="block text-sm text-ink-muted">WhatsApp</span>
                  <a href={`https://wa.me/${company.whatsapp}`} className="font-semibold hover:text-accent">
                    Nachricht schreiben
                  </a>
                </p>
              </div>
            </div>

            <div className="card p-7">
              <h2 className="heading-md text-xl">Anschrift</h2>
              <address className="mt-4 not-italic text-[15px] leading-relaxed text-ink-soft">
                {company.legalName}
                <br />
                {company.street}
                <br />
                {company.zip} {company.city}
              </address>
              <p className="mt-4 text-sm text-ink-muted">
                Das Büro ist nur nach Vereinbarung besetzt. Wir sind meistens auf der Baustelle.
              </p>
            </div>

            <div className="card p-7">
              <h2 className="heading-md text-xl">Bürozeiten</h2>
              <ul className="mt-4 space-y-2 text-[15px]">
                {company.openingHours.map((entry) => (
                  <li key={entry.days} className="flex justify-between gap-4">
                    <span className="text-ink-muted">{entry.days}</span>
                    <span className="font-medium">{entry.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card bg-ink p-7 text-gypsum">
              <h2 className="heading-md text-xl">Konkreter Termin?</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-gypsum/70">
                Über die Online-Anfrage sehen Sie die freien Zeiten sofort und sparen sich das
                Hin und Her.
              </p>
              <Link href="/termin" className="btn-accent mt-5 w-full">
                Termin anfragen
              </Link>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
