import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Tags } from '@/components/ui/Tag';

export function Services({ t }: { t: Dictionary['services'] }) {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading id="services-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((s, i) => (
            <li key={s.key} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-bg transition duration-300 hover:-translate-y-1 hover:border-bright/60 hover:shadow-xl hover:shadow-royal/10 dark:hover:border-sky/50">
              {/* Illustrated header: grid, glow and the service icon */}
              <div className="relative h-36 overflow-hidden border-b border-line bg-gradient-to-br from-surface to-surface-2 dark:from-surface dark:to-surface-2">
                <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-80" />
                <div aria-hidden="true" className="glow absolute -end-10 -top-10 h-48 w-48 transition duration-500 group-hover:scale-125" />
                <span className="label-mono absolute start-5 top-4 text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="absolute bottom-5 start-5 grid h-14 w-14 place-items-center rounded-2xl bg-royal text-white shadow-lg shadow-royal/25 dark:bg-sky dark:text-night">
                  <Icon name={s.key as IconName} className="h-7 w-7" />
                </span>
                <Icon name={s.key as IconName} className="absolute -end-4 -bottom-6 h-36 w-36 text-bright/10 dark:text-sky/10" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-xl font-medium text-fg">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{s.text}</p>
                <div className="mt-auto pt-3">
                  <Tags items={s.tags} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
