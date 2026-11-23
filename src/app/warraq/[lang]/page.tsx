import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { basePath, site } from '@/lib/site';
import { videoJsonLd } from '@/lib/warraq-video';
import { WarraqHero } from '@/components/warraq/WarraqHero';
import { VideoSection } from '@/components/warraq/VideoSection';
import { Reads } from '@/components/warraq/Reads';
import { Capabilities } from '@/components/warraq/Capabilities';
import { WhyWarraq } from '@/components/warraq/WhyWarraq';
import { WorkModels } from '@/components/warraq/WorkModels';
import { Clients } from '@/components/warraq/Clients';
import { Powered } from '@/components/warraq/Powered';
import { Contact } from '@/components/sections/Contact';

/** Warraq: everything about it on one page, as an independent project powered by EigenTech. */
export default async function WarraqSitePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const loc: Locale = isLocale(lang) ? lang : 'ar';
  const t = getDictionary(loc);
  const w = t.warraqPage;
  // The contact section of the EigenTech site, with the topics and wording of Warraq
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
      <WarraqHero t={w.hero} poweredBy={t.warraqSite.poweredBy} home={`${basePath}/${loc}/`} />
      <VideoSection locale={loc} t={w.video} />
      <Reads t={w.reads} />
      <Capabilities locale={loc} t={w.capabilities} />
      <WhyWarraq t={w.why} />
      <WorkModels t={w.models} />
      <Clients t={w.clients} />
      <Powered t={t.warraqSite.powered} team={t.about.members} home={`${basePath}/${loc}/`} />
      <Contact locale={loc} t={contact} />
    </>
  );
}
