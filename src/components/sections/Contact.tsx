import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';
import { ContactForm } from './ContactForm';

export function Contact({ locale, t }: { locale: Locale; t: Dictionary['contact'] }) {
  const details: { icon: IconName; label: string; value: string; href: string; ltr?: boolean }[] = [
    { icon: 'phone', label: t.details.phone, value: site.phoneDisplay, href: `tel:${site.phoneHref}`, ltr: true },
    { icon: 'mail', label: t.details.email, value: site.email, href: `mailto:${site.email}`, ltr: true },
    { icon: 'globe', label: t.details.web, value: site.domain, href: site.url, ltr: true },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-surface py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading id="contact-title" kicker={t.kicker} title={t.title} intro={t.intro} />
          <ul className="flex flex-col gap-4">
            {details.map((d) => (
              <li key={d.label}>
                <a href={d.href} className="group flex items-center gap-4 rounded-2xl border border-line bg-bg p-4 transition hover:border-bright dark:hover:border-sky">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal text-white dark:bg-sky dark:text-night">
                    <Icon name={d.icon} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs text-muted">{d.label}</span>
                    <span dir={d.ltr ? 'ltr' : undefined} className="font-medium text-fg rtl:text-end">{d.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm locale={locale} t={t.form} />
      </Container>
    </section>
  );
}
