'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/lib/api-client';
import Image from 'next/image';

export default function LoginPage() {
  console.log('LOGIN PAGE MOUNTED');

  const router = useRouter();
  const { login, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle login (NO auto-redirect on failure)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const result = await login({ email, password, uniqueCode });

      if (result?.success) {
        setLoading(false);
        router.push('/lobby'); // manual redirect only on success
        return;
      }

      // Show backend-provided message or fallback
      const errorMsg =
        result?.message ||
        result?.error ||
        'Login failed. Please check your credentials and try again.';
      setError(errorMsg);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'An error occurred during login. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials loader with safe fallback
  const fillDemoCredentials = async () => {
    try {
      setError('');
      const response = await apiClient.get<any>('/api/auth/demo-credentials');
      const demo = response?.credentials?.[0];

      if (demo?.email && demo?.password && demo?.uniqueCode) {
        setEmail(demo.email);
        setPassword(demo.password);
        setUniqueCode(demo.uniqueCode);
      } else {
        console.warn('Unexpected demo-credentials response, using fallback.');
        setEmail('demo@testify.com');
        setPassword('password123');
        setUniqueCode('DEMO01');
      }
    } catch (err) {
      console.error('Failed to load demo credentials:', err);
      setEmail('demo@testify.com');
      setPassword('password123');
      setUniqueCode('DEMO01');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-gold-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-navy-900/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-navy-950 via-brand-navy-900 to-brand-navy-800 relative overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-gold-500/20 rounded-3xl rotate-12 blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-32 right-32 w-40 h-40 bg-brand-gold-500/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 py-20 text-white">
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-shrink-0 w-24 h-24 bg-white rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Testify Logo"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-6xl font-bold tracking-tight mb-2">Testify</h1>
              <p className="text-xl text-gray-300 font-light max-w-sm leading-relaxed">
                Your Ultimate Companion for Witness Preparation
              </p>
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-gold-500/20 rounded-xl flex items-center justify-center group-hover:bg-brand-gold-500/30 transition-all duration-300">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Realistic Simulations</h3>
                <p className="text-gray-400 text-sm">Practice with AI-powered virtual attorneys</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-gold-500/20 rounded-xl flex items-center justify-center group-hover:bg-brand-gold-500/30 transition-all duration-300">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Detailed Analytics</h3>
                <p className="text-gray-400 text-sm">Get comprehensive performance insights</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-gold-500/20 rounded-xl flex items-center justify-center group-hover:bg-brand-gold-500/30 transition-all duration-300">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Improve Confidence</h3>
                <p className="text-gray-400 text-sm">Build skills through repeated practice</p>
              </div>
            </div>

            {/* Contact Support Section */}
            <div className="pt-8 mt-4 border-t border-white/10">
              <div className="flex items-center gap-4 px-5 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-gold-500/20 rounded-full flex items-center justify-center text-brand-gold-500 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-0.5">Contact Support</p>
                  <a href="mailto:Jason.pok@ap.com.jo" className="text-base font-semibold text-white hover:text-brand-gold-500 transition-colors">
                    Jason.pok@ap.com.jo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-4 mb-8">
            <div className="flex-shrink-0 w-14 h-14 bg-brand-navy-900 rounded-xl shadow-lg overflow-hidden flex items-center justify-center transform rotate-3">
              <Image
                src="/logo.png"
                alt="Testify Logo"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-brand-navy-900 tracking-tight leading-none mb-1">
                Testify
              </h1>
              <p className="text-xs text-gray-600 font-medium max-w-[200px] leading-snug">
                Your Ultimate Companion for Witness Preparation
              </p>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 sm:p-10 animate-slide-up">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-brand-navy-900 mb-2">
                {user ? `Hello, ${user.name}` : 'Welcome Back'}
              </h2>
              <p className="text-gray-600">Sign in to continue your training</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5" noValidate>
              {/* Email Input */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {/* user icon */}
                    <svg
                      className="w-5 h-5 text-gray-400 group-focus-within:text-brand-navy-900 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                    placeholder="your.email@lawfirm.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {/* lock icon */}
                    <svg
                      className="w-5 h-5 text-gray-400 group-focus-within:text-brand-navy-900 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-brand-navy-900 active:opacity-70 transition-colors min-w-[44px] min-h-[44px] touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Unique Code Input */}
              <div className="group">
                <label
                  htmlFor="uniqueCode"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Unique Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {/* key icon */}
                    <svg
                      className="w-5 h-5 text-gray-400 group-focus-within:text-brand-navy-900 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <input
                    id="uniqueCode"
                    type="text"
                    value={uniqueCode}
                    onChange={(e) => setUniqueCode(e.target.value.toUpperCase())}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent focus:bg-white transition-all duration-200 placeholder:text-gray-400 uppercase"
                    placeholder="ABC123"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  key={error}
                  className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-slide-down flex items-center gap-2"
                  role="alert"
                  aria-live="polite"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 text-white rounded-xl font-bold text-lg hover:from-brand-navy-800 hover:to-brand-navy-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transform relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-gold-500 to-brand-gold-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={fillDemoCredentials}
                onTouchStart={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '0.8';
                }}
                onTouchEnd={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                }}
                className="w-full px-6 py-4 border-2 border-brand-navy-900 text-brand-navy-900 rounded-xl font-bold text-lg hover:bg-brand-navy-900 hover:text-white active:bg-brand-navy-900 active:text-white active:scale-95 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 transform touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Use Demo Credentials
                </span>
              </button>
            </form>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
                <svg className="w-4 h-4 text-brand-gold-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xs text-gray-700 font-semibold">
                  Demo: demo@testify.com / password123 / DEMO01
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
