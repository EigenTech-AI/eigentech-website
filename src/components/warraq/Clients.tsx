import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { WHead } from './WarraqMark';

/** Who we work with, set like the contents page of a book (with dotted leaders), and why Madinah. */
export function Clients({ t, digits }: { t: Dictionary['warraqPage']['clients']; digits: (n: number) => string }) {
  return (
    <section id="clients" aria-labelledby="clients-title" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-16">
        <WHead id="clients-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />
        <ol className="border-t border-rule">
          {t.items.map((it, i) => (
            <li key={it.title} className="flex flex-col gap-1 border-b border-rule py-5 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="hidden w-6 shrink-0 text-xs font-semibold text-sky tabular-nums sm:block">{digits(i + 1)}</span>
              <h3 className="shrink-0 font-display text-xl font-medium text-wtext">{it.title}</h3>
              <span aria-hidden="true" className="w-leader hidden sm:block" />
              <p className="leading-relaxed text-wmuted sm:max-w-sm">{it.text}</p>
            </li>
          ))}
        </ol>
        <figure className="relative grid gap-6 overflow-hidden rounded-3xl bg-royal p-8 text-white sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10 dark:bg-surface-2">
          <div aria-hidden="true" className="bg-khatam-sky pointer-events-none absolute inset-0 opacity-80" />
          <h3 className="relative flex items-center gap-3 font-display text-3xl font-medium lg:col-span-3">
            <Icon name="pin" className="h-7 w-7 text-sky" />
            {t.bandTitle}
          </h3>
          <blockquote className="relative text-lg leading-loose text-white/85 lg:col-span-9">{t.bandText}</blockquote>
        </figure>
      </Container>
    </section>
  );
}
