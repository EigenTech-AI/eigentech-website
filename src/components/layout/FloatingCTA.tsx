'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

/** Floating "Talk to us" button: appears after the hero, hides while the contact section is on screen. */
export function FloatingCTA({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const contact = document.getElementById('contact');
    let nearContact = false;
    const update = () => setShow(window.scrollY > window.innerHeight * 0.6 && !nearContact);
    const io = new IntersectionObserver(([e]) => { nearContact = e.isIntersecting; update(); }, { rootMargin: '0px 0px -20% 0px' });
    if (contact) io.observe(contact);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => { io.disconnect(); window.removeEventListener('scroll', update); };
  }, []);

  return (
    <a
      href="#contact"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed end-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] z-40 inline-flex items-center gap-2.5 rounded-full bg-accent py-3 ps-4 pe-5 text-sm font-semibold text-accent-fg shadow-xl shadow-royal/30 transition duration-300 hover:brightness-110 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
        <Icon name="chat" className="h-4 w-4" />
      </span>
      {label}
    </a>
  );
}
