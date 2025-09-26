import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-honey-500 text-black font-semibold px-4 py-3 shadow-glow backdrop-blur-sm hover:bg-honey-400"
          aria-label="Back to top"
        >↑</motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
