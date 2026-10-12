import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';

export function Services({ t }: { t: Dictionary['services'] }) {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-surface py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading id="services-title" kicker={t.kicker} title={t.title} intro={t.intro} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((s) => (
            <li key={s.key} className="group flex flex-col gap-4 rounded-3xl border border-line bg-bg p-7 transition duration-300 hover:-translate-y-0.5 hover:border-bright hover:shadow-lg hover:shadow-royal/10 dark:hover:border-sky">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal/8 text-royal ring-1 ring-royal/15 dark:bg-sky/10 dark:text-sky dark:ring-sky/20">
                <Icon name={s.key as IconName} className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-medium text-fg">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
