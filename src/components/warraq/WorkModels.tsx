import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { WHead } from './WarraqMark';

/** The two ways to work with us, in the divided grid of the EigenTech site. */
export function WorkModels({ t, digits }: { t: Dictionary['warraqPage']['models']; digits: (n: number) => string }) {
  return (
    <section id="models" aria-labelledby="models-title" className="border-t border-rule bg-paper-2 py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <WHead id="models-title" num={t.num} label={t.label} title={t.title} />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
          {t.items.map((m, i) => (
            <article key={m.title} className="flex flex-col gap-5 bg-bg p-8 sm:p-10">
              <span className="font-display text-6xl leading-none font-medium text-wink tabular-nums">{digits(i + 1)}</span>
              <h3 className="font-display text-2xl leading-snug font-medium text-wtext">{m.title}</h3>
              <p className="leading-relaxed text-wmuted">{m.text}</p>
              <ul className="flex flex-col gap-2.5 pt-2">
                {m.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-wtext">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-sky" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="flex items-center gap-3 font-medium text-wtext">
            <Icon name="lock" className="h-5 w-5 shrink-0 text-wink" />
            {t.note}
          </p>
          <a href="#contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg shadow-sm shadow-royal/20 transition hover:brightness-110">
            {t.cta}
            <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
      </Container>
    </section>
  );
}
