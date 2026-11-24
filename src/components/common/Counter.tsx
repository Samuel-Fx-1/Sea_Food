import { useEffect, useState } from 'react';

interface CounterProps {
  value: number;
  label: string;
  suffix?: string;
}

export function Counter({ value, label, suffix = '' }: CounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number): void => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div className="counter">
      <strong>
        {display.toLocaleString('en-GB')}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}
