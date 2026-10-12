'use client';

import { usePathname } from 'next/navigation';
import { otherLocale, type Locale } from '@/i18n/config';
import { basePath } from '@/lib/site';
import { LOCALE_KEY } from '@/lib/theme';

export function LanguageSwitcher({ locale, label, title }: { locale: Locale; label: string; title: string }) {
  const pathname = usePathname() || `/${locale}/`;
  const target = otherLocale(locale);
  const href = `${basePath}${pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${target}`)}`;

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      title={title}
      onClick={() => { try { localStorage.setItem(LOCALE_KEY, target); } catch { /* storage unavailable */ } }}
      className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm font-semibold text-fg transition hover:border-bright dark:hover:border-sky"
    >
      {label}
    </a>
  );
}
