import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#061d16] text-white flex flex-col items-center justify-center p-6 text-center selection:bg-emerald-700 selection:text-white">
      <div className="w-full max-w-md p-8 bg-[#092b20]/60 backdrop-blur-md rounded-3xl border border-emerald-800/40 shadow-2xl flex flex-col items-center">
        <img src="/logo.png" alt="Zarre Logo" className="h-12 w-auto object-contain mb-6 drop-shadow-md" />
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Welcome to Zarre
        </h1>
        <p className="text-emerald-100/75 text-xs sm:text-sm leading-relaxed mb-8">
          Your professional network for what's next. Connect with talented people, discover opportunities, and grow your career.
        </p>
        <div className="w-full space-y-3">
          <Link
            to="/signup"
            className="w-full bg-[#dfb76c] hover:bg-[#edd093] text-[#061d16] font-semibold py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/signin"
            className="w-full bg-[#0d3b2c] hover:bg-[#124b38] border border-emerald-600/30 text-white font-medium py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 transition"
          >
            <span>Sign In to Zarre</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;