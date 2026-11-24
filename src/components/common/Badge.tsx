interface BadgeProps {
  children: string;
  variant?: 'signature' | 'popular' | 'new';
}

export function Badge({ children, variant = 'popular' }: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{children}</span>;
}
