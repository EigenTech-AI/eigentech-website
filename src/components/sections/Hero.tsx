import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { HeroMark } from '@/components/brand/HeroMark';

// Four stages around the mark, placed on the outer orbit (angles in degrees, 0 = right, clockwise).
const ORBIT: { icon: IconName; angle: number }[] = [
  { icon: 'capture', angle: 218 },
  { icon: 'vision', angle: 322 },
  { icon: 'multimodal', angle: 38 },
  { icon: 'deploy', angle: 142 },
];

function Orbit({ labels }: { labels: string[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        {[47, 37, 27].map((r, i) => (
          <circle key={r} cx="50" cy="50" r={r} fill="none" className="stroke-bright/20 dark:stroke-sky/15" strokeWidth={0.25} strokeDasharray={i === 0 ? '0' : '1 1.2'} />
        ))}
        {ORBIT.map((o) => {
          const a = (o.angle * Math.PI) / 180;
          return <line key={o.angle} x1={50 + 27 * Math.cos(a)} y1={50 + 27 * Math.sin(a)} x2={50 + 44 * Math.cos(a)} y2={50 + 44 * Math.sin(a)} className="stroke-bright/45 dark:stroke-sky/40" strokeWidth={0.3} strokeDasharray="1 1" />;
        })}
      </svg>
      {ORBIT.map((o, i) => {
        const a = (o.angle * Math.PI) / 180;
        const x = 50 + 47 * Math.cos(a), y = 50 + 47 * Math.sin(a);
        return (
          <div key={o.angle} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: `${x}%`, top: `${y}%` }}>
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg/90 text-bright shadow-sm backdrop-blur dark:text-sky">
              <Icon name={o.icon} className="h-5 w-5" />
            </span>
            <span className="label-mono whitespace-nowrap text-[0.62rem] text-muted">{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

export function Hero({ t }: { t: Dictionary['hero'] }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_70%_at_50%_30%,black,transparent)]" />
      <div aria-hidden="true" className="glow pointer-events-none absolute -top-48 end-[-12%] h-[44rem] w-[44rem]" />
      <div aria-hidden="true" className="glow pointer-events-none absolute -bottom-64 start-[-18%] h-[36rem] w-[36rem] opacity-70" />
      <Container className="relative grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
        <div className="flex flex-col gap-7">
          <p className="flex w-fit items-center gap-2.5 rounded-full border border-line bg-bg/70 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur">
            <span className="pulse-dot h-2 w-2 rounded-full bg-bright dark:bg-sky" />
            <span className="label-mono text-[0.68rem] normal-case tracking-[0.08em] rtl:text-xs">{t.eyebrow}</span>
          </p>
          <h1 id="hero-title" className="text-5xl leading-[1.04] font-medium tracking-tight text-fg sm:text-6xl lg:text-[4rem] xl:text-[4.4rem] rtl:leading-[1.25]">
            {t.titleStart}{' '}
            <span className="bg-gradient-to-r from-royal to-bright bg-clip-text text-transparent dark:from-sky dark:to-network rtl:bg-gradient-to-l">{t.titleAccent}</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">{t.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="#services" className="px-6 py-3">
              {t.primary}
              <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost" className="px-5 py-3">
              {t.secondary}
            </ButtonLink>
          </div>
          <dl className="mt-4 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-6">
            {t.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <dt className="order-2 label-mono text-[0.64rem] leading-snug text-muted rtl:text-xs">{s.label}</dt>
                <dd className="order-1 font-display text-4xl font-medium text-royal tabular-nums dark:text-sky">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="relative mx-auto w-full max-w-[34rem]">
          <div className="relative aspect-square">
            <div aria-hidden="true" className="glow absolute inset-[12%]" />
            <Orbit labels={t.orbit} />
            <div className="absolute inset-[23%]">
              <HeroMark label={t.markLabel} />
            </div>
          </div>
          <figcaption className="mt-2 text-center text-xs text-muted">{t.markCaption}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
