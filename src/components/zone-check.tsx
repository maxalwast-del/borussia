'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { matchZone } from '@/lib/zones';

/**
 * Postleitzahl direkt auf der Startseite prüfen.
 *
 * Nutzt dieselbe Zonenlogik wie das Buchungsformular. Wer hier eine PLZ
 * eingibt, sieht sofort, ob die Adresse im Einsatzgebiet liegt, und nimmt die
 * Eingabe über den Link in die Terminanfrage mit.
 */
export function ZoneCheck() {
  const [zip, setZip] = useState('');
  const zone = useMemo(() => (zip.length === 5 ? matchZone(zip) : null), [zip]);

  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-center gap-2.5">
        <label htmlFor="zone-check-zip" className="sr-only">
          Postleitzahl
        </label>
        <input
          id="zone-check-zip"
          name="zip"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="PLZ"
          aria-describedby="zone-check-hint"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
          className="field w-[130px] flex-none"
        />
        <Link href={zip.length === 5 ? `/termin?plz=${zip}` : '/termin'} className="btn-primary">
          Verfügbarkeit prüfen
        </Link>
      </div>
      <p id="zone-check-hint" className="mt-2 text-xs text-navy-muted">
        Fünfstellig. Sie sehen sofort, ob Ihre Adresse im Einsatzgebiet liegt.
      </p>
      {zone && (
        <p
          className={`mt-3.5 rounded-xl p-4 text-sm leading-relaxed ${
            zone.inside ? 'bg-brand-soft/50 text-navy-soft' : 'bg-navy/5 text-navy-soft'
          }`}
          role="status"
        >
          <strong>{zone.label}</strong> · {zone.surcharge}
          <br />
          {zone.note}
        </p>
      )}
    </div>
  );
}
