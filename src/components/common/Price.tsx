import { formatPrice } from '../../config/site';

interface PriceProps {
  value: number;
  placeholder?: boolean;
  className?: string;
}

export function Price({ value, placeholder, className }: PriceProps) {
  return (
    <span className={className ? `price-value ${className}` : 'price-value'}>
      {formatPrice(value, placeholder)}
    </span>
  );
}
