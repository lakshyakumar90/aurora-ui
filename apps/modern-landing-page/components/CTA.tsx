"use client";

export default function CTA() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Ready to get started?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Start your free trial today and see how Agenforce can transform your workflow.
        </p>
        <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition">
          Start your free trial
        </button>
      </div>
    </section>
  );
}
