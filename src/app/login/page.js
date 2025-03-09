"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data); // Debugging

      if (res.ok) {
        alert("Login Successful! 🎉");
        router.push("/main"); // ✅ Redirect to main page
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FFFDD0] items-center justify-center p-6 text-black">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-orange-300 flex flex-col items-center justify-center p-10 text-black">
          <h1 className="text-5xl font-extrabold">Welcome Back!</h1>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-12 text-black">
          <h2 className="text-4xl font-bold text-black">Login</h2>
          <p className="text-black mt-2">Welcome back! Please login to your account.</p>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="mt-6">
              <label className="block text-black font-medium">User Name</label>
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

            <div className="flex justify-between items-center mt-4">
              <label className="flex items-center text-black">
                <input type="checkbox" className="form-checkbox text-purple-600" />
                <span className="ml-2 text-black">Remember Me</span>
              </label>
              <a href="#" className="text-purple-600 font-semibold">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg mt-6 font-bold text-lg hover:bg-purple-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-black">
            New User? <Link href="/signup" className="text-purple-600 font-semibold">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
