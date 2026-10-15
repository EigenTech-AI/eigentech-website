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

// The seal's box inside the figure (inset 18%); the T's axis, crossbar and stem come from the mark's geometry.
const BOX = { x: 18, size: 64 };
const axis = (() => {
  const x = BOX.x + BOX.size * markLayout.tx, barY = BOX.x + BOX.size * markLayout.barY, stemY = BOX.x + BOX.size * markLayout.stemY;
  const rx = BOX.size * markLayout.barHalf * 1.18, ry = rx * 0.26;
  // an arc along the front of the ring shows the direction of the turn
  const at = (deg: number) => [x + rx * Math.cos((deg * Math.PI) / 180), barY - ry * Math.sin((deg * Math.PI) / 180)];
  const [ax, ay] = at(215), [bx, by] = at(325);
  const tx = -Math.sin((325 * Math.PI) / 180) * rx, ty = -Math.cos((325 * Math.PI) / 180) * ry, tl = Math.hypot(tx, ty);
  const head = [28, -28].map((d) => {
    const c = Math.cos((d * Math.PI) / 180), s = Math.sin((d * Math.PI) / 180), ux = tx / tl, uy = ty / tl;
    return `M${bx.toFixed(2)} ${by.toFixed(2)} l${(-2.2 * (ux * c - uy * s)).toFixed(2)} ${(-2.2 * (ux * s + uy * c)).toFixed(2)}`;
  }).join(' ');
  return { x, barY, stemY, rx, ry, arc: `M${ax.toFixed(2)} ${ay.toFixed(2)} A${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 0 ${bx.toFixed(2)} ${by.toFixed(2)}`, head };
})();

/**
 * The seal on its "eigen axis": the T network turns about its vertical axis (the stem), shown by a ring around
 * the crossbar. Every point on the axis stays where it is: Rv = v, with λ = 1.
 */
function EigenAxis({ t }: { t: Dictionary['hero']['axis'] }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" direction="ltr">
      <path d={khatam} fill="none" className="stroke-bright/15 dark:stroke-sky/12" strokeWidth={0.35} />
      {/* eigen axis: vertical, through the stem */}
      <line x1={axis.x} y1="4" x2={axis.x} y2="96" className="stroke-bright/50 dark:stroke-sky/45" strokeWidth={0.3} strokeDasharray="1.4 1.2" />
      <path d={`M${axis.x} 4 l-1.3 2.2 M${axis.x} 4 l1.3 2.2`} className="stroke-bright/60 dark:stroke-sky/55" strokeWidth={0.35} strokeLinecap="round" />
      {/* rotation rings around the crossbar and the stem */}
      <ellipse cx={axis.x} cy={axis.barY} rx={axis.rx} ry={axis.ry} fill="none" className="stroke-bright/35 dark:stroke-sky/30" strokeWidth={0.3} />
      <ellipse cx={axis.x} cy={axis.stemY} rx={axis.rx * 0.45} ry={axis.ry * 0.45} fill="none" className="stroke-bright/25 dark:stroke-sky/22" strokeWidth={0.25} strokeDasharray="1 1" />
      <path d={axis.arc} fill="none" className="stroke-bright dark:stroke-sky" strokeWidth={0.45} strokeLinecap="round" />
      <path d={axis.head} className="stroke-bright dark:stroke-sky" strokeWidth={0.45} strokeLinecap="round" />
      <g className="fill-muted" fontSize="2.6" fontFamily="var(--font-display)">
        <text x="83" y="41">{t.rotation}</text>
        <text x={axis.x + 1.8} y="7.5">{t.equation}</text>
        <text x={axis.x + 1.8} y="95">{t.lambda}</text>
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
