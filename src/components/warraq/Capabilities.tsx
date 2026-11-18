import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { mediaAsset } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';

/** More than text extraction: any document to a structured text document, and a complete manuscript to an authenticated book. */
export function Capabilities({ locale, t }: { locale: Locale; t: Dictionary['warraqPage']['capabilities'] }) {
  const { layout, tahqiq } = t;
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="border-t border-line bg-surface py-24 sm:py-28">
      <Container className="flex flex-col gap-16">
        <SectionHeading id="capabilities-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />

        <article className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal text-white dark:bg-sky dark:text-night">
              <Icon name="layout" className="h-6 w-6" />
            </span>
            <h3 className="text-3xl leading-tight font-medium text-fg rtl:leading-snug">{layout.title}</h3>
            <p className="text-lg leading-relaxed text-muted">{layout.text}</p>
            <ul className="flex flex-col gap-2.5 border-t border-line pt-5">
              {layout.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-fg">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-bright dark:text-sky" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <figure className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-[1.5rem] bg-royal shadow-2xl shadow-royal/20 ring-1 ring-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaAsset(`warraq-layout-${locale}.webp`)} alt={layout.imageAlt} width={1440} height={674} loading="lazy" className="block h-auto w-full" />
            </div>
            <figcaption className="text-xs text-muted">{t.note}</figcaption>
          </figure>
        </article>

        <article className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <figure className="mx-auto flex w-full max-w-md flex-col gap-3 lg:order-last">
            <div className="overflow-hidden rounded-[1.5rem] bg-royal shadow-2xl shadow-royal/20 ring-1 ring-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaAsset(`warraq-tahqiq-${locale}.webp`)} alt={tahqiq.imageAlt} width={840} height={860} loading="lazy" className="block h-auto w-full" />
            </div>
            <figcaption className="text-xs text-muted">{t.note}</figcaption>
          </figure>
          <div className="flex flex-col gap-5">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal text-white dark:bg-sky dark:text-night">
              <Icon name="book" className="h-6 w-6" />
            </span>
            <h3 className="text-3xl leading-tight font-medium text-fg rtl:leading-snug">{tahqiq.title}</h3>
            <p className="text-lg leading-relaxed text-muted">{tahqiq.text}</p>
            <ol className="flex flex-col gap-3">
              {tahqiq.steps.map((s, i) => (
                <li key={s} className={`flex items-center gap-4 rounded-2xl p-3 pe-5 ring-1 ${i === tahqiq.steps.length - 1 ? 'bg-royal text-white ring-royal dark:bg-sky dark:text-night dark:ring-sky' : 'bg-bg text-fg ring-line'}`}>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display ${i === tahqiq.steps.length - 1 ? 'bg-white/15' : 'bg-surface text-bright ring-1 ring-line dark:text-sky'}`}>{i + 1}</span>
                  <span className="leading-snug">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </article>
      </Container>
    </section>
  );
}
