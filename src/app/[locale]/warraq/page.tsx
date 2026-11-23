import type { Metadata } from 'next';
import { isLocale } from '@/i18n/config';
import { warraqHome } from '@/lib/site';
import { Container } from '@/components/ui/Container';

// The Warraq page moved to its own site, www.eigentech.ai/warraq/<lang>/. Earlier links to /<lang>/warraq/ land here
// and go on to the new address.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const to = warraqHome(isLocale(locale) ? locale : 'en');
  return { title: 'Warraq · ورّاق', alternates: { canonical: to }, robots: { index: false, follow: true } };
}

export default async function MovedWarraqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const to = warraqHome(isLocale(locale) ? locale : 'en');
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `location.replace('${to}'+location.hash)` }} />
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <Container className="py-24 text-center">
        <a href={to} className="text-lg font-semibold text-link">Warraq · ورّاق</a>
      </Container>
    </>
  );
}
