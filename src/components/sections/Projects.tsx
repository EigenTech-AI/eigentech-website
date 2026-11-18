import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Tags } from '@/components/ui/Tag';
import { toArabicDigits } from '@/components/brand/MarkGlyph';

const ICON: Record<string, IconName> = { hadith: 'book', quran: 'audio', cyber: 'shield' };

/** The other projects, in brief (Warraq, the main project, has its own section above). */
export function Projects({ t }: { t: Dictionary['projects'] }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative border-b border-line py-20 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading id="projects-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />
        <ol className="grid gap-5 md:grid-cols-3">
          {t.items.map((p, i) => {
            const n = String(i + 2).padStart(2, '0');
            return (
              <li key={p.key} className="group flex flex-col gap-4 rounded-3xl border border-line bg-bg p-6 transition duration-300 hover:border-bright/60 hover:shadow-xl hover:shadow-royal/10 dark:hover:border-sky/50">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface text-royal ring-1 ring-line transition group-hover:bg-royal group-hover:text-white dark:text-sky dark:group-hover:bg-sky dark:group-hover:text-night">
                    <Icon name={ICON[p.key]} className="h-5 w-5" />
                  </span>
                  <p className="kicker text-bright dark:text-sky">
                    {t.projectLabel} <span dir="ltr" className="tabular-nums">{n}</span>{' '}
                    <span aria-hidden="true" className="font-normal opacity-60">{toArabicDigits(n)}</span>
                  </p>
                </div>
                <h3 className="text-xl font-medium text-fg">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{p.text}</p>
                <div className="mt-auto flex flex-col gap-4 pt-1">
                  <Tags items={p.tags} />
                  <a href="#contact" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-link">
                    {t.cta}
                    <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
