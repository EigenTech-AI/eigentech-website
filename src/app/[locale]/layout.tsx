import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '@/styles/globals.css';
import { isLocale, localeMeta, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { fontVars } from '@/lib/fonts';
import { asset, site, brandAsset, brandVersion } from '@/lib/site';
import { themeScript } from '@/lib/theme';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#060c22' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s | ${locale === 'ar' ? site.nameAr : site.name}` },
    description: t.meta.description,
    alternates: { canonical: `/${locale}/`, languages: { en: '/en/', ar: '/ar/', 'x-default': '/en/' } },
    openGraph: {
      type: 'website',
      siteName: 'EigenTech · آيجينتك',
      title: t.meta.title,
      description: t.meta.description,
      url: `/${locale}/`,
      locale: localeMeta[locale].ogLocale,
      images: [{ url: `/brand/og.png?v=${brandVersion}`, width: 1200, height: 630, alt: 'EigenTech · آيجينتك' }],
    },
    twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.description, images: [`/brand/og.png?v=${brandVersion}`] },
    icons: {
      icon: [{ url: brandAsset('/favicon.ico'), sizes: 'any' }, { url: brandAsset('/icon.svg'), type: 'image/svg+xml' }],
      apple: brandAsset('/apple-touch-icon.png'),
    },
    manifest: asset('/site.webmanifest'),
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const dict = getDictionary(loc);
  const meta = localeMeta[loc];

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EigenTech',
    alternateName: 'آيجينتك',
    url: site.url,
    logo: `${site.url}/brand/icon-512.png?v=${brandVersion}`,
    email: site.email,
    telephone: site.phoneHref,
    founder: { '@type': 'Person', name: 'Dr. Ahmed Elhayek', jobTitle: 'Founder & CEO' },
    sameAs: [site.linkedin],
  };

  return (
    <html lang={meta.htmlLang} dir={meta.dir} className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      </head>
      <body id="top" className="min-h-dvh">
        <Header locale={loc} nav={dict.nav} />
        <main id="main">{children}</main>
        <Footer locale={loc} dict={dict} />
        <FloatingCTA label={dict.floating.label} />
      </body>
    </html>
  );
}
