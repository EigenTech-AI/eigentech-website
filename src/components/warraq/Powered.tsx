import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/brand/Logo';
import { Folio, Ornament } from './WarraqMark';

/**
 * Powered by EigenTech, set like the colophon at the end of a manuscript: centred lines that name who made the book,
 * here the company behind Warraq and the Warraq team.
 */
export function Powered({ t, team, home }: { t: Dictionary['warraqSite']['powered']; team: Dictionary['about']['members']; home: string }) {
  return (
    <section id="powered" aria-labelledby="powered-title" className="border-t border-rule bg-paper-2 py-24 sm:py-28">
      <Container className="flex flex-col items-center gap-8 text-center">
        <p className="flex flex-col items-center gap-3 text-sm font-medium text-wmuted">
          <Folio num={t.num} />
          {t.label}
        </p>
        <Ornament className="w-48" />
        <h2 id="powered-title" className="max-w-3xl font-display text-4xl leading-[1.2] font-semibold text-wtext sm:text-5xl rtl:leading-[1.4]">{t.title}</h2>
        <p className="max-w-2xl text-lg leading-loose text-wmuted">{t.text}</p>
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-sm font-medium text-wmuted">{t.teamTitle}</h3>
          <ul className="flex flex-col items-center gap-2">
            {team.map((m) => (
              <li key={m.name} className="text-wtext">
                <span className="font-display text-lg font-semibold">{m.name}</span>
                <span className="text-wmuted"> · {m.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <a href={home} className="group mt-2 flex flex-col items-center gap-4">
          <Logo size="md" />
          <span className="text-sm font-semibold text-wink underline decoration-rule decoration-2 underline-offset-8 transition group-hover:decoration-sky">{t.cta}</span>
        </a>
        <Ornament className="w-48" />
      </Container>
    </section>
  );
}
