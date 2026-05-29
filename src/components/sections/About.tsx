import aboutVideo from '../../assets/bg_a_video.mp4';

export const About = () => {
  return (
    <section id="about" className="relative min-h-[70vh] w-full overflow-hidden text-honey-50">
      <video
        src={aboutVideo}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6 text-center">
        <div>
          <h2 className="font-marck text-4xl md:text-6xl text-honey-100 mb-4">Why Our Honey?</h2>
          <p className="font-marck text-lg md:text-2xl text-honey-100/90 leading-relaxed">
            Raw, unfiltered, and responsibly harvested. Each jar carries wildflower nectar, natural enzymes, and
            gentle floral notes - pure, slow-crafted honey from sustainable apiaries.
          </p>
        </div>
      </div>
    </section>
  );
};
