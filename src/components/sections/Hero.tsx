import type { Dictionary } from '@/i18n/get-dictionary';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { HeroMark } from '@/components/brand/HeroMark';

export function Hero({ t }: { t: Dictionary['hero'] }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-khatam pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_70%_at_70%_40%,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 end-[-10%] h-[36rem] w-[36rem] rounded-full bg-bright/15 blur-3xl dark:bg-network/20" />
      <Container className="relative grid items-center gap-10 pt-10 pb-16 sm:pt-14 md:grid-cols-[1.1fr_0.9fr] md:pb-24 lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="w-fit rounded-full border border-line bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">{t.eyebrow}</p>
          <h1 id="hero-title" className="text-4xl leading-[1.08] font-medium tracking-tight text-fg sm:text-5xl lg:text-6xl rtl:leading-[1.25]">
            {t.title}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">{t.subtitle}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="#services">
              {t.primary}
              <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              {t.secondary}
            </ButtonLink>
          </div>
        </div>
        <figure className="mx-auto flex w-full max-w-md flex-col items-center gap-3">
          <div className="w-full rounded-[2rem] border border-line bg-gradient-to-b from-surface to-bg p-6 shadow-xl shadow-royal/5 dark:from-surface-2/60 dark:to-surface dark:shadow-black/30">
            <HeroMark label={t.markLabel} />
          </div>
          <figcaption className="text-center text-xs text-muted">{t.markCaption}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
