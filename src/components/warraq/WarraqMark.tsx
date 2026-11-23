import { SectionHeading } from '@/components/ui/SectionHeading';

/** The Warraq name mark: ورّاق in blue ink, with the sky reading line and WARRAQ under it. */
export function WarraqMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span lang="ar" className="font-display text-[1.95rem] font-medium text-wink">ورّاق</span>
      <span className="mt-1.5 flex items-center gap-1.5" dir="ltr">
        <span aria-hidden="true" className="h-[2px] w-5 bg-sky" />
        <span className="font-display text-[0.6rem] font-medium tracking-[0.38em] text-wmuted">WARRAQ</span>
      </span>
    </span>
  );
}

/** An eight-pointed star (khatam, as in the EigenTech pattern) between two hairlines: a divider, as in manuscripts. */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-4 text-wink ${className}`}>
      <span className="h-px flex-1 bg-rule" />
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.2}>
        <path d="M6 6h12v12H6zM12 3.5 20.5 12 12 20.5 3.5 12z" />
      </svg>
      <span className="h-px flex-1 bg-rule" />
    </div>
  );
}

/** Section heading of the Warraq site: the EigenTech section heading (E mark, 01 and ٠١, the name, the title). */
export function WHead({ id, num, label, title, intro }: { id: string; num: string; label: string; title: string; intro?: string }) {
  return <SectionHeading id={id} num={num} label={label} title={title} intro={intro} />;
}
