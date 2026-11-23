import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { Icon, type IconName } from '@/components/ui/Icon';
import { WHead } from './WarraqMark';

/** Why Warraq: the four advantages, the five stages joined like a row of neurons, and where it runs. */
export function WhyWarraq({ t, digits }: { t: Dictionary['warraqPage']['why']; digits: (n: number) => string }) {
  return (
    <section id="why" aria-labelledby="why-title" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-20">
        <WHead id="why-title" num={t.num} label={t.label} title={t.title} />

        <ol className="grid border-t border-rule md:grid-cols-2">
          {t.items.map((it, i) => (
            <li key={it.title} className={`flex gap-6 border-b border-rule py-8 md:px-8 ${i % 2 ? 'md:border-s' : 'md:ps-0'}`}>
              <span className="font-display text-4xl leading-none font-semibold text-wink tabular-nums">{digits(i + 1)}</span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl font-semibold text-wtext">{it.title}</h3>
                <p className="leading-relaxed text-wmuted">{it.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-10">
          <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
            <h3 className="font-display text-3xl font-semibold text-wtext lg:col-span-3">{t.techTitle}</h3>
            <p className="text-lg leading-relaxed text-wmuted lg:col-span-9">{t.techLead}</p>
          </div>
          {/* the five stages, joined like the neurons of the T in the EigenTech seal */}
          <ol className="relative grid gap-8 md:grid-cols-5 md:gap-6">
            <span aria-hidden="true" className="absolute inset-x-[10%] top-6 hidden h-px bg-wink/40 md:block" />
            {t.stages.map((s, i) => (
              <li key={s.title} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-wink bg-paper text-wink">
                  <Icon name={s.icon as IconName} className="h-5 w-5" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-sky tabular-nums">{digits(i + 1)}</span>
                  <h4 className="font-display text-lg font-semibold text-wtext">{s.title}</h4>
                  <p className="text-sm leading-relaxed text-wmuted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-6 bg-wink p-8 text-paper sm:p-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-paper/40 lg:col-span-1">
            <Icon name="lock" className="h-6 w-6" />
          </span>
          <h3 className="font-display text-3xl leading-snug font-semibold lg:col-span-5">{t.sovereignTitle}</h3>
          <p className="text-lg leading-relaxed opacity-90 lg:col-span-6">{t.sovereign}</p>
        </div>
      </Container>
    </section>
  );
}
