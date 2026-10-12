export function SectionHeading({
  kicker,
  title,
  intro,
  id,
  align = 'start',
}: {
  kicker: string;
  title: string;
  intro?: string;
  id: string;
  align?: 'start' | 'center';
}) {
  const center = align === 'center';
  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${center ? 'mx-auto items-center text-center' : ''}`}>
      <p className="text-xs font-semibold tracking-[0.18em] text-bright uppercase dark:text-sky rtl:tracking-normal">{kicker}</p>
      <h2 id={id} className="text-3xl leading-tight font-medium tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {intro ? <p className="text-base leading-relaxed text-muted sm:text-lg">{intro}</p> : null}
    </div>
  );
}
