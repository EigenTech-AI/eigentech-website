import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '@/styles/globals.css';
import { isLocale, localeMeta, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { fontVars } from '@/lib/fonts';
import { brandAsset, mediaAsset, site } from '@/lib/site';
import { themeScript } from '@/lib/theme';
import { WarraqHeader } from '@/components/warraq/WarraqHeader';
import { WarraqFooter } from '@/components/warraq/WarraqFooter';
import { FloatingCTA } from '@/components/layout/FloatingCTA';

// The standalone Warraq site, www.eigentech.ai/warraq/ar/ and /en/: an independent project, powered by EigenTech.
// It has its own header and footer; the EigenTech site links to it, and it links back through "Powered by EigenTech".
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#060c22' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).warraqSite;
  const poster = mediaAsset(`warraq-promo-${lang}-poster.webp`);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: `/warraq/${lang}/`, languages: { ar: '/warraq/ar/', en: '/warraq/en/', 'x-default': '/warraq/' } },
    openGraph: {
      type: 'website',
      siteName: 'Warraq · ورّاق',
      title: t.meta.title,
      description: t.meta.description,
      url: `/warraq/${lang}/`,
      locale: localeMeta[lang].ogLocale,
      images: [{ url: poster, width: 1280, height: 720, alt: 'Warraq · ورّاق' }],
    },
    twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.description, images: [poster] },
    icons: {
      icon: [{ url: brandAsset('/favicon.ico'), sizes: 'any' }, { url: brandAsset('/icon.svg'), type: 'image/svg+xml' }],
      apple: brandAsset('/apple-touch-icon.png'),
    },
  };
}

export default async function WarraqLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const loc = lang as Locale;
  const t = getDictionary(loc);
  const meta = localeMeta[loc];
  const product = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Warraq',
    alternateName: 'ورّاق',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${site.url}/warraq/${loc}/`,
    description: t.warraqSite.meta.description,
    publisher: { '@type': 'Organization', name: 'EigenTech', alternateName: 'آيجينتك', url: site.url },
  };

  return (
    <html lang={meta.htmlLang} dir={meta.dir} className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      </head>
      <body id="top" className="min-h-dvh">
        <WarraqHeader locale={loc} nav={t.warraqSite.nav} poweredBy={t.warraqSite.poweredBy} />
        <main id="main">{children}</main>
        <WarraqFooter locale={loc} t={t.warraqSite.footer} legal={t.footer.legal} poweredBy={t.warraqSite.poweredBy} />
        <FloatingCTA label={t.floating.label} />
      </body>
    </html>
  );
}
