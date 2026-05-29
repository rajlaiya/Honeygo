import { motion } from 'framer-motion';
import { useMemo, useRef, useEffect, useState } from 'react';
import { useCart, type Product } from '../../context/CartContext';
import { SearchFilterBar, type ProductFilterState } from '../ui/SearchFilterBar';
import { SectionWrapper } from '../ui/SectionWrapper';
import acaciaImage from '../../assets/Honey/Acacia.png';
import alfalfaImage from '../../assets/Honey/Alfalfa.png';
import appleImage from '../../assets/Honey/Apple.png';
import cloverImage from '../../assets/Honey/Clover.png';
import eucalyptusImage from '../../assets/Honey/Eucalyptus.png';
import heatherImage from '../../assets/Honey/Heather.png';
import jamunImage from '../../assets/Honey/Jamun.png';
import lavenderImage from '../../assets/Honey/lavender.png';
import manukaImage from '../../assets/Honey/Manuka.png';
import mustardImage from '../../assets/Honey/Mustard.png';
import neemImage from '../../assets/Honey/Neem.png';
import orangeImage from '../../assets/Honey/Orange.png';
import rosemaryImage from '../../assets/Honey/Rosemary.png';
import sageImage from '../../assets/Honey/Sage.png';
import sidrImage from '../../assets/Honey/Sidr.png';
import wildCherryImage from '../../assets/Honey/Wild Cherry.png';

const HONEY_TYPES = ['Monofloral Honey', 'Multifloral Honey', 'Special Honey', 'Honeydew', 'Combos'] as const;
type HoneyType = typeof HONEY_TYPES[number];

interface ProductVariantBase { id: string; name: string; price: number; description: string; imagePool: string[]; honeyType: HoneyType }
const MONOFLORAL_NAMES = [
  'Acacia Honey',
  'Manuka Honey',
  'Clover Honey',
  'Sidr Honey',
  'Eucalyptus Honey',
  'Lavender Honey',
  'Orange Blossom Honey',
  'Sunflower Honey',
  'Mustard Honey',
  'Buckwheat Honey',
  'Lychee Honey',
  'Jamun Honey',
  'Neem Honey',
  'Tulsi Honey',
  'Coriander Honey',
  'Sage Honey',
  'Rosemary Honey',
  'Heather Honey',
  'Wild Cherry Honey',
  'Apple Blossom Honey',
  'Alfalfa Honey',
  'Coffee Blossom Honey',
];

const MULTIFLORAL_NAMES = [
  'Wildflower Honey',
  'Forest Honey',
  'Mountain Honey',
  'Multi-Flora Honey',
];

const SPECIAL_NAMES = [
  'Raw Honey',
  'Organic Honey',
  'Comb Honey',
  'Creamed Honey',
  'Chunk Honey',
  'Filtered Honey',
  'Unfiltered Honey',
];

const HONEYDEW_NAMES = [
  'Pine Honey',
  'Oak Honey',
  'Fir Honey',
];

const MONOFLORAL_IMAGES = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbHFz2TQLnH8igu5a-wuZdFtdPoAogQylZw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMV6MZd5XOt4H2FG0E9ZInxsom56ucwBBGqw&s',
  'https://www.honeyhut.in/cdn/shop/files/Acacia-Honey-2.jpg?v=1690302751&width=1200',
];

const MONOFLORAL_IMAGE_MAP: Record<string, string> = {
  'Acacia Honey': acaciaImage,
  'Alfalfa Honey': alfalfaImage,
  'Apple Blossom Honey': appleImage,
  'Clover Honey': cloverImage,
  'Heather Honey': heatherImage,
  'Manuka Honey': manukaImage,
  'Sidr Honey': sidrImage,
  'Eucalyptus Honey': eucalyptusImage,
  'Lavender Honey': lavenderImage,
  'Orange Blossom Honey': orangeImage,
  'Mustard Honey': mustardImage,
  'Rosemary Honey': rosemaryImage,
  'Jamun Honey': jamunImage,
  'Neem Honey': neemImage,
  'Sage Honey': sageImage,
  'Wild Cherry Honey': wildCherryImage,
};

const MULTIFLORAL_IMAGES = [
  'https://images-cdn.ubuy.co.in/636401ff8736565dbc5d5163-sandt-39-s-wildflower-honey-unfiltered.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe3BOE-tn1faAIC2g0zzWWJkZUXX4FNoiv4w&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_KYEF9YeJwkyRduUIO8wCI1kSS5iqLQL633llOJ-tw9M5Q6Csl9SkeOwgoLxzuKKB5rM&usqp=CAU',
];

const SPECIAL_IMAGES = [
  'https://ajfan.store/cdn/shop/files/BlackForestHoney-300gm.webp?v=1738821847',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnm5BTslWPnO2PHp5gsgziHJaXB8SaU30kmg&s',
];

const HONEYDEW_IMAGES = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKygJyDqB03TStOgsGF9fQjQCP0QKdOLst9A&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdoykY1m8G3XzSqm734YFS-m_gIiez7R4l9A&s',
];

const makeId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const makeDescription = (name: string, type: HoneyType) => {
  switch (type) {
    case 'Monofloral Honey':
      return `Single-origin bloom with clean, focused sweetness.`;
    case 'Multifloral Honey':
      return `Seasonal blossom blend with balanced floral notes.`;
    case 'Special Honey':
      return `${name.replace(' Honey', '')} style with a distinct texture and aroma.`;
    case 'Honeydew':
      return `Deep, resinous notes with a malty finish.`;
    case 'Combos':
      return `Curated pack for tasting and gifting.`;
    default:
      return `Small-batch honey with layered flavor and aroma.`;
  }
};

const makeItems = (names: string[], type: HoneyType, basePrice: number, step: number, imagePool: string[]) => {
  return names.map((name, index) => ({
    id: makeId(name),
    name,
    price: Number((basePrice + (index % 5) * step).toFixed(2)),
    honeyType: type,
    imagePool,
    description: makeDescription(name, type),
  }));
};

const makeMonofloralItems = (names: string[], basePrice: number, step: number) => {
  return names.map((name, index) => {
    const mappedImage = MONOFLORAL_IMAGE_MAP[name];
    return {
      id: makeId(name),
      name,
      price: Number((basePrice + (index % 5) * step).toFixed(2)),
      honeyType: 'Monofloral Honey' as HoneyType,
      imagePool: mappedImage ? [mappedImage] : MONOFLORAL_IMAGES,
      description: makeDescription(name, 'Monofloral Honey'),
    };
  });
};

const productBase: ProductVariantBase[] = [
  ...makeMonofloralItems(MONOFLORAL_NAMES, 16, 1.5),
  ...makeItems(MULTIFLORAL_NAMES, 'Multifloral Honey', 12.5, 1.25, MULTIFLORAL_IMAGES),
  ...makeItems(SPECIAL_NAMES, 'Special Honey', 13.5, 1.5, SPECIAL_IMAGES),
  ...makeItems(HONEYDEW_NAMES, 'Honeydew', 16.5, 1.5, HONEYDEW_IMAGES),
  {
    id: 'taster-pack',
    name: 'Taster Flight Pack',
    price: 32,
    honeyType: 'Combos',
    imagePool: [
      'https://sc04.alicdn.com/kf/H1d7101e21b2d4eecbbbdc966acc82bb8K/227759182/H1d7101e21b2d4eecbbbdc966acc82bb8K.jpg',
    ],
    description: 'Explore three terroirs side-by-side.'
  },
  {
    id: 'immune-boost',
    name: 'Immunity Boost Duo',
    price: 26,
    honeyType: 'Combos',
    imagePool: [
      'https://asmitaorganicfarm.com/cdn/shop/articles/feature_image-01_1.jpg?v=1732791937&width=1100',
    ],
    description: 'A duo crafted for daily rituals and warmth.'
  },
  {
    id: 'gift-crate',
    name: 'Artisan Gift Crate',
    price: 54,
    honeyType: 'Combos',
    imagePool: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8CV2agHY_-V3YjOraNvrXdoRDNYoNOjLEQ&s',
    ],
    description: 'A curated trio for gifting and celebrations.'
  }
];

export const Products = () => {
  const { addToCart } = useCart();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [filters, setFilters] = useState<ProductFilterState>({ query: '', min: '', max: '', sort: '' });
  const [selectedType, setSelectedType] = useState<HoneyType>('Monofloral Honey');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const products: (Product & { honeyType: HoneyType })[] = useMemo(() => {
    return productBase.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      image: p.imagePool[Math.floor(Math.random() * p.imagePool.length)],
      honeyType: p.honeyType
    }));
  }, []);
  const totalForType = useMemo(() => products.filter(p => p.honeyType === selectedType).length, [products, selectedType]);
  const filteredProducts = useMemo(() => {
    let shown = products.filter(p => p.honeyType === selectedType);
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
    return shown;
  }, [filters, products, selectedType]);

  useEffect(() => {
    const updatePageSize = () => setPageSize(window.innerWidth >= 1024 ? 8 : 4);
    updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [filters, selectedType]);

  const pageCount = useMemo(() => Math.max(1, Math.ceil(filteredProducts.length / pageSize)), [filteredProducts.length, pageSize]);

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const pagedProducts = useMemo(() => {
    const start = page * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page, pageSize]);

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
    <SectionWrapper id="products" className="text-honey-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-honey-400 mb-4">Our Collection</h2>
        <p className="text-honey-100/80 max-w-2xl mx-auto">Curated raw honeys capturing the unique flavor profile of diverse terroirs and blooming seasons.</p>
      </div>
      <nav aria-label="Honey type" className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        {HONEY_TYPES.map(type => {
          const isActive = type === selectedType;
          return (
            <button
              key={type}
              type="button"
              aria-pressed={isActive ? 'true' : 'false'}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors ${isActive ? 'bg-honey-500 text-black shadow-glow' : 'bg-neutral-900/40 text-honey-200 border border-honey-700/40 hover:text-honey-50 hover:border-honey-600/60'}`}
            >
              {type}
            </button>
          );
        })}
      </nav>
      <SearchFilterBar onChange={setFilters} />
      <p className="text-xs text-honey-100/50 mb-4">Showing {filteredProducts.length} / {totalForType} in {selectedType}</p>
      <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        {pagedProducts.map(p => (
          <motion.div
            key={p.id}
            whileHover={{ y: -6 }}
            className="product-card group relative rounded-2xl overflow-hidden bg-neutral-900/40 border border-honey-700/30 backdrop-blur-md shadow-lg will-change-transform"
            style={{ transform: 'perspective(800px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))', transition: 'transform 0.25s ease' }}
          >
            <div className="relative aspect-square overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1800ms]" loading="lazy" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.4em] rotate-[-12deg]">Hey Honey</span>
                </div>
              </div>
            </div>
            <div className="p-3 sm:p-5 flex flex-col h-auto sm:h-56">
              <h3 className="font-semibold text-honey-200 text-sm sm:text-lg mb-1 line-clamp-1">{p.name}</h3>
              <p className="text-xs sm:text-sm text-honey-100/60 flex-1 line-clamp-2 sm:line-clamp-none">{p.description}</p>
              <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="font-bold text-honey-400 text-sm sm:text-base">${p.price.toFixed(2)}</span>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(p)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-honey-500 text-black text-xs sm:text-sm font-semibold hover:bg-honey-400 shadow-glow w-full sm:w-auto text-center"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(0, current - 1))}
          disabled={page === 0}
          className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-neutral-900/40 text-honey-200 border border-honey-700/40 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="text-xs sm:text-sm text-honey-100/70">Page {page + 1} of {pageCount}</span>
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
          disabled={page >= pageCount - 1}
          className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-honey-500 text-black shadow-glow disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </SectionWrapper>
  );
};
