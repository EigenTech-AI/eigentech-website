import { brandAsset } from '@/lib/site';

/**
 * Horizontal logo: the seal, with آيجينتك directly under EigenTech.
 * The name is drawn as outlines inside the SVG (brand-tools/make-logos.js), not live text: Safari breaks the
 * joined Arabic letters when آيجين and تك are coloured separately, and outlines need no font to load.
 */
export function Logo({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const h = { sm: 'h-[3.25rem] sm:h-[3.75rem]', md: 'h-16', lg: 'h-20' }[size];
  return (
    <span className={`inline-flex shrink-0 ${className}`} dir="ltr">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={brandAsset('/brand/logo-on-white.svg')} alt="" width={546} height={173} className={`${h} w-auto dark:hidden`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={brandAsset('/brand/logo-on-dark.svg')} alt="" width={546} height={173} className={`${h} hidden w-auto dark:block`} />
      <span className="sr-only">EigenTech آيجينتك</span>
    </span>
  );
}
