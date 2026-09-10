'use client';

import { useState } from 'react';
import { company } from '@/config/site';

export function ApplicationForm({ positions }: { positions: string[] }) {
  const [form, setForm] = useState({
    position: positions[0] ?? '',
    name: '',
    email: '',
    phone: '',
    experience: '',
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
      const response = await fetch('/api/bewerbung', {
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
        <h3 className="heading-md">Bewerbung ist angekommen</h3>
        <p className="prose-body mx-auto mt-3 max-w-md">
          Wir melden uns innerhalb weniger Tage. Zeugnisse brauchen wir erst, wenn wir uns
          kennengelernt haben.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-5 p-7 sm:p-8" noValidate>
      <div>
        <span className="field-label">Stelle</span>
        <select
          className="field"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        >
          {positions.map((position) => (
            <option key={position}>{position}</option>
          ))}
          <option>Initiativbewerbung</option>
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="field-label">Name *</span>
          <input
            className="field"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="field-label">Telefon *</span>
          <input
            className="field"
            required
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>
      </div>

      <label className="block">
        <span className="field-label">E-Mail *</span>
        <input
          className="field"
          required
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>

      <label className="block">
        <span className="field-label">Berufserfahrung</span>
        <input
          className="field"
          placeholder="z. B. 5 Jahre Trockenbau, davon 2 als Vorarbeiter"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />
      </label>

      <label className="block">
        <span className="field-label">Kurz zu Ihnen</span>
        <textarea
          className="field min-h-[110px] resize-y"
          placeholder="Ein paar Sätze reichen. Den Lebenslauf können Sie später nachreichen."
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
          Ich bin mit der Verarbeitung meiner Angaben im Bewerbungsverfahren einverstanden
          (<a href="/datenschutz" className="underline hover:text-navy">Datenschutz</a>).
        </span>
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {error}
        </p>
      )}

      <button type="submit" disabled={state === 'sending'} className="btn-brand w-full">
        {state === 'sending' ? 'Wird gesendet …' : 'Bewerbung senden'}
      </button>

      <p className="text-center text-sm text-navy-muted">
        Lieber direkt?{' '}
        <a href={`https://wa.me/${company.whatsapp}`} className="font-medium text-brand hover:underline">
          Per WhatsApp melden
        </a>{' '}
        oder anrufen: {company.phone}
      </p>
    </form>
  );
}
