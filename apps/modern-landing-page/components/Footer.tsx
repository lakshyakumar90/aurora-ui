"use client";
import Link from "next/link";

export default function Footer() {
  const productLinks = [
    "Agent Simulator",
    "AI Workflows",
    "Agent Builder",
    "Analytics Dashboard",
    "API Integration",
    "Enterprise Solutions",
  ];

  const companyLinks = [
    "About Us",
    "Careers",
    "Press",
    "Contact",
    "Blog",
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Agenforce</h3>
              <p className="text-sm mb-4">
                Safe, observable, outcome-driven AI
              </p>
              <button className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
                Start a 30-day trial
              </button>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                {productLinks.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="hover:text-white transition">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                {companyLinks.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="hover:text-white transition">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <p className="text-sm mb-4">
                Get the latest product news and behind the scenes updates.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © 2025 Agenforce AI. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
