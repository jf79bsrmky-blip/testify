'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AVAILABLE_AVATARS } from '@/types';
import { apiClient } from '@/lib/api-client';

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

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');
  const [defaultDifficulty, setDefaultDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [defaultAvatar, setDefaultAvatar] = useState(AVAILABLE_AVATARS[0].id);
  const [defaultLanguage, setDefaultLanguage] = useState('en-US');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setUniqueCode(user.uniqueCode || '');
    }

    // Load settings from backend
    loadSettings();
  }, [isAuthenticated, user, router]);

  const loadSettings = async () => {
    try {
      const response = await apiClient.get<any>('/api/settings');
      if (response.success && response.settings) {
        const settings = response.settings;
        if (settings.defaultDifficulty) setDefaultDifficulty(settings.defaultDifficulty);
        if (settings.defaultAvatar) setDefaultAvatar(settings.defaultAvatar);
        if (settings.defaultLanguage) setDefaultLanguage(settings.defaultLanguage);
        if (settings.notifications !== undefined) setNotifications(settings.notifications);
        if (settings.autoSave !== undefined) setAutoSave(settings.autoSave);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      // Use defaults if loading fails
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await apiClient.put<any>('/api/settings', {
        name,
        email,
        defaultDifficulty,
        defaultAvatar,
        defaultLanguage,
        notifications,
        autoSave,
      });

      if (response?.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error: any) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-brand-navy-900 tracking-tight flex items-center gap-3">
            <span className="text-3xl">⚙️</span>
            Preferences
          </h1>
          <button
            onClick={() => router.push('/lobby')}
            className="px-4 py-2 text-sm font-semibold text-brand-navy-900 hover:text-brand-gold-500 transition-colors rounded-xl hover:bg-gray-100"
          >
            ← Back to Lobby
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-brand-navy-900 mb-6 flex items-center gap-3">
              <span className="text-3xl">👤</span>
              Profile Information
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Unique Code
                </label>
                <input
                  type="text"
                  value={uniqueCode}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed font-mono"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Your unique code cannot be changed
                </p>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-brand-navy-900 mb-6 flex items-center gap-3">
              <span className="text-3xl">⚙️</span>
              Preferences
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Default Avatar
                </label>
                <select
                  value={defaultAvatar}
                  onChange={(e) => setDefaultAvatar(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent transition-all duration-200"
                >
                  {AVAILABLE_AVATARS.map((avatar) => (
                    <option key={avatar.id} value={avatar.id}>
                      {avatar.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Default Difficulty
                </label>
                <div className="flex gap-4">
                  {(['easy', 'medium', 'hard'] as const).map((d) => (
                    <label key={d} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        value={d}
                        checked={defaultDifficulty === d}
                        onChange={(e) => setDefaultDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                        className="w-4 h-4 text-brand-navy-900 border-gray-300 focus:ring-brand-navy-900 focus:ring-2"
                      />
                      <span className="ml-2 capitalize text-gray-700 group-hover:text-brand-navy-900 transition-colors font-medium">
                        {d}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Default difficulty level for new interview sessions
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Default Language
                </label>
                <select
                  value={defaultLanguage}
                  onChange={(e) => setDefaultLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent transition-all duration-200"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-600 mt-2">
                  Default language for avatar speech and understanding
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border-t border-gray-200 mt-4">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Enable Notifications</div>
                  <div className="text-sm text-gray-600">
                    Receive notifications about session updates
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-navy-900/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-navy-900 shadow-sm"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Auto-save Transcripts</div>
                  <div className="text-sm text-gray-600">
                    Automatically save session transcripts
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-navy-900/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-navy-900 shadow-sm"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 px-6 py-4 min-h-[52px] bg-brand-navy-900 text-white rounded-xl font-semibold hover:bg-brand-navy-800 active:bg-brand-navy-700 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {loading ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
            <button
              onClick={handleLogout}
              className="px-8 py-4 min-h-[52px] bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 active:bg-red-800 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              Logout
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl border-2 border-red-300 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              Danger Zone
            </h2>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button 
              className="px-6 py-3 min-h-[44px] bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 active:bg-red-800 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

