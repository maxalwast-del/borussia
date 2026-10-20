import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';
import { Icon, type IconName } from '@/components/icon';
import { LocalNav } from '@/components/local-nav';
import { PageHero, delay } from '@/components/ui';
import { company } from '@/config/site';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: `Trockenbau in Berlin und Brandenburg. Telefon ${company.phone}, E-Mail ${company.email} oder Kontaktformular.`,
};

const channels: { icon: IconName; label: string; value: string; href: string }[] = [
  { icon: 'phone', label: 'Anrufen', value: company.phone, href: `tel:${company.phoneHref}` },
  { icon: 'mail', label: 'E-Mail schreiben', value: company.email, href: `mailto:${company.email}` },
  { icon: 'message', label: 'WhatsApp', value: 'Nachricht schreiben', href: `https://wa.me/${company.whatsapp}` },
];

export default function KontaktPage() {
  return (
    <>
      <LocalNav title="Kontakt" href="/kontakt" />

      <PageHero
        title={
          <>
            Rufen Sie an.
            <br className="hidden sm:block" />
            <span className="text-mute"> Das geht meistens schneller.</span>
          </>
        }
        lede="Für einen konkreten Termin ist die Online-Anfrage besser. Dort sehen Sie sofort, wann wir Zeit haben."
      />

      <section className="container-page pb-16 sm:pb-20" aria-label="Kontaktwege">
        <ul className="grid gap-4 sm:grid-cols-3">
          {channels.map((channel, index) => (
            <li key={channel.label} data-reveal style={delay(index * 80)}>
              <a
                href={channel.href}
                className="group flex h-full flex-col items-center rounded-tile bg-canvas px-6 py-9 text-center transition-transform duration-300 ease-apple-out hover:scale-[1.01] active:scale-[0.99]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-accent shadow-card">
                  <Icon name={channel.icon} className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <span className="t-card mt-5">{channel.label}</span>
                <span className="mt-1.5 inline-flex items-center gap-0.5 text-accent group-hover:underline">
                  {channel.value}
                  <Icon name="chevron-right" className="h-[0.78em] w-[0.78em]" strokeWidth={2.6} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-canvas py-16 sm:py-24">
        <div className="container-page grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="grid gap-5">
            <div className="rounded-tile bg-white p-8" data-reveal>
              <Icon name="pin" className="h-7 w-7 text-accent" strokeWidth={1.6} />
              <h2 className="t-card mt-4">Anschrift</h2>
              <address className="t-body mt-2 not-italic text-ink-soft">
                {company.legalName}
                <br />
                {company.street}
                <br />
                {company.zip} {company.city}
              </address>
              <p className="t-small mt-4 text-mute">
                Das Büro ist nur nach Vereinbarung besetzt. Wir sind meistens auf der Baustelle.
              </p>
            </div>

            <div className="rounded-tile bg-white p-8" data-reveal style={delay(80)}>
              <Icon name="clock" className="h-7 w-7 text-accent" strokeWidth={1.6} />
              <h2 className="t-card mt-4">Bürozeiten</h2>
              <dl className="mt-3 divide-y divide-line">
                {company.openingHours.map((entry) => (
                  <div key={entry.days} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-mute">{entry.days}</dt>
                    <dd className="font-medium">{entry.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-tile bg-black p-8 text-night-text" data-reveal style={delay(160)}>
              <h2 className="t-card">Konkreter Termin?</h2>
              <p className="t-body mt-2 text-night-mute">
                Über die Online-Anfrage sehen Sie die freien Zeiten sofort und sparen sich das Hin und Her.
              </p>
              <Link href="/termin" className="btn-primary mt-6">
                Termin anfragen
              </Link>
            </div>
          </div>

          <div data-reveal style={delay(120)}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
