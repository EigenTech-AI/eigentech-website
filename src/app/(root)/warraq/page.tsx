import type { Metadata } from 'next';
import { basePath } from '@/lib/site';
import { LOCALE_KEY } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Warraq · ورّاق',
  alternates: { canonical: '/warraq/ar/', languages: { ar: '/warraq/ar/', en: '/warraq/en/' } },
};

// www.eigentech.ai/warraq: the address to share. Static hosting has no server redirects, so choose the language in
// the browser (a saved choice first, then the browser language, otherwise English), as the home page does.
const redirect = `(function(){var l='en';try{var s=localStorage.getItem('${LOCALE_KEY}');if(s==='ar'||s==='en'){l=s}else if((navigator.language||'').toLowerCase().indexOf('ar')===0){l='ar'}}catch(e){}location.replace('${basePath}/warraq/'+l+'/'+location.hash)})();`;

export default function WarraqRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/warraq/ar/`} />
      </noscript>
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: '3rem 1.25rem', textAlign: 'center' }}>
        <p>
          <a href={`${basePath}/warraq/ar/`} lang="ar">ورّاق (العربية)</a> · <a href={`${basePath}/warraq/en/`}>Warraq (English)</a>
        </p>
      </main>
    </>
  );
}
