import { motion } from 'framer-motion';
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

// Hero with ONLY floating honey PNG drops
export const Hero = () => {
  const dropsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = dropsRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const imgs = root.querySelectorAll<HTMLImageElement>('.honey-png');
      imgs.forEach(img => {
        const left = parseFloat(img.dataset.left || '0');
        const top = parseFloat(img.dataset.top || '-200');
        gsap.set(img, { left: left + '%', top });
        const startY = top;
        const endY = window.innerHeight + 140;
        const duration = 16 + Math.random() * 10; // 16 - 26s
        const delay = Math.random() * 6;
        const drift = Math.random() * 60 - 30;
        gsap.fromTo(
          img,
          { y: startY, x: '+=' + (Math.random() * 40 - 20), opacity: 0 },
          { y: endY, x: '+=' + drift, opacity: gsap.utils.random(0.55, 0.9), duration, delay, ease: 'none', repeat: -1 }
        );
      });
    }, dropsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(255,200,52,0.18),transparent_65%)]" />
      <div ref={dropsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => {
          const size = Math.random() * 80 + 70; // 70 - 150
          const left = Math.random() * 100;
          const top = -160 - Math.random() * 260; // start above view
          const blur = Math.random() < 0.3 ? ' blur-[2px]' : '';
          return (
            <img
              key={i}
              src="https://static.vecteezy.com/system/resources/thumbnails/056/564/742/small_2x/large-golden-drop-of-pure-honey-with-a-translucent-surface-and-rich-amber-color-free-png.png"
              width={size}
              height={size}
              alt=""
              role="presentation"
              data-left={left}
              data-top={top}
              className={`honey-png absolute select-none opacity-0 will-change-transform${blur}`}
              loading="eager"
            />
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 px-6"
      >
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold text-honey-100 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Pure. Natural. Artisanal Honey.
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-2xl text-honey-50 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Sourced sustainably from wildflower meadows & forest apiaries. Taste the authentic sweetness of nature.
        </motion.p>
        <motion.div className="mt-10 flex gap-4 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full bg-honey-500 text-black font-semibold shadow-glow hover:bg-honey-400 transition-colors"
          >
            Shop Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full bg-transparent border border-honey-300 text-honey-200 font-semibold hover:bg-honey-600/20 backdrop-blur-sm"
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};
