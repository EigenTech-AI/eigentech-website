import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Tags } from '@/components/ui/Tag';

/** Small abstract diagram per pillar, drawn in brand blues. */
function PillarArt({ k }: { k: string }) {
  const stroke = 'stroke-bright/50 dark:stroke-sky/45';
  const fill = 'fill-bright/15 dark:fill-sky/15';
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true" className="h-full w-full">
      {k === 'capture' && (
        <g strokeWidth={1.2} fill="none" className={stroke}>
          {[0, 1, 2].map((i) => <rect key={i} x={24 + i * 70} y={34} width={52} height={40} rx={8} className={fill} />)}
          {[0, 1, 2].map((i) => <circle key={i} cx={50 + i * 70} cy={54} r={9} />)}
          <path d="M50 74 L120 100 L190 74" strokeDasharray="3 3" />
          <circle cx={120} cy={100} r={5} className="fill-bright dark:fill-sky" />
        </g>
      )}
      {k === 'vision' && (
        <g strokeWidth={1.2} fill="none" className={stroke}>
          <path d="M120 14 L184 46 L184 92 L120 112 L56 92 L56 46 Z" className={fill} />
          <path d="M56 46 L120 72 L184 46 M120 72 L120 112" />
          {Array.from({ length: 18 }).map((_, i) => <circle key={i} cx={70 + ((i * 37) % 100)} cy={30 + ((i * 23) % 70)} r={1.8} className="fill-bright dark:fill-sky" />)}
        </g>
      )}
      {k === 'multimodal' && (
        <g strokeWidth={1.2} fill="none" className={stroke}>
          <rect x={20} y={20} width={56} height={34} rx={6} className={fill} />
          <path d="M20 76 h56 M20 86 h40 M20 96 h48" />
          <path d="M20 112 q10 -18 20 0 t20 0 t20 0" />
          <path d="M80 37 C110 37 110 60 140 60 M80 86 C110 86 110 60 140 60 M84 104 C112 104 112 60 140 60" strokeDasharray="3 3" />
          <circle cx={170} cy={60} r={28} className={fill} />
          <circle cx={170} cy={60} r={8} className="fill-bright dark:fill-sky" />
        </g>
      )}
      {k === 'deploy' && (
        <g strokeWidth={1.2} fill="none" className={stroke}>
          {[0, 1, 2].map((i) => <rect key={i} x={30} y={18 + i * 30} width={90} height={22} rx={5} className={fill} />)}
          {[0, 1, 2].map((i) => <circle key={i} cx={44} cy={29 + i * 30} r={2.5} className="fill-bright dark:fill-sky" />)}
          <path d="M120 59 H160" strokeDasharray="3 3" />
          <path d="M184 30 l26 12 v22 c0 14 -12 24 -26 30 c-14 -6 -26 -16 -26 -30 v-22 z" className={fill} />
          <path d="M174 60 l7 7 l13 -14" />
        </g>
      )}
    </svg>
  );
}

const ICON: Record<string, IconName> = { capture: 'capture', vision: 'vision', multimodal: 'multimodal', deploy: 'deploy' };

export function Platform({ t }: { t: Dictionary['platform'] }) {
  return (
    <section id="platform" aria-labelledby="platform-title" className="relative border-y border-line bg-surface py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading id="platform-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />
        <ol className="grid gap-5 md:grid-cols-2">
          {t.pillars.map((p, i) => (
            <li key={p.key} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-bg">
              <div className="relative h-40 border-b border-line bg-gradient-to-b from-surface-2/50 to-bg px-6 pt-6">
                <div aria-hidden="true" className="bg-khatam absolute inset-0 opacity-70" />
                <div className="relative h-full">
                  <PillarArt k={p.key} />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-7">
                <p className="label-mono flex items-center gap-2 text-bright dark:text-sky">
                  <Icon name={ICON[p.key]} className="h-4 w-4" />
                  {t.pillarLabel} {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-2xl font-medium text-fg">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{p.text}</p>
                <div className="mt-auto pt-3">
                  <Tags items={p.tags} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
