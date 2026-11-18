import type { Dictionary } from '@/i18n/get-dictionary';
import { mediaAsset } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';

// Where the four numbered callouts sit on the Warraq screen (per cent of the image, from the left and the top).
const MARKS: [number, number][] = [[72, 55], [22, 58], [21, 17], [9, 5]];

export function Reads({ t }: { t: Dictionary['warraqPage']['reads'] }) {
  const w = t.atWork;
  return (
    <section id="reads" aria-labelledby="reads-title" className="relative py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading id="reads-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />

        <div className="flex flex-col gap-5">
          <p className="font-display text-lg text-fg">{t.lead}</p>
          <ul className="grid gap-5 md:grid-cols-3">
            {t.items.map((it) => (
              <li key={it.title} className="flex flex-col gap-4 rounded-3xl border border-line bg-bg p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal text-white dark:bg-sky dark:text-night">
                  <Icon name={it.icon as IconName} className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-medium text-fg">{it.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{it.text}</p>
              </li>
            ))}
          </ul>
          <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
            {[[t.inTitle, t.inText], [t.outTitle, t.outText]].map(([title, text], i) => (
              <div key={title} className="flex gap-4 bg-surface p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-bg text-bright ring-1 ring-line dark:text-sky">
                  <Icon name={i ? 'download' : 'up'} className="h-5 w-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <dt className="label-mono text-bright dark:text-sky">{title}</dt>
                  <dd className="text-sm leading-relaxed text-fg">{text}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex max-w-3xl flex-col gap-3">
            <h3 className="text-3xl font-medium text-fg">{w.title}</h3>
            <p className="text-lg leading-relaxed text-muted">{w.lead}</p>
          </div>
          <figure className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-[1.5rem] border border-line bg-bg shadow-2xl shadow-royal/10">
              <div dir="ltr" className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                </span>
                <span className="rounded-full bg-bg px-3 py-1 text-xs text-muted ring-1 ring-line">www.eigentech.ai/ocr</span>
              </div>
              <div dir="ltr" className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mediaAsset('warraq-at-work.webp')} alt={w.imageAlt} width={1800} height={1207} loading="lazy" className="block h-auto w-full" />
                {MARKS.map(([x, y], i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-royal font-display text-sm text-white shadow-lg sm:h-10 sm:w-10 sm:text-base"
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
            <figcaption className="text-xs text-muted">{w.caption}</figcaption>
          </figure>
          <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {w.callouts.map((c, i) => (
              <li key={c} className="flex items-start gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-royal font-display text-white dark:bg-sky dark:text-night">{i + 1}</span>
                <p className="pt-1.5 leading-relaxed text-fg">{c}</p>
              </li>
            ))}
          </ol>
          <div className="grid grid-cols-2 items-center gap-6 rounded-3xl bg-royal-deep p-6 text-white sm:grid-cols-4 sm:p-8 lg:grid-cols-[1.2fr_repeat(4,1fr)] dark:bg-surface-2">
            <p className="col-span-2 font-display text-lg leading-snug text-white/90 sm:col-span-4 lg:col-span-1">{w.statsTitle}</p>
            <dl className="contents">
              {w.stats.map((s) => (
                <div key={s.label} className="flex flex-col items-start gap-0.5 lg:items-center">
                  <dt className="order-2 text-sm text-white/75">{s.label}</dt>
                  <dd className="order-1 font-display text-4xl font-medium text-sky tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
