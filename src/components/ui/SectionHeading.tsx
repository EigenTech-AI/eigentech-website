/** Numbered section header: "01 — Services", large title, introduction beside it on wide screens. */
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
        <p className={`label-mono flex items-center gap-3 ${onBlue ? 'text-sky' : 'text-bright dark:text-sky'}`}>
          <span className="tabular-nums">{num}</span>
          <span aria-hidden="true" className={`h-px w-8 ${onBlue ? 'bg-sky/60' : 'bg-bright/50 dark:bg-sky/50'}`} />
          <span>{label}</span>
        </p>
        <h2 id={id} className={`text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl rtl:leading-[1.3] ${onBlue ? 'text-white' : 'text-fg'}`}>
          {title}
        </h2>
      </div>
      {intro ? <p className={`max-w-xl text-base leading-relaxed sm:text-lg ${onBlue ? 'text-white/75' : 'text-muted'}`}>{intro}</p> : null}
    </div>
  );
}
