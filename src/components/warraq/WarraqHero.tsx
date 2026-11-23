import type { Dictionary } from '@/i18n/get-dictionary';
import { mediaAsset, warraqUrl } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { MarkGlyph } from '@/components/brand/MarkGlyph';
import { PoweredBy } from './PoweredBy';

export function WarraqHero({ t, poweredBy }: { t: Dictionary['warraqPage']['hero']; poweredBy: string }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-khatam pointer-events-none absolute inset-0 [mask-image:radial-gradient(75%_65%_at_75%_35%,black,transparent)]" />
      <div aria-hidden="true" className="glow pointer-events-none absolute -top-48 end-[-12%] h-[44rem] w-[44rem]" />
      <Container className="relative grid items-center gap-12 pt-10 pb-20 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pb-24">
        <div className="flex flex-col gap-7">
          <PoweredBy label={poweredBy} />
          <p className="kicker flex items-center gap-3 text-bright dark:text-sky">
            <MarkGlyph className="h-5 w-5 shrink-0" />
            <span>{t.eyebrow}</span>
          </p>
          <h1 id="hero-title" className="text-4xl leading-[1.1] font-medium tracking-tight text-fg sm:text-5xl lg:text-[3.35rem] rtl:leading-[1.35]">
            {t.titleStart}{' '}
            <span className="text-royal dark:text-sky">{t.titleAccent}</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">{t.subtitle}</p>
          <ul className="flex flex-wrap gap-2">
            {t.chips.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm text-fg ring-1 ring-line">
                <Icon name="check" className="h-4 w-4 text-bright dark:text-sky" />
                {c}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href={warraqUrl} className="px-6 py-3">
              {t.primary}
              <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
            </ButtonLink>
            <ButtonLink href="#video" variant="secondary" className="px-5 py-3">
              <Icon name="play" className="h-4 w-4" />
              {t.secondary}
            </ButtonLink>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[36rem]">
          <div className="relative overflow-hidden rounded-[2rem] bg-royal shadow-2xl shadow-royal/25 ring-1 ring-royal/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mediaAsset('warraq-manuscripts.webp')} alt={t.imageAlt} width={1130} height={805} className="block h-auto w-full" fetchPriority="high" />
          </div>
          {/* The figures of a real reading by Warraq, on a card over the image */}
          <div className="relative -mt-12 mx-4 rounded-2xl border border-line bg-bg/95 p-4 shadow-xl shadow-royal/10 backdrop-blur sm:mx-8">
            <p className="text-xs leading-snug text-muted">{t.statsTitle}</p>
            <dl className="mt-2 grid grid-cols-3">
              {t.stats.map((s, i) => (
                <div key={s.label} className={`flex flex-col gap-0.5 px-3 ${i ? 'border-s border-line' : 'ps-0'}`}>
                  <dt className="order-2 text-xs text-muted">{s.label}</dt>
                  <dd className="order-1 font-display text-3xl font-medium text-royal tabular-nums dark:text-sky">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </figure>
      </Container>
    </section>
  );
}
