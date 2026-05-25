import { motion } from 'framer-motion';
import beeVideo from '../../assets/realistic_flying_honeybee_vide.mp4';

export const Hero = () => {
  const features = [
    {
      title: 'Single origin',
      description: 'Forest and meadow apiaries',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            d="M12 3c-4 2.5-7 6-7 10.2C5 17.1 7.9 20 12 20s7-2.9 7-6.8C19 9 16 5.5 12 3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M8 13.5c1.8-1.5 4.1-2.5 7.4-3.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Velvet texture',
      description: 'Slow-spun micro batches',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            d="M12 2c3.7 5 6 7.6 6 11.2A6 6 0 1 1 6 13.2C6 9.6 8.3 7 12 2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      title: 'Naturally sweet',
      description: 'No added sugar or flavor',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <rect x="6" y="7" width="12" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M9 12h6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-[#fff9ec] text-amber-950">
      <div className="absolute inset-0" aria-hidden>
        <video
          className="h-full w-full object-cover brightness-90 saturate-110"
          src={beeVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,14,6,0.35)_0%,rgba(255,241,210,0.55)_45%,rgba(255,248,230,0.82)_100%)]" />
      </div>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,214,102,0.45),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_35%,rgba(255,193,72,0.35),transparent_60%)]" />
        <div className="absolute -left-28 bottom-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,200,90,0.35),transparent_70%)]" />
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,180,46,0.3),transparent_70%)]" />
        <div className="absolute left-0 right-0 top-0 h-16 bg-gradient-to-b from-[#f2b833] to-transparent" />
        <span className="absolute left-[12%] top-0 h-12 w-12 rounded-b-full bg-[#f2b833]" />
        <span className="absolute left-[46%] top-0 h-16 w-14 rounded-b-full bg-[#f2b833]" />
        <span className="absolute left-[78%] top-0 h-10 w-10 rounded-b-full bg-[#f2b833]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-12 px-6 pb-20 pt-28 text-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full bg-[#fff1c8] px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-amber-700"
          >
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Limited seasonal harvest
          </motion.div>
          <motion.h1
            className="mt-6 font-display text-4xl font-semibold leading-tight md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            A new look at a timeless indulgence.
            <span className="block text-honey-700">Pure honey with depth and warmth.</span>
          </motion.h1>
          <motion.p
            className="mt-5 text-base text-amber-900/70 md:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Raw, unfiltered, and slow-crafted from wildflower blooms. Enjoy a rich flavor with a smooth finish and no added sugar.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-honey-500 px-8 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(255,200,52,0.35)] transition-colors hover:bg-honey-400"
            >
              Shop the harvest
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-amber-400/60 px-8 py-3 text-sm font-semibold text-amber-900/80 transition-colors hover:bg-amber-100"
            >
              Learn our story
            </motion.button>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {features.map(feature => (
              <div key={feature.title} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4 text-left shadow-[0_12px_28px_rgba(120,72,8,0.08)]">
                <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  {feature.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-amber-900">{feature.title}</p>
                  <p className="text-xs text-amber-900/60">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-amber-700/70">
            Free shipping over $40
          </p>
        </div>
      </div>
    </section>
  );
};
