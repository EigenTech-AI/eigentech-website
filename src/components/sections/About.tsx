import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function About({ t }: { t: Dictionary['about'] }) {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHeading id="about-title" kicker={t.kicker} title={t.title} />
          <p className="text-lg leading-relaxed text-muted">{t.overview}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {[t.mission, t.vision].map((b, i) => (
            <article key={b.title} className={`rounded-3xl p-8 ${i === 0 ? 'bg-royal text-white' : 'border border-line bg-surface'}`}>
              <h3 className={`text-sm font-semibold tracking-[0.16em] uppercase rtl:tracking-normal ${i === 0 ? 'text-sky' : 'text-bright dark:text-sky'}`}>{b.title}</h3>
              <p className={`mt-4 font-display text-xl leading-snug sm:text-2xl ${i === 0 ? 'text-white' : 'text-fg'}`}>{b.text}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-medium text-fg">{t.valuesTitle}</h3>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((v, i) => (
              <li key={v.title} className="flex flex-col gap-2 bg-bg p-6">
                <span className="font-display text-sm text-bright tabular-nums dark:text-sky">0{i + 1}</span>
                <h4 className="text-lg font-medium text-fg">{v.title}</h4>
                <p className="text-sm leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
