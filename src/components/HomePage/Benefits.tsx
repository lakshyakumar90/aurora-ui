import Image from "next/image";

const benefitsData = [
  {
    id: 1,
    title: "Lightning Fast Development",
    description:
      "Cut your development time by 80% with our extensive library of pre-built components.",
    topTag: "built for speed",
    tags: ["rapid prototyping", "scalable apps", "modern ui/ux"],
    imageSrc: "/first.png",
  },
  {
    id: 2,
    title: "Beautiful by Default",
    description:
      "Every component follows modern design principles with built-in dark mode support, responsive layouts, and accessibility features.",
    topTag: "modern design",
    tags: ["responsive", "dark mode", "accessibility"],
    imageSrc: "/second.png",
  },
  {
    id: 3,
    title: "Next.js Optimized",
    description:
      "Built specifically for Next.js with server-side rendering support, automatic code splitting, and performance optimizations out of the box.",
    topTag: "framework optimized",
    tags: ["server-side rendering", "code splitting", "performance"],
    imageSrc: "/third.png",
  },
  {
    id: 4,
    title: "Accessibility Built-In",
    description:
      "Deliver a seamless experience for all users with features designed to meet accessibility standards.",
    topTag: "built for everyone",
    tags: ["universal", "accessible design", "screen friendly"],
    imageSrc: "/fourth.png",
  },
  {
    id: 5,
    title: "Easily Personalized",
    description:
      "Easily customize colors, typography, spacing, and animations using Tailwind CSS classes. Make it match your brand perfectly.",
    topTag: "fully customizable",
    tags: ["custom themes", "animations", "personalized ui/ux"],
    imageSrc: "/fifth.png",
  },
];

export default function Benefits() {
  return (
    <section className="flex flex-col gap-12 py-10 px-4 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
      {benefitsData.map((item, index) => (
        <div key={item.id} className="w-full h-full flex items-center">
          <div
            className={`
              w-full h-full rounded-2xl border border-[#A44BF8] p-6 md:p-10 
              flex flex-col md:flex-row gap-10 items-center
              hover:border-[3px] transition-all duration-500 ease-out bg-black/20
              ${index % 2 === 1 ? "md:flex-row-reverse" : ""}
            `}
          >
            {/* Image Container */}
            <div className="w-full md:w-1/2 h-[300px] md:h-[350px] rounded-xl flex justify-center items-center overflow-hidden group">
              <div className="relative w-[90%] h-[90%] rounded-lg">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
              <span
                className="text-sm md:text-lg border border-primary w-fit px-4 py-1.5 rounded-full bg-card
                hover:bg-primary/10 hover:scale-105 transition-all duration-300 capitalize text-white"
              >
                {item.topTag}
              </span>

              <h3 className="text-xl md:text-3xl font-medium leading-tight text-white">
                {item.title}
              </h3>

              <p className="text-gray-300 text-md leading-relaxed">
                {item.description}
              </p>

              {/* Bottom Tags */}
              <div className="flex flex-wrap gap-3 mt-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-sm md:text-base border border-white/20 w-fit px-3 py-1.5 rounded-xl bg-card
                    hover:border-primary/80 hover:bg-primary/10 hover:scale-105 transition-all duration-300 capitalize text-gray-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}