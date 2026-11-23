import { brandAsset, site } from '@/lib/site';

/** "Powered by" with the EigenTech logo, linking to the company site. */
export function PoweredBy({ label, className = '', logoClass = 'h-8' }: { label: string; className?: string; logoClass?: string }) {
  return (
    <a href={`${site.url}/`} className={`inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-bg/80 py-1.5 ps-4 pe-2 text-xs font-medium text-muted backdrop-blur transition hover:border-bright hover:text-fg dark:hover:border-sky ${className}`}>
      <span>{label}</span>
      <span dir="ltr" className="inline-flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brandAsset('/brand/logo-on-white.svg')} alt="EigenTech" width={546} height={173} className={`${logoClass} w-auto dark:hidden`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brandAsset('/brand/logo-on-dark.svg')} alt="EigenTech" width={546} height={173} className={`${logoClass} hidden w-auto dark:block`} />
      </span>
    </a>
  );
}
