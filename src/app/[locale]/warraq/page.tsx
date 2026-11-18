import type { Metadata } from 'next';
import { isLocale, localeMeta, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { basePath, mediaAsset, site } from '@/lib/site';
import { WarraqHero } from '@/components/warraq/WarraqHero';
import { VideoSection } from '@/components/warraq/VideoSection';
import { videoJsonLd } from '@/lib/warraq-video';
import { Reads } from '@/components/warraq/Reads';
import { Capabilities } from '@/components/warraq/Capabilities';
import { WhyWarraq } from '@/components/warraq/WhyWarraq';
import { WorkModels } from '@/components/warraq/WorkModels';
import { Clients } from '@/components/warraq/Clients';
import { Contact } from '@/components/sections/Contact';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).warraqPage;
  const poster = mediaAsset(`warraq-promo-${locale}-poster.webp`);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: `/${locale}/warraq/`, languages: { en: '/en/warraq/', ar: '/ar/warraq/', 'x-default': '/en/warraq/' } },
    openGraph: {
      type: 'website',
      siteName: 'EigenTech · آيجينتك',
      title: t.meta.title,
      description: t.meta.description,
      url: `/${locale}/warraq/`,
      locale: localeMeta[locale].ogLocale,
      images: [{ url: poster, width: 1280, height: 720, alt: t.meta.title }],
    },
    twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.description, images: [poster] },
  };
}

/** Warraq, the main project of EigenTech: everything about it on one page. */
export default async function WarraqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'en';
  const t = getDictionary(loc);
  const w = t.warraqPage;
  // The contact section of the home page, with the topics and wording of Warraq
  const contact = {
    ...t.contact,
    num: w.contact.num,
    title: w.contact.title,
    intro: w.contact.intro,
    form: { ...t.contact.form, interests: w.contact.interests, messageHint: w.contact.messageHint },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd(loc, w.video, site.url)) }} />
      <WarraqHero t={w.hero} back={w.back} home={`${basePath}/${loc}/`} />
      <VideoSection locale={loc} t={w.video} />
      <Reads t={w.reads} />
      <Capabilities locale={loc} t={w.capabilities} />
      <WhyWarraq t={w.why} />
      <WorkModels t={w.models} />
      <Clients t={w.clients} />
      <Contact locale={loc} t={contact} />
    </>
  );
}
