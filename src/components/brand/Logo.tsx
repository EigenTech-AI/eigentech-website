import { asset } from '@/lib/site';

/** Horizontal lockup: mark, with آيجينتك always directly under EigenTech. */
export function Logo({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const s = {
    sm: { mark: 'h-9 w-9', en: 'text-lg', ar: 'text-[0.86rem]' },
    md: { mark: 'h-11 w-11', en: 'text-[1.4rem]', ar: 'text-[1.05rem]' },
    lg: { mark: 'h-16 w-16', en: 'text-3xl', ar: 'text-2xl' },
  }[size];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} dir="ltr">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset('/brand/mark-on-white.svg')} alt="" className={`${s.mark} dark:hidden`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset('/brand/mark-on-blue.svg')} alt="" className={`${s.mark} hidden dark:block`} />
      <span className="inline-grid justify-items-start leading-none">
        <span className={`font-display tracking-tight ${s.en}`}>
          <b className="font-semibold text-royal dark:text-white">Eigen</b>
          <span className="font-light text-bright dark:text-sky">Tech</span>
        </span>
        <span dir="rtl" lang="ar" className={`font-display font-medium leading-[1.15] ${s.ar}`}>
          <span className="text-royal dark:text-white">آيجين&zwj;</span>
          <span className="text-bright dark:text-sky">&zwj;تك</span>
        </span>
      </span>
      <span className="sr-only">EigenTech آيجينتك</span>
    </span>
  );
}
