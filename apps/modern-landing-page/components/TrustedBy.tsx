"use client";

export default function TrustedBy() {
  const companies = [
    "Open AI",
    "Hello Patient",
    "Granola",
    "Character AI",
    "Oracle",
    "Portola",
  ];

  return (
    <section className="px-6 md:px-12 lg:px-20 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-gray-600 mb-12 text-lg">
          Trusted by modern operators across industries.<br />
          <span className="text-gray-900 font-medium">From pilot to scale without chaos.</span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="text-gray-400 text-lg font-medium hover:text-gray-600 transition"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


