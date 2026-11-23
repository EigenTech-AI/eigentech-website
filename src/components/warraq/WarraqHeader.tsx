'use client';

import { useEffect, useState } from 'react';
import { otherLocale, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { basePath, brandAsset, warraqHome, warraqUrl } from '@/lib/site';
import { LOCALE_KEY } from '@/lib/theme';
import { Icon } from '@/components/ui/Icon';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { WarraqMark } from './WarraqMark';
import { PoweredBy } from './PoweredBy';

/** Header of the standalone Warraq site: its own name mark and sections, with "Powered by EigenTech". */
export function WarraqHeader({ locale, nav, poweredBy }: { locale: Locale; nav: Dictionary['warraqSite']['nav']; poweredBy: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const other = otherLocale(locale);
  const eigentech = `${basePath}/${locale}/`;
  const links = [
    { href: '#reads', label: nav.reads },
    { href: '#capabilities', label: nav.capabilities },
    { href: '#why', label: nav.why },
    { href: '#models', label: nav.models },
    { href: '#contact', label: nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const language = (
    <a
      href={warraqHome(other)}
      hrefLang={other}
      lang={other}
      title={nav.languageLabel}
      onClick={() => { try { localStorage.setItem(LOCALE_KEY, other); } catch { /* storage unavailable */ } }}
      className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm font-semibold text-fg transition hover:border-bright dark:hover:border-sky"
    >
      {nav.language}
    </a>
  );

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg">
        {nav.skip}
      </a>
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <a href={warraqHome(locale)} aria-label="Warraq ورّاق" className="shrink-0">
            <WarraqMark />
          </a>
        </div>

        <nav aria-label="Warraq" className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap text-muted transition hover:bg-surface hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={eigentech} title={nav.home} className="hidden h-10 items-center rounded-full border border-line px-3 transition hover:border-bright lg:inline-flex dark:hover:border-sky" dir="ltr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brandAsset('/brand/logo-on-white.svg')} alt={nav.home} width={546} height={173} className="h-7 w-auto dark:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brandAsset('/brand/logo-on-dark.svg')} alt={nav.home} width={546} height={173} className="hidden h-7 w-auto dark:block" />
          </a>
          <div className="hidden sm:block">{language}</div>
          <ThemeToggle labelDark={nav.themeDark} labelLight={nav.themeLight} />
          <a href={warraqUrl} className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-accent-fg transition hover:brightness-110 md:inline-flex">
            {nav.cta}
            <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="warraq-menu"
            aria-label={open ? nav.close : nav.menu}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg xl:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      <div id="warraq-menu" hidden={!open} className="border-t border-line bg-bg xl:hidden">
        <nav aria-label="Warraq mobile" className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-fg hover:bg-surface">
              {l.label}
            </a>
          ))}
          <a href={eigentech} className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-fg hover:bg-surface">
            <Icon name="globe" className="h-5 w-5 text-bright dark:text-sky" />
            {nav.home}
          </a>
          <a href={warraqUrl} className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg md:hidden">
            {nav.cta}
            <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
          </a>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="sm:hidden">{language}</div>
            <PoweredBy label={poweredBy} href={eigentech} logoClass="h-7" />
          </div>
        </nav>
      </div>
    </header>
  );
}
