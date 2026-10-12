'use client';

import { useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { basePath, contactEndpoint, site } from '@/lib/site';
import { emptyContact, validateContact, type ContactErrors, type ContactValues } from '@/lib/validate-contact';
import { Button } from '@/components/ui/Button';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'failed';
type Field = keyof ContactErrors;

const fieldCls = (bad?: boolean) =>
  `w-full rounded-2xl border bg-bg px-4 py-3 text-base text-fg placeholder:text-muted/70 transition focus:outline-none focus:ring-2 focus:ring-bright/40 dark:focus:ring-sky/40 ${
    bad ? 'border-red-500 dark:border-red-400' : 'border-line focus:border-bright dark:focus:border-sky'
  }`;

export function ContactForm({ locale, t }: { locale: Locale; t: Dictionary['contact']['form'] }) {
  const [v, setV] = useState<ContactValues>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [attempted, setAttempted] = useState(false);
  const summaryRef = useRef<HTMLParagraphElement>(null);

  const set = <K extends keyof ContactValues>(k: K, val: ContactValues[K]) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (touched[k as Field]) setErrors(validateContact(next));
  };
  const blur = (k: Field) => {
    setTouched((s) => ({ ...s, [k]: true }));
    setErrors(validateContact(v));
  };
  const show = (k: Field) => !!errors[k] && (touched[k] || attempted);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateContact(v);
    setErrors(errs);
    setAttempted(true);
    if (Object.keys(errs).length) {
      setStatus('idle');
      // Move focus to the first invalid field once the error messages have rendered.
      const first = (['name', 'email', 'interest', 'message', 'consent'] as Field[]).find((k) => errs[k]);
      setTimeout(() => (first ? document.getElementById(`cf-${first}`)?.focus() : summaryRef.current?.focus()), 0);
      return;
    }
    if (v.website) { setStatus('sent'); return; } // bot filled the honeypot

    const payload = {
      name: v.name.trim(), email: v.email.trim(), organisation: v.organisation.trim(), interest: v.interest,
      message: v.message.trim(), language: locale, page: `${basePath}/${locale}/`,
    };

    if (!contactEndpoint) {
      const body = `${payload.message}\n\n—\n${payload.name}\n${payload.email}${payload.organisation ? `\n${payload.organisation}` : ''}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`EigenTech enquiry: ${payload.interest}`)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, _subject: `EigenTech enquiry: ${payload.interest}`, _replyto: payload.email }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setV(emptyContact);
      setTouched({});
      setAttempted(false);
    } catch {
      setStatus('failed');
    }
  }

  const hasErrors = attempted && Object.keys(errors).length > 0;
  const errText = (k: Field) => (show(k) ? <p id={`cf-${k}-err`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">{t.errors[k]}</p> : null);
  const aria = (k: Field) => ({ 'aria-invalid': show(k) || undefined, 'aria-describedby': show(k) ? `cf-${k}-err` : undefined });

  if (status === 'sent' || status === 'mailto') {
    return (
      <div role="status" className="flex flex-col gap-4 rounded-3xl border border-line bg-bg p-8">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-royal text-white">✓</span>
        <p className="text-lg text-fg">{status === 'sent' ? t.success : t.mailtoSuccess}</p>
        {status === 'mailto' ? <a href={`mailto:${site.email}`} className="text-sm font-semibold text-link">{site.email}</a> : null}
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="relative flex flex-col gap-5 rounded-3xl border border-line bg-bg p-6 sm:p-8">
      {hasErrors ? (
        <p ref={summaryRef} tabIndex={-1} role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {t.summary}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-fg">{t.name}</label>
          <input id="cf-name" name="name" autoComplete="name" value={v.name} onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')} className={fieldCls(show('name'))} {...aria('name')} />
          {errText('name')}
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-fg">{t.email}</label>
          <input id="cf-email" name="email" type="email" dir="ltr" autoComplete="email" inputMode="email" value={v.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')} className={`${fieldCls(show('email'))} rtl:text-end`} {...aria('email')} />
          {errText('email')}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-organisation" className="mb-1.5 block text-sm font-medium text-fg">
            {t.organisation} <span className="font-normal text-muted">({t.optional})</span>
          </label>
          <input id="cf-organisation" name="organisation" autoComplete="organization" value={v.organisation} onChange={(e) => set('organisation', e.target.value)} className={fieldCls()} />
        </div>
        <div>
          <label htmlFor="cf-interest" className="mb-1.5 block text-sm font-medium text-fg">{t.interest}</label>
          <select id="cf-interest" name="interest" value={v.interest} onChange={(e) => set('interest', e.target.value)} onBlur={() => blur('interest')} className={fieldCls(show('interest'))} {...aria('interest')}>
            <option value="" disabled>—</option>
            {t.interests.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {errText('interest')}
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-fg">{t.message}</label>
        <textarea id="cf-message" name="message" rows={5} placeholder={t.messageHint} value={v.message} onChange={(e) => set('message', e.target.value)} onBlur={() => blur('message')} className={`${fieldCls(show('message'))} resize-y`} {...aria('message')} />
        {errText('message')}
      </div>

      {/* Honeypot for bots: hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set('website', e.target.value)} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-fg">
          <input id="cf-consent" type="checkbox" checked={v.consent} onChange={(e) => set('consent', e.target.checked)} onBlur={() => blur('consent')} className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-royal dark:accent-sky" {...aria('consent')} />
          <span>
            {t.consent}{' '}
            <a href={`${basePath}/${locale}/privacy/`} className="font-semibold text-link underline-offset-2 hover:underline">{t.privacy}</a>
          </span>
        </label>
        {errText('consent')}
      </div>

      {status === 'failed' ? (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {t.failure} <a href={`mailto:${site.email}`} className="font-semibold underline">{site.email}</a>
        </p>
      ) : null}

      <Button type="submit" disabled={status === 'sending'} className="w-full py-3 text-base sm:w-fit sm:px-8">
        {status === 'sending' ? t.sending : t.submit}
      </Button>
    </form>
  );
}
