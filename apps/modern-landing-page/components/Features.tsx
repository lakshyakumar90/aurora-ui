"use client";

export default function Features() {
  const agents = [
    {
      name: "Campaign Planner",
      time: "120S",
      desc: "Creates clear, ready-to-use campaign briefs using product info, audience data, and past results.",
      tags: ["Google Ads", "SaaS", "Content"],
    },
    {
      name: "Issue Tracker",
      time: "10S",
      desc: "Creates clear, ready-to-use campaign briefs using product info, audience data, and past results.",
      tags: ["Google Ads", "SaaS", "Content"],
    },
    {
      name: "Risk Analysis",
      time: "40s",
      desc: "Creates clear, ready-to-use campaign briefs using product info, audience data, and past results.",
      tags: ["Google Ads", "SaaS", "Content"],
    },
  ];

  return (
    <section id="features" className="px-6 md:px-12 lg:px-20 py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Built for Fast Moving<br />
          Teams That Need Control.
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
          Agents work inside your existing tools, with built-in approvals, brand and policy guardrails, and full traceability. Every action is auditable, every outcome accountable.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {agents.map((agent, i) => (
            <div
              key={i}
              className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition bg-white"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {agent.time}
                </span>
              </div>
              <p className="text-gray-600 mb-4 text-sm">{agent.desc}</p>
              <div className="flex flex-wrap gap-2">
                {agent.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            Prebuilt Agents, Tuned to Your Workflows
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-600">
                Campaign Planner
              </div>
              <div className="flex-1">
                <div className="flex gap-2 mb-2">
                  <div className="h-2 bg-gray-300 rounded flex-1">
                    <div className="h-full bg-gray-900 rounded" style={{ width: "20%" }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Fetching Data</span>
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="h-2 bg-gray-300 rounded flex-1">
                    <div className="h-full bg-gray-900 rounded" style={{ width: "40%" }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Processing Data</span>
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="h-2 bg-gray-300 rounded flex-1">
                    <div className="h-full bg-gray-900 rounded" style={{ width: "60%" }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Performing Action</span>
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="h-2 bg-gray-300 rounded flex-1">
                    <div className="h-full bg-gray-400 rounded" style={{ width: "80%" }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Waiting</span>
                </div>
                <div className="flex gap-2">
                  <div className="h-2 bg-gray-300 rounded flex-1">
                    <div className="h-full bg-gray-400 rounded" style={{ width: "100%" }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Generating Report</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-2">Automate Handoffs, Reduce Ops Friction</h4>
            <p className="text-sm text-gray-600">
              Automate campaigns, tickets and CRM updates without manual handoffs.
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-2">Approvals, Guardrails, and Full Auditability</h4>
            <p className="text-sm text-gray-600">
              Add reviews, approvals and escalations without slowing work.
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-2">Integration Fabric</h4>
            <p className="text-sm text-gray-600">
              Connect CRMs, service desks, data warehouses and cloud apps seamlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

