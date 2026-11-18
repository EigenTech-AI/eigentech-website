import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';
import { toArabicDigits } from '@/components/brand/MarkGlyph';

/** Why Warraq: the four advantages, how Warraq is built, and where it runs. */
export function WhyWarraq({ t }: { t: Dictionary['warraqPage']['why'] }) {
  return (
    <section id="why" aria-labelledby="why-title" className="relative overflow-hidden bg-royal py-24 text-white sm:py-28 dark:bg-night">
      <div aria-hidden="true" className="bg-khatam-sky pointer-events-none absolute inset-0 opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 end-[-10%] h-[40rem] w-[40rem] rounded-full bg-sky/10 blur-3xl" />
      <Container className="relative flex flex-col gap-16">
        <SectionHeading id="why-title" num={t.num} label={t.label} title={t.title} onBlue />

        <ol className="grid gap-5 md:grid-cols-2">
          {t.items.map((it, i) => {
            const n = String(i + 1).padStart(2, '0');
            return (
              <li key={it.title} className="flex flex-col gap-4 rounded-3xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm sm:flex-row sm:gap-6 sm:p-8">
                <span className="flex items-baseline gap-2 font-display text-5xl leading-none font-medium text-sky tabular-nums sm:block" aria-hidden="true">
                  <span dir="ltr">{n}</span>
                  <span className="text-lg text-sky/50 sm:mt-1 sm:block">{toArabicDigits(n)}</span>
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium">{it.title}</h3>
                  <p className="leading-relaxed text-white/80">{it.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col gap-6">
          <div className="flex max-w-3xl flex-col gap-3">
            <h3 className="text-3xl font-medium">{t.techTitle}</h3>
            <p className="text-lg leading-relaxed text-white/80">{t.techLead}</p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-3xl bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
            {t.stages.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3 bg-royal p-6 dark:bg-night">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky/15 text-sky ring-1 ring-sky/30">
                    <Icon name={s.icon as IconName} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm text-sky/70 tabular-nums" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="text-lg font-medium">{s.title}</h4>
                <p className="text-sm leading-relaxed text-white/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-5 rounded-3xl border border-sky/30 bg-sky/10 p-7 sm:flex-row sm:items-center sm:p-8">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sky text-night">
            <Icon name="lock" className="h-7 w-7" />
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl font-medium">{t.sovereignTitle}</h3>
            <p className="leading-relaxed text-white/85">{t.sovereign}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
