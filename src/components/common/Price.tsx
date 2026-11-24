import { formatPrice } from '../../config/site';

interface PriceProps {
  value: number;
  className?: string;
}

export function Price({ value, className }: PriceProps) {
  return (
    <span className={className ? `price-value ${className}` : 'price-value'}>
      {formatPrice(value)}
    </span>
  );
}
