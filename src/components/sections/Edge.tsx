import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';

export function Edge({ t }: { t: Dictionary['edge'] }) {
  return (
    <section id="edge" aria-labelledby="edge-title" className="relative overflow-hidden bg-royal py-24 text-white sm:py-28 dark:bg-night">
      <div aria-hidden="true" className="bg-khatam-sky pointer-events-none absolute inset-0 opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 end-[-10%] h-[40rem] w-[40rem] rounded-full bg-sky/10 blur-3xl" />
      <Container className="relative flex flex-col gap-14">
        <SectionHeading id="edge-title" num={t.num} label={t.label} title={t.title} intro={t.intro} onBlue />

        <div className="grid gap-5 lg:grid-cols-3">
          {t.pillars.map((p) => (
            <article key={p.key} className="flex flex-col gap-5 rounded-3xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm">
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

        <div className="flex flex-col gap-6">
          <h3 className="label-mono text-sky">{t.whyTitle}</h3>
          <dl className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {t.why.map((w) => (
              <div key={w.title} className="flex flex-col gap-2 bg-royal p-6 dark:bg-night">
                <dt className="font-display text-lg font-medium">{w.title}</dt>
                <dd className="text-sm leading-relaxed text-white/70">{w.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
