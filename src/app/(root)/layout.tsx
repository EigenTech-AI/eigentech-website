import type { Metadata } from 'next';
import '@/styles/globals.css';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'EigenTech · آيجينتك',
  alternates: { canonical: '/en/', languages: { en: '/en/', ar: '/ar/' } },
  robots: { index: false, follow: true },
};

// Root "/" only redirects to /en/ or /ar/; it has its own minimal document.
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-ink">{children}</body>
    </html>
  );
}
