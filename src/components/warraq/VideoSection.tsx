import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionKicker } from '@/components/ui/SectionHeading';
import { VideoPlayer } from './VideoPlayer';

/** The video of the Warraq site, on the royal band of the EigenTech site (as on its home page). */
export function VideoSection({ locale, t }: { locale: Locale; t: Dictionary['warraqPage']['video'] }) {
  return (
    <section id="video" aria-labelledby="video-title" className="relative overflow-hidden bg-royal py-20 text-white sm:py-24 dark:bg-night">
      <div aria-hidden="true" className="bg-khatam-sky pointer-events-none absolute inset-0 opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 start-[-10%] h-[40rem] w-[40rem] rounded-full bg-sky/10 blur-3xl" />
      <Container className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col gap-4 lg:col-span-4 lg:pb-16">
          <SectionKicker label={t.label} onBlue />
          <h2 id="video-title" className="font-display text-3xl leading-[1.2] font-medium sm:text-4xl rtl:leading-[1.4]">{t.title}</h2>
          <p className="leading-relaxed text-white/80">{t.intro}</p>
        </div>
        <VideoPlayer locale={locale} t={t} className="lg:col-span-8" />
      </Container>
    </section>
  );
}
