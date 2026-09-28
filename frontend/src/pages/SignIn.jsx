import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-[#0A66C2] fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const result = await signIn(formData);
    setLoading(false);

    if (result.success) {
      setSuccessMsg(result.data?.msg || 'Signed in successfully! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } else {
      setErrorMsg(result.error || 'Sign in failed. Please check your credentials.');
    }
  };

  return (
    <AuthLayout>
      {/* Top Bar Switch Link */}
      <div className="flex justify-end items-center mb-3 text-xs text-stone-500 font-medium">
        <span>Don't have an account?</span>
        <Link
          to="/signup"
          className="ml-1.5 font-bold text-[#083327] hover:underline transition"
        >
          Sign Up
        </Link>
      </div>

      {/* Header */}
      <div className="mb-4">
        <h2 className="font-serif text-2xl sm:text-[1.95rem] font-bold text-[#11241d] tracking-tight leading-tight">
          Welcome back
        </h2>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">
          Join Zarre and be part of a growing professional community.
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-stone-50 active:bg-stone-100 border border-stone-200/90 rounded-xl text-stone-700 text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-stone-50 active:bg-stone-100 border border-stone-200/90 rounded-xl text-stone-700 text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <LinkedInIcon />
          <span>Continue with LinkedIn</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center mb-4">
        <div className="grow border-t border-stone-200/80"></div>
        <span className="shrink mx-3.5 text-[11px] font-bold tracking-widest text-stone-400 uppercase">
          OR
        </span>
        <div className="grow border-t border-stone-200/80"></div>
      </div>

      {/* Error / Success feedback */}
      {errorMsg && (
        <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
          {successMsg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full bg-[#fdfbf7] border border-stone-200/90 focus:border-[#083327] focus:ring-2 focus:ring-[#083327]/15 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-stone-800 placeholder-stone-400 outline-none transition"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold text-stone-700">
              Password
            </label>
            <a
              href="#"
              className="text-xs font-medium text-stone-500 hover:text-[#083327] hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-[#fdfbf7] border border-stone-200/90 focus:border-[#083327] focus:ring-2 focus:ring-[#083327]/15 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-stone-800 placeholder-stone-400 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-stone-400 hover:text-stone-600 focus:outline-none transition cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setRememberMe(!rememberMe)}
            className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition border cursor-pointer shrink-0 ${
              rememberMe
                ? 'bg-[#083327] border-[#083327] text-white'
                : 'bg-white border-stone-300'
            }`}
          >
            {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
          </button>
          <label
            onClick={() => setRememberMe(!rememberMe)}
            className="text-xs text-stone-600 select-none cursor-pointer"
          >
            Remember me on this device
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2.5 bg-[#083327] hover:bg-[#0c4333] active:bg-[#052119] text-white font-medium py-3 px-5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70 group"
        >
          <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignIn;