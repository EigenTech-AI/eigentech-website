import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { mediaAsset } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { WHead } from './WarraqMark';

/** More than text extraction: any document to a structured text document, and a complete manuscript to an authenticated book. */
export function Capabilities({ locale, t, digits }: { locale: Locale; t: Dictionary['warraqPage']['capabilities']; digits: (n: number) => string }) {
  const { layout, tahqiq } = t;
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="border-t border-rule bg-paper-2 py-24 sm:py-28">
      <Container className="flex flex-col gap-20">
        <WHead id="capabilities-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />

        <article className="grid items-center gap-10 lg:grid-cols-12">
          <figure className="flex flex-col gap-3 lg:col-span-7">
            <div className="overflow-hidden rounded-[1.5rem] bg-royal shadow-2xl shadow-royal/20 ring-1 ring-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaAsset(`warraq-layout-${locale}.webp`)} alt={layout.imageAlt} width={1440} height={674} loading="lazy" className="block h-auto w-full" />
            </div>
            <figcaption className="text-xs text-wmuted">{t.note}</figcaption>
          </figure>
          <div className="flex flex-col gap-5 lg:col-span-5">
            <h3 className="font-display text-3xl leading-tight font-medium text-wtext rtl:leading-snug">{layout.title}</h3>
            <p className="text-lg leading-relaxed text-wmuted">{layout.text}</p>
            <ul className="border-t border-rule">
              {layout.points.map((p) => (
                <li key={p} className="flex items-start gap-3 border-b border-rule py-3 text-wtext">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-sky" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="grid items-center gap-10 lg:grid-cols-12">
          <figure className="mx-auto flex w-full max-w-md flex-col gap-3 lg:order-last lg:col-span-5">
            <div className="overflow-hidden rounded-[1.5rem] bg-royal shadow-2xl shadow-royal/20 ring-1 ring-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaAsset(`warraq-tahqiq-${locale}.webp`)} alt={tahqiq.imageAlt} width={840} height={860} loading="lazy" className="block h-auto w-full" />
            </div>
            <figcaption className="text-xs text-wmuted">{t.note}</figcaption>
          </figure>
          <div className="flex flex-col gap-5 lg:col-span-7">
            <h3 className="font-display text-3xl leading-tight font-medium text-wtext rtl:leading-snug">{tahqiq.title}</h3>
            <p className="text-lg leading-relaxed text-wmuted">{tahqiq.text}</p>
            <ol className="border-t border-rule">
              {tahqiq.steps.map((s, i) => (
                <li key={s} className="flex items-baseline gap-5 border-b border-rule py-3.5">
                  <span className="w-6 shrink-0 font-display text-xl font-medium text-wink tabular-nums">{digits(i + 1)}</span>
                  <span className={`leading-relaxed ${i === tahqiq.steps.length - 1 ? 'font-semibold text-wink' : 'text-wtext'}`}>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </article>
      </Container>
    </section>
  );
}
