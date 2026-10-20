'use client';

import { useRef, useState } from 'react';
import { Icon } from '@/components/icon';
import { CheckField, SelectField, TextArea, TextField, focusFirstInvalid, rules, useTouched } from '@/components/form-field';

type FieldKey = 'name' | 'email' | 'message' | 'privacy';

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    zip: '',
    subject: 'Allgemeine Anfrage',
    message: '',
    privacy: false,
    website: '',
  });
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const touched = useTouched<FieldKey>();

  const errors: Record<FieldKey, string | null> = {
    name: rules.name(form.name),
    email: rules.email(form.email),
    message: rules.minLength(10, 'Bitte schreiben Sie uns mindestens ein, zwei Sätze.')(form.message),
    privacy: rules.privacy(form.privacy),
  };
  const shown = (key: FieldKey) => (touched.show(key) ? errors[key] : null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (Object.values(errors).some(Boolean)) {
      touched.submitAttempt();
      focusFirstInvalid(formRef.current);
      return;
    }
    setState('sending');
    setError(null);
    try {
      const response = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? 'Senden fehlgeschlagen.');
      setState('done');
    } catch (caught) {
      setState('idle');
      setError(caught instanceof Error ? caught.message : 'Unbekannter Fehler.');
    }
  }

  if (state === 'done') {
    return (
      <div className="flex flex-col items-center rounded-tile bg-surface px-8 py-16 text-center" role="status">
        <Icon name="check-circle" className="h-14 w-14 text-accent" strokeWidth={1.4} />
        <h2 className="t-title mt-6">Nachricht ist angekommen.</h2>
        <p className="t-body mx-auto mt-3 max-w-md text-mute">Wir antworten in der Regel innerhalb eines Werktages.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} className="space-y-4 rounded-tile bg-surface p-7 sm:p-10" noValidate>
      <h2 className="t-title pb-2">
        Schreiben Sie uns.
        <span className="text-mute"> Wir melden uns.</span>
      </h2>

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
          label="Telefon (optional)"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_150px]">
        <TextField
          label="E-Mail"
          required
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onBlur={() => touched.touch('email')}
          error={shown('email')}
        />
        <TextField
          label="PLZ (optional)"
          inputMode="numeric"
          maxLength={5}
          autoComplete="postal-code"
          value={form.zip}
          onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/\D/g, '').slice(0, 5) })}
        />
      </div>

      <SelectField label="Betreff" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
        <option>Allgemeine Anfrage</option>
        <option>Angebot / Kostenschätzung</option>
        <option>Laufendes Projekt</option>
        <option>Reklamation</option>
        <option>Zusammenarbeit / Nachunternehmer</option>
      </SelectField>

      <TextArea
        label="Nachricht"
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        onBlur={() => touched.touch('message')}
        error={shown('message')}
      />

      <div aria-hidden="true" className="honeypot">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
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
        gelesen.
      </CheckField>

      {error && (
        <p role="alert" className="flex items-start gap-2 rounded-ctl bg-danger-soft px-4 py-3 t-small font-medium text-danger">
          <Icon name="alert" className="mt-[1px] h-4 w-4 shrink-0" strokeWidth={1.9} />
          {error}
        </p>
      )}

      <div className="pt-2">
        <button type="submit" disabled={state === 'sending'} className="btn-primary w-full sm:w-auto">
          {state === 'sending' ? 'Wird gesendet …' : 'Nachricht senden'}
        </button>
      </div>
    </form>
  );
}
