"use client";

export default function FAQ() {
  const faqs = [
    {
      question: "What is Agenforce AI?",
      answer: "Agenforce AI is a platform for building and managing AI agents.",
    },
    {
      question: "Who is Agenforce AI built for?",
      answer: "Agenforce AI is a platform for building and managing AI agents.",
    },
    {
      question: "How does Agenforce AI work?",
      answer: "Agenforce AI is a platform for building and managing AI agents.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial so you can explore all features before committing to a plan.",
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide 24/7 customer support through chat, email, and comprehensive documentation to help you get the most out of Agenforce AI.",
    },
  ];

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


