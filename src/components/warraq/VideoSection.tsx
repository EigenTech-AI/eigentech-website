import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { SectionKicker } from '@/components/ui/SectionHeading';
import { VideoPlayer } from './VideoPlayer';

/** The video band of the Warraq page. */
export function VideoSection({ locale, t }: { locale: Locale; t: Dictionary['warraqPage']['video'] }) {
  return (
    <section id="video" aria-labelledby="video-title" className="relative overflow-hidden bg-royal py-20 text-white sm:py-24 dark:bg-night">
      <div aria-hidden="true" className="bg-khatam-sky pointer-events-none absolute inset-0 opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 start-[-10%] h-[40rem] w-[40rem] rounded-full bg-sky/10 blur-3xl" />
      <Container className="relative flex flex-col gap-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="flex flex-col gap-4">
            <SectionKicker label={t.label} onBlue />
            <h2 id="video-title" className="text-3xl leading-[1.12] font-medium tracking-tight sm:text-4xl rtl:leading-[1.35]">{t.title}</h2>
          </div>
          <p className="max-w-xl border-s-2 border-sky/40 ps-5 leading-relaxed text-white/80">{t.intro}</p>
        </div>
        <VideoPlayer locale={locale} t={t} />
      </Container>
    </section>
  );
}
