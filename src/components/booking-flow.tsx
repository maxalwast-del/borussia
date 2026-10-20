'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { appointmentTypes, bookingRules, company, type AppointmentTypeId } from '@/config/site';
import { matchZone } from '@/lib/zones';
import { Icon } from '@/components/icon';
import { CheckField, TextArea, TextField, focusFirstInvalid, rules, useTouched } from '@/components/form-field';

type Slot = { start: string; end: string; label: string };
type Day = { date: string; slots: Slot[] };
type FieldKey = 'name' | 'phone' | 'email' | 'address' | 'zip' | 'privacy';

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
    weekday: new Intl.DateTimeFormat('de-DE', { weekday: 'long', timeZone: 'UTC' }).format(date),
    day: new Intl.DateTimeFormat('de-DE', { day: 'numeric', timeZone: 'UTC' }).format(date),
    month: new Intl.DateTimeFormat('de-DE', { month: 'short', timeZone: 'UTC' }).format(date),
  };
}

function formatSelection(iso: string) {
  return new Intl.DateTimeFormat('de-DE', {
    timeZone: bookingRules.timezone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

/**
 * Terminanfrage im Aufbau eines Produktkonfigurators: Terminart, Zeitpunkt,
 * Angaben, rechts eine mitlaufende Zusammenfassung. Die Logik (Abfrage der
 * freien Zeiten, Sperren des Slots, Konfliktbehandlung) ist unverändert.
 */
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
  const formRef = useRef<HTMLFormElement>(null);
  const touched = useTouched<FieldKey>();

  const type = appointmentTypes.find((entry) => entry.id === typeId)!;
  const zone = useMemo(() => (form.zip.length === 5 ? matchZone(form.zip) : null), [form.zip]);
  const isAtStart = weekStart <= todayIso();

  const errors: Record<FieldKey, string | null> = {
    name: rules.name(form.name),
    phone: rules.phone(form.phone),
    email: rules.email(form.email),
    address: rules.minLength(4, 'Bitte geben Sie Straße und Hausnummer an.')(form.address),
    zip: rules.zip(form.zip),
    privacy: rules.privacy(form.privacy),
  };
  const shown = (key: FieldKey) => (touched.show(key) ? errors[key] : null);

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

  useEffect(() => {
    void loadSlots();
  }, [loadSlots]);

  // Terminart gewechselt: bisherige Auswahl ist nicht mehr gültig.
  useEffect(() => setSelected(null), [typeId]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!selected) return;
    if (Object.values(errors).some(Boolean)) {
      touched.submitAttempt();
      focusFirstInvalid(formRef.current);
      return;
    }
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unbekannter Fehler.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-[692px] py-10 text-center sm:py-16" role="status">
        <svg viewBox="0 0 52 52" className="mx-auto h-16 w-16 text-accent" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <circle cx="26" cy="26" r="24" className="success-ring" pathLength={1} />
          <path d="m16 27 7 7 14-15" strokeLinecap="round" strokeLinejoin="round" className="success-check" pathLength={1} />
        </svg>
        <h2 className="t-headline mt-8">Anfrage ist raus.</h2>
        <p className="t-intro mx-auto mt-5 max-w-[560px] text-mute">{success.summary}</p>
        <p className="t-body mx-auto mt-6 max-w-[560px] text-ink-soft">
          Der Termin ist vorgemerkt, aber noch nicht verbindlich. Sobald wir zugesagt haben,
          bekommen Sie die Bestätigung per E-Mail. {bookingRules.responseTimePromise}.
        </p>
        <p className="t-small mt-6 text-mute">{success.hint}</p>
      </div>
    );
  }

  const weekEnd = shiftIso(weekStart, WEEK_LENGTH - 1);

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
      <div className="space-y-16 sm:space-y-20">
        {/* Terminart */}
        <section aria-labelledby="schritt-art">
          <StepTitle id="schritt-art" step={1} title="Terminart." sub="Worum geht es?" />
          <div className="mt-6 grid gap-3">
            {appointmentTypes.map((entry) => {
              const active = entry.id === typeId;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setTypeId(entry.id)}
                  aria-pressed={active}
                  className={`rounded-ctl border bg-surface p-5 text-left transition-[border-color,box-shadow,transform] duration-200 active:scale-[0.99] ${
                    active
                      ? 'border-accent shadow-[0_0_0_1px_rgb(var(--c-accent))]'
                      : 'border-faint/60 hover:border-faint'
                  }`}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-semibold">{entry.label}</span>
                    <span className="t-small shrink-0 text-mute">{entry.durationMinutes} Min.</span>
                  </span>
                  <span className="t-small mt-1.5 block text-mute">{entry.description}</span>
                  <span className="t-small mt-3 block font-medium text-ink-soft">{entry.price}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Zeitpunkt */}
        <section aria-labelledby="schritt-zeit">
          <StepTitle id="schritt-zeit" step={2} title="Termin." sub="Wann passt es Ihnen?" />
          <p className="t-body mt-3 text-mute">
            Angezeigt werden nur Zeiten, die im Kalender tatsächlich frei sind. Die Fahrzeit
            zwischen den Baustellen ist dabei schon abgezogen.
          </p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              className="paddle"
              onClick={() => setWeekStart(shiftIso(weekStart, -WEEK_LENGTH))}
              disabled={isAtStart}
              aria-label="Frühere Woche"
            >
              <Icon name="chevron-left" className="h-4 w-4" strokeWidth={2.4} />
            </button>
            <p className="t-body font-semibold" aria-live="polite">
              {formatDayLabel(weekStart).day}. {formatDayLabel(weekStart).month} –{' '}
              {formatDayLabel(weekEnd).day}. {formatDayLabel(weekEnd).month}
            </p>
            <button
              type="button"
              className="paddle"
              onClick={() => setWeekStart(shiftIso(weekStart, WEEK_LENGTH))}
              aria-label="Spätere Woche"
            >
              <Icon name="chevron-right" className="h-4 w-4" strokeWidth={2.4} />
            </button>
          </div>

          {calendarError ? (
            <div className="mt-6 rounded-card bg-well p-6 sm:p-8" role="alert">
              <Icon name="calendar" className="h-8 w-8 text-mute" strokeWidth={1.5} />
              <p className="t-card mt-4">{calendarError}</p>
              <p className="t-body mt-2 text-mute">
                Rufen Sie uns bitte direkt an, wir finden sofort einen Termin.
              </p>
              <a href={`tel:${company.phoneHref}`} className="btn-primary mt-6">
                <Icon name="phone" className="h-4 w-4" strokeWidth={1.8} />
                {company.phone}
              </a>
            </div>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {loadingSlots
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="skeleton h-40 rounded-card" aria-hidden="true" />
                  ))
                : days.map((day) => {
                    const label = formatDayLabel(day.date);
                    return (
                      <div key={day.date} className="rounded-card bg-well p-5">
                        <p className="font-semibold">
                          {label.weekday}
                          <span className="font-normal text-mute">
                            {' '}
                            {label.day}. {label.month}
                          </span>
                        </p>
                        {day.slots.length === 0 ? (
                          <p className="t-small mt-3 text-mute">Keine freien Zeiten</p>
                        ) : (
                          <div className="mt-3.5 flex flex-wrap gap-2">
                            {day.slots.map((slot) => {
                              const active = selected === slot.start;
                              return (
                                <button
                                  key={slot.start}
                                  type="button"
                                  onClick={() => setSelected(slot.start)}
                                  aria-pressed={active}
                                  aria-label={`${label.weekday}, ${label.day}. ${label.month}, ${slot.label} Uhr`}
                                  className={`min-h-[44px] rounded-full px-4 text-[0.9375rem] tabular-nums transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.96] ${
                                    active
                                      ? 'border border-action bg-action font-medium text-white'
                                      : 'border border-line bg-chip text-ink hover:border-accent hover:text-accent'
                                  }`}
                                >
                                  {slot.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
            </div>
          )}
        </section>

        {/* Angaben */}
        <section aria-labelledby="schritt-angaben">
          <StepTitle id="schritt-angaben" step={3} title="Ihre Angaben." sub="Wohin kommen wir?" />
          <form ref={formRef} onSubmit={submit} className="mt-6 space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Name"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onBlur={() => touched.touch('name')}
                error={shown('name')}
              />
              <TextField
                label="Telefon"
                required
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                onBlur={() => touched.touch('phone')}
                error={shown('phone')}
                hint="Für kurzfristige Rückfragen"
              />
            </div>

            <TextField
              label="E-Mail"
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={() => touched.touch('email')}
              error={shown('email')}
              hint="Hierhin geht die Bestätigung"
            />

            <div className="grid gap-4 sm:grid-cols-[1fr_150px]">
              <TextField
                label="Straße und Hausnummer des Objekts"
                required
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                onBlur={() => touched.touch('address')}
                error={shown('address')}
              />
              <TextField
                label="PLZ"
                required
                inputMode="numeric"
                maxLength={5}
                autoComplete="postal-code"
                value={form.zip}
                onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/\D/g, '').slice(0, 5) })}
                onBlur={() => touched.touch('zip')}
                error={shown('zip')}
              />
            </div>

            {zone && (
              <div className="fade-in flex items-start gap-3 rounded-ctl bg-well p-4 t-small" role="status">
                <Icon
                  name={zone.inside ? 'check-circle' : 'pin'}
                  className={`mt-[1px] h-5 w-5 shrink-0 ${zone.inside ? 'text-accent' : 'text-mute'}`}
                  strokeWidth={1.7}
                />
                <p className="text-ink-soft">
                  <strong className="font-semibold text-ink">{zone.label}</strong> · {zone.surcharge}
                  <br />
                  {zone.note}
                </p>
              </div>
            )}

            <TextArea
              label="Was ist geplant?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              hint="Räume, Quadratmeter, Zeitrahmen. Je konkreter, desto genauer das Angebot."
            />

            {/* Honeypot: für Menschen unsichtbar */}
            <div aria-hidden="true" className="honeypot">
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

            <CheckField
              required
              checked={form.privacy}
              onChange={(e) => {
                setForm({ ...form, privacy: e.target.checked });
                touched.touch('privacy');
              }}
              error={shown('privacy')}
              className="pt-2"
            >
              Ich habe die{' '}
              <a href="/datenschutz" className="link">
                Datenschutzhinweise
              </a>{' '}
              gelesen und bin mit der Verarbeitung meiner Angaben zur Terminbearbeitung einverstanden.
            </CheckField>

            {/* Zusammenfassung auf kleinen Bildschirmen, direkt über dem Absenden */}
            <div className="rounded-card bg-well p-5 lg:hidden">
              <p className="t-caption font-semibold text-mute">Ihre Auswahl</p>
              <p className="mt-1 font-semibold">{type.label}</p>
              <p className="t-small mt-0.5 text-ink-soft">
                {selected ? `${formatSelection(selected)} Uhr` : 'Noch kein Zeitpunkt gewählt'}
              </p>
            </div>

            {formError && (
              <p role="alert" className="flex items-start gap-2 rounded-ctl bg-danger-soft px-4 py-3 t-small font-medium text-danger">
                <Icon name="alert" className="mt-[1px] h-4 w-4 shrink-0" strokeWidth={1.9} />
                {formError}
              </p>
            )}

            <div className="pt-2">
              <button type="submit" disabled={!selected || submitting} className="btn-primary w-full sm:w-auto">
                {submitting ? 'Wird gesendet …' : 'Termin verbindlich anfragen'}
              </button>
              {!selected && (
                <p className="t-small mt-3 text-mute">Bitte oben zuerst einen Zeitpunkt auswählen.</p>
              )}
            </div>
          </form>
        </section>
      </div>

      {/* Mitlaufende Zusammenfassung */}
      <aside className="hidden lg:block" aria-label="Ihre Auswahl">
        <div className="sticky top-[76px] rounded-tile bg-well p-7">
          <p className="t-caption font-semibold text-mute">Ihre Auswahl</p>
          <p className="t-card mt-2">{type.label}</p>
          <p className="t-small mt-2 text-mute">{type.description}</p>

          <dl className="mt-6 divide-y divide-line border-y border-line t-small">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-mute">Dauer</dt>
              <dd className="font-medium">{type.durationMinutes} Minuten</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-mute">Kosten</dt>
              <dd className="text-right font-medium">{type.price}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-mute">Zeitpunkt</dt>
              <dd className={`text-right font-medium ${selected ? 'text-ink' : 'text-mute'}`}>
                {selected ? `${formatSelection(selected)} Uhr` : 'noch nicht gewählt'}
              </dd>
            </div>
          </dl>

          <p className="t-small mt-5 text-ink-soft">
            Die gewählte Zeit ist ab sofort für andere gesperrt. Verbindlich wird der Termin mit
            unserer Bestätigungsmail. {bookingRules.responseTimePromise}.
          </p>

          <a href={`tel:${company.phoneHref}`} className="link mt-5 inline-flex items-center gap-1.5 t-small">
            <Icon name="phone" className="h-3.5 w-3.5" strokeWidth={1.9} />
            Lieber telefonisch: {company.phone}
          </a>
        </div>
      </aside>
    </div>
  );
}

function StepTitle({ id, step, title, sub }: { id: string; step: number; title: string; sub: string }) {
  return (
    <h2 id={id} className="t-title">
      <span className="sr-only">Schritt {step}: </span>
      {title}
      <span className="text-mute"> {sub}</span>
    </h2>
  );
}
