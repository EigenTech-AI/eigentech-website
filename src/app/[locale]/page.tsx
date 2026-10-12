import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Edge } from '@/components/sections/Edge';
import { Team } from '@/components/sections/Team';
import { Contact } from '@/components/sections/Contact';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'en';
  const t = getDictionary(loc);
  return (
    <>
      <Hero t={t.hero} />
      <About t={t.about} />
      <Services t={t.services} />
      <Edge t={t.edge} />
      <Team t={t.team} />
      <Contact locale={loc} t={t.contact} />
    </>
  );
}
