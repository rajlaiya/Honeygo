import { useRef, useLayoutEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  id?: string;
  children: ReactNode;
  className?: string;
  triggerOnce?: boolean;
  animation?: (el: Element) => void;
}

export const SectionWrapper = ({ id, children, className = '', triggerOnce = true, animation }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const defaultAnim = () => {
        gsap.fromTo(
          el.children,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              once: triggerOnce
            }
          }
        );
      };
      if (animation) animation(el); else defaultAnim();
    }, ref);

    return () => ctx.revert();
  }, [animation, triggerOnce]);

  return (
    <section id={id} ref={ref} className={`relative py-24 md:py-32 ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl">{children}</div>
    </section>
  );
};
