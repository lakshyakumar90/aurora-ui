"use client";

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 md:px-12 lg:px-20 py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Affordable pricing.<br />
            Easy scaling.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start small to explore automation, add agents as you scale, and unlock enterprise-grade guardrails, orchestration, and reporting when you're ready
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-600">
            <span>✓ Built-in Guardrails</span>
            <span>•</span>
            <span>✓ Agent Orchestration</span>
            <span>•</span>
            <span>✓ Human-in-the-Loop</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">$10/mo</h3>
            <p className="text-gray-600 mb-6">Perfect for individuals or small teams exploring automation.</p>
            <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium mb-6">
              Start your free trial
            </button>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>1 AI Agent Included</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Standard Integrations</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Basic Approval Flows</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>7 Day activity logs</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gray-900 rounded-lg p-8 relative">
            <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs px-3 py-1 rounded">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">$60/mo</h3>
            <p className="text-gray-600 mb-6">Ideal for growing teams ready to scale automation safely.</p>
            <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium mb-6">
              Contact Sales
            </button>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Upto 5 AI Agents</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Multi Agent Orchestration</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Advanced Approval Flows</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>30 Day activity logs</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>ROI Insights</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


