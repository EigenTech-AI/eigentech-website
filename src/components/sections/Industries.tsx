import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';

export function Industries({ t }: { t: Dictionary['industries'] }) {
  return (
    <section id="industries" aria-labelledby="industries-title" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading id="industries-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {t.items.map((it) => (
            <li key={it.key} className="group flex min-h-36 flex-col justify-between gap-6 bg-bg p-6 transition hover:bg-surface">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface text-royal ring-1 ring-line transition group-hover:bg-royal group-hover:text-white dark:text-sky dark:group-hover:bg-sky dark:group-hover:text-night">
                <Icon name={it.key as IconName} className="h-5 w-5" />
              </span>
              <h3 className="text-base font-medium leading-snug text-fg">{it.title}</h3>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
