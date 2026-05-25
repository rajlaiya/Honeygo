import { SectionWrapper } from '../ui/SectionWrapper';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Base images (duplicated for seamless loop)
const imagesBase = [
  'https://images.unsplash.com/photo-1747309585153-b19a5f57e2f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGhvbmV5JTIwZGlmZmVyZW50JTIwdHlwZXN8ZW58MHwxfDB8fHww',
  'https://images.unsplash.com/photo-1671548185843-3f50c6c1060b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGhvbmV5JTIwZGlmZmVyZW50JTIwdHlwZXN8ZW58MHwxfDB8fHww',
  'https://images.unsplash.com/photo-1645871304737-c61b67752c0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM1fHxob25leSUyMGRpZmZlcmVudCUyMHR5cGVzfGVufDB8MXwwfHx8MA%3D%3D',
  'https://nutradivine.in/wp-content/uploads/2022/03/Black_Forest_Honey_Benefits-700x700.jpg',
  'https://images.unsplash.com/photo-1582979564939-9bcbb364268a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fGhvbmV5JTIwcHJvZHVjdHN8ZW58MHwxfDB8fHww',
  'https://images.unsplash.com/photo-1652282556241-0ce13285d00f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGhvbmV5JTIwcHJvZHVjdHN8ZW58MHwxfDB8fHww',
  'https://images.unsplash.com/photo-1625206842442-7d6962c32a4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM5fHxob25leSUyMHByb2R1Y3RzfGVufDB8MXwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1662675114403-5ebfa9448070?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ3fHxob25leSUyMHByb2R1Y3RzfGVufDB8MXwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1708265890451-41e028558250?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ2fHxob25leSUyMHByb2R1Y3RzfGVufDB8MXwwfHx8MA%3D%3D',
  'https://shop.albasir.in/wp-content/uploads/2025/01/Black-Honey909.webp',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0zym4029J31XgR2JHImcEuvaUMYjV3M72vQ&s',
  'https://images.unsplash.com/photo-1629240830845-e4a550a6bbde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvbmV5fGVufDB8MXwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1622448559300-6df8495a1574?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGhvbmV5fGVufDB8MXwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1558980648-73775672e179?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9uZXklMjB3b21hbnxlbnwwfDF8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1695151601862-e6e8ad49b508?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvbmV5fGVufDB8MXwwfHx8MA%3D%3D',




];

export const Gallery = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setup = () => {
      tlRef.current?.kill();
      gsap.set(track, { x: 0 });
      const singleSet = track.querySelectorAll('.wave-img').length / 2; // first half unique
      const imgs = Array.from(track.querySelectorAll<HTMLDivElement>('.wave-img'));

      // Wave motion per item
      imgs.forEach((img, i) => {
        gsap.to(img, {
          y: () => (Math.sin(i) * 12),
          duration: 2.2 + (i % singleSet) * 0.12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: (i % singleSet) * 0.08
        });
      });

      // Compute width of first set
      const uniqueEls = imgs.slice(0, singleSet);
      const width = uniqueEls.reduce((acc, el) => acc + el.offsetWidth, 0);

      // Continuous marquee timeline
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(track, { x: -width, duration: 40, ease: 'none' });
      tl.set(track, { x: 0 });
      tlRef.current = tl;
    };

    // Wait a frame for layout
    const id = requestAnimationFrame(setup);
    window.addEventListener('resize', setup);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', setup);
      tlRef.current?.kill();
    };
  }, []);

  const loopImages = [...imagesBase, ...imagesBase];

  return (
    <SectionWrapper id="gallery" className="text-honey-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-honey-400 mb-4">Harvest Moments</h2>
        <p className="text-honey-100/70 max-w-2xl mx-auto">Behind-the-scenes glimpses from forest edges, wildflower fields, and artisan extraction days.</p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black via-black/60 to-transparent z-10" />
        <div ref={trackRef} className="flex gap-6 will-change-transform">
          {loopImages.map((src, i) => (
            <div
              key={i}
              className="wave-img relative shrink-0 w-[260px] h-[320px] rounded-2xl overflow-hidden bg-neutral-900/40 border border-honey-700/30"
            >
              <img
                src={src}
                alt="Gallery"
                loading="lazy"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
