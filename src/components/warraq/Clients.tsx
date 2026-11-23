import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Ornament, WHead } from './WarraqMark';

/** Who we work with, set like the contents page of a book (with dotted leaders), and why Madinah. */
export function Clients({ t, digits }: { t: Dictionary['warraqPage']['clients']; digits: (n: number) => string }) {
  return (
    <section id="clients" aria-labelledby="clients-title" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-16">
        <WHead id="clients-title" num={t.num} label={t.label} title={t.title} intro={t.intro} />
        <ol className="border-t border-rule lg:ms-[25%]">
          {t.items.map((it, i) => (
            <li key={it.title} className="flex flex-col gap-1 border-b border-rule py-5 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="hidden w-6 shrink-0 text-xs font-semibold text-sky tabular-nums sm:block">{digits(i + 1)}</span>
              <h3 className="shrink-0 font-display text-xl font-semibold text-wtext">{it.title}</h3>
              <span aria-hidden="true" className="w-leader hidden sm:block" />
              <p className="leading-relaxed text-wmuted sm:max-w-sm">{it.text}</p>
            </li>
          ))}
        </ol>
        <figure className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="flex flex-col gap-5 lg:col-span-3">
            <Ornament className="max-w-40" />
            <h3 className="flex items-center gap-3 font-display text-3xl font-semibold text-wink">
              <Icon name="pin" className="h-6 w-6" />
              {t.bandTitle}
            </h3>
          </div>
          <blockquote className="border-s-2 border-sky ps-8 text-xl leading-loose text-wtext lg:col-span-9">{t.bandText}</blockquote>
        </figure>
      </Container>
    </section>
  );
}
