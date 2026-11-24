import type { SpiceLevel } from '../../types';

interface SpiceMeterProps {
  level: SpiceLevel;
  compact?: boolean;
}

const labels = ['None', 'Mild', 'Medium', 'Hot'];

export function SpiceMeter({ level, compact = false }: SpiceMeterProps) {
  return (
    <span
      className={compact ? 'spice-meter spice-meter--compact' : 'spice-meter'}
      title={`Spice level: ${labels[level]}`}
    >
      <span className="sr-only">Spice level {level} of 3</span>
      {[1, 2, 3].map((step) => (
        <span
          key={step}
          className={step <= level ? 'pepper pepper--on' : 'pepper'}
          aria-hidden="true"
        >
          ●
        </span>
      ))}
    </span>
  );
}
