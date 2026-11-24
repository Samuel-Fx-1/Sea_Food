import type { TextLinkContent } from '../types';

interface TextLinkProps {
  link: TextLinkContent;
  className?: string;
}

export function TextLink({ link, className }: TextLinkProps) {
  const classes = className ? `text-link ${className}` : 'text-link';

  return (
    <a
      className={classes}
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
    >
      {link.label}{' '}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
