'use client';

import { useState } from 'react';
import type { Dictionary } from '@/i18n/get-dictionary';
import { asset } from '@/lib/site';
import { Icon } from '@/components/ui/Icon';
import { toArabicDigits } from '@/components/brand/MarkGlyph';

type Box = [number, number, number, number]; // x0, y0, x1, y1 in the original photo's pixels

// Measured on the photos (ink rows found by brand-tools/analyse-lines.js, padded for ascenders and dots).
const PAINTING = {
  w: 1650, h: 2000,
  text: [[300, 215, 1445, 305], [285, 1668, 1425, 1812]] as Box[],
  image: [205, 335, 1490, 1650] as Box,
};
const COLOPHON = {
  w: 1677, h: 2000,
  lines: [
    [335, 268, 1520, 344], [325, 368, 1470, 451], [340, 468, 1455, 556], [315, 591, 1648, 674],
    [340, 693, 1470, 773], [327, 803, 1455, 878], [348, 903, 1470, 993], [348, 998, 1470, 1098],
    // the colophon: six lines in a narrower block
    [490, 1116, 1332, 1196], [503, 1223, 1337, 1323], [498, 1335, 1330, 1413],
    [510, 1440, 1335, 1533], [503, 1548, 1332, 1623], [950, 1645, 1192, 1722],
  ] as Box[],
  first: 8, // index of the colophon's first line
};

const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const rect = ([x0, y0, x1, y1]: Box) => ({ x: x0, y: y0, width: x1 - x0, height: y1 - y0 });

export function OcrShowcase({ t }: { t: Dictionary['projects']['showcase'] }) {
  const [active, setActive] = useState<number | null>(null);
  const num = (n: number) => (t.numerals === 'arabic' ? toArabicDigits(String(n)) : String(n));
  const pick = (i: number | null) => setActive(i);

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-bg">
      <div className="flex flex-col gap-3 border-b border-line p-7 sm:p-9">
        <p className="kicker flex items-center gap-2 text-bright dark:text-sky">
          <Icon name="document" className="h-4 w-4" />
          {t.kicker}
        </p>
        <h3 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl rtl:leading-[1.3]">{t.title}</h3>
        <p className="max-w-3xl leading-relaxed text-muted">{t.intro}</p>
      </div>

      <div className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-[0.9fr_1.25fr_1fr]">
        {/* 1 · layout: text apart from the painting */}
        <figure className="flex flex-col gap-4 bg-bg p-6 sm:p-7">
          <p className="kicker text-muted"><span className="tabular-nums">{num(1)}</span> · {t.layout.title}</p>
          <div className="relative overflow-hidden rounded-2xl shadow-lg shadow-royal/10 ring-1 ring-line" dir="ltr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/manuscripts/maqamat-painting.webp')} width={1000} height={1212} loading="lazy" decoding="async" alt={t.layout.alt} className="block h-auto w-full" />
            <svg viewBox={`0 0 ${PAINTING.w} ${PAINTING.h}`} aria-hidden="true" className="absolute inset-0 h-full w-full">
              <rect {...rect(PAINTING.image)} rx="18" fill="rgba(95,169,224,0.10)" stroke="#5FA9E0" strokeWidth="2.5" strokeDasharray="10 7" vectorEffect="non-scaling-stroke" />
              {PAINTING.text.map((b, i) => (
                <rect key={i} {...rect(b)} rx="12" fill="rgba(47,91,208,0.14)" stroke="#2F5BD0" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            {/* labels: text boxes at their top-left corner, the painting inside its top-right corner so they never meet */}
            {[
              ...PAINTING.text.map((b) => ({ label: t.layout.text, cls: 'bg-bright', left: pct(b[0], PAINTING.w), top: pct(b[1], PAINTING.h), transform: 'translate(4px, -50%)' })),
              { label: t.layout.image, cls: 'bg-azure', left: pct(PAINTING.image[2], PAINTING.w), top: pct(PAINTING.image[1], PAINTING.h), transform: 'translate(calc(-100% - 6px), 6px)' },
            ].map(({ label, cls, ...pos }, i) => (
              <span key={i} className={`absolute rounded-md px-1.5 py-0.5 text-[0.65rem] font-semibold leading-none text-white shadow ${cls}`} style={pos}>
                {label}
              </span>
            ))}
          </div>
          <figcaption className="text-sm leading-relaxed text-muted">{t.layout.caption}</figcaption>
        </figure>

        {/* 2 · every line found, the colophon highlighted */}
        <figure className="flex flex-col gap-4 bg-bg p-6 sm:p-7">
          <p className="kicker text-muted"><span className="tabular-nums">{num(2)}</span> · {t.lines.title}</p>
          <div className="relative overflow-hidden rounded-2xl shadow-lg shadow-royal/10 ring-1 ring-line" dir="ltr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/manuscripts/maqamat-colophon.webp')} width={1000} height={1193} loading="lazy" decoding="async" alt={t.lines.alt} className="block h-auto w-full" />
            <svg viewBox={`0 0 ${COLOPHON.w} ${COLOPHON.h}`} aria-hidden="true" className="absolute inset-0 h-full w-full">
              {COLOPHON.lines.map((b, i) => {
                const col = i >= COLOPHON.first, on = active === i;
                return (
                  <rect
                    key={i}
                    {...rect(b)}
                    rx="10"
                    fill={on ? 'rgba(47,91,208,0.32)' : col ? 'rgba(47,91,208,0.12)' : 'rgba(95,169,224,0.06)'}
                    stroke={col ? '#2F5BD0' : '#5FA9E0'}
                    strokeOpacity={col ? 1 : 0.8}
                    strokeWidth={on ? 3 : 1.8}
                    strokeDasharray={col ? undefined : '7 6'}
                    vectorEffect="non-scaling-stroke"
                    onMouseEnter={col ? () => pick(i) : undefined}
                    onMouseLeave={col ? () => pick(null) : undefined}
                  />
                );
              })}
            </svg>
            {COLOPHON.lines.slice(COLOPHON.first).map((b, k) => {
              const i = COLOPHON.first + k;
              return (
                <span key={i} aria-hidden="true" className={`pointer-events-none absolute grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-full px-1 text-[0.62rem] font-semibold leading-none text-white shadow transition ${active === i ? 'bg-royal-deep scale-110' : 'bg-bright'}`} style={{ left: pct(b[2], COLOPHON.w), top: pct((b[1] + b[3]) / 2, COLOPHON.h), transform: 'translate(-30%, -50%)' }}>
                  {num(i + 1)}
                </span>
              );
            })}
            {/* reading line passing over the page */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 h-[3px] animate-[et-scan_7s_ease-in-out_infinite_alternate] bg-gradient-to-r from-transparent via-bright to-transparent shadow-[0_0_14px_3px_rgba(47,91,208,0.45)] motion-reduce:hidden" />
          </div>
          <figcaption className="text-sm leading-relaxed text-muted">{t.lines.caption}</figcaption>
        </figure>

        {/* 3 · the text of the colophon */}
        <div className="flex flex-col gap-4 bg-bg p-6 sm:p-7 md:col-span-2 lg:col-span-1">
          <p className="kicker text-muted"><span className="tabular-nums">{num(3)}</span> · {t.transcriptLabel}</p>
          <ol dir="rtl" lang="ar" className="flex flex-col gap-1.5 rounded-2xl bg-surface p-3 ring-1 ring-line">
            {t.transcript.map((text, k) => {
              const i = COLOPHON.first + k, on = active === i;
              return (
                <li
                  key={i}
                  tabIndex={0}
                  onMouseEnter={() => pick(i)}
                  onMouseLeave={() => pick(null)}
                  onFocus={() => pick(i)}
                  onBlur={() => pick(null)}
                  onClick={() => pick(on ? null : i)}
                  className={`flex cursor-default items-start gap-3 rounded-xl px-3 py-2 font-arabic text-[1.05rem] leading-[1.9] text-fg transition outline-none ${on ? 'bg-bright/12 ring-1 ring-bright/50 dark:bg-sky/12 dark:ring-sky/50' : 'hover:bg-bg'}`}
                >
                  <span className={`mt-[0.45rem] grid h-6 min-w-6 shrink-0 place-items-center rounded-full px-1 font-display text-xs font-semibold ${on ? 'bg-royal-deep text-white dark:bg-sky dark:text-night' : 'bg-bright/15 text-bright dark:bg-sky/15 dark:text-sky'}`}>
                    {num(i + 1)}
                  </span>
                  <span>{text}</span>
                </li>
              );
            })}
          </ol>
          <p className="text-xs text-muted">{t.transcriptHint}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-t border-line px-7 py-4 text-xs leading-relaxed text-muted sm:px-9">
        <p>{t.note}</p>
        <p>{t.credit}</p>
      </div>
    </div>
  );
}
