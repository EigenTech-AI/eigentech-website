import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

/** The two ways to work with EigenTech: processing under NDA, and Warraq for the client's organisation. */
export function WorkModels({ t }: { t: Dictionary['warraqPage']['models'] }) {
  return (
    <section id="models" aria-labelledby="models-title" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading id="models-title" num={t.num} label={t.label} title={t.title} />
        <div className="grid gap-6 lg:grid-cols-2">
          {t.items.map((m, i) => (
            <article key={m.title} className="flex flex-col gap-6 rounded-[1.75rem] border border-line bg-bg p-8 transition hover:border-bright/60 hover:shadow-2xl hover:shadow-royal/10 dark:hover:border-sky/50">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-royal font-display text-xl text-white dark:bg-sky dark:text-night">{i + 1}</span>
                <h3 className="text-2xl leading-snug font-medium text-fg">{m.title}</h3>
              </div>
              <p className="leading-relaxed text-muted">{m.text}</p>
              <ul className="mt-auto flex flex-col gap-2.5 border-t border-line pt-5">
                {m.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-fg">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-bright dark:text-sky" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-surface p-5 ring-1 ring-line sm:flex-row sm:items-center sm:ps-6">
          <p className="flex items-center gap-3 font-medium text-fg">
            <Icon name="lock" className="h-5 w-5 shrink-0 text-bright dark:text-sky" />
            {t.note}
          </p>
          <ButtonLink href="#contact" className="shrink-0">
            {t.cta}
            <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
