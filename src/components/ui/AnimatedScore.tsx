import { AnimatePresence, motion } from 'framer-motion';

interface AnimatedScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<string, string> = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-5xl',
};

export default function AnimatedScore({ score, size = 'md' }: AnimatedScoreProps) {
  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={score}
          className={`font-bold tabular-nums text-gray-900 dark:text-white ${sizeClasses[size]}`}
          initial={{ y: 20, scale: 0.6, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -20, scale: 0.6, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {score}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
