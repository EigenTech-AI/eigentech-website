import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Projects } from '@/components/sections/Projects';
import { Platform } from '@/components/sections/Platform';
import { Edge } from '@/components/sections/Edge';
import { Industries } from '@/components/sections/Industries';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'en';
  const t = getDictionary(loc);
  return (
    <>
      <Hero t={t.hero} />
      <Services t={t.services} />
      <Projects t={t.projects} />
      <Platform t={t.platform} />
      <Edge t={t.edge} />
      <Industries t={t.industries} />
      <About t={t.about} />
      <Contact locale={loc} t={t.contact} />
    </>
  );
}
