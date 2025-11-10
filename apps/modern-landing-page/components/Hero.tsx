"use client";

export default function Hero() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900">
          Agents that do the work<br />
          <span className="text-gray-600">Approvals that keep you safe.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Deploy AI agents that plan, act through your tools, and report outcomes—without changing how your teams work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium">
            Start your free trial
          </button>
          <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">
            View role based demos
          </button>
        </div>
        <div className="pt-12 space-y-4">
          <div className="bg-gray-100 rounded-lg aspect-video max-w-4xl mx-auto flex items-center justify-center">
            <p className="text-gray-500">Demo 1 for agenforce template</p>
          </div>
          <div className="bg-gray-100 rounded-lg aspect-video max-w-4xl mx-auto flex items-center justify-center">
            <p className="text-gray-500">Demo 1 for agenforce template</p>
          </div>
        </div>
      </div>
    </section>
  );
}
