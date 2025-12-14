'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/lib/api-client';
import ErrorMessage from '@/components/ErrorMessage';

interface Session {
  id: string;
  userId: string;
  name: string;
  avatarId: string;
  quality: string;
  language: string;
  knowledgeBaseId?: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  transcript: TranscriptEntry[];
  report?: SessionReportData;
}

interface TranscriptEntry {
  id: string;
  timestamp: string;
  speaker: 'user' | 'avatar' | 'witness' | 'interviewer';
  text: string;
}

interface SessionReportData {
  overallScore: number;
  metrics: {
    accuracy: number;
    clarity: number;
    tone: number;
    pace: number;
    consistency?: number;
  };
  highlights: any[];
  recommendations: any[];
  durationSeconds?: number;
  summary?: string;
  flaggedSegments?: Array<{
    reason: string;
    text: string;
    timestamp: string;
    time: string;
    title: string;
    snippet: string;
  }>;
}


function ReportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('sessionId') || null;
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [session, setSession] = useState<Session | null>(null);
  const [report, setReport] = useState<SessionReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript'>('overview');
  const [fatalError, setFatalError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth to finish loading before checking authentication
    if (authLoading) {
      console.log('⏳ Auth still loading, waiting...');
      return;
    }

    if (!isAuthenticated) {
      console.log('❌ Not authenticated, redirecting to login...');
      router.push('/login');
      return;
    }

    if (!sessionId) {
      console.log('❌ No session ID, redirecting to sessions...');
      router.push('/sessions');
      return;
    }

    console.log('✅ Auth loaded and authenticated, loading session report...');
    loadSessionReport();
  }, [authLoading, isAuthenticated, sessionId, router]);

  const loadSessionReport = async () => {
    try {
      setLoading(true);
      console.log('📊 Loading session report for:', sessionId);

      let sessionData: Session | null = null;

      // Try to load from API first
      try {
        const response = await apiClient.get<any>(`/api/sessions/${sessionId}`);
        if (response.success && response.session) {
          sessionData = response.session;
          console.log('✅ Session loaded from API');
          console.log('   Transcript length from API:', sessionData?.transcript?.length || 0);

          // If API session has no transcript, try localStorage as backup
          if (sessionData && (!sessionData.transcript || sessionData.transcript.length === 0)) {
            console.warn('⚠️ API session has no transcript, checking localStorage...');
            if (typeof window !== 'undefined') {
              const storedSession = localStorage.getItem(`session_${sessionId}`);
              if (storedSession) {
                try {
                  const localSession = JSON.parse(storedSession);
                  if (localSession.transcript && localSession.transcript.length > 0) {
                    console.log('✅ Found transcript in localStorage, using it');
                    sessionData.transcript = localSession.transcript;
                    console.log('   Transcript length from localStorage:', sessionData.transcript.length);
                  }
                } catch (parseError) {
                  console.error('Failed to parse stored session:', parseError);
                }
              }
            }
          }
        }
      } catch (apiError: any) {
        console.warn('⚠️ Failed to load from API, trying localStorage...', apiError?.response?.status);

        // Fallback to localStorage
        if (typeof window !== 'undefined') {
          const storedSession = localStorage.getItem(`session_${sessionId}`);
          if (storedSession) {
            try {
              sessionData = JSON.parse(storedSession);
              console.log('✅ Session loaded from localStorage');
              console.log('   Transcript length from localStorage:', sessionData?.transcript?.length || 0);
            } catch (parseError) {
              console.error('Failed to parse stored session:', parseError);
            }
          } else {
            console.warn('⚠️ No session found in localStorage either');
          }
        }
      }

      if (!sessionData) {
        console.error('❌ Session not found in API or localStorage');
        setFatalError('Session not found. It may have expired or been cleared.');
        return;
      }

      setSession(sessionData);

      // Check if report exists
      if (sessionData.report) {
        console.log('✅ Using existing report from session');
        setReport(sessionData.report);
      } else {
        // No report exists - generate one from transcript
        console.log('⚠️ No report found, generating analysis...');
        await generateAnalysis(sessionData);
      }
    } catch (error: any) {
      console.error('Failed to load session report:', error);
      setFatalError(error.message || 'Failed to load session report.');
    } finally {
      setLoading(false);
    }
  };

  const generateAnalysis = async (sessionData: Session) => {
    try {
      console.log('🔍 Generating analysis for session...');
      console.log('   Transcript entries:', sessionData.transcript?.length || 0);

      if (!sessionData.transcript || sessionData.transcript.length === 0) {
        console.warn('⚠️ No transcript available, returning empty analysis');
        // Return empty analysis if no transcript
        const emptyReport: SessionReportData = {
          overallScore: 0,
          metrics: {
            accuracy: 0,
            clarity: 0,
            tone: 0,
            pace: 0,
          },
          highlights: [],
          recommendations: [],
          durationSeconds: sessionData.duration || 0,
          summary: '',
          flaggedSegments: [],
        };
        setReport(emptyReport);
        return;
      }

      // Call analysis API
      const analysisResponse = await apiClient.post<any>('/api/analysis/session', {
        transcript: sessionData.transcript,
        durationSeconds: sessionData.duration,
      });

      if (analysisResponse.success && analysisResponse.analysis) {
        console.log('✅ Analysis generated successfully');

        // Transform analysis response to report format
        const analysis = analysisResponse.analysis;
        const overallScore = Math.round(
          (analysis.accuracy + analysis.clarity + analysis.completeness + analysis.consistency) / 4
        );

        const reportData: SessionReportData = {
          overallScore: overallScore,
          metrics: {
            accuracy: analysis.accuracy || 0, // Maps to "Accuracy" in UI (1st)
            clarity: analysis.clarity || 0, // Maps to "Clarity" in UI (2nd)
            tone: analysis.consistency || 0, // Kept for backwards compatibility
            pace: analysis.completeness || 0, // Maps to "Completeness" in UI (3rd) - backend completeness field
            consistency: analysis.consistency || 0, // Maps to "Consistency" in UI (4th)
          },
          highlights: analysis.highlights || [],
          recommendations: analysis.recommendations || [],
          durationSeconds: sessionData.duration,
          summary: analysis.summary || 'Analysis completed successfully.',
          flaggedSegments: analysis.flaggedSegments || [],
        };

        setReport(reportData);

        // Save the report back to the session
        try {
          await apiClient.put(`/api/sessions/${sessionId}`, {
            report: reportData,
          });
          console.log('💾 Report saved to session');
        } catch (saveError) {
          console.warn('⚠️ Failed to save report to session:', saveError);
          // Continue anyway - report is still displayed
        }
      } else {
        const errorMsg = analysisResponse.error || analysisResponse.message || 'Analysis failed';
        console.error('❌ Analysis failed:', errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Failed to generate analysis:', error);
      // Return empty analysis on error
      const fallbackReport: SessionReportData = {
        overallScore: 0,
        metrics: {
          accuracy: 0,
          clarity: 0,
          tone: 0,
          pace: 0,
        },
        highlights: [],
        recommendations: [],
        durationSeconds: sessionData.duration || 0,
        summary: '',
        flaggedSegments: [],
      };
      setReport(fallbackReport);
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 60) return 'text-red-600';
    if (score < 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score < 60) return 'bg-red-500';
    if (score < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Check if there's valid analysis data (not all zeros)
  const hasValidAnalysis = report && (
    report.overallScore > 0 ||
    report.metrics.accuracy > 0 ||
    report.metrics.clarity > 0 ||
    report.metrics.tone > 0 ||
    report.metrics.pace > 0
  );

  const exportToPDF = () => {
    if (!session || !report) return;

    try {
      console.log('📄 Opening print dialog for PDF export...');

      // Use browser's native print functionality which supports all Unicode characters
      window.print();

    } catch (error) {
      console.error('❌ Error opening print dialog:', error);
      setFatalError(
        `Failed to open print dialog: ${error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Show loading state while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-navy-900 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-navy-900 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading report...</p>
        </div>
      </div>
    );
  }

  if (!session || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center animate-slide-up">
          <div className="inline-block p-6 bg-gray-100 rounded-3xl mb-6">
            <span className="text-7xl">📊</span>
          </div>
          <h2 className="text-3xl font-bold text-brand-navy-900 mb-6">Report Not Found</h2>
          <button
            onClick={() => router.push('/sessions')}
            className="px-8 py-4 min-h-[52px] bg-brand-navy-900 text-white rounded-xl font-semibold hover:bg-brand-navy-800 active:bg-brand-navy-700 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Back to Sessions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Centered fatal error overlay */}
      {fatalError && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="max-w-md w-full px-4">
            <ErrorMessage
              title="Unable to open report"
              message={fatalError}
              onDismiss={() => {
                setFatalError(null);
                router.push('/sessions');
              }}
            />
          </div>
        </div>
      )}
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-brand-navy-900 tracking-tight">{session.name}</h1>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                {new Date(session.startTime).toLocaleString()} • {formatDuration(session.duration)}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={exportToPDF}
                className="px-6 py-3 min-h-[44px] bg-brand-gold-500 text-white rounded-xl font-semibold hover:bg-brand-gold-600 active:bg-brand-gold-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                title="Print or save as PDF"
              >
                🖨️ Print / Export PDF
              </button>
              <button
                onClick={() => router.push('/sessions')}
                className="px-6 py-3 min-h-[44px] bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 active:bg-gray-400 active:scale-95 transition-all duration-200 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 min-h-[44px] border-b-3 font-semibold transition-all duration-200 whitespace-nowrap touch-manipulation ${activeTab === 'overview'
                  ? 'border-brand-navy-900 text-brand-navy-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 active:opacity-70'
                }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              📊 Analysis
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              className={`py-4 px-2 min-h-[44px] border-b-3 font-semibold transition-all duration-200 whitespace-nowrap touch-manipulation ${activeTab === 'transcript'
                  ? 'border-brand-navy-900 text-brand-navy-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 active:opacity-70'
                }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              💬 Transcript
            </button>
          </div>
        </div>
      </div>

      {/* Print-only Header */}
      <div className="hidden print:block bg-white border-b-4 border-brand-navy-900 p-8 mb-8 page-break-inside-avoid">
        <h1 className="text-4xl font-bold text-brand-navy-900 mb-6">Testify - Session Report</h1>
        <div className="grid grid-cols-2 gap-6 text-base">
          <div className="pb-2 border-b border-gray-200"><strong className="text-brand-navy-900">Session:</strong> <span className="ml-2">{session.name}</span></div>
          <div className="pb-2 border-b border-gray-200"><strong className="text-brand-navy-900">Date:</strong> <span className="ml-2">{new Date(session.startTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span></div>
          <div className="pb-2 border-b border-gray-200"><strong className="text-brand-navy-900">Duration:</strong> <span className="ml-2">{formatDuration(session.duration)}</span></div>
          {hasValidAnalysis && (
            <div className="pb-2 border-b border-gray-200"><strong className="text-brand-navy-900">Overall Score:</strong> <span className="ml-2 font-bold text-lg">{report.overallScore}/100</span></div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Analysis Tab */}
        <div className={`space-y-8 ${activeTab === 'overview' ? 'block' : 'hidden print:block'}`}>
          {/* Section Header for Print */}
          <div className="hidden print:block mb-6">
            <h2 className="text-2xl font-bold text-brand-navy-900 border-b-2 border-brand-navy-900 pb-3">Analysis</h2>
          </div>

          {/* Show message if no valid analysis */}
          {!hasValidAnalysis && (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block p-6 bg-gray-100 rounded-3xl mb-6">
                  <span className="text-6xl">📊</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-700 mb-3">Not Enough Data for Analysis</h2>
                <p className="text-gray-600 text-lg max-w-md">
                  The session transcript does not contain enough witness responses to perform a meaningful analysis.
                  Please conduct a longer interview session with more detailed responses.
                </p>
              </div>
            </div>
          )}

          {/* Analysis Data Grid */}
          {hasValidAnalysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Overall Score */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-brand text-center page-break-inside-avoid flex flex-col justify-center transition-all duration-300 hover:shadow-brand hover:-translate-y-1">
                <h2 className="text-lg font-semibold text-gray-600 mb-6">Overall Performance</h2>
                <div className={`text-7xl font-bold mb-3 ${getScoreColor(report.overallScore)}`}>
                  {report.overallScore}
                </div>
                <div className="text-gray-600 text-lg">out of 100</div>
              </div>

              {/* 1. Accuracy */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-brand transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700 text-lg">Accuracy</h3>
                  <span className="text-3xl">🎯</span>
                </div>
                <div className={`text-5xl font-bold mb-4 ${getScoreColor(report.metrics.accuracy)}`}>
                  {report.metrics.accuracy}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${getScoreBgColor(report.metrics.accuracy)}`}
                    style={{ width: `${report.metrics.accuracy}%` }}
                  ></div>
                </div>
              </div>

              {/* 2. Clarity */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-brand transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700 text-lg">Clarity</h3>
                  <span className="text-3xl">💬</span>
                </div>
                <div className={`text-5xl font-bold mb-4 ${getScoreColor(report.metrics.clarity)}`}>
                  {report.metrics.clarity}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${getScoreBgColor(report.metrics.clarity)}`}
                    style={{ width: `${report.metrics.clarity}%` }}
                  ></div>
                </div>
              </div>

              {/* 3. Completeness */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-brand transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700 text-lg">Completeness</h3>
                  <span className="text-3xl">📋</span>
                </div>
                <div className={`text-5xl font-bold mb-4 ${getScoreColor(report.metrics.pace)}`}>
                  {report.metrics.pace}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${getScoreBgColor(report.metrics.pace)}`}
                    style={{ width: `${report.metrics.pace}%` }}
                  ></div>
                </div>
              </div>

              {/* 4. Consistency */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-brand transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700 text-lg">Consistency</h3>
                  <span className="text-3xl">🔄</span>
                </div>
                <div className={`text-5xl font-bold mb-4 ${getScoreColor(report.metrics.consistency || 0)}`}>
                  {report.metrics.consistency || 0}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${getScoreBgColor(report.metrics.consistency || 0)}`}
                    style={{ width: `${report.metrics.consistency || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Session Summary */}
          {report.summary && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-brand-navy-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">📋</span> Session Summary
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="text-gray-800 leading-relaxed">{report.summary}</p>
              </div>
            </div>
          )}

          {/* Flagged Segments */}
          {report.flaggedSegments && report.flaggedSegments.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-brand-navy-900 mb-6">Flagged Segments</h3>
              <div className="space-y-4">
                {report.flaggedSegments.map((segment, index) => (
                  <div key={index} className="border-2 border-red-500 rounded-xl p-4 bg-red-50">
                    {/* Title with Time on the same line */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-red-700">
                        {segment.time || segment.timestamp || 'N/A'}
                      </span>
                      <div className="font-semibold text-red-700 text-lg">
                        {segment.title || segment.reason}
                      </div>
                    </div>

                    {/* Note/Explanation */}
                    {segment.snippet && (
                      <div className="text-gray-800 leading-relaxed">
                        {segment.snippet}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {report.recommendations && report.recommendations.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-brand-navy-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">💡</span> Recommendations
              </h3>
              <ul className="space-y-4">
                {report.recommendations.map((rec, index) => (
                  <li key={index} className="flex gap-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                    <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-brand-gold-500 text-white font-bold rounded-full text-sm">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed pt-0.5">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>


        {/* Transcript Tab */}
        <div className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm ${activeTab === 'transcript' ? 'block' : 'hidden print:block'}`}>
          {/* Section Header for Print */}
          <div className="hidden print:block mb-6">
            <h2 className="text-2xl font-bold text-brand-navy-900 border-b-2 border-brand-navy-900 pb-3">Transcript</h2>
          </div>
          <h3 className="text-2xl font-bold text-brand-navy-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">💬</span> Full Transcript
          </h3>
          {session.transcript && session.transcript.length > 0 ? (
            <div className="space-y-4">
              {session.transcript.map((entry) => {
                // Handle both old format (user/avatar) and new format (witness/interviewer)
                const isWitness = entry.speaker === 'witness' || entry.speaker === 'user';
                const isInterviewer = entry.speaker === 'interviewer' || entry.speaker === 'avatar';

                return (
                  <div
                    key={entry.id}
                    className={`flex ${isInterviewer ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`p-4 rounded-2xl transition-all duration-200 max-w-[75%] shadow-sm ${isInterviewer
                          ? 'bg-gray-100 text-gray-900' // Interviewer on left - matches live page
                          : 'bg-gray-700 text-white' // Witness on right - matches live page
                        }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">
                          {isInterviewer ? 'Interviewer' : 'You'}
                        </span>
                        <span className={`text-xs ${isInterviewer ? 'text-gray-500' : 'text-gray-300'}`}>
                          {entry.timestamp}
                        </span>
                      </div>
                      <div className="text-sm leading-relaxed">{entry.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-gray-100 rounded-3xl mb-4">
                <span className="text-6xl">📝</span>
              </div>
              <p className="text-gray-600 text-lg">No transcript available</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ReportContent />
    </Suspense>
  );
}
