import { motion } from 'framer-motion';
import { SectionWrapper } from '../ui/SectionWrapper';
import { useCart, type Product } from '../../context/CartContext';
import { useMemo, useRef, useEffect, useState } from 'react';
import { SearchFilterBar, type ProductFilterState } from '../ui/SearchFilterBar';

interface ProductVariantBase { id: string; name: string; price: number; description: string; imagePool: string[] }
const productBase: ProductVariantBase[] = [
  {
    id: 'wildflower',
    name: 'Wildflower Honey',
    price: 12.5,
    imagePool: [
      'https://images-cdn.ubuy.co.in/636401ff8736565dbc5d5163-sandt-39-s-wildflower-honey-unfiltered.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe3BOE-tn1faAIC2g0zzWWJkZUXX4FNoiv4w&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_KYEF9YeJwkyRduUIO8wCI1kSS5iqLQL633llOJ-tw9M5Q6Csl9SkeOwgoLxzuKKB5rM&usqp=CAU',
    ],
    description: 'Unique flavor profile with hints of wildflowers.'
  },
  {
    id: 'forest',
    name: 'Forest Honey',
    price: 15,
    imagePool: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKygJyDqB03TStOgsGF9fQjQCP0QKdOLst9A&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdoykY1m8G3XzSqm734YFS-m_gIiez7R4l9A&s',
    ],
    description: 'Rich, complex flavors with notes of dark chocolate and coffee.'
  },
  {
    id: 'acacia',
    name: 'Acacia Honey',
    price: 18,
    imagePool: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbHFz2TQLnH8igu5a-wuZdFtdPoAogQylZw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMV6MZd5XOt4H2FG0E9ZInxsom56ucwBBGqw&s',
      'https://www.honeyhut.in/cdn/shop/files/Acacia-Honey-2.jpg?v=1690302751&width=1200',
    ],
    description: 'Light & delicate with slow crystallization.'
  },
  {
    id: 'black-forest-honey',
    name: 'Black Forest Honey',
    price: 14,
    imagePool: [
      'https://ajfan.store/cdn/shop/files/BlackForestHoney-300gm.webp?v=1738821847',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnm5BTslWPnO2PHp5gsgziHJaXB8SaU30kmg&s',
    ],
    description: 'Rich, complex flavors with notes of dark chocolate and coffee.'
  }
];

export const Products = () => {
  const { addToCart } = useCart();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [filters, setFilters] = useState<ProductFilterState>({ query: '', min: '', max: '', sort: '' });
  const products: Product[] = useMemo(() => {
    return productBase.map(p => ({ id: p.id, name: p.name, price: p.price, description: p.description, image: p.imagePool[Math.floor(Math.random() * p.imagePool.length)] }));
  }, []);

  // Card tilt effect
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLDivElement>('.product-card'));
    const handle = (e: MouseEvent) => {
      cards.forEach(card => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const rx = ((y / r.height) - 0.5) * 8; // rotateX
        const ry = ((x / r.width) - 0.5) * -8; // rotateY
        card.style.setProperty('--rx', rx.toFixed(2));
        card.style.setProperty('--ry', ry.toFixed(2));
      });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <SectionWrapper id="products" className="bg-gradient-to-b from-black to-[#140d06] text-honey-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-honey-400 mb-4">Our Collection</h2>
        <p className="text-honey-100/80 max-w-2xl mx-auto">Curated raw honeys capturing the unique flavor profile of diverse terroirs and blooming seasons.</p>
      </div>
      <SearchFilterBar onChange={setFilters} />
      {(() => {
        let shown = [...products];
        if (filters.query) {
          const q = filters.query.toLowerCase();
            shown = shown.filter(p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
        }
        const min = parseFloat(filters.min) || 0;
        const max = parseFloat(filters.max) || Infinity;
        shown = shown.filter(p => p.price >= min && p.price <= max);
        switch (filters.sort) {
          case 'price-asc': shown.sort((a,b)=>a.price-b.price); break;
          case 'price-desc': shown.sort((a,b)=>b.price-a.price); break;
          case 'name-asc': shown.sort((a,b)=>a.name.localeCompare(b.name)); break;
          case 'name-desc': shown.sort((a,b)=>b.name.localeCompare(a.name)); break;
        }
        return (
          <p className="text-xs text-honey-100/50 mb-4">Showing {shown.length} / {products.length} products</p>
        );
      })()}
  <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {(() => {
          let shown = [...products];
          if (filters.query) {
            const q = filters.query.toLowerCase();
            shown = shown.filter(p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
          }
          const min = parseFloat(filters.min) || 0;
          const max = parseFloat(filters.max) || Infinity;
          shown = shown.filter(p => p.price >= min && p.price <= max);
          switch (filters.sort) {
            case 'price-asc': shown.sort((a,b)=>a.price-b.price); break;
            case 'price-desc': shown.sort((a,b)=>b.price-a.price); break;
            case 'name-asc': shown.sort((a,b)=>a.name.localeCompare(b.name)); break;
            case 'name-desc': shown.sort((a,b)=>b.name.localeCompare(a.name)); break;
          }
          return shown.map(p => (
          <motion.div
            key={p.id}
    whileHover={{ y: -6 }}
    className="product-card group relative rounded-2xl overflow-hidden bg-neutral-900/40 border border-honey-700/30 backdrop-blur-md shadow-lg will-change-transform"
    style={{ transform: 'perspective(800px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))', transition: 'transform 0.25s ease' }}
          >
            <div className="aspect-square overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1800ms]" loading="lazy" />
            </div>
            <div className="p-5 flex flex-col h-56">
              <h3 className="font-semibold text-honey-200 text-lg mb-1">{p.name}</h3>
              <p className="text-sm text-honey-100/60 flex-1">{p.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-honey-400">${p.price.toFixed(2)}</span>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(p)}
                  className="px-4 py-2 rounded-full bg-honey-500 text-black text-sm font-semibold hover:bg-honey-400 shadow-glow"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
          ));
        })()}
      </div>
    </SectionWrapper>
  );
};
