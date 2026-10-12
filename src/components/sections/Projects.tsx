import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Tags } from '@/components/ui/Tag';
import { toArabicDigits } from '@/components/brand/MarkGlyph';

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

/** A CV and a role, with skills linking them. */
function HrArt() {
  const card = (x: number) => (
    <g>
      <rect x={x} y="28" width="92" height="124" rx="10" className="fill-bg stroke-line" strokeWidth={1.2} />
      <circle cx={x + 22} cy="52" r="11" className={soft} />
      <rect x={x + 40} y="45" width="40" height="5" rx="2.5" className="fill-line" />
      <rect x={x + 40} y="55" width="28" height="4" rx="2" className="fill-line" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={x + 12} y={80 + i * 16} width={i % 2 ? 54 : 68} height="7" rx="3.5" className={i === 1 || i === 2 ? soft : 'fill-line'} />)}
    </g>
  );
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" className="h-full w-full" direction="ltr">
      {card(24)}
      {card(204)}
      <g fill="none" className={line} strokeWidth={1.2}>
        <path d="M94 99 C140 99 140 80 160 80 C180 80 180 99 224 99" />
        <path d="M80 115 C140 115 140 112 160 112 C180 112 180 115 216 115" strokeDasharray="3 3" />
      </g>
      <circle cx="160" cy="96" r="20" className={soft} />
      <circle cx="160" cy="96" r="20" fill="none" className={line} strokeWidth={1.2} />
      <path d="M151 96 l6 6 12 -12" fill="none" className="stroke-bright dark:stroke-sky" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
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

const ART: Record<string, () => React.JSX.Element> = { ocr: OcrArt, hr: HrArt, cyber: CyberArt };
const ICON: Record<string, IconName> = { ocr: 'document', hr: 'people', cyber: 'shield' };

export function Projects({ t }: { t: Dictionary['projects'] }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative overflow-hidden border-t border-line py-24 sm:py-28">
      <Container className="relative flex flex-col gap-14">
        <SectionHeading id="projects-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />
        <ol className="grid gap-6 lg:grid-cols-3">
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
      </Container>
    </section>
  );
}
