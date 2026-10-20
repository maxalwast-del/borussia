'use client';

import { useId, useState } from 'react';
import { Icon } from '@/components/icon';

/**
 * Formularfelder mit Beschriftung im Feld, wie im Bestellprozess von Apple:
 * Die Beschriftung steht groß im leeren Feld und rückt beim Tippen nach oben.
 * Fehler erscheinen direkt am Feld, sobald es verlassen wurde, nicht erst
 * nach dem Absenden.
 */

type Common = {
  label: string;
  error?: string | null;
  hint?: string;
  className?: string;
};

function Message({ id, error, hint }: { id: string; error?: string | null; hint?: string }) {
  if (error) {
    return (
      <p id={id} className="field-error">
        <Icon name="alert" className="mt-[2px] h-4 w-4 shrink-0" strokeWidth={1.9} />
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={id} className="field-note">
        {hint}
      </p>
    );
  }
  return null;
}

export function TextField({
  label,
  error,
  hint,
  className = '',
  ...props
}: Common & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const messageId = `${id}-msg`;
  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className="field"
          {...props}
        />
        <label htmlFor={id} className="field-label">
          {label}
        </label>
      </div>
      <Message id={messageId} error={error} hint={hint} />
    </div>
  );
}

export function TextArea({
  label,
  error,
  hint,
  className = '',
  ...props
}: Common & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const messageId = `${id}-msg`;
  return (
    <div className={className}>
      <div className="relative">
        <textarea
          id={id}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className="field"
          {...props}
        />
        <label htmlFor={id} className="field-label">
          {label}
        </label>
      </div>
      <Message id={messageId} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({
  label,
  error,
  hint,
  className = '',
  children,
  ...props
}: Common & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  const messageId = `${id}-msg`;
  return (
    <div className={className}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className="field"
          {...props}
        >
          {children}
        </select>
        <label htmlFor={id} className="field-label field-label-fixed">
          {label}
        </label>
      </div>
      <Message id={messageId} error={error} hint={hint} />
    </div>
  );
}

export function CheckField({
  children,
  error,
  className = '',
  ...props
}: { children: React.ReactNode; error?: string | null; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const messageId = `${id}-msg`;
  return (
    <div className={className}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 py-1 t-small text-mute">
        <input
          id={id}
          type="checkbox"
          className="check mt-[1px]"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? messageId : undefined}
          {...props}
        />
        <span>{children}</span>
      </label>
      <Message id={messageId} error={error} />
    </div>
  );
}

/**
 * Hält fest, welche Felder schon verlassen wurden. Fehler werden erst danach
 * gezeigt, damit niemand beim ersten Tastendruck rot angemeckert wird.
 */
export function useTouched<K extends string>() {
  const [touched, setTouched] = useState<Partial<Record<K, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  return {
    touch: (key: K) => setTouched((current) => (current[key] ? current : { ...current, [key]: true })),
    show: (key: K) => submitted || Boolean(touched[key]),
    submitAttempt: () => setSubmitted(true),
    reset: () => {
      setTouched({});
      setSubmitted(false);
    },
  };
}

/** Prüfregeln, gleichlautend mit den Zod-Schemata der API-Routen. */
export const rules = {
  name: (value: string) => (value.trim().length >= 2 ? null : 'Bitte geben Sie Ihren Namen an.'),
  email: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? null : 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
  phone: (value: string) =>
    value.replace(/\D/g, '').length >= 6 && value.trim().length >= 6 ? null : 'Bitte geben Sie eine Telefonnummer an.',
  zip: (value: string) => (/^\d{5}$/.test(value) ? null : 'Bitte eine fünfstellige Postleitzahl angeben.'),
  required: (message: string) => (value: string) => (value.trim().length > 0 ? null : message),
  minLength: (length: number, message: string) => (value: string) => (value.trim().length >= length ? null : message),
  privacy: (value: boolean) => (value ? null : 'Bitte bestätigen Sie die Datenschutzhinweise.'),
};

/** Setzt den Fokus auf das erste Feld mit Fehler. */
export function focusFirstInvalid(form: HTMLFormElement | null) {
  requestAnimationFrame(() => {
    const target = form?.querySelector<HTMLElement>('[aria-invalid="true"]');
    target?.focus();
  });
}
