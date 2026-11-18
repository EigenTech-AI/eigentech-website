import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { basePath, warraqUrl } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { SectionKicker } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';
import { VideoPlayer } from '@/components/warraq/VideoPlayer';

/** Warraq, the main project and current focus of EigenTech: right after the hero, with the video. */
export function Focus({ locale, t, video }: { locale: Locale; t: Dictionary['focus']; video: Dictionary['warraqPage']['video'] }) {
  return (
    <section id="warraq" aria-labelledby="warraq-title" className="relative overflow-hidden bg-royal py-24 text-white sm:py-28 dark:bg-night">
      <div aria-hidden="true" className="bg-khatam-sky pointer-events-none absolute inset-0 opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 end-[-10%] h-[42rem] w-[42rem] rounded-full bg-sky/10 blur-3xl" />
      <Container className="relative flex flex-col gap-12">
        <div className="flex max-w-4xl flex-col gap-5">
          <SectionKicker num={t.num} label={t.label} onBlue />
          <h2 id="warraq-title" className="text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl rtl:leading-[1.3]">{t.title}</h2>
          <p className="max-w-3xl text-lg leading-relaxed text-white/85">{t.intro}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <p className="leading-relaxed text-white/80">{t.text}</p>
            <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-5">
              <p className="text-sm text-white/75">{t.statsTitle}</p>
              <dl className="mt-2 grid grid-cols-3">
                {t.stats.map((s, i) => (
                  <div key={s.label} className={`flex flex-col gap-0.5 ${i ? 'border-s border-white/15 ps-4' : ''}`}>
                    <dt className="order-2 text-sm text-white/75">{s.label}</dt>
                    <dd className="order-1 font-display text-4xl font-medium text-sky tabular-nums">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`${basePath}/${locale}/warraq/`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-royal transition hover:bg-sky">
                {t.primary}
                <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
              </a>
              <a href={warraqUrl} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                {t.secondary}
              </a>
            </div>
          </div>
          <VideoPlayer locale={locale} t={video} />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.tiles.map((tile) => (
            <li key={tile.title} className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky/15 text-sky ring-1 ring-sky/30">
                <Icon name={tile.icon as IconName} className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-medium">{tile.title}</h3>
              <p className="text-sm leading-relaxed text-white/75">{tile.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
