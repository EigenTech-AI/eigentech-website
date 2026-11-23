/** The Warraq name mark: ورّاق in blue ink, with the sky reading line and WARRAQ under it. */
export function WarraqMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span lang="ar" className="font-display text-[1.95rem] font-semibold text-wink">ورّاق</span>
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

/** A number inside an eight-pointed star, as numbers are marked in manuscripts (and as the star of the EigenTech pattern). */
export function Folio({ num, className = 'h-16 w-16 text-2xl' }: { num: string; className?: string }) {
  return (
    <span className={`relative grid shrink-0 place-items-center text-wink ${className}`}>
      <svg viewBox="0 0 64 64" aria-hidden="true" className="absolute inset-0 h-full w-full" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M14 14h36v36H14zM32 6.5 57.5 32 32 57.5 6.5 32z" />
      </svg>
      <span className="relative font-display font-semibold tabular-nums">{num}</span>
    </span>
  );
}

/** Section heading of the Warraq site: the folio number and name in the margin, the title in the text block. */
export function WHead({ id, num, label, title, intro }: { id: string; num: string; label: string; title: string; intro?: string }) {
  return (
    <div className="grid gap-6 border-t border-rule pt-8 lg:grid-cols-12 lg:gap-10">
      <div className="flex items-center gap-4 lg:col-span-3 lg:flex-col lg:items-start lg:gap-3">
        <Folio num={num} />
        <span className="text-sm font-medium text-wmuted">{label}</span>
      </div>
      <div className="flex flex-col gap-5 lg:col-span-9">
        <h2 id={id} className="font-display text-[2.1rem] leading-[1.18] font-semibold tracking-tight text-wtext sm:text-5xl rtl:leading-[1.4]">{title}</h2>
        {intro ? <p className="max-w-3xl text-lg leading-relaxed text-wmuted">{intro}</p> : null}
      </div>
    </div>
  );
}
