'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import TestifyTopbar from '@/components/TestifyTopbar';

export default function LobbyPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-navy-900/5 rounded-full blur-3xl"></div>
      </div>

      <TestifyTopbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">

          <h2 className="text-5xl sm:text-6xl font-bold text-brand-navy-900 mb-4 tracking-tight">
            Hello, <span className="bg-gradient-to-r from-brand-navy-900 to-brand-gold-500 bg-clip-text text-transparent">{user.name}</span>
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            Practice witness cross-examineation with AI-powered avatars
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto mb-12">
          <Link href="/session-config">
            <div className="relative bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-200 p-5 sm:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group overflow-hidden h-full flex flex-col items-start text-left">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-900/5 to-brand-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 flex flex-col items-start w-full">
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-navy-900 to-brand-navy-800 rounded-2xl mb-4 group-hover:from-brand-gold-500 group-hover:to-brand-gold-400 transition-all duration-500 group-hover:scale-110 shadow-lg">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-brand-navy-900 mb-2 group-hover:text-brand-gold-500 transition-colors">
                  New Session
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Start a new practise training session with an AI avatar
                </p>

                {/* Arrow indicator */}
                <div className="mt-auto flex items-center gap-1 text-brand-navy-900 group-hover:text-brand-gold-500 transition-colors font-semibold text-xs sm:text-sm">
                  <span>Get Started</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/sessions">
            <div className="relative bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-200 p-5 sm:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group overflow-hidden h-full flex flex-col items-start text-left">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-900/5 to-brand-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 flex flex-col items-start w-full">
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-navy-900 to-brand-navy-800 rounded-2xl mb-4 group-hover:from-brand-gold-500 group-hover:to-brand-gold-400 transition-all duration-500 group-hover:scale-110 shadow-lg">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-brand-navy-900 mb-2 group-hover:text-brand-gold-500 transition-colors">
                  View Sessions
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Review transcripts and improve your witness skills
                </p>

                {/* Arrow indicator */}
                <div className="mt-auto flex items-center gap-1 text-brand-navy-900 group-hover:text-brand-gold-500 transition-colors font-semibold text-xs sm:text-sm">
                  <span>View All</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="max-w-md mx-auto mt-24">
          <div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-navy-900/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-gold-500 to-brand-gold-400 rounded-xl shadow-lg">
                  <span className="text-xl sm:text-2xl">💡</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-navy-900">
                  How It Works
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-brand-gold-500 to-brand-gold-400 text-white font-bold rounded-lg text-sm shadow-md group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-brand-navy-900 mb-1 text-sm sm:text-base">Configure Session</h4>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      Select an avatar and upload case materials
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-brand-gold-500 to-brand-gold-400 text-white font-bold rounded-lg text-sm shadow-md group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-brand-navy-900 mb-1 text-sm sm:text-base">Practice Live</h4>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      Practice your testimony with the AI avatar in real-time
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-brand-gold-500 to-brand-gold-400 text-white font-bold rounded-lg text-sm shadow-md group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-brand-navy-900 mb-1 text-sm sm:text-base">Get Analytics</h4>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      Receive detailed performance analysis and recommendations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-brand-gold-500 to-brand-gold-400 text-white font-bold rounded-lg text-sm shadow-md group-hover:scale-110 transition-transform">
                    4
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-brand-navy-900 mb-1 text-sm sm:text-base">Review & Improve</h4>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      Review transcripts and improve your witness skills
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Section - Text List Layout */}
        <div className="max-w-md mx-auto mt-8 sm:mt-12 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div>
            <div className="flex flex-col gap-6 px-2 items-center">
              {/* Witness Guidelines */}
              <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/50 p-2 rounded-xl transition-all -mx-2">
                <div className="text-4xl">👨‍⚖️</div>
                <span className="text-xl sm:text-2xl font-medium text-gray-800 group-hover:text-brand-navy-900 transition-colors">
                  Witness Guidelines
                </span>
              </div>

              {/* Preparation Checklist */}
              <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/50 p-2 rounded-xl transition-all -mx-2">
                <div className="text-4xl">📋</div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-medium text-gray-800 group-hover:text-brand-navy-900 transition-colors relative">
                    Preparation Checklist
                  </span>
                </div>
              </div>

              {/* Do's and Don'ts Row */}
              <div className="flex items-center justify-center gap-12 pt-4">
                {/* Do's */}
                <div className="flex items-center gap-3 cursor-pointer group transition-transform hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-brand-navy-900 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-brand-navy-900">Do&apos;s</span>
                </div>

                {/* Don'ts */}
                <div className="flex items-center gap-3 cursor-pointer group transition-transform hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-red-800">Don&apos;ts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

