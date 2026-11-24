import type { SectionToplineContent } from '../types';

interface SectionToplineProps {
  content: SectionToplineContent;
  className?: string;
}

export function SectionTopline({ content, className }: SectionToplineProps) {
  const classes = className
    ? `section-topline ${className}`
    : 'section-topline';

  return (
    <div className={classes}>
      <span className="eyebrow">{content.left}</span>
      <span className="section-rule" />
      <span className="eyebrow">{content.right}</span>
    </div>
  );
}
