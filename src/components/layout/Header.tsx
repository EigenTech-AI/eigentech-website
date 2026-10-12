'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { basePath } from '@/lib/site';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header({ locale, nav }: { locale: Locale; nav: Dictionary['nav'] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const home = `${basePath}/${locale}/`;
  const links = [
    { href: `${home}#about`, label: nav.about },
    { href: `${home}#services`, label: nav.services },
    { href: `${home}#edge`, label: nav.edge },
    { href: `${home}#team`, label: nav.team },
    { href: `${home}#contact`, label: nav.contact },
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

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg">
        {nav.skip}
      </a>
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href={home} aria-label="EigenTech" className="shrink-0">
          <Logo size="sm" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} label={nav.language} title={nav.languageLabel} />
          </div>
          <ThemeToggle labelDark={nav.themeDark} labelLight={nav.themeLight} />
          <a href={`${home}#contact`} className="hidden rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition hover:brightness-110 md:inline-flex">
            {nav.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.close : nav.menu}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-bg lg:hidden">
        <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-fg hover:bg-surface">
              {l.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-2 sm:hidden">
            <LanguageSwitcher locale={locale} label={nav.language} title={nav.languageLabel} />
          </div>
        </nav>
      </div>
    </header>
  );
}
