import { SectionWrapper } from '../ui/SectionWrapper';
import { useEffect, useMemo, useState } from 'react';

interface Testimonial { name: string; text: string; rating: number }

const initialTestimonials: Testimonial[] = [
  {
    name: 'Ava Martinez',
    text: 'The richest, most aromatic honey I have ever tasted. You can tell it is truly raw and pure.',
    rating: 5,
  },
  {
    name: 'Liam Johnson',
    text: 'Forest honey is phenomenal - deep and complex flavors. Elevated my morning toast.',
    rating: 5,
  },
  {
    name: 'Sophia Lee',
    text: 'Love the sustainable sourcing. The packaging feels premium too. Perfect gifts.',
    rating: 4,
  },
  {
    name: 'Ethan Patel',
    text: 'Acacia honey stays liquid forever - great in cold brew. Subtle and elegant flavor.',
    rating: 5,
  },
  {
    name: 'Mia Chen',
    text: 'Prompt delivery and the jar looks gorgeous in my kitchen. Citrus honey is my fave.',
    rating: 5,
  }
];

export const Reviews = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth >= 1024) setPageSize(3);
      else if (window.innerWidth >= 640) setPageSize(2);
      else setPageSize(1);
    };
    updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(testimonials.length / pageSize)),
    [testimonials.length, pageSize]
  );

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const pagedTestimonials = useMemo(() => {
    const start = page * pageSize;
    return testimonials.slice(start, start + pageSize);
  }, [page, pageSize, testimonials]);

  return (
    <SectionWrapper id="reviews" className="text-honey-50">
      <h2 className="text-3xl md:text-5xl font-display font-bold text-honey-400 mb-6 text-center">Customer Love</h2>
      <p className="text-center text-honey-100/70 mb-10 text-sm max-w-xl mx-auto">Share your experience with our raw honeys and help others discover their next favorite jar.</p>
      <div className="flex gap-6 mb-6">
        {pagedTestimonials.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="flex-1 min-w-0 p-6 rounded-2xl bg-neutral-900/50 border border-honey-700/30 backdrop-blur-md shadow-lg"
          >
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, s) => (
                <span key={s} className={s < t.rating ? 'text-honey-400' : 'text-honey-700'}>★</span>
              ))}
            </div>
            <p className="text-sm text-honey-100/80 mb-4 leading-relaxed">“{t.text}”</p>
            <p className="text-honey-300 font-semibold text-sm">— {t.name}</p>
          </div>
        ))}
      </div>
      <div className="mb-12 flex items-center justify-center gap-4">
        <span className="text-xs text-honey-100/60">Page {page + 1} of {pageCount}</span>
        <button
          type="button"
          onClick={() => setPage((current) => (current + 1) % pageCount)}
          disabled={pageCount <= 1}
          className="px-5 py-2 rounded-full bg-honey-500 text-black text-xs sm:text-sm font-semibold shadow-glow disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next Reviews
        </button>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!form.name || !form.text) return;
          const nextLength = testimonials.length + 1;
          const nextPageCount = Math.max(1, Math.ceil(nextLength / pageSize));
          setTestimonials(prev => [...prev, { name: form.name, text: form.text, rating: form.rating }]);
          setPage(nextPageCount - 1);
          setForm({ name: '', text: '', rating: 5 });
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 2400);
        }}
        className="max-w-xl mx-auto grid gap-4 bg-neutral-900/60 border border-honey-700/30 p-6 rounded-2xl"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
            className="rounded-lg bg-neutral-800/60 border border-honey-700/40 px-4 py-3 text-sm placeholder:text-honey-100/30 focus:outline-none focus:ring-2 focus:ring-honey-500"
          />
          <select
            aria-label="Rating"
            value={form.rating}
            onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))}
            className="rounded-lg bg-neutral-800/60 border border-honey-700/40 px-4 py-3 text-sm text-honey-100 focus:outline-none focus:ring-2 focus:ring-honey-500"
          >
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ★</option>)}
          </select>
        </div>
        <textarea
          value={form.text}
          onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
          placeholder="Share your experience..."
          rows={4}
          className="rounded-lg bg-neutral-800/60 border border-honey-700/40 px-4 py-3 text-sm placeholder:text-honey-100/30 focus:outline-none focus:ring-2 focus:ring-honey-500"
        />
        <button className="justify-self-start px-6 py-3 rounded-full bg-honey-500 text-black text-sm font-semibold hover:bg-honey-400 shadow-glow">Submit Review</button>
      </form>
      {submitted && (
        <p className="mt-4 text-center font-marck text-xl text-honey-200">
          Thanks for your feedback.
        </p>
      )}
    </SectionWrapper>
  );
};
