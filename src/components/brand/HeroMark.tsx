'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { markStatic, networkFrame, renderNetwork, type MarkVariant } from '@/lib/eigen-mark';

const ID = 'etHero';
const SPEED = (Math.PI * 2) / 16000; // one full turn every 16 seconds
const SVG_NS = 'http://www.w3.org/2000/svg';
const r2 = (n: number) => (Math.round(n * 100) / 100).toString();

/**
 * The EigenTech seal with its T network turning about its vertical axis (the stem).
 * The ring, hilal, arrow and stem never move: the axis of a rotation is its eigenvector.
 * The links and neurons are created once and only moved each frame, which keeps the motion smooth on phones.
 */
export function HeroMark({ label }: { label: string }) {
  const [variant, setVariant] = useState<MarkVariant>('dark');
  const netRef = useRef<SVGGElement>(null);
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
    const g = netRef.current;
    if (!g || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Build the network's elements once: thin links, then strong links, then neurons on top.
    const first = networkFrame(0, variant);
    const layer = () => g.appendChild(document.createElementNS(SVG_NS, 'g'));
    g.textContent = '';
    const thin = layer(), strong = layer(), dots = layer();
    const lines = first.lines.map((l) => {
      const el = document.createElementNS(SVG_NS, 'line');
      el.setAttribute('stroke', first.colour);
      el.setAttribute('stroke-linecap', 'round');
      (l.strong ? strong : thin).appendChild(el);
      return el;
    });
    const circles = first.dots.map(() => {
      const el = document.createElementNS(SVG_NS, 'circle');
      el.setAttribute('fill', `url(#${ID}k)`);
      dots.appendChild(el);
      return el;
    });
    let order = '';
    const draw = (theta: number) => {
      const fr = networkFrame(theta, variant);
      fr.lines.forEach((l, i) => {
        const el = lines[i];
        el.setAttribute('x1', r2(l.x1)); el.setAttribute('y1', r2(l.y1));
        el.setAttribute('x2', r2(l.x2)); el.setAttribute('y2', r2(l.y2));
        el.setAttribute('stroke-width', r2(l.w)); el.setAttribute('stroke-opacity', r2(l.op));
      });
      fr.dots.forEach((d, i) => {
        const el = circles[i];
        el.setAttribute('cx', r2(d.cx)); el.setAttribute('cy', r2(d.cy));
        el.setAttribute('r', r2(d.r)); el.setAttribute('opacity', r2(d.op));
      });
      // nearer neurons in front: reorder only when the depth order actually changes
      const idx = fr.dots.map((_, i) => i).sort((a, b) => fr.dots[a].z - fr.dots[b].z);
      const key = idx.join(',');
      if (key !== order) { order = key; idx.forEach((i) => dots.appendChild(circles[i])); }
    };
    draw(0);

    let raf = 0, last = performance.now(), theta = 0, visible = true;
    const tick = (now: number) => {
      theta = (theta + Math.min(now - last, 50) * SPEED) % (Math.PI * 2); // a long pause never makes it jump
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
        <g dangerouslySetInnerHTML={{ __html: stat.glow + stat.body }} />
        <g ref={netRef} dangerouslySetInnerHTML={{ __html: initial }} />
      </svg>
    </div>
  );
}
