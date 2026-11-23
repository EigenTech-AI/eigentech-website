import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/sections/ContactForm';
import { WHead } from './WarraqMark';

/** Contact on the Warraq site: the details as a ruled list in the margin, the form in a framed panel. */
export function WarraqContact({ locale, t }: { locale: Locale; t: Dictionary['contact'] }) {
  const rows: { label: string; value: string; href?: string; ltr?: boolean }[] = [
    { label: t.details.email, value: site.email, href: `mailto:${site.email}`, ltr: true },
    { label: t.details.phone, value: site.phoneDisplay, href: `tel:${site.phoneHref}`, ltr: true },
    { label: t.details.address, value: t.address },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <WHead id="contact-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <dl className="border-t border-rule lg:col-span-3">
            {rows.map((r) => (
              <div key={r.label} className="flex flex-col gap-1 border-b border-rule py-4">
                <dt className="text-xs font-medium text-wmuted">{r.label}</dt>
                <dd className="leading-relaxed text-wtext">
                  {r.href ? (
                    <a href={r.href} dir={r.ltr ? 'ltr' : undefined} className="font-medium text-wink hover:underline">{r.value}</a>
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="w-frame bg-paper-2 p-2 sm:p-3 lg:col-span-9">
            <ContactForm locale={locale} t={t.form} />
          </div>
        </div>
      </Container>
    </section>
  );
}
