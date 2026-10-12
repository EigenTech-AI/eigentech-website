/** The E of EigenTech reduced to a glyph: a hilal opening right with the arrow as its middle bar. */
export function MarkGlyph({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" direction="ltr">
      <path d="M15.5 4.8A8.5 8.5 0 1 0 15.5 19.2A7.25 7.25 0 1 1 15.5 4.8Z" fill="currentColor" />
      <path d="M19.5 12H8.6M8.6 12l3.2-2.6M8.6 12l3.2 2.6" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
export const toArabicDigits = (s: string) => s.replace(/[0-9]/g, (d) => ARABIC_DIGITS[Number(d)]);
