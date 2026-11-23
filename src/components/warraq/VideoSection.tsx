import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { VideoPlayer } from './VideoPlayer';

/** The video of the Warraq site, framed like an inset plate on the page. */
export function VideoSection({ locale, t }: { locale: Locale; t: Dictionary['warraqPage']['video'] }) {
  return (
    <section id="video" aria-labelledby="video-title" className="border-y border-rule bg-paper-2 py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col gap-4 lg:col-span-4 lg:pb-14">
          <p className="flex items-center gap-3 text-sm font-medium text-wmuted">
            <span aria-hidden="true" className="h-[2px] w-8 bg-sky" />
            {t.label}
          </p>
          <h2 id="video-title" className="font-display text-3xl leading-[1.2] font-semibold text-wtext sm:text-4xl rtl:leading-[1.4]">{t.title}</h2>
          <p className="leading-relaxed text-wmuted">{t.intro}</p>
        </div>
        <VideoPlayer locale={locale} t={t} tone="paper" className="lg:col-span-8" />
      </Container>
    </section>
  );
}
