import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';

export function Team({ t }: { t: Dictionary['team'] }) {
  return (
    <section id="team" aria-labelledby="team-title" className="py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading id="team-title" kicker={t.kicker} title={t.title} intro={t.intro} />
        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          {t.members.map((m) => (
            <article key={m.name} className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-8 sm:flex-row sm:items-start">
              <div aria-hidden="true" className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-royal to-bright font-display text-3xl font-semibold text-white shadow-lg shadow-royal/20">
                {m.initials}
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="text-2xl font-medium text-fg">{m.name}</h3>
                  <p className="text-sm font-semibold text-bright dark:text-sky">{m.role}</p>
                </div>
                <p className="leading-relaxed text-muted">{m.bio}</p>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {m.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-bg px-3 py-1 text-xs font-medium text-fg ring-1 ring-line">{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          <aside className="flex flex-col justify-between gap-6 rounded-3xl border border-dashed border-line p-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-medium text-fg">{t.joinTitle}</h3>
              <p className="text-sm leading-relaxed text-muted">{t.joinText}</p>
            </div>
            <a href={`mailto:${site.email}?subject=Careers%20at%20EigenTech`} className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-link">
              {t.joinCta}
              <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
            </a>
          </aside>
        </div>
      </Container>
    </section>
  );
}
