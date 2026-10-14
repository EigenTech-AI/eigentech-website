import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Tags } from '@/components/ui/Tag';
import { toArabicDigits } from '@/components/brand/MarkGlyph';
import { OcrShowcase } from './OcrShowcase';

const line = 'stroke-bright/55 dark:stroke-sky/50';
const soft = 'fill-bright/10 dark:fill-sky/10';
const solid = 'fill-bright dark:fill-sky';

/** Arabic text being read: words found and boxed, a scan line passing over the page. */
function OcrArt() {
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" className="h-full w-full" direction="ltr">
      <rect x="60" y="18" width="200" height="146" rx="10" className="fill-bg stroke-line" strokeWidth={1.2} />
      <g fontFamily="var(--font-display)" fontSize="20" textAnchor="start" className="fill-fg" direction="rtl">
        <text x="244" y="58">قراءة النص العربي</text>
        <text x="244" y="94" fontSize="16" className="fill-muted">مطبوع ومخطوط</text>
        <text x="244" y="126" fontSize="16" className="fill-muted">مع التشكيل</text>
      </g>
      <g fill="none" className={line} strokeWidth={1.1} strokeDasharray="4 3">
        <rect x="162" y="38" width="86" height="28" rx="4" />
        <rect x="96" y="38" width="62" height="28" rx="4" />
        <rect x="150" y="76" width="98" height="24" rx="4" />
      </g>
      <rect x="66" y="108" width="188" height="3" rx="1.5" className={solid} opacity={0.75} />
      <rect x="66" y="111" width="188" height="22" className={soft} />
      <g className={solid}>
        <circle cx="162" cy="38" r="2.4" /><circle cx="248" cy="38" r="2.4" /><circle cx="248" cy="66" r="2.4" /><circle cx="162" cy="66" r="2.4" />
      </g>
      <path d="M268 52 h30 M286 44 l12 8 -12 8" fill="none" className={line} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      <g className="fill-muted" fontFamily="var(--font-display)" fontSize="9">
        <text x="270" y="74">{'{ text }'}</text>
      </g>
    </svg>
  );
}

/** A chain of narration (isnad) leading to a text (matn) that is matched and verified. */
function HadithArt() {
  const chain: [number, number][] = [[44, 34], [44, 74], [44, 114], [44, 154]];
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" className="h-full w-full" direction="ltr">
      <g fill="none" className={line} strokeWidth={1.3}>
        {chain.slice(1).map(([x, y], i) => <line key={i} x1={x} y1={chain[i][1] + 9} x2={x} y2={y - 9} />)}
        <path d="M53 74 C80 74 84 58 104 58" strokeDasharray="3 3" />
        <path d="M53 154 C110 154 120 96 150 96" />
      </g>
      {chain.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={9} className={i === chain.length - 1 ? solid : 'fill-bg stroke-bright/60 dark:stroke-sky/55'} strokeWidth={1.3} />
      ))}
      <circle cx="110" cy="58" r="6" className="fill-bg stroke-bright/40 dark:stroke-sky/35" strokeWidth={1.2} strokeDasharray="2 2" />
      <g fontFamily="var(--font-display)" fontSize="11" className="fill-muted" direction="rtl" textAnchor="start">
        <text x="88" y="38">حدّثنا</text>
        <text x="88" y="78">عن</text>
        <text x="88" y="118">عن</text>
      </g>
      <rect x="150" y="48" width="140" height="96" rx="10" className="fill-bg stroke-line" strokeWidth={1.2} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={164} y={66 + i * 16} width={i === 3 ? 70 : 112} height="6" rx="3" className={i === 1 ? soft : 'fill-line'} />)}
      <rect x="160" y="78" width="120" height="18" rx="4" fill="none" className={line} strokeWidth={1.1} strokeDasharray="4 3" />
      <g transform="translate(266 28)">
        <circle cx="12" cy="12" r="12" className={solid} />
        <path d="M6.5 12.5 l3.8 3.8 7.4 -8" fill="none" className="stroke-white dark:stroke-night" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/** A recitation waveform: the recognised ayah segment highlighted, with tajweed marks above it. */
function QuranArt() {
  const bars = Array.from({ length: 46 }, (_, i) => 10 + Math.round(34 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21))) + (i % 3) * 3);
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" className="h-full w-full" direction="ltr">
      <rect x="112" y="36" width="104" height="108" rx="12" className={soft} />
      <rect x="112" y="36" width="104" height="108" rx="12" fill="none" className={line} strokeWidth={1.1} strokeDasharray="4 3" />
      <g>
        {bars.map((h, i) => {
          const x = 22 + i * 6.1, inSeg = x > 116 && x < 212;
          return <rect key={i} x={x} y={90 - h} width={3.4} height={h * 2} rx={1.7} className={inSeg ? solid : 'fill-bright/30 dark:fill-sky/25'} />;
        })}
      </g>
      <g className={solid}>
        {[132, 158, 186].map((x) => <circle key={x} cx={x} cy={26} r={3.2} />)}
      </g>
      <path d="M132 26 v8 M158 26 v8 M186 26 v8" className={line} strokeWidth={1} />
      <g transform="translate(270 128)">
        <rect x="0" y="0" width="22" height="32" rx="11" className="fill-bg stroke-bright/60 dark:stroke-sky/55" strokeWidth={1.4} />
        <path d="M-6 18 a17 17 0 0 0 34 0 M11 35 v8" fill="none" className={line} strokeWidth={1.4} strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** A network with one unusual node flagged. */
function CyberArt() {
  const nodes: [number, number][] = [[50, 50], [100, 30], [92, 98], [150, 62], [140, 138], [200, 40], [212, 108], [262, 70], [256, 142], [180, 150]];
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [3, 6], [4, 9], [5, 7], [6, 7], [6, 8], [6, 9], [8, 9]];
  const flagged = 6;
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" className="h-full w-full" direction="ltr">
      <g className={line} strokeWidth={1.1}>
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} strokeDasharray={a === flagged || b === flagged ? '3 3' : undefined} />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === flagged ? 7 : 5} className={i === flagged ? solid : 'fill-bg stroke-bright/60 dark:stroke-sky/55'} strokeWidth={1.3} />
      ))}
      <circle cx={nodes[flagged][0]} cy={nodes[flagged][1]} r="16" fill="none" className="stroke-bright dark:stroke-sky" strokeWidth={1.2} strokeDasharray="2 3" />
      <g transform="translate(268 18)">
        <path d="M18 2 l16 6 v11 c0 10 -7 17 -16 21 c-9 -4 -16 -11 -16 -21 v-11 z" className={soft} />
        <path d="M18 2 l16 6 v11 c0 10 -7 17 -16 21 c-9 -4 -16 -11 -16 -21 v-11 z" fill="none" className={line} strokeWidth={1.3} />
        <path d="M11 21 l5 5 9 -10" fill="none" className="stroke-bright dark:stroke-sky" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

const ART: Record<string, () => React.JSX.Element> = { hadith: HadithArt, quran: QuranArt, ocr: OcrArt, cyber: CyberArt };
const ICON: Record<string, IconName> = { hadith: 'book', quran: 'audio', ocr: 'document', cyber: 'shield' };

export function Projects({ t }: { t: Dictionary['projects'] }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative overflow-hidden border-t border-line py-24 sm:py-28">
      <Container className="relative flex flex-col gap-14">
        <SectionHeading id="projects-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />
        <ol className="grid gap-6 md:grid-cols-2">
          {t.items.map((p, i) => {
            const Art = ART[p.key];
            const n = String(i + 1).padStart(2, '0');
            return (
              <li key={p.key} className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-bg transition duration-300 hover:border-bright/60 hover:shadow-2xl hover:shadow-royal/10 dark:hover:border-sky/50">
                <div className="relative h-48 overflow-hidden bg-gradient-to-b from-surface to-bg">
                  <div aria-hidden="true" className="bg-khatam absolute inset-0 opacity-70" />
                  <div className="relative h-full p-4"><Art /></div>
                </div>
                <div className="flex flex-1 flex-col gap-4 border-t border-line p-7">
                  <p className="kicker flex items-center gap-2 text-bright dark:text-sky">
                    <Icon name={ICON[p.key]} className="h-4 w-4" />
                    {t.projectLabel} <span dir="ltr" className="tabular-nums">{n}</span>
                    <span aria-hidden="true" className="font-normal opacity-60">{toArabicDigits(n)}</span>
                  </p>
                  <h3 className="text-2xl font-medium text-fg">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{p.text}</p>
                  <ul className="flex flex-col gap-2 border-t border-line pt-4">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-fg">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-bright dark:text-sky" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {p.note ? <p className="rounded-xl bg-surface px-3.5 py-2.5 text-xs leading-relaxed text-muted ring-1 ring-line">{p.note}</p> : null}
                  <div className="mt-auto flex flex-col gap-4 pt-2">
                    <Tags items={p.tags} />
                    <a href="#contact" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-link">
                      {t.cta}
                      <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <OcrShowcase t={t.showcase} />
      </Container>
    </section>
  );
}
