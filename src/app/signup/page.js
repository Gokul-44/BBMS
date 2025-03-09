"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log(data); // Debugging

      if (res.ok) {
        alert("Signup Successful! 🎉 Redirecting to login...");
        router.push("/login");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FFFDD0] items-center justify-center p-6 text-black">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-orange-300 flex flex-col items-center justify-center p-10 text-black">
          {/* Logo Image */}
          <img src="/logo.png" alt="Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-5xl font-extrabold">Join Us!</h1>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-12 text-black">
          <h2 className="text-4xl font-bold text-black">Signup</h2>
          <p className="text-black mt-2">Create an account to get started.</p>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="mt-6">
              <label className="block text-black font-medium">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring focus:ring-purple-300 focus:outline-none text-black"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-black font-medium">Email</label>
              <input
                type="email"
                placeholder="username@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring focus:ring-purple-300 focus:outline-none text-black"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-black font-medium">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring focus:ring-purple-300 focus:outline-none text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg mt-6 font-bold text-lg hover:bg-purple-700 transition"
            >
              Signup
            </button>
          </form>

          <p className="mt-4 text-center text-black">
            Already have an account? <Link href="/login" className="text-purple-600 font-semibold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}