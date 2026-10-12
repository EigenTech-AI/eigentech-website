import { basePath } from '@/lib/site';
import { LOCALE_KEY } from '@/lib/theme';

// Static hosting has no server redirects, so choose the language in the browser:
// a saved choice first, then the browser language, defaulting to English.
const redirect = `(function(){var l='en';try{var s=localStorage.getItem('${LOCALE_KEY}');if(s==='ar'||s==='en'){l=s}else if((navigator.language||'').toLowerCase().indexOf('ar')===0){l='ar'}}catch(e){}location.replace('${basePath}/'+l+'/'+location.hash)})();`;

export default function RootPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/en/`} />
      </noscript>
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: '3rem 1.25rem', textAlign: 'center' }}>
        <p>
          <a href={`${basePath}/en/`}>EigenTech (English)</a> · <a href={`${basePath}/ar/`} lang="ar">آيجينتك (العربية)</a>
        </p>
      </main>
    </>
  );
}
