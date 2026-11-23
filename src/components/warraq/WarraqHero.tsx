import type { Dictionary } from '@/i18n/get-dictionary';
import { mediaAsset, warraqUrl } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { toArabicDigits } from '@/components/brand/MarkGlyph';
import { PoweredBy } from './PoweredBy';

// The first lines of the real reading shown on the page (sample 3.jpg, read by Warraq at www.eigentech.ai/ocr).
const LINES = [
  'فأما أن ينوي فرضين أو نفلين أو فرضاً ونفلاً أما الأول فلا يخلو إما أن',
  'يكون في الصلاة أو في غيرها فإن كان في الصلاة فلا يصح واحدة منهما',
  'قال في السراج الوهاج لو نوى صلاتي فرض كالظهر والعصر لم يصحا اتفاقاً',
  'ولو نوى في الصوم القضاء والكفارة كان عن القضاء وقال محمد يكون',
  'تطوعاً وإن نوى كفارة الظهار وكفارة اليمين يجعله لأيهما شاء وقال',
];

/**
 * Opening of the Warraq site: the title on one side; on the other, a real reading. A reading line passes down the
 * manuscript spread, the boxes Warraq drew round each line appear behind it, and the lines it read are set below.
 */
export function WarraqHero({ t, poweredBy, home, transcript }: { t: Dictionary['warraqPage']['hero']; poweredBy: string; home: string; transcript: string }) {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <Container className="grid gap-14 pt-10 pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="flex flex-col gap-7 lg:col-span-5 lg:pt-4">
          <p className="flex items-center gap-3 text-sm font-medium text-wmuted">
            <span aria-hidden="true" className="h-[2px] w-8 bg-sky" />
            {t.eyebrow}
          </p>
          <h1 id="hero-title" className="font-display text-[2.3rem] leading-[1.14] font-semibold tracking-tight text-wtext sm:text-[2.75rem] lg:text-[2.9rem] rtl:leading-[1.36]">
            {t.titleStart} <span className="text-wink">{t.titleAccent}</span>
          </h1>
          <p className="text-lg leading-relaxed text-wmuted">{t.subtitle}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={warraqUrl} className="inline-flex items-center gap-2 rounded-[4px] bg-wink px-6 py-3.5 text-sm font-semibold text-paper transition hover:opacity-90">
              {t.primary}
              <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
            </a>
            <a href="#video" className="inline-flex items-center gap-2 text-sm font-semibold text-wink underline decoration-rule decoration-2 underline-offset-[10px] transition hover:decoration-sky">
              <Icon name="play" className="h-4 w-4" />
              {t.secondary}
            </a>
          </div>
          <ul className="flex flex-col gap-2 border-t border-rule pt-5 text-sm text-wmuted">
            {t.chips.map((c) => (
              <li key={c} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-sky" />
                {c}
              </li>
            ))}
          </ul>
          <PoweredBy label={poweredBy} href={home} />
        </div>

        <figure className="lg:col-span-7">
          <div className="w-frame bg-paper-2 p-3 sm:p-4">
            <div dir="ltr" className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaAsset('warraq-reading-page.jpg')} alt={t.imageAlt} width={1490} height={1140} fetchPriority="high" className="block h-auto w-full" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaAsset('warraq-reading-lines.png')} alt="" aria-hidden="true" width={1490} height={1140} className="w-reveal absolute inset-0 h-full w-full" />
              <span aria-hidden="true" className="w-scan absolute inset-x-0 h-[3px] bg-sky shadow-[0_0_16px_3px_rgba(95,169,224,0.6)]" />
            </div>
            <div className="mt-4 border-t border-rule pt-3">
              <p className="text-xs font-medium text-wmuted">{transcript}</p>
              <ol dir="rtl" lang="ar" className="mt-1.5">
                {LINES.map((line, i) => (
                  <li key={line} className="w-line flex gap-3 border-b border-dashed border-rule py-1.5 text-[0.95rem] leading-relaxed text-wtext last:border-0" style={{ animationDelay: `${1.2 + i * 1.1}s` }}>
                    <span aria-hidden="true" className="w-5 shrink-0 pt-0.5 text-xs text-sky">{toArabicDigits(String(i + 1))}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm text-wmuted">
            <span>{t.statsTitle}</span>
            {t.stats.map((s) => (
              <span key={s.label} className="whitespace-nowrap">
                <b className="font-display text-2xl font-semibold text-wink tabular-nums">{s.value}</b> {s.label}
              </span>
            ))}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
