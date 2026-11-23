import { Icon } from '@/components/ui/Icon';

/** The Warraq name mark: a page glyph with ورّاق above WARRAQ. */
export function WarraqMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-royal text-white shadow-sm shadow-royal/30 dark:bg-sky dark:text-night">
        <Icon name="document" className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span lang="ar" className="font-display text-[1.6rem] font-semibold text-fg">ورّاق</span>
        <span dir="ltr" className="mt-1 font-display text-[0.62rem] font-medium tracking-[0.32em] text-bright dark:text-sky">WARRAQ</span>
      </span>
    </span>
  );
}
