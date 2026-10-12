import { MarkGlyph, toArabicDigits } from '@/components/brand/MarkGlyph';

/** Section label in EigenTech style: the E glyph, the number in both 01 and ٠١ digits, then the name. */
export function SectionKicker({ num, label, onBlue = false }: { num: string; label: string; onBlue?: boolean }) {
  return (
    <p className={`kicker flex items-center gap-2.5 ${onBlue ? 'text-sky' : 'text-bright dark:text-sky'}`}>
      <MarkGlyph className="h-4 w-4 shrink-0" />
      <span className="tabular-nums" dir="ltr">{num}</span>
      <span aria-hidden="true" className={`font-normal ${onBlue ? 'text-sky/60' : 'text-bright/50 dark:text-sky/50'}`}>{toArabicDigits(num)}</span>
      <span aria-hidden="true" className={`h-px w-6 ${onBlue ? 'bg-sky/50' : 'bg-bright/40 dark:bg-sky/40'}`} />
      <span>{label}</span>
    </p>
  );
}

/** Section header: kicker and large title on one side, introduction on the other on wide screens. */
export function SectionHeading({
  num,
  label,
  title,
  intro,
  id,
  onBlue = false,
}: {
  num: string;
  label: string;
  title: string;
  intro?: string;
  id: string;
  onBlue?: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="flex flex-col gap-4">
        <SectionKicker num={num} label={label} onBlue={onBlue} />
        <h2 id={id} className={`text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl rtl:leading-[1.3] ${onBlue ? 'text-white' : 'text-fg'}`}>
          {title}
        </h2>
      </div>
      {intro ? (
        <p className={`max-w-xl border-s-2 ps-5 text-base leading-relaxed sm:text-lg ${onBlue ? 'border-sky/40 text-white/75' : 'border-bright/25 text-muted dark:border-sky/25'}`}>{intro}</p>
      ) : null}
    </div>
  );
}
