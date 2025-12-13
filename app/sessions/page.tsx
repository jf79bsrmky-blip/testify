'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/lib/api-client';
import { formatDistanceToNow } from 'date-fns';
import ErrorMessage from '@/components/ErrorMessage';

type TranscriptEntry = {
  id: string;
  timestamp: string;
  speaker: 'user' | 'avatar' | 'witness' | 'interviewer';
  text: string;
};

type Session = {
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
  report?: {
    overallScore: number;
    metrics: {
      accuracy: number;
      clarity: number;
      tone: number;
      pace: number;
    };
  };
};

// Helper function to safely parse and validate dates
function isValidDate(dateString: string | undefined | null): boolean {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

// Helper function to safely format distance to now
function formatDistance(dateString: string | undefined | null): string {
  if (!isValidDate(dateString)) return 'Unknown time';
  try {
    return formatDistanceToNow(new Date(dateString!), { addSuffix: true });
  } catch (error) {
    return 'Unknown time';
  }
}

export default function SessionsPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingState, setLoadingState] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    loadSessions();
  }, [loading, isAuthenticated, router]);

  const loadSessions = async () => {
    try {
      setLoadingState(true);
        // Try API first
        const res = await apiClient.get<any>('/api/sessions');
        if (res?.success && Array.isArray(res.sessions)) {
        // Sort by start time (newest first)
        const sortedSessions = res.sessions.sort((a: Session, b: Session) => {
          const dateA = isValidDate(a.startTime) ? new Date(a.startTime).getTime() : 0;
          const dateB = isValidDate(b.startTime) ? new Date(b.startTime).getTime() : 0;
          return dateB - dateA;
        });
        setSessions(sortedSessions);
          return;
        }
      // Fallback to localStorage
        const found: Session[] = [];
        if (typeof window !== 'undefined') {
          for (const key of Object.keys(localStorage)) {
            if (key.startsWith('session_')) {
              try {
                const s = JSON.parse(localStorage.getItem(key) || 'null');
                if (s?.id) found.push(s);
              } catch {}
            }
          }
        // Sort by start time
        found.sort((a, b) => {
          const dateA = isValidDate(a.startTime) ? new Date(a.startTime).getTime() : 0;
          const dateB = isValidDate(b.startTime) ? new Date(b.startTime).getTime() : 0;
          return dateB - dateA;
        });
        }
        setSessions(found);
      } catch (e) {
      console.error('Failed to load sessions:', e);
        // Last fallback to localStorage
        const found: Session[] = [];
        if (typeof window !== 'undefined') {
          for (const key of Object.keys(localStorage)) {
            if (key.startsWith('session_')) {
              try {
                const s = JSON.parse(localStorage.getItem(key) || 'null');
                if (s?.id) found.push(s);
              } catch {}
            }
          }
        found.sort((a, b) => {
          const dateA = isValidDate(a.startTime) ? new Date(a.startTime).getTime() : 0;
          const dateB = isValidDate(b.startTime) ? new Date(b.startTime).getTime() : 0;
          return dateB - dateA;
        });
        }
        setSessions(found);
      } finally {
      setLoadingState(false);
    }
  };

  // Open custom confirmation modal for delete
  const requestDelete = (sessionId: string) => {
    setConfirmDeleteId(sessionId);
  };

  // Actually delete after user confirms
  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      console.log('🗑️ Deleting session:', confirmDeleteId);
      const response = await apiClient.delete<any>(`/api/sessions/${confirmDeleteId}`);
      
      if (response.success) {
        console.log('✅ Session deleted successfully');
        setSessions((prev) => prev.filter((s) => s.id !== confirmDeleteId));
        setConfirmDeleteId(null);
        setErrorMessage(null);
        
        // Also remove from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem(`session_${confirmDeleteId}`);
        }
      } else {
        throw new Error(response.error || 'Delete failed');
      }
    } catch (error: any) {
      console.error('❌ Failed to delete session:', error);
      const errorMsg = error?.response?.data?.error 
        || error?.response?.data?.message 
        || error?.message 
        || 'Failed to delete session. The session may have already been deleted or does not exist.';
      setErrorMessage(errorMsg);
      setConfirmDeleteId(null);
      
      // If session not found, remove it from the list anyway (it's already gone)
      if (error?.response?.status === 404) {
        console.warn('⚠️ Session not found (404), removing from list anyway');
        setSessions((prev) => prev.filter((s) => s.id !== confirmDeleteId));
        if (typeof window !== 'undefined') {
          localStorage.removeItem(`session_${confirmDeleteId}`);
        }
        // Show a more user-friendly message
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  };

  const handleStartEdit = (session: Session) => {
    setEditingId(session.id);
    setEditName(session.name);
  };

  const handleSaveEdit = async (sessionId: string) => {
    try {
      await apiClient.put(`/api/sessions/${sessionId}`, {
        name: editName,
      });

      setSessions(
        sessions.map((s) =>
          s.id === sessionId ? { ...s, name: editName } : s
        )
      );
      setEditingId(null);
      
      // Also update localStorage
      if (typeof window !== 'undefined') {
        const session = sessions.find(s => s.id === sessionId);
        if (session) {
          const updatedSession = { ...session, name: editName };
          localStorage.setItem(`session_${sessionId}`, JSON.stringify(updatedSession));
        }
      }
    } catch (error) {
      console.error('Failed to update session:', error);
      setErrorMessage('Failed to update session name. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getStatusBadge = (session: Session) => {
    if (session.endTime) {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
          Completed
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
        In Progress
      </span>
    );
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Centered error overlay */}
      {errorMessage && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="max-w-md w-full px-4">
            <ErrorMessage
              title="Something went wrong"
              message={errorMessage}
              onDismiss={() => setErrorMessage(null)}
            />
          </div>
        </div>
      )}

      {/* Centered delete confirmation dialog */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete this session?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              This will permanently remove the session and its transcript from this app. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2.5 min-h-[44px] rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 active:scale-95 text-sm font-medium touch-manipulation transition-all duration-200"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2.5 min-h-[44px] rounded-full bg-red-600 text-white hover:bg-red-700 active:bg-red-800 active:scale-95 text-sm font-semibold shadow-sm touch-manipulation transition-all duration-200"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-brand-navy-900 tracking-tight">My Sessions</h1>
            <button
              onClick={() => router.push('/lobby')}
            className="px-4 py-2.5 min-h-[44px] text-sm font-semibold text-brand-navy-900 hover:text-brand-gold-500 active:opacity-70 transition-all duration-200 rounded-xl hover:bg-gray-100 active:bg-gray-200 touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            >
            ← Back to Lobby
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loadingState ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-navy-900 border-t-transparent mx-auto"></div>
            <p className="mt-6 text-gray-600 font-medium">Loading sessions...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-16 animate-slide-up">
            <div className="inline-block p-6 bg-gray-100 rounded-3xl mb-6">
              <div className="text-7xl">📝</div>
            </div>
            <h2 className="text-3xl font-bold text-brand-navy-900 mb-3">
              No Sessions Yet
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Start your first interview training session
            </p>
            <button
              onClick={() => router.push('/session-config')}
              className="px-8 py-4 bg-brand-navy-900 text-white rounded-xl font-semibold hover:bg-brand-navy-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create New Session
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {sessions.map((session) => (
              <div key={session.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {editingId === session.id ? (
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(session.id)}
                          className="px-5 py-2.5 min-h-[44px] bg-brand-navy-900 text-white rounded-xl hover:bg-brand-gold-500 active:bg-brand-gold-600 active:scale-95 transition-all duration-200 text-sm font-semibold shadow-sm touch-manipulation"
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-5 py-2.5 min-h-[44px] bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 active:bg-gray-400 active:scale-95 transition-all duration-200 text-sm font-medium touch-manipulation"
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <h3 className="text-xl font-bold text-brand-navy-900 truncate">
                          {session.name}
                        </h3>
                        {getStatusBadge(session)}
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700 mb-1">Started</span>
                        <span className="text-gray-600">
                          {formatDistance(session.startTime)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700 mb-1">Duration</span>
                        <span className="text-gray-600">{formatDuration(session.duration)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700 mb-1">Avatar</span>
                        <span className="text-gray-600">{session.avatarId.split('_')[0]}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700 mb-1">Difficulty</span>
                        <span className="text-gray-600 capitalize">
                          {session.quality === 'low' ? 'Easy' : 
                           session.quality === 'medium' ? 'Medium' : 
                           session.quality === 'high' ? 'Hard' : 
                           session.quality}
                      </span>
                      </div>
                    </div>

                    {session.transcript && session.transcript.length > 0 && (
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-700">Messages:</span>{' '}
                        <span className="text-brand-navy-700">{session.transcript.length}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    {session.endTime && session.report && (
                      <button
                        onClick={() => router.push(`/report?sessionId=${session.id}`)}
                        className="px-5 py-2.5 min-h-[44px] bg-brand-navy-900 text-white rounded-xl hover:bg-brand-gold-500 active:bg-brand-gold-600 active:scale-95 transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-md whitespace-nowrap touch-manipulation"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        📊 View Report
                      </button>
                    )}
                    {editingId !== session.id && (
                      <>
                    <button
                          onClick={() => handleStartEdit(session)}
                          className="px-5 py-2.5 min-h-[44px] bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:bg-gray-300 active:scale-95 transition-all duration-200 text-sm font-medium whitespace-nowrap touch-manipulation"
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                          ✏️ Edit
                    </button>
                    <button
                          onClick={() => requestDelete(session.id)}
                          className="px-5 py-2.5 min-h-[44px] bg-red-50 text-red-700 rounded-xl hover:bg-red-100 active:bg-red-200 active:scale-95 transition-all duration-200 text-sm font-medium whitespace-nowrap touch-manipulation"
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                          🗑️ Delete
                    </button>
                      </>
                    )}
                  </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
