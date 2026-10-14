import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { HeroMark } from '@/components/brand/HeroMark';
import { MarkGlyph } from '@/components/brand/MarkGlyph';
import { markLayout } from '@/lib/eigen-mark';

// Eight-pointed star (khatam) outline, centred, in a 100-unit box.
const khatam = (() => {
  const pts: string[] = [];
  for (let k = 0; k < 16; k++) {
    const r = k % 2 ? 46 * 0.7654 : 46, a = (k * Math.PI) / 8 - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return 'M' + pts.join(' L') + ' Z';
})();

// The seal's box inside the figure (inset 18%), and the T's centre and reach from the mark's geometry.
const BOX = { x: 18, size: 64 };
const ring = (() => {
  const cx = BOX.x + BOX.size * markLayout.tx, ry = BOX.size * markLayout.tReach, rx = ry * 0.36;
  const at = (deg: number) => [cx + rx * Math.cos(deg * Math.PI / 180), 50 - ry * Math.sin(deg * Math.PI / 180)].map((n) => n.toFixed(2));
  const [ax, ay] = at(118), [bx, by] = at(52);
  // the label sits outside the seal's circle, up and to the right of the T
  return { cx, rx, ry, arc: `M${ax} ${ay} A${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 1 ${bx} ${by}`, head: `M${bx} ${by} l-2.4 -0.9 M${bx} ${by} l-0.4 2.4`, label: [76, 20.5] };
})();

/**
 * The seal on its "eigen axis": the arrow's axis runs through the whole figure, and tilted rings show the
 * T network turning around it. Rotating about an axis leaves that axis unchanged: Rv = v, with λ = 1.
 */
function EigenAxis({ t }: { t: Dictionary['hero']['axis'] }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" direction="ltr">
      <path d={khatam} fill="none" className="stroke-bright/15 dark:stroke-sky/12" strokeWidth={0.35} />
      {/* eigen axis */}
      <line x1="1" y1="50" x2="99" y2="50" className="stroke-bright/50 dark:stroke-sky/45" strokeWidth={0.3} strokeDasharray="1.4 1.2" />
      <path d="M99 50 l-2.2 -1.3 M99 50 l-2.2 1.3" className="stroke-bright/60 dark:stroke-sky/55" strokeWidth={0.35} strokeLinecap="round" />
      {/* rotation rings around the T */}
      <ellipse cx={ring.cx} cy="50" rx={ring.rx} ry={ring.ry} fill="none" className="stroke-bright/35 dark:stroke-sky/30" strokeWidth={0.3} />
      <ellipse cx={ring.cx} cy="50" rx={ring.rx * 0.62} ry={ring.ry * 0.78} fill="none" className="stroke-bright/25 dark:stroke-sky/22" strokeWidth={0.25} strokeDasharray="1 1" />
      <path d={ring.arc} fill="none" className="stroke-bright dark:stroke-sky" strokeWidth={0.45} strokeLinecap="round" />
      <path d={ring.head} className="stroke-bright dark:stroke-sky" strokeWidth={0.45} strokeLinecap="round" />
      <g className="fill-muted" fontSize="2.6" fontFamily="var(--font-display)">
        <text x={ring.label[0]} y={ring.label[1]}>{t.rotation}</text>
        <text x="85" y="47.6">{t.equation}</text>
        <text x="2" y="47.6">{t.lambda}</text>
      </g>
    </svg>
  );
}

export function Hero({ t }: { t: Dictionary['hero'] }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-khatam pointer-events-none absolute inset-0 [mask-image:radial-gradient(75%_65%_at_75%_35%,black,transparent)]" />
      <div aria-hidden="true" className="glow pointer-events-none absolute -top-48 end-[-12%] h-[44rem] w-[44rem]" />
      <Container className="relative grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
        <div className="flex flex-col gap-7">
          <p className="kicker flex items-center gap-3 text-bright dark:text-sky">
            <MarkGlyph className="h-5 w-5" />
            <span>{t.eyebrow}</span>
            <span aria-hidden="true" className="h-px w-10 bg-bright/40 dark:bg-sky/40" />
          </p>
          <h1 id="hero-title" className="text-5xl leading-[1.04] font-medium tracking-tight text-fg sm:text-6xl lg:text-[4rem] xl:text-[4.4rem] rtl:leading-[1.25]">
            {t.titleStart}{' '}
            <span className="text-royal dark:text-sky">{t.titleAccent}</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">{t.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" className="px-6 py-3">
              {t.primary}
              <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" className="px-5 py-3">
              {t.secondary}
            </ButtonLink>
          </div>
          <dl className="mt-4 grid max-w-xl grid-cols-3 overflow-hidden rounded-2xl border border-line bg-bg/70 backdrop-blur">
            {t.stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col gap-1 px-4 py-4 ${i ? 'border-s border-line' : ''}`}>
                <dt className="order-2 text-xs leading-snug text-muted">{s.label}</dt>
                <dd className="order-1 font-display text-3xl font-medium text-royal tabular-nums dark:text-sky">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="relative mx-auto w-full max-w-[34rem]">
          <div className="relative aspect-square">
            <div aria-hidden="true" className="glow absolute inset-[14%]" />
            <EigenAxis t={t.axis} />
            <div className="absolute inset-[18%]">
              <HeroMark label={t.markLabel} />
            </div>
          </div>
          <figcaption className="mt-1 flex items-center justify-center gap-2 text-center text-xs text-muted">
            <span className="font-display text-bright dark:text-sky">{t.axis.axis}</span>
            <span aria-hidden="true">·</span>
            <span>{t.markCaption}</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
