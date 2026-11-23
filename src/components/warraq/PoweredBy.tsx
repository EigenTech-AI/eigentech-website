import { brandAsset } from '@/lib/site';

/** "Powered by" with the EigenTech logo, linking to the company site. */
export function PoweredBy({ label, href, className = '', logoClass = 'h-9' }: { label: string; href: string; className?: string; logoClass?: string }) {
  return (
    <a href={href} className={`group inline-flex w-fit items-center gap-3 text-xs font-medium text-wmuted transition hover:text-wtext ${className}`}>
      <span>{label}</span>
      <span aria-hidden="true" className="h-5 w-px bg-rule" />
      <span dir="ltr" className="inline-flex transition group-hover:opacity-80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brandAsset('/brand/logo-on-white.svg')} alt="EigenTech" width={546} height={173} className={`${logoClass} w-auto dark:hidden`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brandAsset('/brand/logo-on-dark.svg')} alt="EigenTech" width={546} height={173} className={`${logoClass} hidden w-auto dark:block`} />
      </span>
    </a>
  );
}
