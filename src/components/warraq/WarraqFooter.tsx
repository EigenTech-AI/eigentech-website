import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { basePath, site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { WarraqMark } from './WarraqMark';
import { PoweredBy } from './PoweredBy';

/** Footer of the Warraq site. */
export function WarraqFooter({ locale, t, legal, poweredBy, home }: { locale: Locale; t: Dictionary['warraqSite']['footer']; legal: string; poweredBy: string; home: string }) {
  const year = new Date().getFullYear();
  const eigentech = `${basePath}/${locale}/`;
  const links = [
    { icon: 'mail' as const, label: site.email, href: `mailto:${site.email}`, ltr: true },
    { icon: 'phone' as const, label: site.phoneDisplay, href: `tel:${site.phoneHref}`, ltr: true },
    { icon: 'globe' as const, label: 'EigenTech.ai', href: eigentech, ltr: true },
    { icon: 'shield' as const, label: t.privacy, href: `${basePath}/${locale}/privacy/` },
  ];
  return (
    <footer className="border-t border-rule bg-paper-2">
      <Container className="grid gap-10 py-14 md:grid-cols-12">
        <div className="flex flex-col gap-4 md:col-span-6">
          <a href={home} aria-label="Warraq ورّاق" className="w-fit"><WarraqMark /></a>
          <p className="max-w-md text-sm leading-relaxed text-wmuted">{t.tagline}</p>
          <PoweredBy label={poweredBy} href={eigentech} />
        </div>
        <ul className="flex flex-col border-t border-rule md:col-span-4 md:col-start-9">
          {links.map((l) => (
            <li key={l.href} className="border-b border-rule">
              <a href={l.href} className="flex items-center gap-3 py-3 text-sm text-wtext transition hover:text-wink">
                <Icon name={l.icon} className="h-4 w-4 text-wmuted" />
                <span dir={l.ltr ? 'ltr' : undefined}>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
      <div className="border-t border-rule">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-wmuted sm:flex-row">
          <div className="flex flex-col gap-1 text-center sm:text-start">
            <p>© {year} ورّاق · Warraq · EigenTech. {t.rights}</p>
            <p>{legal}</p>
          </div>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-wtext">
            <Icon name="up" className="h-3.5 w-3.5" />
            {t.backToTop}
          </a>
        </Container>
      </div>
    </footer>
  );
}
