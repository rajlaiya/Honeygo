import { SectionWrapper } from '../ui/SectionWrapper';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export const ContactFooter = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [policy, setPolicy] = useState<null | 'privacy' | 'terms' | 'cookies'>(null);

  const policyContent: Record<string, { title: string; body: string }> = {
    privacy: {
      title: 'Privacy Policy',
      body:
        'We respect your privacy. Only essential data (cart state, preferences) is stored locally. Contact form submissions are not sent to a server in this demo. No tracking scripts are active yet.'
    },
    terms: {
      title: 'Terms of Service',
      body:
        'Use of this demo storefront is for evaluation only. Products, pricing, and checkout are illustrative. By using the site you agree not to submit sensitive personal information.'
    },
    cookies: {
      title: 'Cookies',
      body:
        'This demo currently uses only localStorage for cart persistence. No third-party cookies or analytics are loaded. Future enhancements may add optional analytics with consent.'
    }
  };

  // Close on ESC
  useEffect(() => {
    if (!policy) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPolicy(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [policy]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return alert('Please complete all fields');
    setSubmitted(true);
    setTimeout(() => setForm({ name: '', email: '', message: '' }), 600);
  };

  return (
    <footer className="bg-[#0b0704] text-honey-50">
      <SectionWrapper id="contact" className="py-24 md:py-28">
        {/* Two-column layout: left = form, right = stacked info blocks */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT: Contact Form */}
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-honey-400 mb-6">Send Us A Message</h2>
              <p className="text-honey-100/80 mb-8 max-w-md text-sm md:text-base">
                Questions about an order, wholesale, or our beekeeping practices? Drop a note and our team of honey lovers will respond.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                  <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-neutral-900/60 border border-honey-700/40 px-4 py-3 text-sm placeholder:text-honey-100/30 focus:outline-none focus:ring-2 focus:ring-honey-500"
                  />
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-neutral-900/60 border border-honey-700/40 px-4 py-3 text-sm placeholder:text-honey-100/30 focus:outline-none focus:ring-2 focus:ring-honey-500"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-lg bg-neutral-900/60 border border-honey-700/40 px-4 py-3 text-sm placeholder:text-honey-100/30 focus:outline-none focus:ring-2 focus:ring-honey-500"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3 rounded-full bg-honey-500 text-black font-semibold hover:bg-honey-400 shadow-glow"
                >
                  Send Message
                </motion.button>
                {submitted && <p className="text-xs text-honey-300">Thanks! We will reply shortly.</p>}
              </form>
            </div>
          {/* RIGHT: Info blocks */}
          <div className="space-y-10 md:space-y-12">
            {/* Contact Details */}
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-sm">
              <div className="sm:col-span-1">
                <p className="uppercase tracking-widest text-honey-400 mb-2 text-[11px]">Email</p>
                <a href="mailto:hello@honeygo.store" className="hover:text-honey-300 break-all">hello@honeygo.store</a>
              </div>
              <div className="sm:col-span-1">
                <p className="uppercase tracking-widest text-honey-400 mb-2 text-[11px]">Phone</p>
                <a href="tel:+1234567890" className="hover:text-honey-300">+1 (234) 567-890</a>
              </div>
              <div className="sm:col-span-1">
                <p className="uppercase tracking-widest text-honey-400 mb-2 text-[11px]">Address</p>
                <p className="text-honey-100/70 leading-relaxed">124 Meadow Lane<br/>Evergreen Valley, CO 80439<br/>USA</p>
              </div>
            </div>
            {/* Sustainability */}
            <div>
              <p className="text-sm uppercase tracking-widest text-honey-400 mb-3">Sustainability</p>
              <p className="text-sm text-honey-100/70 max-w-md">
                We invest in pollinator habitat restoration and partner with eco-conscious apiaries. Every jar supports biodiversity.
              </p>
            </div>
            {/* Quick Links */}
            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="uppercase tracking-widest text-honey-400 mb-2 text-[11px]">Shop</p>
                <ul className="space-y-1 text-honey-100/60">
                  <li><a className="hover:text-honey-300" href="#products">Products</a></li>
                  <li><a className="hover:text-honey-300" href="#combos">Combos</a></li>
                  <li><a className="hover:text-honey-300" href="#gallery">Gallery</a></li>
                </ul>
              </div>
              <div>
                <p className="uppercase tracking-widest text-honey-400 mb-2 text-[11px]">Company</p>
                <ul className="space-y-1 text-honey-100/60">
                  <li><a className="hover:text-honey-300" href="#about">About</a></li>
                  <li><a className="hover:text-honey-300" href="#reviews">Reviews</a></li>
                  <li><a className="hover:text-honey-300" href="#contact">Contact</a></li>
                </ul>
              </div>
              <div>
                <p className="uppercase tracking-widest text-honey-400 mb-2 text-[11px]">Legal</p>
                <ul className="space-y-1 text-honey-100/60">
                  <li><button type="button" onClick={() => setPolicy('privacy')} className="hover:text-honey-300 focus:outline-none focus:text-honey-200">Privacy</button></li>
                  <li><button type="button" onClick={() => setPolicy('terms')} className="hover:text-honey-300 focus:outline-none focus:text-honey-200">Terms</button></li>
                  <li><button type="button" onClick={() => setPolicy('cookies')} className="hover:text-honey-300 focus:outline-none focus:text-honey-200">Cookies</button></li>
                </ul>
              </div>
            </div>
            {/* Newsletter */}
            <div>
              <p className="text-sm uppercase tracking-widest text-honey-400 mb-3">Newsletter</p>
              <p className="text-sm text-honey-100/70 mb-3 max-w-md">Seasonal harvest drops & exclusive tasting notes.</p>
              <div className="flex gap-2 max-w-md">
                <input
                  placeholder="Your email"
                  className="flex-1 rounded-lg bg-neutral-900/60 border border-honey-700/40 px-4 py-3 text-sm placeholder:text-honey-100/30 focus:outline-none focus:ring-2 focus:ring-honey-500"
                />
                <button className="px-5 rounded-lg bg-honey-600 text-black font-semibold hover:bg-honey-500">Join</button>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <div className="border-t border-honey-800/40 py-6 text-center text-xs text-honey-100/50">
        © {new Date().getFullYear()} Hey Honey. Crafted with care. All rights reserved.
      </div>
      {/* Policy Dialog */}
      {policy && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <div onClick={() => setPolicy(null)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="relative w-full max-w-lg rounded-2xl bg-neutral-950/95 border border-honey-700/40 p-8 shadow-2xl"
          >
            <h3 className="text-xl font-display font-semibold text-honey-300 mb-4">{policyContent[policy].title}</h3>
            <p className="text-sm leading-relaxed text-honey-100/80 whitespace-pre-line mb-6">{policyContent[policy].body}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPolicy(null)}
                className="px-5 py-2 rounded-full bg-neutral-800 text-honey-200 text-sm hover:bg-neutral-700"
              >Close</button>
            </div>
            <button
              aria-label="Close dialog"
              onClick={() => setPolicy(null)}
              className="absolute top-3 right-3 text-honey-400 hover:text-honey-200"
            >✕</button>
          </motion.div>
        </motion.div>
      )}
    </footer>
  );
};
