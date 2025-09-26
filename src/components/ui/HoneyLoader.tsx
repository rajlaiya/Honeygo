import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HoneyLoaderProps {
  minimumTime?: number; // ms
  onFinish?: () => void;
}

// Simple honey drop path SVG
const Drop = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" className="drop-svg">
    <defs>
      <linearGradient id="honeyGradient" x1="0%" x2="0%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="60%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="gooBlur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
    <path
      d="M45 6C38 18 24 30 24 47c0 12 9.6 23 21 23s21-11 21-23c0-17-14-29-21-41z"
      fill="url(#honeyGradient)"
      stroke="#f59e0b"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const HoneyLoader = ({ minimumTime = 900, onFinish }: HoneyLoaderProps) => {
  const [done, setDone] = useState(false);
  const [allowHide, setAllowHide] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const ready = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(minimumTime - elapsed, 0);
      setTimeout(() => setAllowHide(true), wait);
    };

    if (document.readyState === 'complete') ready();
    else window.addEventListener('load', ready);
    return () => window.removeEventListener('load', ready);
  }, [minimumTime]);

  // Expose hide when allowed
  useEffect(() => {
    if (allowHide) {
      const t = setTimeout(() => {
        setDone(true);
        onFinish?.();
      }, 400); // sync with exit animation
      return () => clearTimeout(t);
    }
  }, [allowHide, onFinish]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="honey-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: allowHide ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="relative"
              initial="idle"
              animate="animate"
              variants={{}}
            >
              <motion.div
                className="w-24 h-24 flex items-center justify-center"
                initial={{ scale: 0.6, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <Drop />
              </motion.div>
              {/* Dripping circles */}
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{}}
              >
                {[0,1,2].map(i => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 rounded-full bg-honey-400/70"
                    style={{ width: 14 - i * 3, height: 14 - i * 3, filter:'url(#gooBlur)' }}
                    initial={{ y: -10, opacity: 0, scale:0.4 }}
                    animate={{ y: 42 + i * 14, opacity: [0,1,0], scale:[0.4,1,0.2] }}
                    transition={{ duration: 1.6 + i * 0.25, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
                  />
                ))}
              </motion.div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-display tracking-[0.3em] text-xs text-honey-300 uppercase"
            >
              LOADING
            </motion.p>
            <motion.div
              className="h-1.5 w-48 bg-neutral-800/70 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-honey-500 via-honey-400 to-honey-600"
                initial={{ x: '-100%' }}
                animate={{ x: ['-100%', '0%', '100%'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
