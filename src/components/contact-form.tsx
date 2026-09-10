'use client';

import { useState } from 'react';

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

  async function submit(event: React.FormEvent) {
    event.preventDefault();
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
      <div className="card p-8 text-center">
        <h2 className="heading-md">Nachricht ist angekommen</h2>
        <p className="prose-body mx-auto mt-3 max-w-md">
          Wir antworten in der Regel innerhalb eines Werktages.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-5 p-7 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="field-label">Name *</span>
          <input className="field" required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className="block">
          <span className="field-label">Telefon</span>
          <input className="field" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
        <label className="block">
          <span className="field-label">E-Mail *</span>
          <input className="field" required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label className="block">
          <span className="field-label">PLZ</span>
          <input
            className="field"
            inputMode="numeric"
            maxLength={5}
            autoComplete="postal-code"
            value={form.zip}
            onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/\D/g, '').slice(0, 5) })}
          />
        </label>
      </div>

      <label className="block">
        <span className="field-label">Betreff</span>
        <select className="field" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
          <option>Allgemeine Anfrage</option>
          <option>Angebot / Kostenschätzung</option>
          <option>Laufendes Projekt</option>
          <option>Reklamation</option>
          <option>Zusammenarbeit / Nachunternehmer</option>
        </select>
      </label>

      <label className="block">
        <span className="field-label">Nachricht *</span>
        <textarea
          className="field min-h-[150px] resize-y"
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </label>

      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
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
          Ich habe die <a href="/datenschutz" className="underline hover:text-navy">Datenschutzhinweise</a> gelesen.
        </span>
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {error}
        </p>
      )}

      <button type="submit" disabled={state === 'sending'} className="btn-brand w-full sm:w-auto">
        {state === 'sending' ? 'Wird gesendet …' : 'Nachricht senden'}
      </button>
    </form>
  );
}
