'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { markStatic, renderNetwork, type MarkVariant } from '@/lib/eigen-mark';

const ID = 'etHero';
const SPEED = 0.0005; // radians per millisecond: one full turn in about 12.5 seconds

/**
 * The EigenTech seal with its T network turning around the x axis, the arrow's axis.
 * The ring, hilal and arrow never move: the axis of a rotation is its eigenvector.
 * The half of the network behind the hilal and arrow is drawn under them, the near half over them.
 */
export function HeroMark({ label }: { label: string }) {
  const [variant, setVariant] = useState<MarkVariant>('dark');
  const backRef = useRef<SVGGElement>(null);
  const frontRef = useRef<SVGGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stat = useMemo(() => markStatic(variant, ID), [variant]);
  const initial = useMemo(() => renderNetwork(0, variant, ID), [variant]);

  // Follow the site theme.
  useEffect(() => {
    const read = () => setVariant(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Turn only while visible, and not at all for reduced-motion users.
  useEffect(() => {
    const back = backRef.current, front = frontRef.current;
    if (!back || !front) return;
    const draw = (theta: number) => {
      const net = renderNetwork(theta, variant, ID);
      back.innerHTML = net.back;
      front.innerHTML = net.front;
    };
    draw(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, last = performance.now(), theta = 0, visible = true;
    const tick = (now: number) => {
      theta = (theta + (now - last) * SPEED) % (Math.PI * 2);
      last = now;
      draw(theta);
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
        <g dangerouslySetInnerHTML={{ __html: stat.glow }} />
        <g ref={backRef} dangerouslySetInnerHTML={{ __html: initial.back }} />
        <g dangerouslySetInnerHTML={{ __html: stat.body }} />
        <g ref={frontRef} dangerouslySetInnerHTML={{ __html: initial.front }} />
      </svg>
    </div>
  );
}
