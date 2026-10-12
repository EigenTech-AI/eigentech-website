import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { basePath } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : 'en');
  return { title: t.privacy.title, alternates: { canonical: `/${locale}/privacy/`, languages: { en: '/en/privacy/', ar: '/ar/privacy/' } } };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'en';
  const t = getDictionary(loc).privacy;
  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <h1 className="text-4xl font-medium tracking-tight text-fg">{t.title}</h1>
      <p className="mt-3 text-sm text-muted">{t.updated}</p>
      <div className="mt-10 flex flex-col gap-8">
        {t.sections.map((s) => (
          <section key={s.title} className="flex flex-col gap-2">
            <h2 className="text-xl font-medium text-fg">{s.title}</h2>
            <p className="leading-relaxed text-muted">{s.text}</p>
          </section>
        ))}
      </div>
      <a href={`${basePath}/${loc}/`} className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-link">
        <Icon name="arrow" className="h-4 w-4 rotate-180 rtl:rotate-0" />
        {t.back}
      </a>
    </Container>
  );
}
