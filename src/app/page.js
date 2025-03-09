import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#FFF5E1] text-black overflow-hidden">
      {/* Blurred Background Logo */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10">
        <img
          src="/logo.png"
          alt="Blood Bank Logo"
          className="h-96 w-96 object-contain blur-3xl animate-pulse"
        />
      </div>

      {/* Main Content */}
      <div className="relative bg-purple-200 shadow-2xl rounded-3xl p-12 text-center max-w-md w-full z-10 animate-fadeIn">
        {/* Logo on Top */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Blood Bank Logo"
            className="h-24 drop-shadow-lg animate-bounce"
          />
        </div>

        <h1 className="text-4xl font-extrabold text-purple-900 mb-4">
          Blood Bank Management System
        </h1>
        <p className="text-purple-800 mb-8 text-lg">
          Ensuring Safe and Reliable Blood Donations
        </p>

        <div className="flex justify-center">
          <Link
            href="/login"
            className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 hover:scale-110 transition-all shadow-lg font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
