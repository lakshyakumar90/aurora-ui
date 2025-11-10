"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <Link href="#" className="text-2xl font-bold text-gray-900">
        Agenforce
      </Link>
      <div className="space-x-8 hidden md:flex items-center">
        <Link href="#features" className="text-gray-700 hover:text-gray-900 transition text-sm font-medium">
          Features
        </Link>
        <Link href="#product" className="text-gray-700 hover:text-gray-900 transition text-sm font-medium">
          Product
        </Link>
        <Link href="#socials" className="text-gray-700 hover:text-gray-900 transition text-sm font-medium">
          Socials
        </Link>
        <Link href="#pricing" className="text-gray-700 hover:text-gray-900 transition text-sm font-medium">
          Pricing
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="#" className="text-gray-700 hover:text-gray-900 transition text-sm font-medium hidden md:block">
          Login
        </Link>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium">
          Signup
        </button>
      </div>
    </nav>
  );
}
