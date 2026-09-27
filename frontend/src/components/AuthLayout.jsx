import React from 'react';
import { Users, Briefcase, TrendingUp } from 'lucide-react';
import bgImage from '../assets/auth.png';

const AuthLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen lg:h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-10 relative font-sans selection:bg-emerald-800 selection:text-white overflow-x-hidden lg:overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Rich emerald green shade covering the left 1/3 (1:3) of the background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #06261d 0%, rgba(6, 38, 29, 0.92) 20%, rgba(6, 38, 29, 0.5) 28%, transparent 33.33%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#06261d]/80 via-transparent to-[#06261d]/90 pointer-events-none lg:hidden" />

      {/* Subtle decorative golden accent curves matching the design */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 800"
        fill="none"
      >
        <path
          d="M-50,140 C180,90 340,280 500,160 C580,100 640,40 700,20"
          stroke="#dfb76c"
          strokeWidth="1.5"
        />
        <path
          d="M-40,650 C160,540 280,720 480,590 C600,510 650,380 750,320"
          stroke="#dfb76c"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
      </svg>

      {/* Main Content Container spanning full screen, fitting elegantly in viewport */}
      <div className="w-full max-w-[1380px] mx-auto h-full max-h-[92vh] flex flex-col lg:flex-row items-center justify-between relative z-10 gap-6 lg:gap-10">
        
        {/* Left Side: Logo, Editorial Headline & 3 Feature Badges */}
        <div className="flex-1 flex flex-col justify-between py-2 lg:py-4 px-2 sm:px-4 lg:pr-6 max-w-xl h-full">
          {/* Logo - transparent without any background wrapper */}
          <div>
            <img
              src="/logo.png"
              alt="Logo"
              className="h-9 sm:h-10 w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* Headline & Subtitle */}
          <div className="my-auto py-4 lg:py-6">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[3.1rem] font-bold text-white tracking-tight leading-[1.14] drop-shadow-md">
              Your <br />
              Professional <br />
              Network for <br />
              <span className="font-serif italic font-normal text-[#dfb76c]">
                What's Next.
              </span>
            </h1>

            <p className="mt-3 text-emerald-50/90 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-md drop-shadow font-normal">
              Connect with talented people, discover opportunities, and grow your career with Zarre.
            </p>
          </div>

          {/* 3 Feature Badges */}
          <div className="space-y-3 pt-1">
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-full bg-emerald-950/70 border border-emerald-400/30 backdrop-blur-md flex items-center justify-center text-emerald-300 shadow-md shrink-0 group-hover:border-emerald-300/50 transition">
                <Users className="w-4 h-4" />
              </div>
              <div className="drop-shadow-sm">
                <h4 className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                  Build Connections
                </h4>
                <p className="text-emerald-100/75 text-xs">
                  Network with professionals, peers and recruiters.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-full bg-emerald-950/70 border border-emerald-400/30 backdrop-blur-md flex items-center justify-center text-emerald-300 shadow-md shrink-0 group-hover:border-emerald-300/50 transition">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="drop-shadow-sm">
                <h4 className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                  Find Opportunities
                </h4>
                <p className="text-emerald-100/75 text-xs">
                  Explore jobs, internships and career growth.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-full bg-emerald-950/70 border border-emerald-400/30 backdrop-blur-md flex items-center justify-center text-emerald-300 shadow-lg shrink-0 group-hover:border-emerald-300/50 transition">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="drop-shadow-sm">
                <h4 className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                  Grow Your Career
                </h4>
                <p className="text-emerald-100/75 text-xs">
                  Learn, share and showcase your skills.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Form Card (Solid 4 : Transparent 1 ratio, no blur) */}
        <div className="flex items-center justify-center lg:justify-end w-full lg:w-auto h-full">
          <div className="w-full sm:w-[440px] lg:w-[460px] bg-gradient-to-b from-[#FBF9F4] from-80% to-transparent rounded-3xl lg:rounded-[2.2rem] shadow-2xl p-6 sm:p-7 lg:p-8 border-t border-x border-white/60 border-b-white/10 flex flex-col justify-center">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
