import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut, User as UserIcon, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#061d16] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061d16] text-white flex flex-col items-center justify-center p-6 text-center selection:bg-emerald-700 selection:text-white">
      <div className="w-full max-w-md p-8 bg-[#092b20]/75 backdrop-blur-md rounded-3xl border border-emerald-800/40 shadow-2xl flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Zarre Logo"
          className="h-12 w-auto object-contain mb-6 drop-shadow-md"
        />

        {user ? (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-4 shadow-inner">
              <UserIcon className="w-8 h-8" />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
              Welcome, {user.firstName} {user.lastName}!
            </h1>
            <p className="text-emerald-300 text-xs sm:text-sm font-medium mb-1">
              @{user.userName}
            </p>
            <p className="text-emerald-100/70 text-xs mb-8">
              {user.email}
            </p>

            <div className="w-full space-y-3">
              <button
                onClick={handleSignOut}
                className="w-full bg-red-900/60 hover:bg-red-800/80 border border-red-500/40 text-red-200 font-medium py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Home;