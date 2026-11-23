import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { basePath, site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { WarraqMark } from './WarraqMark';
import { PoweredBy } from './PoweredBy';

/** Footer of the standalone Warraq site. */
export function WarraqFooter({ locale, t, legal, poweredBy }: { locale: Locale; t: Dictionary['warraqSite']['footer']; legal: string; poweredBy: string }) {
  const year = new Date().getFullYear();
  const home = `${basePath}/${locale}/`;
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-md flex-col gap-4">
          <WarraqMark />
          <p className="text-sm leading-relaxed text-muted">{t.tagline}</p>
          <PoweredBy label={poweredBy} href={home} />
        </div>
        <ul className="flex flex-col gap-3 text-sm">
          <li><a href={`tel:${site.phoneHref}`} dir="ltr" className="inline-flex items-center gap-2 text-muted hover:text-fg"><Icon name="phone" className="h-4 w-4" />{site.phoneDisplay}</a></li>
          <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-muted hover:text-fg"><Icon name="mail" className="h-4 w-4" />{site.email}</a></li>
          <li><a href={home} className="inline-flex items-center gap-2 text-muted hover:text-fg"><Icon name="globe" className="h-4 w-4" />EigenTech.ai</a></li>
          <li><a href={`${basePath}/${locale}/privacy/`} className="inline-flex items-center gap-2 text-muted hover:text-fg"><Icon name="shield" className="h-4 w-4" />{t.privacy}</a></li>
        </ul>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted sm:flex-row">
          <div className="flex flex-col gap-1 text-center sm:text-start">
            <p>© {year} Warraq · ورّاق · EigenTech. {t.rights}</p>
            <p>{legal}</p>
          </div>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-fg">
            <Icon name="up" className="h-3.5 w-3.5" />
            {t.backToTop}
          </a>
        </Container>
      </div>
    </footer>
  );
}
