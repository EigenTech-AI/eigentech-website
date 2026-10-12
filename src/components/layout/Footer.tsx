import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { basePath, site } from '@/lib/site';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `${basePath}/${locale}/`;
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo size="md" />
          <p className="text-sm leading-relaxed text-muted">{dict.footer.tagline}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3">
          {(['about', 'services', 'edge', 'team', 'contact'] as const).map((k) => (
            <a key={k} href={`${home}#${k}`} className="text-muted transition hover:text-fg">
              {dict.nav[k]}
            </a>
          ))}
          <a href={`${home}privacy/`} className="text-muted transition hover:text-fg">
            {dict.footer.privacy}
          </a>
        </nav>
        <ul className="flex flex-col gap-3 text-sm">
          <li><a href={`tel:${site.phoneHref}`} dir="ltr" className="inline-flex items-center gap-2 text-muted hover:text-fg"><Icon name="phone" className="h-4 w-4" />{site.phoneDisplay}</a></li>
          <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-muted hover:text-fg"><Icon name="mail" className="h-4 w-4" />{site.email}</a></li>
          <li><a href={site.url} className="inline-flex items-center gap-2 text-muted hover:text-fg"><Icon name="globe" className="h-4 w-4" />{site.domain}</a></li>
        </ul>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted sm:flex-row">
          <p>© {year} EigenTech · آيجينتك. {dict.footer.rights}</p>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-fg">
            <Icon name="up" className="h-3.5 w-3.5" />
            {dict.footer.backToTop}
          </a>
        </Container>
      </div>
    </footer>
  );
}
