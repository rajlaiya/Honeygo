import { motion } from 'framer-motion';
import { SectionWrapper } from '../ui/SectionWrapper';
import { useCart, type Product } from '../../context/CartContext';
import { useMemo } from 'react';

interface Combo extends Product { items: string[]; original: number; }

const comboBase: (Omit<Combo,'image'> & { imagePool: string[] })[] = [
  {
    id: 'taster-pack',
    name: 'Taster Flight Pack',
    price: 32,
    original: 40,
    imagePool: [
      'https://sc04.alicdn.com/kf/H1d7101e21b2d4eecbbbdc966acc82bb8K/227759182/H1d7101e21b2d4eecbbbdc966acc82bb8K.jpg',
    ],
    items: ['Wildflower 150g', 'Forest 150g', 'Acacia 150g'],
    description: 'Explore three terroirs side-by-side.'
  },
  {
    id: 'immune-boost',
    name: 'Immunity Boost Duo',
    price: 26,
    original: 30,
    imagePool: [
      'https://asmitaorganicfarm.com/cdn/shop/articles/feature_image-01_1.jpg?v=1732791937&width=1100',
    ],
    items: ['Forest 250g', 'Citrus 250g'],
    description: 'A duo designed to enhance your immune system.'
  },
  {
    id: 'gift-crate',
    name: 'Artisan Gift Crate',
    price: 54,
    original: 65,
    imagePool: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8CV2agHY_-V3YjOraNvrXdoRDNYoNOjLEQ&s',
    ],
    items: ['Acacia 250g', 'Wildflower 250g', 'Forest 250g'],
    description: 'A curated selection for gifting and special occasions.'
  }
];

export const Combos = () => {
  const { addToCart } = useCart();
  const combos: Combo[] = useMemo(() => comboBase.map(c => ({...c, image: c.imagePool[Math.floor(Math.random()*c.imagePool.length)] } as Combo)), []);
  return (
    <SectionWrapper id="combos" className="text-honey-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-honey-400 mb-4">Combo Packs & Bundles</h2>
        <p className="text-honey-100/70 max-w-2xl mx-auto">Curated bundles designed for tasting sessions, immune support, and gifting moments. Save more while exploring depth & nuance.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
        {combos.map(c => (
          <motion.div key={c.id} whileHover={{ y: -6 }} className="relative rounded-2xl overflow-hidden bg-neutral-900/40 border border-honey-700/30 backdrop-blur-md shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2000ms]" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.4em] rotate-[-12deg]">Hey Honey</span>
                </div>
              </div>
            </div>
            <div className="p-3 sm:p-6 flex flex-col h-auto sm:h-64">
              <div className="flex items-start justify-between gap-1 sm:gap-3">
                <h3 className="font-semibold text-honey-200 text-sm sm:text-lg leading-tight line-clamp-2">{c.name}</h3>
                <span className="text-[9px] sm:text-xs bg-honey-600/20 text-honey-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium whitespace-nowrap">Save {Math.round((1 - c.price / c.original) * 100)}%</span>
              </div>
              <p className="text-xs sm:text-sm text-honey-100/60 mt-1 sm:mt-2 flex-1 line-clamp-2 sm:line-clamp-none">{c.description}</p>
              <ul className="text-[10px] sm:text-[11px] text-honey-100/50 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1 tracking-wide hidden sm:block">
                {c.items.map(it => <li key={it}>• {it}</li>)}
              </ul>
              <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-0">
                <div className="text-honey-400 font-bold text-sm sm:text-base">${c.price.toFixed(2)} <span className="text-[10px] sm:text-xs text-honey-100/40 line-through">${c.original.toFixed(0)}</span></div>
                <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }} onClick={() => addToCart(c)} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-honey-500 text-black text-xs sm:text-sm font-semibold hover:bg-honey-400 shadow-glow w-full sm:w-auto text-center">Add</motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
