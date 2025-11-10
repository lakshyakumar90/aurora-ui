"use client";

export default function GovernedAI() {
  const activities = [
    { name: "Personalized Email", time: "15s", status: "success", desc: "Personalized Email sent to ••••• @gmail.com" },
    { name: "Peer Review", time: "", status: "failed", desc: "Reviewed and approved 2 outputs from Content Drafting Agent" },
    { name: "Content Drafting", time: "", status: "processing", desc: "Generated draft campaign brief" },
    { name: "Admin Approval", time: "", status: "processing", desc: "Final approval of marketing copy before publishing" },
    { name: "Weekly Campaign Report", time: "2m", status: "success", desc: "Generated campaign performance report" },
    { name: "SEO Audit", time: "", status: "failed", desc: "Reviewed and approved 2 outputs from Content Drafting Agent" },
    { name: "Price Monitoring Agent", time: "", status: "processing", desc: "Generated draft campaign brief" },
  ];

  const guardrails = [
    "Brand & Style",
    "Compliance & Policy",
    "Content Safety Filters",
    "Approval Triggers",
    "Output Quality Checks",
  ];

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Governed AI,<br />
            Trusted Outcomes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deploy AI agents with built-in approvals, brand guardrails, and audit trails. Every step is visible, reviewable, and compliant.
          </p>
        </div>

        <div className="mb-16 space-y-4">
          <div className="bg-gray-100 rounded-lg aspect-video max-w-4xl mx-auto flex items-center justify-center">
            <p className="text-gray-500">Demo 1 for agenforce template</p>
          </div>
          <div className="bg-gray-100 rounded-lg aspect-video max-w-4xl mx-auto flex items-center justify-center">
            <p className="text-gray-500">Demo 1 for agenforce template</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Audit Trail</h3>
            <p className="text-gray-600 mb-6">
              Tracks every agent action with full input-output visibility and timestamps.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-3">Recent Activity</p>
                <div className="space-y-3">
                  {activities.map((activity, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 text-sm">{activity.name}</span>
                            {activity.time && (
                              <span className="text-xs text-gray-500">{activity.time}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">{activity.desc}</p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            activity.status === "success"
                              ? "bg-green-100 text-green-700"
                              : activity.status === "failed"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {activity.status === "success" ? "SUCCESS" : activity.status === "failed" ? "FAILED" : "PROCESSING"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Role-Based Access</h3>
            <p className="text-gray-600 mb-6">
              Controls who can launch, review, or manage agents based on roles.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-gray-100 rounded-lg p-4 text-center text-sm text-gray-600">
                  item
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6 text-gray-900 mt-8">Approval Queue</h3>
            <p className="text-gray-600 mb-6">
              Sends agent-generated content to human reviewers before it's published.
            </p>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">Processing</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Feedback</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Guardrail Engine</h3>
          <p className="text-gray-600 mb-6">
            Applies brand, tone, and policy checks before output goes live.
          </p>
          <div className="grid md:grid-cols-5 gap-4">
            {guardrails.map((guardrail, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-sm font-medium text-gray-900">{guardrail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h4 className="font-semibold text-gray-900 mb-4">Brand & Style</h4>
            <p className="text-sm text-gray-600 mb-4">Tone Guidelines</p>
            <p className="text-sm text-gray-600">
              Link CRMs, helpdesks, and APIs to give agents secure, role-based access.
            </p>
            <div className="flex gap-4 mt-4">
              <div className="bg-white px-4 py-2 rounded border border-gray-200 text-sm">Salesforce</div>
              <div className="bg-white px-4 py-2 rounded border border-gray-200 text-sm">Hubspot</div>
              <div className="bg-white px-4 py-2 rounded border border-gray-200 text-sm">Sheets</div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Trusted by 500+ enterprise companies</p>
          </div>
        </div>
      </div>
    </section>
  );
}

