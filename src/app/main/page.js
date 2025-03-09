"use client";

import Link from "next/link";

export default function BloodBankPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDD0] text-black">
      {/* Navigation Bar */}
      <header className="flex justify-between items-center py-6 px-10 bg-[#FFFDD0] shadow-md">
        {/* Left: Logo */}
        <div className="text-2xl font-bold flex items-center">
          <span className="text-red-600 text-3xl">🩸</span>
        </div>

        {/* Center: Navigation */}
        <nav className="space-x-6 text-gray-600 font-medium">
          <Link href="#">
            <span className=" cursor-pointer hover:bg-[#6A0DAD] hover:text-white px-4 py-2 rounded-lg">Home</span>
          </Link>
          <Link href="#">
            <span className="cursor-pointer hover:bg-[#6A0DAD] hover:text-white px-4 py-2 rounded-lg">Donor Registration</span>
          </Link>
          <Link href="#">
            <span className="cursor-pointer hover:bg-[#6A0DAD] hover:text-white px-4 py-2 rounded-lg">Blood Requests</span>
          </Link>
          <Link href="#">
            <span className="cursor-pointer hover:bg-[#6A0DAD] hover:text-white px-4 py-2 rounded-lg">About Us</span>
          </Link>
        </nav>

        {/* Right: Search */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-[#6A0DAD] hover:text-white transition"
          />
        </div>
      </header>

      {/* Hero Section - Blood Bank Landing Page */}
      <section className="relative flex items-center justify-center h-screen">
        {/* Split Background */}
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-[#FFFDD0]"></div>
          <div className="bg-gray-200"></div>
        </div>

        {/* Content */}
        <div className="relative flex items-center w-full px-10">
          {/* Left Side: Text and Button */}
          <div className="w-1/2 space-y-6">
            <p className="text-gray-600 text-4xl font-bold">BE GRATEFUL <br /> AND DONATE <br /> BLOOD</p>
            <h1 className="text-4xl font-extrabold text-red-600">Give Blood, Save Life</h1>
            <button className="px-6 py-3 bg-[#6A0DAD] text-white text-lg rounded-lg hover:bg-[#580A9D] transition">
              Donate Now
            </button>
          </div>

          {/* Right Side: Blood Donation Image */}
          <div className="w-1/2 flex justify-center">
            <img src="/D.jpg" alt="Blood Donation" className="w-96 drop-shadow-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}