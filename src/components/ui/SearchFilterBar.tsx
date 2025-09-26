import { useState } from 'react';

export interface ProductFilterState {
  query: string;
  min: string;
  max: string;
  sort: string;
}

interface Props {
  onChange: (f: ProductFilterState) => void;
}

export const SearchFilterBar = ({ onChange }: Props) => {
  const [state, setState] = useState<ProductFilterState>({ query: '', min: '', max: '', sort: '' });

  const update = (patch: Partial<ProductFilterState>) => {
    setState(s => {
      const next = { ...s, ...patch };
      onChange(next);
      return next;
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-end bg-neutral-900/40 border border-honey-700/30 p-4 rounded-2xl mb-10">
      <div className="flex-1">
        <label className="block text-[11px] uppercase tracking-widest text-honey-400 mb-1">Search</label>
        <input
          value={state.query}
          onChange={e => update({ query: e.target.value })}
          placeholder="Search products..."
          className="w-full rounded-lg bg-neutral-900/60 border border-honey-700/40 px-3 py-2 text-sm placeholder:text-honey-100/30 focus:outline-none focus:ring-2 focus:ring-honey-500"
        />
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-widest text-honey-400 mb-1">Min Price</label>
        <input
          value={state.min}
          onChange={e => update({ min: e.target.value })}
          placeholder="0"
          className="w-28 rounded-lg bg-neutral-900/60 border border-honey-700/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500"
        />
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-widest text-honey-400 mb-1">Max Price</label>
        <input
          value={state.max}
          onChange={e => update({ max: e.target.value })}
          placeholder="50"
          className="w-28 rounded-lg bg-neutral-900/60 border border-honey-700/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500"
        />
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-widest text-honey-400 mb-1">Sort</label>
        <select
          aria-label="Sort products"
          value={state.sort}
          onChange={e => update({ sort: e.target.value })}
          className="w-40 rounded-lg bg-neutral-900/60 border border-honey-700/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500"
        >
          <option value="">Default</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilterBar;
