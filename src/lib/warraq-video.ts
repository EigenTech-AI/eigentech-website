import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { mediaAsset } from '@/lib/site';

/** Search engines: the video in the page's language. */
export function videoJsonLd(locale: Locale, t: Dictionary['warraqPage']['video'], siteUrl: string) {
  const DURATION: Record<Locale, string> = { ar: 'PT2M41S', en: 'PT2M27S' };
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: t.versions[locale].title,
    description: t.intro,
    inLanguage: locale,
    uploadDate: '2026-11-16',
    duration: DURATION[locale],
    thumbnailUrl: `${siteUrl}${mediaAsset(`warraq-promo-${locale}-poster.webp`)}`,
    contentUrl: `${siteUrl}${mediaAsset(`warraq-promo-${locale}.mp4`)}`,
  };
}
