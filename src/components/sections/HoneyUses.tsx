import { SectionWrapper } from '../ui/SectionWrapper';
import { useMemo } from 'react';
import { gsap } from 'gsap';

interface UseMapItem {
  condition: string;
  suggested: string;
  rationale: string;
  key: keyof typeof useImagePools;
  image: string; // resolved
}

const useImagePools = {
  throat: [
    'https://media.istockphoto.com/id/1202210411/photo/unhappy-asian-man-using-his-hand-touching-on-his-neck-suffering-from-gland-inflammation-adult.webp?a=1&b=1&s=612x612&w=0&k=20&c=oFDQ0qn8NMmU85_8-lfKHr7kXmwSRQ9v2xKWB_S0wRk=',
    'https://plus.unsplash.com/premium_photo-1664908460305-3820f6a10c0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U29yZSUyMFRocm9hdCUyMCUyRiUyMENvdWdofGVufDB8MHwwfHx8MA%3D%3D',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTu_6eSndxasaQFfWfP1aqS0KhcWXTvLiww&s',
    'https://media.istockphoto.com/id/161921962/photo/young-woman-with-sore-throat.webp?a=1&b=1&s=612x612&w=0&k=20&c=XxOaluj_FYyLNG0Sqm6uis3NA7a3aXs_5LJfyEcziRY=',

  ],
  digestive: [
    'https://media.istockphoto.com/id/1435640778/photo/pregnant-woman-resting-on-sofa-drinking-coffee.webp?a=1&b=1&s=612x612&w=0&k=20&c=74Y_47yfk_V2l7AQGzedESrXeDIZKzCzqd6uYOwM5qc=',
    'https://images.unsplash.com/photo-1606854385394-14d09ac9e14e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmVtYWxlJTIwaGVhbHRofGVufDB8MXwwfHx8MA%3D%3D',
    'https://media.istockphoto.com/id/1835987588/photo/caucasian-woman-suffering-from-sore-throat-sitting-on-sofa.webp?a=1&b=1&s=612x612&w=0&k=20&c=mC22xB61UH9fVFGJPDct9xts9crZI9vl1bAxHczFYvU=',

  ],
  energy: [
    'https://images.unsplash.com/photo-1628829706300-d1ed475bfc9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RW5lcmd5JTIwRGlwJTIwKFByZSUyMFdvcmtvdXQpfGVufDB8MHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1661320929158-2592619a1c64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UHJlJTIwV29ya291dHxlbnwwfDB8MHx8fDA%3D',
    'https://media.istockphoto.com/id/1217959406/photo/profile-view-of-athletic-man-drinking-water-in-a-gyms-locker-room.webp?a=1&b=1&s=612x612&w=0&k=20&c=Srjkn0z8sisPx46S5T7PmOV_GSX8zpkSXnQv2ebWwZc=',
  ],
  seasonal: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNYPW7du6IDnwMO9xNL2P0GlCS28YDElUPNA&s',
    'https://images.unsplash.com/photo-1643054432804-346cf7e0b8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fEVuZXJneSUyMERpcCUyMChQcmUlMjBXb3Jrb3V0KXxlbnwwfDB8MHx8fDA%3D',
    'https://plus.unsplash.com/premium_photo-1670963964834-113be967c294?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNlYXNvbmFsJTIwVHJhbnNpdGlvbnN8ZW58MHwwfDB8fHww',
  ]
} as const;

export const HoneyUses = () => {
  const useMap: UseMapItem[] = useMemo(() => {
    const base: Omit<UseMapItem, 'image'>[] = [
      {
        condition: 'Sore Throat / Cough',
        suggested: 'Wildflower or Eucalyptus Honey',
        rationale:
          'Often chosen warm in herbal infusions for its smooth coating mouthfeel. Eucalyptus variants add gentle aromatic notes.',
        key: 'throat'
      },
      {
        condition: 'Digestive Discomfort',
        suggested: 'Acacia Honey',
        rationale:
          'Very light flavor, high fructose fraction stays liquid longer; traditionally paired with mild teas or yogurt.',
        key: 'digestive'
      },
      {
        condition: 'Energy Dip (Pre-Workout)',
        suggested: 'Raw Multifloral Honey',
        rationale:
          'Balanced natural sugars for quick availability; easy to drizzle over fruit or oats before light activity.',
        key: 'energy'
      },
      {
        condition: 'Seasonal Transitions',
        suggested: 'Local Wildflower Honey',
        rationale:
          'Local nectar diversity is traditionally valued during changing seasons for its unique pollen traces.',
        key: 'seasonal'
      }
    ];
    const rand = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];
    return base.map((b) => ({ ...b, image: rand(useImagePools[b.key]) }));
  }, []);

  return (
    <SectionWrapper
      id="honey-uses"
      className="text-honey-50"
      animation={(el) => {
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const header = el.querySelector('.uses-header');
          const headerItems = header ? header.children : [];
          const rows = el.querySelectorAll('.use-card');

        if (prefersReduced) {
          gsap.set([headerItems, rows], { autoAlpha: 1, y: 0 });
          return;
        }

      gsap.set(rows, { autoAlpha: 0, y: 70, clipPath: 'inset(0 0 100% 0)', transformOrigin: '50% 0%' });
        if (header) gsap.set(headerItems, { autoAlpha: 0, y: 40 });

        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
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
            rows,
            {
              autoAlpha: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.85,
              ease: 'power3.out',
              stagger: 0.2
            },
            '-=0.15'
          );
      }}
    >
      <div className="uses-header max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-honey-400 mb-6">Which Honey For What?</h2>
        <p className="text-honey-100/80 leading-relaxed">
          Different honeys have distinct flavor, texture, and phytonutrient profiles. Below is a general educational
          pairing list often cited in traditional usage contexts.
        </p>
      </div>
      <div className="uses-grid grid gap-10 md:gap-12 md:grid-cols-2">
        {useMap.map((u) => (
          <div
            key={u.condition}
            className="use-card group relative min-h-[320px] rounded-3xl overflow-hidden bg-neutral-900/60 border border-honey-400/10 backdrop-blur shadow-lg hover:shadow-honey-500/30"
          >
            <img
              src={u.image}
              alt={u.suggested}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
            <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-7 space-y-3">
              <p className="text-[11px] tracking-widest uppercase text-honey-300/70">Condition</p>
              <h3 className="text-xl font-semibold text-honey-300">{u.condition}</h3>
              <p className="text-sm font-medium text-honey-200/80">Suggested: {u.suggested}</p>
              <p className="text-honey-100/80 leading-relaxed text-sm md:text-[15px] opacity-0 group-hover:opacity-100">
                {u.rationale}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-12 text-xs text-honey-100/40 text-center max-w-2xl mx-auto">
        Educational only — not a diagnosis, cure, or substitute for professional medical advice. Always consult a qualified healthcare provider for health concerns.
      </p>
    </SectionWrapper>
  );
};
