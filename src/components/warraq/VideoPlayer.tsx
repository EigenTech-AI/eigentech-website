'use client';

import { useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { mediaAsset } from '@/lib/site';
import { Icon } from '@/components/ui/Icon';

const LANGS: Locale[] = ['ar', 'en'];

/**
 * The Warraq promotional video, in Arabic and English, for a blue background. The page's language plays first;
 * the visitor can switch.
 */
export function VideoPlayer({ locale, t, className = '' }: { locale: Locale; t: Dictionary['warraqPage']['video']; className?: string }) {
  const [lang, setLang] = useState<Locale>(locale);
  const v = t.versions[lang];
  const src = mediaAsset(`warraq-promo-${lang}.mp4`);
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div role="group" aria-label={t.choose} className="inline-flex w-fit gap-1 rounded-full bg-white/10 p-1 ring-1 ring-white/15">
        {LANGS.map((l) => (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={l === lang}
            onClick={() => setLang(l)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${l === lang ? 'bg-white text-royal' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
          >
            {t.versions[l].name}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-[1.5rem] bg-night shadow-2xl shadow-black/30 ring-1 ring-white/15">
        {/* A new key for each language, so the player loads the other file from the start */}
        <video key={lang} controls playsInline preload="none" poster={mediaAsset(`warraq-promo-${lang}-poster.webp`)} title={v.title} className="block aspect-video h-auto w-full">
          <source src={src} type="video/mp4" />
          <track kind="captions" src={mediaAsset(`warraq-promo-${lang}.vtt`)} srcLang={lang} label={v.captions} />
          <p className="p-6">
            {t.fallback}{' '}
            <a href={src} className="inline-flex items-center gap-1.5 font-semibold text-sky underline">
              <Icon name="download" className="h-4 w-4" />
              {t.download}
            </a>
          </p>
        </video>
      </div>
    </div>
  );
}
