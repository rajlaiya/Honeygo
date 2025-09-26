import { motion } from 'framer-motion';
import { SectionWrapper } from '../ui/SectionWrapper';
import { ScratchCoupon } from '../ui/ScratchCoupon';

export const Banner = () => {
  return (
  <SectionWrapper className="relative bg-[linear-gradient(135deg,#1a1209,#332310)] py-16 md:py-24 overflow-hidden rounded-t-[5rem] rounded-b-[5rem] md:rounded-t-[8rem] md:rounded-b-[8rem]">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-honey-400 mb-4">Limited Seasonal Harvest</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-honey-100 mb-6">
            Save <span className="text-honey-500">20%</span> on Wildflower Jars
          </h2>
          <p className="text-honey-100/70 max-w-xl lg:mx-0 mx-auto mb-8">
            Naturally crystallized goodness. Small-batch spring bloom extraction—once it is gone, it is gone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('combos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-3 rounded-full bg-honey-500 text-black font-semibold shadow-glow hover:bg-honey-400"
            >
              Grab Offer
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative"
        >
          <ScratchCoupon />
          <div className="absolute -inset-6 bg-gradient-to-br from-honey-500/0 via-honey-500/0 to-honey-500/5 rounded-3xl pointer-events-none" />
        </motion.div>
      </div>
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-honey-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-honey-600/10 rounded-full blur-3xl" />
    </SectionWrapper>
  );
};
