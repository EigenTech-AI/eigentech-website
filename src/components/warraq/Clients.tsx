import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';

/** Who we work with, and why Madinah. */
export function Clients({ t }: { t: Dictionary['warraqPage']['clients'] }) {
  return (
    <section id="clients" aria-labelledby="clients-title" className="border-t border-line bg-surface py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading id="clients-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((it) => (
            <li key={it.title} className="group flex flex-col gap-4 bg-bg p-7 transition hover:bg-surface">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface text-royal ring-1 ring-line transition group-hover:bg-royal group-hover:text-white dark:text-sky dark:group-hover:bg-sky dark:group-hover:text-night">
                <Icon name={it.icon as IconName} className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-medium text-fg">{it.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{it.text}</p>
            </li>
          ))}
        </ul>
        <aside className="relative overflow-hidden rounded-3xl bg-royal p-8 text-white sm:p-10 dark:bg-surface-2">
          <div aria-hidden="true" className="bg-khatam-sky pointer-events-none absolute inset-0 opacity-80" />
          <div className="relative grid gap-5 lg:grid-cols-[0.35fr_1fr] lg:items-center">
            <h3 className="flex items-center gap-3 font-display text-3xl font-medium">
              <Icon name="pin" className="h-7 w-7 text-sky" />
              {t.bandTitle}
            </h3>
            <p className="text-lg leading-relaxed text-white/85">{t.bandText}</p>
          </div>
        </aside>
      </Container>
    </section>
  );
}
