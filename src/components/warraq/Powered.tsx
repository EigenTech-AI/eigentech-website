import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionKicker } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/brand/Logo';

/** Powered by EigenTech: the company behind Warraq, and the Warraq team. */
export function Powered({ t, team, home }: { t: Dictionary['warraqSite']['powered']; team: Dictionary['about']['members']; home: string }) {
  return (
    <section id="powered" aria-labelledby="powered-title" className="relative border-t border-line py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-5">
            <SectionKicker num={t.num} label={t.label} />
            <h2 id="powered-title" className="text-4xl leading-[1.1] font-medium tracking-tight text-fg sm:text-5xl rtl:leading-[1.3]">{t.title}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">{t.text}</p>
            <a href={home} className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-fg transition hover:border-bright dark:hover:border-sky">
              {t.cta}
              <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
            </a>
          </div>
          <a href={home} aria-label="EigenTech" className="grid place-items-center rounded-[2rem] border border-line bg-surface p-10 transition hover:border-bright dark:hover:border-sky">
            <Logo size="lg" className="scale-125" />
          </a>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="label-mono text-muted">{t.teamTitle}</h3>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.name} className="flex flex-col gap-3 rounded-3xl border border-line bg-bg p-6">
                <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-royal to-bright font-display text-base font-semibold text-white">{m.initials}</span>
                <div>
                  <h4 className="text-lg font-medium text-fg">{m.name}</h4>
                  <p className="mt-1 text-sm text-bright dark:text-sky">{m.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
