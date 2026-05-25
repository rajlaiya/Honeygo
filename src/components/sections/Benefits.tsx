import { SectionWrapper } from '../ui/SectionWrapper';
import { useMemo } from 'react';
import { gsap } from 'gsap';

interface BenefitItemBase {
  title: string;
  description: string;
  key: keyof typeof benefitImagePools;
  image: string; // resolved after random selection
}

// Image pools grouped semantically so each benefit gets a relevant random visual.
const benefitImagePools = {
  immune: [
    'https://plus.unsplash.com/premium_photo-1690291495178-9e4b45678be7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SW1tdW5lJTIwU3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1690170834883-cd3b3de9c29c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8SW1tdW5lJTIwU3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1623887743456-5f8ee1ca26d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fEltbXVuZSUyMFN1cHBvcnR8ZW58MHx8MHx8fDA%3D'
  ],
  throat: [
    'https://plus.unsplash.com/premium_photo-1671717725615-5a5f732957bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGhyb2F0fGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1664304079864-1bbaebb553ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHRocm9hdHxlbnwwfHwwfHx8MA%3D%3D',
    'https://media.istockphoto.com/id/1188562852/photo/sick-upset-indian-girl-touching-neck-suffering-from-sore-throat.webp?a=1&b=1&s=612x612&w=0&k=20&c=frmsjsBOLTpkafiygO1wStnBSWVCenXaOaatNAfQp8A='
  ],
  energy: [
    'https://images.unsplash.com/photo-1749113351389-6db64f92c1fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE5hdHVyYWwlMjBodW1hbiUyMEVuZXJneXxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1663076580455-12edd6516d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TmF0dXJhbCUyMGh1bWFuJTIwRW5lcmd5fGVufDB8MXwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1626453746498-f61d2b45279b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fE5hdHVyYWwlMjBodW1hbiUyMEVuZXJneXxlbnwwfDF8MHx8fDA%3D'
  ],
  digestive: [
    'https://plus.unsplash.com/premium_photo-1740113536526-189ae99ac2cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGlnZXN0aXZlJTIwQ29tZm9ydHxlbnwwfDF8MHx8fDA%3D',
    'https://media.istockphoto.com/id/1415337368/photo/portrait-of-attractive-cheerful-brown-haired-girl-touching-belly-showing-thumbup-isolated.webp?a=1&b=1&s=612x612&w=0&k=20&c=yFfyipzYqbS4GV_SVU--GRIsQ6MtBeneDHDF1YtJeoI=',
    'https://media.istockphoto.com/id/1435640778/photo/pregnant-woman-resting-on-sofa-drinking-coffee.webp?a=1&b=1&s=612x612&w=0&k=20&c=74Y_47yfk_V2l7AQGzedESrXeDIZKzCzqd6uYOwM5qc='
  ]
} as const;

export const Benefits = () => {
  const benefits: BenefitItemBase[] = useMemo(() => {
    const base: Omit<BenefitItemBase, 'image'>[] = [
      {
        title: 'Immune Support',
        description:
          "Raw honey contains natural antioxidants and trace enzymes that may support the body's innate defenses when used as part of a balanced diet.",
        key: 'immune'
      },
      {
        title: 'Soothing Throat',
        description:
          'A spoon of honey is traditionally used to coat and soothe an irritated throat. (Always consult a professional for persistent symptoms).',
        key: 'throat'
      },
      {
        title: 'Natural Energy',
        description:
          'Fructose + glucose in honey provide a quick, naturally packaged source of carbohydrates ideal before light activity.',
        key: 'energy'
      },
      {
        title: 'Digestive Comfort',
        description:
          'Some raw honeys contain prebiotic compounds that may help nourish beneficial gut bacteria.',
        key: 'digestive'
      }
    ];
    const rand = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];
    return base.map((b) => ({ ...b, image: rand(benefitImagePools[b.key]) }));
  }, []);

  return (
    <SectionWrapper
      id="benefits"
      className="text-honey-50"
      animation={(el) => {
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const header = el.querySelector('.benefits-header');
        const headerItems = header ? header.children : [];
        const grid = el.querySelector('.benefits-grid');
        const cards = grid ? grid.querySelectorAll('.benefit-card') : [];

        if (prefersReduced) {
          gsap.set([headerItems, cards], { autoAlpha: 1, y: 0, scale: 1 });
          return;
        }

        gsap.set(cards, { autoAlpha: 0, y: 60, scale: 0.9, rotate: 1, transformOrigin: '50% 60%' });
        if (header) gsap.set(headerItems, { autoAlpha: 0, y: 40 });

        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            toggleActions: 'play none none reverse'
          }
        })
          .to(headerItems, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.12
          })
          .to(
            cards,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.15
            },
            '-=0.2'
          );
      }}
    >
      <div className="benefits-header max-w-4xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-honey-400 mb-6">Benefits of Raw Honey</h2>
        <p className="text-honey-100/80 leading-relaxed">
          Centuries of traditional use pair with emerging research. Below are common, general wellness-oriented uses of
          quality raw honey. This is educational only, not medical advice.
        </p>
      </div>
      <div className="benefits-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="benefit-card group relative rounded-2xl overflow-hidden bg-neutral-900/60 border border-honey-400/10 backdrop-blur shadow-lg hover:shadow-honey-500/20 transition-shadow will-change-transform"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={b.image}
                alt={b.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1600ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80 pointer-events-none" />
            </div>
            <div className="p-5 flex flex-col h-[210px]">
              <h3 className="text-lg font-semibold text-honey-300 mb-2 tracking-wide">{b.title}</h3>
              <p className="text-sm text-honey-100/75 leading-relaxed">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-10 text-xs text-honey-100/40 text-center">
        Always seek professional medical advice for diagnosis or treatment. Not for infants under 12 months.
      </p>
    </SectionWrapper>
  );
};
