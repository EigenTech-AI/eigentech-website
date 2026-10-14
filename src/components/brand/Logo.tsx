import { asset } from '@/lib/site';

// "Eigen" / "آيجين" take the hilal's colour (its gradient); "Tech" / "تك" take the T's colour.
const EIGEN = 'bg-linear-to-br from-bright to-royal-deep bg-clip-text text-transparent dark:from-white dark:to-[#dce6f7]';
const TECH = 'text-azure dark:text-sky';

/** Horizontal lockup: the seal, with آيجينتك always directly under EigenTech. */
export function Logo({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const s = {
    sm: { mark: 'h-10 w-10', en: 'text-lg', ar: 'text-[0.86rem]' },
    md: { mark: 'h-12 w-12', en: 'text-[1.4rem]', ar: 'text-[1.05rem]' },
    lg: { mark: 'h-16 w-16', en: 'text-3xl', ar: 'text-2xl' },
  }[size];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} dir="ltr">
      {/* The compact seal has fewer, larger neurons, so it stays clear at header size. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset('/brand/mark-compact-on-white.svg')} alt="" className={`${s.mark} dark:hidden`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset('/brand/mark-compact-on-blue.svg')} alt="" className={`${s.mark} hidden dark:block`} />
      <span className="inline-grid justify-items-start leading-none">
        <span className={`font-display tracking-tight ${s.en}`}>
          <b className={`font-semibold ${EIGEN}`}>Eigen</b>
          <span className={`font-light ${TECH}`}>Tech</span>
        </span>
        <span dir="rtl" lang="ar" className={`font-display font-medium leading-[1.15] ${s.ar}`}>
          <span className={EIGEN}>آيجين&zwj;</span>
          <span className={TECH}>&zwj;تك</span>
        </span>
      </span>
      <span className="sr-only">EigenTech آيجينتك</span>
    </span>
  );
}
