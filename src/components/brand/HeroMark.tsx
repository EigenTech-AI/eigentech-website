'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { markStatic, renderNetwork, type MarkVariant } from '@/lib/eigen-mark';

const ID = 'etHero';
const SWING = 0.55; // radians either side of upright

/**
 * The EigenTech seal with its T network rocking about the arrow's axis.
 * The ring, hilal and arrow never move: the axis of a rotation is its eigenvector.
 */
export function HeroMark({ label }: { label: string }) {
  const [variant, setVariant] = useState<MarkVariant>('dark');
  const netRef = useRef<SVGGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stat = useMemo(() => markStatic(variant, ID), [variant]);
  const initialNet = useMemo(() => renderNetwork(0, variant, ID), [variant]);

  // Follow the site theme.
  useEffect(() => {
    const read = () => setVariant(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Spin only while visible, and not at all for reduced-motion users.
  useEffect(() => {
    const g = netRef.current;
    if (!g) return;
    g.innerHTML = renderNetwork(0, variant, ID);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, last = performance.now(), phase = 0, visible = true;
    const tick = (now: number) => {
      phase = (phase + (now - last) * 0.0009) % (Math.PI * 2);
      last = now;
      g.innerHTML = renderNetwork(SWING * Math.sin(phase), variant, ID);
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf && visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });
    if (wrapRef.current) io.observe(wrapRef.current);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    start();
    return () => { stop(); io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, [variant]);

  return (
    <div ref={wrapRef} className="relative aspect-square w-full" dir="ltr">
      <svg viewBox={stat.viewBox} role="img" aria-label={label} className="h-full w-full">
        <defs dangerouslySetInnerHTML={{ __html: stat.defs }} />
        <g dangerouslySetInnerHTML={{ __html: stat.under }} />
        <g ref={netRef} dangerouslySetInnerHTML={{ __html: initialNet }} />
      </svg>
    </div>
  );
}
