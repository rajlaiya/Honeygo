import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface HoneyDripProps {
  count?: number;
  className?: string;
}

export const HoneyDrip = ({ count = 8, className = '' }: HoneyDripProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const drops = el.querySelectorAll<HTMLSpanElement>('.drip');
    const ctx = gsap.context(() => {
      drops.forEach(d => {
        const left = parseFloat(d.getAttribute('data-left') || '0');
        const size = parseFloat(d.getAttribute('data-size') || '40');
        const delay = parseFloat(d.getAttribute('data-delay') || '0');
        const opacity = parseFloat(d.getAttribute('data-opacity') || '0.3');
        gsap.set(d, {
          left: left + '%',
          width: size,
          height: size * 1.4,
          opacity,
          background: 'linear-gradient(to bottom, #FFC834, #B48413 70%)'
        });
        gsap.fromTo(
          d,
          { y: -120 },
          {
            y: '110vh',
            repeat: -1,
            delay,
            duration: gsap.utils.random(10, 18),
            ease: 'none'
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const size = (Math.random() * 70 + 30).toFixed(2);
        const left = (Math.random() * 100).toFixed(2);
        const delay = (Math.random() * 8).toFixed(2);
        const opacity = (Math.random() * 0.3 + 0.15).toFixed(2);
        return (
          <span
            key={i}
            data-left={left}
            data-size={size}
            data-delay={delay}
            data-opacity={opacity}
            className="drip absolute top-0 block rounded-b-full blur-[1px] mix-blend-screen will-change-transform"
          />
        );
      })}
    </div>
  );
};

export default HoneyDrip;
