'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/lib/api-client';
import { AVAILABLE_AVATARS } from '@/types';

const LANGUAGES = [
  { name: 'Bulgarian', code: 'bg-BG' },
  { name: 'Chinese', code: 'zh-CN' },
  { name: 'Czech', code: 'cs-CZ' },
  { name: 'Danish', code: 'da-DK' },
  { name: 'Dutch', code: 'nl-NL' },
  { name: 'English', code: 'en-US' },
  { name: 'Finnish', code: 'fi-FI' },
  { name: 'French', code: 'fr-FR' },
  { name: 'German', code: 'de-DE' },
  { name: 'Greek', code: 'el-GR' },
  { name: 'Hindi', code: 'hi-IN' },
  { name: 'Hungarian', code: 'hu-HU' },
  { name: 'Indonesian', code: 'id-ID' },
  { name: 'Italian', code: 'it-IT' },
  { name: 'Japanese', code: 'ja-JP' },
  { name: 'Korean', code: 'ko-KR' },
  { name: 'Malay', code: 'ms-MY' },
  { name: 'Norwegian', code: 'no-NO' },
  { name: 'Polish', code: 'pl-PL' },
  { name: 'Portuguese', code: 'pt-PT' },
  { name: 'Romanian', code: 'ro-RO' },
  { name: 'Russian', code: 'ru-RU' },
  { name: 'Slovak', code: 'sk-SK' },
  { name: 'Spanish', code: 'es-ES' },
  { name: 'Swedish', code: 'sv-SE' },
  { name: 'Turkish', code: 'tr-TR' },
  { name: 'Ukrainian', code: 'uk-UA' },
  { name: 'Vietnamese', code: 'vi-VN' },
];

export default function SessionConfigPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [avatarId, setAvatarId] = useState(AVAILABLE_AVATARS[0].id);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [language, setLanguage] = useState('en-US');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');

  useEffect(() => {
    // Wait for auth to finish loading before checking authentication
    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
      if (!['txt', 'pdf', 'docx'].includes(fileType || '')) {
        setError('Only TXT, PDF, and DOCX files are supported');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let kbId: string | undefined = undefined;

      // Upload knowledge base if file is selected
      if (file) {
        setUploadProgress('Uploading knowledge base...');
        console.log('📤 Uploading knowledge base file:', file.name);
        const uploadResult = await apiClient.uploadFile<any>(
          '/api/knowledge-base/upload',
          file
        );

        if (uploadResult.success && (uploadResult.knowledgeBaseId || uploadResult.knowledgeBase?.id)) {
          // Backend returns knowledgeBaseId (UUID format), but also check knowledgeBase.id for compatibility
          kbId = uploadResult.knowledgeBaseId || uploadResult.knowledgeBase?.id;
          console.log('✅ Knowledge base uploaded, ID:', kbId);
          if (kbId) {
            console.log('   - Uploaded KB ID format:', kbId.startsWith('kb_') ? 'HeyGen format (unexpected - should be UUID)' : 'UUID format (correct)');
          }
          console.log('   - This uploaded KB will be converted to HeyGen KB when session starts');
        } else {
          console.error('❌ Upload failed or missing knowledgeBaseId:', uploadResult);
          throw new Error('Failed to upload knowledge base or missing ID');
        }
      } else {
        // No file uploaded - use default knowledge base
        setUploadProgress('Using default knowledge base...');
        console.log('📚 No file uploaded, using default knowledge base');
        // Use the default KB ID directly (matches backend DEFAULT_KB_ID)
        kbId = '00000000-0000-0000-0000-000000000001';
        console.log('✅ Using default knowledge base, ID:', kbId);
        console.log('   - Default KB: Legal Interview Protocol');
        console.log('   - This KB will be converted to HeyGen KB when session starts');
        console.log('   - KB ID will be stored in session as knowledgeBaseId');
      }
      
      // Verify kbId is set before creating session
      if (!kbId) {
        console.error('❌ CRITICAL: kbId is undefined! This should not happen.');
        throw new Error('Knowledge base ID is missing');
      }
      console.log('🔍 Pre-session creation check - kbId:', kbId);

      // Map difficulty to quality for backend compatibility
      // easy -> low, medium -> medium, hard -> high
      const qualityMap: Record<'easy' | 'medium' | 'hard', 'low' | 'medium' | 'high'> = {
        easy: 'low',
        medium: 'medium',
        hard: 'high',
      };
      const quality = qualityMap[difficulty];

      // Create session
      setUploadProgress('Creating session...');
      console.log('📝 Creating session with data:', {
        userId: user?.id,
        avatarId,
        difficulty,
        quality, // Mapped quality for backend
        language,
        // Only include knowledgeBaseId if we actually have one
        ...(kbId ? { knowledgeBaseId: kbId } : {}),
      });

      const sessionPayload: any = {
        userId: user?.id,
        avatarId,
        quality, // Backend expects 'low' | 'medium' | 'high'
        language,
      };
      if (kbId) {
        sessionPayload.knowledgeBaseId = kbId;
        console.log('📚 Session will be created with knowledgeBaseId:', kbId);
      } else {
        console.warn('⚠️ No knowledge base ID - session will be created without KB');
      }

      const sessionResult = await apiClient.post<any>('/api/sessions', sessionPayload);

      console.log('✅ Session created:', sessionResult);

      if (sessionResult.success) {
        // Store session in localStorage as backup
        localStorage.setItem(`session_${sessionResult.session.id}`, JSON.stringify(sessionResult.session));
        console.log('💾 Session stored in localStorage');

        // Navigate to live session
        router.push(`/live?sessionId=${sessionResult.session.id}`);
      } else {
        throw new Error('Failed to create session');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to start session');
    } finally {
      setLoading(false);
      setUploadProgress('');
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-brand-navy-900 tracking-tight">Configure Session</h1>
          <button
            onClick={() => router.push('/lobby')}
            className="px-4 py-2 text-sm font-semibold text-brand-navy-900 hover:text-brand-gold-500 transition-colors rounded-xl hover:bg-gray-100"
          >
            ← Back to Lobby
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleStartSession} className="space-y-6">
          {/* Knowledge Base Upload - First Option */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <label htmlFor="file" className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Case Materials <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Upload TXT, PDF, or DOCX files (less than 300 pages)
            </p>
            <input
              id="file"
              type="file"
              accept=".txt,.pdf,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-navy-900 file:text-white hover:file:bg-brand-gold-500 file:transition-all file:duration-200 file:shadow-sm hover:file:shadow-md cursor-pointer"
            />
            {file ? (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-700 font-medium">
                  ✓ Selected: {file.name}
                </p>
              </div>
            ) : (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-700 font-medium">
                  ℹ️ No file selected — Default Legal Interview Protocol will be used
                </p>
              </div>
            )}
          </div>

          {/* Avatar Selection */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <label htmlFor="avatar" className="block text-sm font-semibold text-gray-700 mb-3">
              Select Avatar
            </label>
            <select
              id="avatar"
              value={avatarId}
              onChange={(e) => setAvatarId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent transition-all duration-200"
            >
              {AVAILABLE_AVATARS.map((avatar) => (
                <option key={avatar.id} value={avatar.id}>
                  {avatar.name}
                </option>
              ))}
            </select>
          </div>

          {/* Session Difficulty Selection */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Session Difficulty
            </label>
            <div className="flex gap-4">
              {(['easy', 'medium', 'hard'] as const).map((d) => (
                <label key={d} className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="difficulty"
                    value={d}
                    checked={difficulty === d}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-4 h-4 text-brand-navy-900 border-gray-300 focus:ring-brand-navy-900 focus:ring-2"
                  />
                  <span className="ml-2 capitalize text-gray-700 group-hover:text-brand-navy-900 transition-colors font-medium">
                    {d}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Select the difficulty level for this interview session
            </p>
          </div>

          {/* Language Selection */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-3">
              Select Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent transition-all duration-200"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600 mt-2">
              Avatar will speak and understand in the selected language
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium animate-slide-down">
              {error}
            </div>
          )}

          {uploadProgress && (
            <div className="bg-blue-50 border-2 border-blue-200 text-blue-700 px-5 py-4 rounded-xl text-sm font-medium animate-slide-down">
              {uploadProgress}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 min-h-[52px] bg-brand-navy-900 text-white rounded-xl font-semibold hover:bg-brand-navy-800 active:bg-brand-navy-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {loading ? 'Starting Session...' : 'Start Interview Session'}
          </button>
        </form>
      </main>
    </div>
  );
}
