'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { appointmentTypes, bookingRules, company, type AppointmentTypeId } from '@/config/site';
import { matchZone } from '@/lib/zones';

type Slot = { start: string; end: string; label: string };
type Day = { date: string; slots: Slot[] };

const WEEK_LENGTH = 7;

function todayIso(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: bookingRules.timezone }).format(new Date());
}

function shiftIso(iso: string, days: number): string {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatDayLabel(iso: string) {
  const date = new Date(`${iso}T12:00:00Z`);
  return {
    weekday: new Intl.DateTimeFormat('de-DE', { weekday: 'short', timeZone: 'UTC' }).format(date),
    day: new Intl.DateTimeFormat('de-DE', { day: '2-digit', timeZone: 'UTC' }).format(date),
    month: new Intl.DateTimeFormat('de-DE', { month: 'short', timeZone: 'UTC' }).format(date),
  };
}

function formatSelection(iso: string) {
  return new Intl.DateTimeFormat('de-DE', {
    timeZone: bookingRules.timezone,
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function BookingFlow() {
  const [typeId, setTypeId] = useState<AppointmentTypeId>(appointmentTypes[0].id);
  const [weekStart, setWeekStart] = useState(todayIso());
  const [days, setDays] = useState<Day[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    message: '',
    privacy: false,
    website: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ summary: string; hint: string } | null>(null);

  const type = appointmentTypes.find((entry) => entry.id === typeId)!;
  const zone = useMemo(() => (form.zip.length === 5 ? matchZone(form.zip) : null), [form.zip]);
  const isAtStart = weekStart <= todayIso();

  const loadSlots = useCallback(async () => {
    setLoadingSlots(true);
    setCalendarError(null);
    try {
      const response = await fetch(
        `/api/availability?type=${typeId}&from=${weekStart}&days=${WEEK_LENGTH}`,
        { cache: 'no-store' },
      );
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? 'Kalender nicht erreichbar.');
      setDays(payload.days as Day[]);
    } catch (error) {
      setDays([]);
      setCalendarError(
        error instanceof Error
          ? error.message
          : 'Der Kalender ist gerade nicht erreichbar.',
      );
    } finally {
      setLoadingSlots(false);
    }
  }, [typeId, weekStart]);

  // Slots laden, sobald Terminart oder Woche wechseln.
  //
  // Ausnahme von react-hooks/set-state-in-effect: loadSlots setzt vor dem
  // ersten await synchron setLoadingSlots(true), damit beim Wochenwechsel
  // sofort der Ladezustand erscheint. Zieht man den Aufruf hinter das await,
  // entfällt er. Die von der Regel empfohlene Alternative wäre ein
  // Data-Fetching-Layer statt fetch im Effect – ein eigener Umbau.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadSlots();
  }, [loadSlots]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!selected) return;
    setSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, type: typeId, start: selected }),
      });
      const payload = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          setSelected(null);
          void loadSlots();
        }
        throw new Error(payload.error ?? 'Die Anfrage konnte nicht gesendet werden.');
      }
      setSuccess({ summary: payload.summary, hint: payload.hint });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unbekannter Fehler.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="card mx-auto max-w-xl p-8 text-center sm:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-soft">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="heading-md mt-6">Anfrage ist raus</h2>
        <p className="prose-body mt-3">{success.summary}</p>
        <p className="prose-body mt-4">
          Der Termin ist vorgemerkt, aber noch nicht verbindlich. Sobald wir zugesagt haben,
          bekommen Sie die Bestätigung per E-Mail. {bookingRules.responseTimePromise}.
        </p>
        <p className="mt-6 text-sm text-navy-muted">{success.hint}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div className="space-y-10">
        {/* Schritt 1 */}
        <section>
          <StepHeading step={1} title="Worum geht es?" />
          <div className="mt-5 grid gap-3">
            {appointmentTypes.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => {
                  setTypeId(entry.id);
                  // Terminart gewechselt: bisherige Auswahl ist nicht mehr gültig.
                  setSelected(null);
                }}
                aria-pressed={entry.id === typeId}
                className={`rounded-card border p-5 text-left transition ${
                  entry.id === typeId
                    ? 'border-brand bg-brand-soft/40 shadow-card'
                    : 'border-navy/12 bg-white hover:border-navy/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{entry.label}</p>
                    <p className="prose-body mt-1.5">{entry.description}</p>
                  </div>
                  <span className="whitespace-nowrap rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy-soft">
                    {entry.durationMinutes} Min.
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-brand-hover">{entry.price}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Schritt 2 */}
        <section>
          <StepHeading step={2} title="Wunschtermin wählen" />
          <p className="prose-body mt-2">
            Angezeigt werden nur Zeiten, die im Kalender tatsächlich frei sind. Die Fahrzeit
            zwischen den Baustellen ist dabei schon abgezogen.
          </p>

          <div className="mt-5 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setWeekStart(shiftIso(weekStart, -WEEK_LENGTH))}
              disabled={isAtStart}
              className="btn-ghost px-4 py-2 text-sm"
            >
              ← Früher
            </button>
            <p className="text-sm font-medium text-navy-muted">
              {formatDayLabel(weekStart).day}. {formatDayLabel(weekStart).month} –{' '}
              {formatDayLabel(shiftIso(weekStart, WEEK_LENGTH - 1)).day}.{' '}
              {formatDayLabel(shiftIso(weekStart, WEEK_LENGTH - 1)).month}
            </p>
            <button
              type="button"
              onClick={() => setWeekStart(shiftIso(weekStart, WEEK_LENGTH))}
              className="btn-ghost px-4 py-2 text-sm"
            >
              Später →
            </button>
          </div>

          {calendarError ? (
            <div className="mt-5 rounded-card border border-brand/30 bg-brand-soft/40 p-6">
              <p className="font-semibold">{calendarError}</p>
              <p className="prose-body mt-2">
                Rufen Sie uns bitte direkt an, wir finden sofort einen Termin:{' '}
                <a href={`tel:${company.phoneHref}`} className="font-semibold text-brand-hover underline">
                  {company.phone}
                </a>
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {loadingSlots
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-36 animate-pulse rounded-card bg-white/70" />
                  ))
                : days.map((day) => {
                    const label = formatDayLabel(day.date);
                    return (
                      <div
                        key={day.date}
                        className={`rounded-card border p-4 ${
                          day.slots.length ? 'border-navy/12 bg-white' : 'border-dashed border-navy/12 bg-transparent'
                        }`}
                      >
                        <p className="text-sm font-semibold">
                          {label.weekday} {label.day}. {label.month}
                        </p>
                        {day.slots.length === 0 ? (
                          <p className="mt-3 text-sm text-navy-muted/70">keine freien Zeiten</p>
                        ) : (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {day.slots.map((slot) => (
                              <button
                                key={slot.start}
                                type="button"
                                onClick={() => setSelected(slot.start)}
                                aria-pressed={selected === slot.start}
                                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                                  selected === slot.start
                                    ? 'bg-brand text-white'
                                    : 'bg-paper text-navy-soft hover:bg-navy hover:text-paper'
                                }`}
                              >
                                {slot.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
            </div>
          )}
        </section>

        {/* Schritt 3 */}
        <section>
          <StepHeading step={3} title="Kontaktdaten" />
          <form onSubmit={submit} className="mt-5 space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" required>
                <input
                  className="field"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>
              <Field label="Telefon" required hint="Für kurzfristige Rückfragen">
                <input
                  className="field"
                  required
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </Field>
            </div>

            <Field label="E-Mail" required hint="Hierhin geht die Bestätigung">
              <input
                className="field"
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
              <Field label="Straße und Hausnummer des Objekts" required>
                <input
                  className="field"
                  required
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </Field>
              <Field label="PLZ" required>
                <input
                  className="field"
                  required
                  inputMode="numeric"
                  maxLength={5}
                  autoComplete="postal-code"
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/\D/g, '').slice(0, 5) })}
                />
              </Field>
            </div>

            {zone && (
              <div
                className={`rounded-xl p-4 text-sm leading-relaxed ${
                  zone.inside ? 'bg-brand-soft/50 text-navy-soft' : 'bg-navy/5 text-navy-soft'
                }`}
              >
                <strong>{zone.label}</strong> · {zone.surcharge}
                <br />
                {zone.note}
              </div>
            )}

            <Field label="Was ist geplant?" hint="Räume, Quadratmeter, Zeitrahmen. Je konkreter, desto genauer das Angebot">
              <textarea
                className="field min-h-[130px] resize-y"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </Field>

            {/* Honeypot: für Menschen unsichtbar */}
            <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
              <label>
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </label>
            </div>

            <label className="flex items-start gap-3 text-sm leading-relaxed text-navy-muted">
              <input
                type="checkbox"
                required
                checked={form.privacy}
                onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-navy/30 text-brand focus:ring-brand"
              />
              <span>
                Ich habe die <a href="/datenschutz" className="underline hover:text-navy">Datenschutzhinweise</a> gelesen
                und bin mit der Verarbeitung meiner Angaben zur Terminbearbeitung einverstanden.
              </span>
            </label>

            {formError && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                {formError}
              </p>
            )}

            <button type="submit" disabled={!selected || submitting} className="btn-brand w-full sm:w-auto">
              {submitting ? 'Wird gesendet …' : 'Termin verbindlich anfragen'}
            </button>
            {!selected && (
              <p className="text-sm text-navy-muted">Bitte oben zuerst einen Zeitpunkt auswählen.</p>
            )}
          </form>
        </section>
      </div>

      {/* Zusammenfassung */}
      <aside className="card sticky top-24 p-7">
        <p className="eyebrow">Ihre Auswahl</p>
        <p className="heading-md mt-3 text-xl">{type.label}</p>
        <p className="prose-body mt-2">{type.description}</p>

        <dl className="mt-6 space-y-3 border-t border-navy/10 pt-6 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-navy-muted">Dauer</dt>
            <dd className="font-medium">{type.durationMinutes} Minuten</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-navy-muted">Kosten</dt>
            <dd className="font-medium">{type.price}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-navy-muted">Zeitpunkt</dt>
            <dd className="text-right font-medium">
              {selected ? formatSelection(selected) : 'noch nicht gewählt'}
            </dd>
          </div>
        </dl>

        <div className="mt-6 rounded-xl bg-paper p-4 text-sm leading-relaxed text-navy-muted">
          Die gewählte Zeit ist ab sofort für andere gesperrt. Verbindlich wird der Termin mit
          unserer Bestätigungsmail. {bookingRules.responseTimePromise}.
        </div>

        <a href={`tel:${company.phoneHref}`} className="btn-ghost mt-5 w-full">
          Lieber telefonisch: {company.phone}
        </a>
      </aside>
    </div>
  );
}

function StepHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-sm font-semibold text-paper">
        {step}
      </span>
      <h2 className="heading-md text-xl">{title}</h2>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="field-label">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-navy-muted">{hint}</span>}
    </label>
  );
}
