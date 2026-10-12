import type { Dictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { Tags } from '@/components/ui/Tag';

export function About({ t }: { t: Dictionary['about'] }) {
  return (
    <section id="about" aria-labelledby="about-title" className="relative border-t border-line bg-surface py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading id="about-title" num={t.num} label={t.label} title={t.title} intro={t.overview} />

        <div className="grid gap-5 md:grid-cols-2">
          {[t.mission, t.vision].map((b, i) => (
            <article key={b.title} className={`relative overflow-hidden rounded-3xl p-8 ${i === 0 ? 'bg-royal text-white' : 'border border-line bg-bg'}`}>
              {i === 0 ? <div aria-hidden="true" className="bg-khatam-sky absolute inset-0 opacity-70" /> : null}
              <h3 className={`label-mono relative ${i === 0 ? 'text-sky' : 'text-bright dark:text-sky'}`}>{b.title}</h3>
              <p className={`relative mt-4 font-display text-xl leading-snug sm:text-2xl ${i === 0 ? 'text-white' : 'text-fg'}`}>{b.text}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="label-mono text-muted">{t.valuesTitle}</h3>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((v, i) => (
              <li key={v.title} className="flex flex-col gap-2 bg-bg p-6">
                <span className="label-mono text-bright tabular-nums dark:text-sky">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="text-lg font-medium text-fg">{v.title}</h4>
                <p className="text-sm leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="label-mono text-muted">{t.leadershipTitle}</h3>
            <p className="max-w-2xl text-muted">{t.leadershipIntro}</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            {t.members.map((m) => (
              <article key={m.name} className="flex flex-col gap-6 rounded-3xl border border-line bg-bg p-8 sm:flex-row sm:items-start">
                <div aria-hidden="true" className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-royal to-bright font-display text-3xl font-semibold text-white shadow-lg shadow-royal/20">
                  {m.initials}
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <h4 className="text-2xl font-medium text-fg">{m.name}</h4>
                    <p className="label-mono mt-1 text-bright dark:text-sky">{m.role}</p>
                  </div>
                  <p className="leading-relaxed text-muted">{m.bio}</p>
                  <Tags items={m.tags} />
                </div>
              </article>
            ))}
            <aside className="flex flex-col justify-between gap-6 rounded-3xl border border-dashed border-line bg-bg/60 p-8">
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-medium text-fg">{t.joinTitle}</h4>
                <p className="text-sm leading-relaxed text-muted">{t.joinText}</p>
              </div>
              <div className="flex flex-col gap-3">
                <a href={`mailto:${site.email}?subject=Careers%20at%20EigenTech`} className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-link">
                  {t.joinCta}
                  <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-link">
                  <Icon name="linkedin" className="h-4 w-4" />
                  {t.followCta}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
