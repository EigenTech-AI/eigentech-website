export const THEME_KEY = 'et-theme';
export const LOCALE_KEY = 'et-locale';

/** Inline script for <head>: applies the saved or system theme before first paint (no flash). */
export const themeScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;
