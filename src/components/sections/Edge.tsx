import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';

export function Edge({ t }: { t: Dictionary['edge'] }) {
  return (
    <section id="edge" aria-labelledby="edge-title" className="relative overflow-hidden bg-royal py-20 text-white sm:py-24 dark:bg-night">
      <div aria-hidden="true" className="bg-khatam-sky pointer-events-none absolute inset-0 opacity-90" />
      <Container className="relative flex flex-col gap-14">
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-sky uppercase rtl:tracking-normal">{t.kicker}</p>
          <h2 id="edge-title" className="text-3xl leading-tight font-medium tracking-tight sm:text-4xl">{t.title}</h2>
          <p className="text-lg leading-relaxed text-white/75">{t.intro}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {t.pillars.map((p) => (
            <article key={p.key} className="flex flex-col gap-5 rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky/15 text-sky ring-1 ring-sky/30">
                <Icon name={p.key as IconName} className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-medium">{p.title}</h3>
              <p className="text-sm leading-relaxed text-white/75">{p.text}</p>
              <ul className="mt-auto flex flex-col gap-2.5 border-t border-white/10 pt-5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-white/90">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-medium">{t.whyTitle}</h3>
            <dl className="grid gap-6 sm:grid-cols-2">
              {t.why.map((w) => (
                <div key={w.title} className="flex flex-col gap-1.5 border-s-2 border-sky/60 ps-4">
                  <dt className="font-display font-medium">{w.title}</dt>
                  <dd className="text-sm leading-relaxed text-white/70">{w.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-medium">{t.sectorsTitle}</h3>
            <ul className="flex flex-wrap gap-2">
              {t.sectors.map((s) => (
                <li key={s} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/90">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
