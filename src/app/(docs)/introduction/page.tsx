export const metadata = {
  title: "Introduction",
  description: "Aurora UI - Animate Your Web Presence. Beautifully designed animated components built with Motion and Tailwind CSS.",
};

const IntroductionPage = () => {
  return (
    <div className="max-w-5xl mx-auto pb-6 space-y-12">
      {/* Heading */}
      <div>
        <h1 id="overview" data-heading="1" className="text-3xl font-bold tracking-tight">
          Aurora UI
        </h1>
        <h2 className="text-lg mt-4 italic">
          Animate Your Web Presence
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Breathe life into your website with beautifully designed animated components, a collection of stunning motion components designed to captivate.
        </p>
      </div>

      {/* Core Values */}
      <section>
        <h2 id="core-values" data-heading="2" className="text-lg mb-4 italic">
          Effortless Elegance. Limitless Customization. Open Source.
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Built for those who demand exceptional user experiences: engineers, designers, and founders. A reusable collection of beautiful, animated components for your next product—built with Motion and Tailwind CSS.
        </p>
      </section>

      {/* Vision */}
      <section>
        <h2 id="vision" data-heading="2" className="text-lg mb-4 italic">
          Vision
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          As a developer, I noticed Tailwind CSS had already become a standard in production codebases. With the introduction of shadcn/ui, building modern frontends became even more accessible. Aurora UI is my way of giving back, helping the community with a set of open-source, motion-driven components.
        </p>
      </section>

      {/* Open Source */}
      <section>
        <h2 id="open-source" data-heading="2" className="text-lg mb-4 italic">
          Open sourced
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Aurora UI is open source. Contributions are welcome to expand and improve the collection.
        </p>
      </section>

      {/* Call to Action */}
      <section>
        <p className="text-lg text-foreground">
          Go up and high with Aurora UI.
        </p>
      </section>
    </div>
  );
};

export default IntroductionPage;
