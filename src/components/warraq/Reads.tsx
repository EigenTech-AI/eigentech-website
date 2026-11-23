import type { Dictionary } from '@/i18n/get-dictionary';
import { mediaAsset } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { WHead } from './WarraqMark';

// Where the four numbered notes sit on the Warraq screen (per cent of the image, from the left and the top).
const MARKS: [number, number][] = [[72, 55], [22, 58], [21, 17], [9, 5]];

/** What Warraq reads, what goes in and what comes out, and a real reading with notes in the margin. */
export function Reads({ t, notes, digits }: { t: Dictionary['warraqPage']['reads']; notes: string; digits: (n: number) => string }) {
  const w = t.atWork;
  return (
    <section id="reads" aria-labelledby="reads-title" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-16">
        <WHead id="reads-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <p className="text-sm leading-relaxed text-wmuted lg:col-span-3">{t.lead}</p>
          <ol className="grid border-y border-rule sm:grid-cols-3 lg:col-span-9">
            {t.items.map((it, i) => (
              <li key={it.title} className={`flex flex-col gap-3 py-7 sm:px-7 ${i ? 'border-t border-rule sm:border-t-0 sm:border-s' : 'sm:ps-0'}`}>
                <span className="text-xs font-semibold text-sky tabular-nums">{digits(i + 1)}</span>
                <h3 className="font-display text-2xl font-semibold text-wtext">{it.title}</h3>
                <p className="text-sm leading-relaxed text-wmuted">{it.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <dl className="grid lg:grid-cols-12 lg:gap-x-10">
          {[[t.inTitle, t.inText], [t.outTitle, t.outText]].map(([k, v]) => (
            <div key={k} className="grid gap-2 border-t border-rule py-5 last:border-b lg:col-span-12 lg:grid-cols-12 lg:gap-10">
              <dt className="font-display text-lg font-semibold text-wink lg:col-span-3">{k}</dt>
              <dd className="leading-relaxed text-wtext lg:col-span-9">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-3">
            <h3 className="font-display text-3xl font-semibold text-wtext">{w.title}</h3>
            <p className="text-sm leading-relaxed text-wmuted">{w.lead}</p>
            <p className="mt-2 border-t border-rule pt-4 text-xs font-medium text-wmuted">{notes}</p>
            <ol className="flex flex-col gap-3">
              {w.callouts.map((c, i) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed text-wtext">
                  <span className="font-display font-semibold text-wink tabular-nums">({digits(i + 1)})</span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </div>
          <figure className="flex flex-col gap-4 lg:col-span-9">
            <div className="w-frame bg-paper-2 p-2 sm:p-3">
              <div dir="ltr" className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mediaAsset('warraq-at-work.webp')} alt={w.imageAlt} width={1800} height={1207} loading="lazy" className="block h-auto w-full" />
                {MARKS.map(([x, y], i) => (
                  <span key={i} aria-hidden="true" style={{ left: `${x}%`, top: `${y}%` }} className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-paper bg-wink font-display text-xs font-semibold text-paper shadow-md sm:h-9 sm:w-9 sm:text-sm">
                    {digits(i + 1)}
                  </span>
                ))}
              </div>
            </div>
            <figcaption className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-rule pb-4 text-sm text-wmuted">
              <span>{w.statsTitle}</span>
              {w.stats.map((s) => (
                <span key={s.label} className="whitespace-nowrap">
                  <b className="font-display text-2xl font-semibold text-wink tabular-nums">{s.value}</b> {s.label}
                </span>
              ))}
              <span className="ms-auto text-xs" dir="ltr">{w.caption.replace(/^.*?(www\.)/, '$1')}</span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
