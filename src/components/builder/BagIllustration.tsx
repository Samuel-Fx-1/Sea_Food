import { motion } from 'framer-motion';
import { Flame, PackageOpen, Sparkles } from 'lucide-react';
import type { BoilConfiguration } from '../../types';

interface BagIllustrationProps {
  configuration: BoilConfiguration;
  total: number;
}

export function BagIllustration({ configuration, total }: BagIllustrationProps) {
  return (
    <div className="bag-illustration" aria-hidden="true">
      <div className="bag-illustration__glow" />
      <motion.div
        className="bag-illustration__bag"
        animate={{ rotate: [-1, 1, -1], y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PackageOpen size={92} strokeWidth={1.1} />
        <span className="bag-illustration__label">SEA_FOOD</span>
        {configuration.seafood.slice(0, 3).map((choice, index) => (
          <motion.span
            key={choice}
            className={`bag-illustration__choice bag-illustration__choice--${index + 1}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          >
            {choice}
          </motion.span>
        ))}
      </motion.div>
      <div className="bag-illustration__meta">
        <span><Flame size={15} /> {configuration.spice}</span>
        <span><Sparkles size={15} /> {configuration.sauce}</span>
        <strong>€{total}</strong>
      </div>
    </div>
  );
}
