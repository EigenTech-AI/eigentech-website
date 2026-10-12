export function Tags({ items, onBlue = false }: { items: string[]; onBlue?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className={`rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${
            onBlue ? 'bg-white/10 text-white/85 ring-1 ring-white/15' : 'bg-surface text-muted ring-1 ring-line'
          }`}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
