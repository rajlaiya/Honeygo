import { SectionWrapper } from '../ui/SectionWrapper';

export const About = () => {
  return (
    <SectionWrapper id="about" className="text-honey-50">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-honey-400 mb-6">Why Our Honey?</h2>
          <p className="text-lg leading-relaxed text-honey-100/90 mb-4">
            Our honey is raw, unfiltered, and responsibly harvested. We partner with small-scale beekeepers who
            protect pollinator ecosystems and preserve biodiversity.
          </p>
          <p className="text-honey-100/80 mb-4">
            Each jar contains a rich blend of wildflower nectar, bursting with natural enzymes, antioxidants, and
            subtle floral notes. No additives. No heating. Just pure nature.
          </p>
          <ul className="space-y-2 text-honey-200/80">
            <li>• Rich in antioxidants</li>
            <li>• Supports immune wellness</li>
            <li>• Sustainably sourced & ethically harvested</li>
            <li>• Distinct terroir flavor profile</li>
          </ul>
        </div>
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group">
          <video
            src="https://videos.pexels.com/video-files/6421446/6421446-uhd_1440_2560_30fps.mp4"
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2500ms] ease-out"
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-honey-100">
            <p className="text-sm uppercase tracking-wider font-medium">Raw • Unfiltered • Single-Origin</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
