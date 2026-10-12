'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { THEME_KEY } from '@/lib/theme';

export function ThemeToggle({ labelDark, labelLight }: { labelDark: string; labelLight: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => setDark(document.documentElement.classList.contains('dark')), []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem(THEME_KEY, next ? 'dark' : 'light'); } catch { /* storage unavailable */ }
    setDark(next);
  };

  const label = dark ? labelLight : labelDark;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition hover:border-bright dark:hover:border-sky"
    >
      <Icon name={dark ? 'sun' : 'moon'} className="h-[1.15rem] w-[1.15rem]" />
    </button>
  );
}
