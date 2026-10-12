import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { Icon, type IconName } from '@/components/ui/Icon';
import { SectionKicker } from '@/components/ui/SectionHeading';
import { ContactForm } from './ContactForm';

export function Contact({ locale, t }: { locale: Locale; t: Dictionary['contact'] }) {
  const details: { icon: IconName; label: string; value: string; href: string; external?: boolean }[] = [
    { icon: 'mail', label: t.details.email, value: site.email, href: `mailto:${site.email}` },
    { icon: 'phone', label: t.details.phone, value: site.phoneDisplay, href: `tel:${site.phoneHref}` },
    { icon: 'linkedin', label: t.details.linkedin, value: 'linkedin.com/company/eigentech-ai', href: site.linkedin, external: true },
    { icon: 'globe', label: t.details.web, value: site.domain, href: site.url },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 sm:py-28">
      <div aria-hidden="true" className="bg-khatam pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_20%_40%,black,transparent)]" />
      <div aria-hidden="true" className="glow pointer-events-none absolute -bottom-40 start-[-10%] h-[34rem] w-[34rem]" />
      <Container className="relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionKicker num={t.num} label={t.label} />
            <h2 id="contact-title" className="text-4xl leading-[1.08] font-medium tracking-tight text-fg sm:text-5xl rtl:leading-[1.3]">{t.title}</h2>
            <p className="max-w-lg text-lg leading-relaxed text-muted">{t.intro}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {details.map((d) => (
              <li key={d.label}>
                <a
                  href={d.href}
                  {...(d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-bg/80 p-4 backdrop-blur transition hover:border-bright dark:hover:border-sky"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal text-white dark:bg-sky dark:text-night">
                    <Icon name={d.icon} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="label-mono text-[0.64rem] text-muted">{d.label}</span>
                    <span dir="ltr" className="truncate font-medium text-fg rtl:text-end">{d.value}</span>
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
