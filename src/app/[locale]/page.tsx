import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { site } from '@/lib/site';
import { Hero } from '@/components/sections/Hero';
import { Focus } from '@/components/sections/Focus';
import { Services } from '@/components/sections/Services';
import { Projects } from '@/components/sections/Projects';
import { Platform } from '@/components/sections/Platform';
import { Edge } from '@/components/sections/Edge';
import { Industries } from '@/components/sections/Industries';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { videoJsonLd } from '@/lib/warraq-video';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'en';
  const t = getDictionary(loc);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd(loc, t.warraqPage.video, site.url)) }} />
      <Hero t={t.hero} />
      <Focus locale={loc} t={t.focus} video={t.warraqPage.video} />
      <Projects t={t.projects} />
      <Services t={t.services} />
      <Platform t={t.platform} />
      <Edge t={t.edge} />
      <Industries t={t.industries} />
      <About t={t.about} />
      <Contact locale={loc} t={t.contact} />
    </>
  );
}
