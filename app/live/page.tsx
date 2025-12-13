'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  Suspense,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AvatarQuality,
  ElevenLabsModel,
  STTProvider,
  StartAvatarRequest,
  VoiceChatTransport,
  VoiceEmotion,
} from '@heygen/streaming-avatar';

import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/lib/api-client';
import { Session, TranscriptEntry } from '@/types';
import {
  MessageSender,
  StreamingAvatarProvider,
  StreamingAvatarSessionState,
  setKnowledgeBaseId,
} from '@/components/heygen/StreamingAvatarProvider';
import { useStreamingAvatarSession } from '@/components/heygen/hooks/useStreamingAvatarSession';
import { useVoiceChat } from '@/components/heygen/hooks/useVoiceChat';
import { useMessageHistory } from '@/components/heygen/hooks/useMessageHistory';
import { AvatarVideo } from '@/components/heygen/AvatarVideo';
import { MessageHistory } from '@/components/heygen/MessageHistory';
import { MicrophoneButtonControl } from '@/components/heygen/MicrophoneButtonControl';
import ErrorMessage from '@/components/ErrorMessage';
import { ChatInput } from '@/components/heygen/ChatInput';

const HEYGEN_BASE_PATH =
  process.env.NEXT_PUBLIC_HEYGEN_BASE_API_URL ||
  process.env.NEXT_PUBLIC_BASE_API_URL ||
  'https://api.heygen.com';

const mapQuality = (value?: string): AvatarQuality => {
  switch ((value || '').toLowerCase()) {
    case 'high':
      return AvatarQuality.High;
    case 'medium':
      return AvatarQuality.Medium;
    default:
      return AvatarQuality.Low;
  }
};

function LiveSessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
   const sessionId = searchParams?.get('sessionId') || null;
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const {
    avatarRef,
    startAvatar,
    stopAvatar,
    sessionState,
    stream,
  } = useStreamingAvatarSession();
  const { startVoiceChat, stopVoiceChat, isVoiceChatActive } = useVoiceChat();
  const { messages } = useMessageHistory();

  const [session, setSession] = useState<Session | null>(null);
  const [sessionConfig, setSessionConfig] = useState<StartAvatarRequest | null>(
    null,
  );
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [sessionTime, setSessionTime] = useState(0);
  const [isStartingAvatar, setIsStartingAvatar] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showTranscription, setShowTranscription] = useState(false); // Default to closed
  const [micError, setMicError] = useState<string | null>(null);
  const [fatalError, setFatalError] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [messageTimes, setMessageTimes] = useState<Record<string, number>>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const voiceChatStartedRef = useRef(false);
  const isEndingSessionRef = useRef(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const isAvatarReady =
    sessionState === StreamingAvatarSessionState.CONNECTED;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setSessionTime((prev) => prev + 1),
      1000,
    );
  }, []);

  const loadSession = useCallback(async () => {
    if (!sessionId) return;
    try {
      let sessionData: Session | null = null;
      try {
        const response = await apiClient.get<any>(`/api/sessions/${sessionId}`);
        if (response.success) {
          sessionData = response.session;
          // Save to localStorage as backup
          if (typeof window !== 'undefined' && sessionData) {
            localStorage.setItem(`session_${sessionId}`, JSON.stringify(sessionData));
            console.log('💾 Session loaded from API and saved to localStorage');
          }
        }
      } catch (apiError: any) {
        console.warn('⚠️ Failed to load from API, trying localStorage...', apiError?.response?.status);
        const storedSession = localStorage.getItem(`session_${sessionId}`);
        if (storedSession) {
          sessionData = JSON.parse(storedSession);
          console.log('✅ Session loaded from localStorage');
        } else {
          throw apiError;
        }
      }

      if (!sessionData) {
        throw new Error('Session not found');
      }

      setSession(sessionData);
      // Get the selected language (full locale format like 'es-ES')
      const selectedLanguage = sessionData.language || 'en-US';
      // Extract language code (e.g., 'es' from 'es-ES') for STT
      const languageCode = selectedLanguage.split('-')[0];
      console.log('🌍 Selected language:', selectedLanguage);
      console.log('📝 Using language code for STT:', languageCode);

      // Convert uploaded KB to HeyGen KB if needed (before creating config)
      // If no KB in session, use default KB
      let finalKnowledgeId = sessionData.knowledgeBaseId || undefined;
      if (!finalKnowledgeId) {
        // No KB in session - use default KB
        console.log('📚 No knowledgeBaseId in session, using default KB');
        finalKnowledgeId = '00000000-0000-0000-0000-000000000001';
        console.log('   - Default KB ID:', finalKnowledgeId);
        console.log('   - Default KB: Legal Interview Protocol');
      } else {
        console.log('📚 Session knowledgeBaseId:', finalKnowledgeId);
      }
      
      if (finalKnowledgeId) {
        try {
          console.log('🔄 Converting knowledge base to HeyGen KB:', finalKnowledgeId);
          console.log('   - KB ID format:', finalKnowledgeId.startsWith('kb_') ? 'HeyGen format' : 'UUID format (likely uploaded/default)');
          const selectedLanguage = sessionData.language || 'en-US';
          console.log('   - Language for KB:', selectedLanguage);
          const convertResponse = await apiClient.post<any>('/api/heygen/convert-kb', {
            knowledgeId: finalKnowledgeId,
            language: selectedLanguage, // Pass language to include in KB instructions
            sessionId: sessionId, // Pass sessionId to get difficulty for prompt combination
          });
          
          console.log('📋 Convert KB response:', convertResponse);
          if (convertResponse.success && convertResponse.knowledgeId) {
            finalKnowledgeId = convertResponse.knowledgeId;
            console.log('✅ Converted to HeyGen KB ID:', finalKnowledgeId);
            console.log('   - Is HeyGen KB:', convertResponse.isHeyGenKB || false);
            console.log('   - Cached:', convertResponse.cached || false);
          } else {
            console.warn('⚠️ KB conversion failed or returned no knowledgeId');
            console.warn('   - Response:', convertResponse);
            
            // Show warning if API key is required
            if (convertResponse.requiresApiKey) {
              const errorMsg = convertResponse.message || 'HeyGen API key is required to use knowledge bases';
              console.warn('⚠️', errorMsg);
              setLoadError(`Warning: ${errorMsg}. The session will continue without the knowledge base.`);
            }
          }
        } catch (convertError: any) {
          console.error('❌ Error converting KB:', convertError);
          console.error('   - Error message:', convertError.message);
          
          // Extract error details from response
          const errorData = convertError.response?.data;
          const errorMessage = errorData?.message || convertError.message || 'Failed to convert knowledge base';
          const requiresApiKey = errorData?.requiresApiKey || false;
          
          if (requiresApiKey) {
            // Show a clear warning about missing API key
            const warningMsg = `HeyGen API key not configured. ${errorMessage}. The session will continue, but the knowledge base may not work properly.`;
            console.warn('⚠️', warningMsg);
            setLoadError(warningMsg);
          } else {
            // For other errors, just log them but continue
            console.warn('⚠️ KB conversion failed, continuing with original KB ID');
          }
          // Continue with original ID
        }
      } else {
        console.log('⚠️ No knowledgeBaseId in session - avatar will start without KB');
      }

      // Build config - use language code (e.g., 'es' not 'es-ES') for HeyGen API
      // The SDK passes language to the API, but it may need the language code format
      const config: StartAvatarRequest = {
        quality: mapQuality(sessionData.quality),
        avatarName: sessionData.avatarId,
        knowledgeId: finalKnowledgeId, // Use converted HeyGen KB ID
        language: languageCode, // Use language code (e.g., 'es', 'it', 'fr') instead of full locale
        voiceChatTransport: VoiceChatTransport.WEBSOCKET,
        voice: {
          rate: 1.15,
          emotion: VoiceEmotion.EXCITED,
          model: ElevenLabsModel.eleven_flash_v2_5,
        },
        sttSettings: {
          provider: STTProvider.DEEPGRAM,
        },
      };
      
      console.log('📋 Session language (full locale):', selectedLanguage);
      console.log('📋 STT language code:', languageCode);
      
      console.log('📋 Session config created:', {
        avatarName: config.avatarName,
        quality: config.quality,
        hasKnowledgeId: !!config.knowledgeId,
      });
      
      // Set knowledge base ID for YTL LLM (uploaded KBs, not HeyGen KBs)
      // Note: We still pass knowledgeId to HeyGen for compatibility, but YTL LLM will use uploaded KBs
      if (sessionData.knowledgeBaseId) {
        setKnowledgeBaseId(sessionData.knowledgeBaseId);
        console.log('📚 Knowledge base ID set for YTL LLM:', sessionData.knowledgeBaseId);
      } else {
        setKnowledgeBaseId(undefined);
      }

      setSessionConfig(config);
      setLoadError(null);
    } catch (error: any) {
      console.error('Failed to load session', error);
      const message = error.message ?? 'Failed to load session.';
      setLoadError(message);
      setFatalError(`Failed to load session: ${message}`);
    }
  }, [router, sessionId]);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (!sessionId) {
      router.push('/lobby');
      return;
    }
    loadSession();
    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAuthenticated, authLoading, loadSession, router, sessionId, startTimer]);

  useEffect(() => {
    console.log('🔍 useEffect triggered:', {
      hasSessionConfig: !!sessionConfig,
      isStartingAvatar,
      sessionState,
      expectedState: StreamingAvatarSessionState.INACTIVE,
    });
    
    if (!sessionConfig) {
      console.log('⏸️ Waiting for session config...');
      return;
    }
    if (isStartingAvatar) {
      console.log('⏸️ Avatar is already starting...');
      return;
    }
    if (sessionState !== StreamingAvatarSessionState.INACTIVE) {
      console.log('⏸️ Session state is not INACTIVE, current state:', sessionState);
      return;
    }

    // Use a ref to track cancellation so it persists across renders
    const cancelledRef = { current: false };
    let connectionTimeout: NodeJS.Timeout | null = null;

    const startSession = async () => {
      // Don't start if we're ending the session
      if (isEndingSessionRef.current) {
        console.log('⏹️ Session is ending, skipping start');
        return;
      }
      
      try {
        console.log('🎬 startSession function called');
        setIsStartingAvatar(true);
        console.log('🎭 Starting HeyGen session...');
        console.log('📋 Config:', JSON.stringify(sessionConfig, null, 2));
        console.log('🌐 Base path:', HEYGEN_BASE_PATH || 'not set');
        console.log('📊 Session state at start:', sessionState);

        // Set a timeout to detect if connection hangs
        connectionTimeout = setTimeout(() => {
          if (!cancelledRef.current) {
            console.error('⏱️ Connection timeout - avatar took too long to connect');
            setLoadError('Connection timeout. Please check your network and try again.');
            setIsStartingAvatar(false);
          }
        }, 30000); // 30 second timeout

        // Fetch token
        console.log('🔑 Fetching HeyGen token...');
        const response = await fetch('/api/heygen/token', { method: 'POST' });
        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          console.error('❌ Token fetch failed:', response.status, errorText);
          setLoadError(`Failed to fetch HeyGen token (${response.status}). Please check your API configuration.`);
          setIsStartingAvatar(false);
          if (connectionTimeout) clearTimeout(connectionTimeout);
          return;
        }
        
        // Check content type to determine if it's JSON or text
        const contentType = response.headers.get('content-type');
        let token: string;
        
        try {
          if (contentType?.includes('application/json')) {
            const data = await response.json();
            token = data?.token || data;
            console.log('✅ Token received (JSON):', token ? token.substring(0, 20) + '...' : 'empty');
        } else {
            token = await response.text();
            console.log('✅ Token received (text):', token ? token.substring(0, 20) + '...' : 'empty');
          }
          
          if (!token || token.trim() === '') {
            throw new Error('Received empty token from API');
          }
        } catch (tokenError) {
          console.error('❌ Error parsing token:', tokenError);
          setLoadError('Failed to parse token from server response.');
          setIsStartingAvatar(false);
          if (connectionTimeout) clearTimeout(connectionTimeout);
          return;
        }
        
        console.log('✅ Token validated, length:', token.length);
        console.log('🔍 Checking cancelled flag:', cancelledRef.current);

        if (cancelledRef.current) {
          console.log('⏹️ Session cancelled, aborting...');
          return;
        }

        console.log('✅ Not cancelled, proceeding to start avatar...');
        
        // Start avatar (it will initialize if needed)
        console.log('🚀 Starting avatar with config...');
        console.log('📋 Full config object:', JSON.stringify(sessionConfig, null, 2));
        console.log('📊 Current session state before startAvatar:', sessionState);
        
        try {
        await startAvatar(sessionConfig, token);
          console.log('✅ Avatar started, waiting for stream...');
        } catch (avatarError) {
          console.error('❌ Error in startAvatar call:', avatarError);
          console.error('❌ Error stack:', avatarError instanceof Error ? avatarError.stack : 'No stack');
          throw avatarError; // Re-throw to be caught by outer try-catch
        }

        // Wait for the stream to be ready
        // The STREAM_READY event will fire and update the state to CONNECTED
        console.log('⏳ Waiting for stream to be ready...');
        
        // We'll start voice chat when the avatar becomes ready (CONNECTED state)
        // This is handled in a separate useEffect that watches for isAvatarReady
      } catch (error) {
        console.error('❌ Failed to start HeyGen session:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to start avatar';
        setLoadError(errorMessage);
        setIsStartingAvatar(false);
        console.error('Error details:', {
          message: errorMessage,
          config: sessionConfig,
          basePath: HEYGEN_BASE_PATH,
          sessionState,
          error: error instanceof Error ? error.stack : String(error),
        });
        if (connectionTimeout) clearTimeout(connectionTimeout);
      }
    };

    startSession();

    return () => {
      console.log('🧹 useEffect cleanup: setting cancelled flag');
      cancelledRef.current = true;
      if (connectionTimeout) {
        clearTimeout(connectionTimeout);
        connectionTimeout = null;
      }
      // Reset ending flag on cleanup (in case component unmounts)
      isEndingSessionRef.current = false;
    };
  }, [
    sessionConfig,
    sessionState,
    startAvatar,
    // Note: isStartingAvatar is checked inside the effect, not in dependencies
    // to prevent re-running when we set it to true
  ]);

  useEffect(() => {
    if (!stream || !videoRef.current) return;
    console.log('📹 Setting video stream...');
    videoRef.current.srcObject = stream;
    videoRef.current.onloadedmetadata = () => {
      console.log('✅ Video metadata loaded, playing...');
      videoRef.current?.play().catch((error) => {
        console.error('❌ Failed to play video:', error);
      });
    };
  }, [stream]);

  // Clear loading state when avatar is ready
  useEffect(() => {
    if (isAvatarReady && isStartingAvatar) {
      console.log('✅ Avatar is ready, clearing loading state');
      setIsStartingAvatar(false);
    }
  }, [isAvatarReady, isStartingAvatar]);

  // Start voice chat automatically when avatar is ready (always unmuted by default)
  // On mobile, microphone requires user interaction, so we don't auto-start
  // Add a small delay to ensure the stream is fully ready
  useEffect(() => {
    // Check if we're on mobile
    const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // On mobile, don't auto-start microphone (requires user interaction)
    // User will need to click the microphone button to start
    if (isMobile) {
      console.log('📱 Mobile device detected - microphone will start on user click (requires user interaction)');
      return;
    }
    
    if (isAvatarReady && !isVoiceChatActive && !voiceChatStartedRef.current && avatarRef.current && stream) {
      // Set flag immediately to prevent double start
      voiceChatStartedRef.current = true;

      // Wait a bit for the stream to be fully established
      const startVoiceChatWithDelay = setTimeout(() => {
        console.log('🎤 Avatar is ready, starting voice chat automatically (unmuted)...');
        console.log('📊 Stream status:', {
          hasStream: !!stream,
          streamId: stream?.id,
          tracks: stream?.getTracks().length,
        });
        
        // Start voice chat with microphone unmuted (open) by default
        startVoiceChat(false)
          .then(() => {
            console.log('✅ Voice chat started successfully - microphone is OPEN (unmuted)');
            setMicError(null); // Clear any previous errors
          })
          .catch((error) => {
            console.error('⚠️ Failed to start voice chat:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error('Error message:', errorMessage);
            setMicError(errorMessage);
            voiceChatStartedRef.current = false; // Reset on error so we can retry
          });
      }, 1000); // Wait 1 second after stream is ready
      
      return () => {
        clearTimeout(startVoiceChatWithDelay);
      };
    }
  }, [isAvatarReady, isVoiceChatActive, startVoiceChat, stream, avatarRef]);

  // Format session time to MM:SS or HH:MM:SS for transcript timestamps
  const formatSessionTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    setTranscript((prev) => {
      const previousMap = new Map(prev.map((entry) => [entry.id, entry]));
      return messages.map((message) => {
        // Map AVATAR to 'interviewer' and CLIENT (user) to 'witness'
        // The avatar asks questions (interviewer), the client responds (witness)
        const speaker =
          message.sender === MessageSender.CLIENT ? 'witness' : 'interviewer';
        const existing = previousMap.get(message.id);
        
        // Use relative session time from messageTimes if available, otherwise use current sessionTime
        const messageSessionTime = messageTimes[message.id] ?? sessionTime;
        const relativeTimestamp = formatSessionTime(messageSessionTime);
        
        if (
          existing &&
          existing.text === message.content &&
          existing.speaker === speaker &&
          existing.timestamp === relativeTimestamp
        ) {
          return existing;
        }
        return {
          id: message.id,
          timestamp: relativeTimestamp, // Use relative session time (MM:SS or HH:MM:SS)
          speaker,
          text: message.content,
        };
      });
    });
  }, [messages, messageTimes, sessionTime, formatSessionTime]);

  // Track the session time when each message was first received,
  // so timestamps under messages reflect the session time at send.
  useEffect(() => {
    if (!messages.length) return;

    setMessageTimes((prev) => {
      let changed = false;
      const next: Record<string, number> = { ...prev };

      for (const msg of messages) {
        if (next[msg.id] === undefined) {
          next[msg.id] = sessionTime;
          changed = true;
        }
      }

      return changed ? next : prev;
    });
  }, [messages, sessionTime]);

  // Auto-scroll messages container to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current && showTranscription) {
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [messages, showTranscription]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopVoiceChat();
      stopAvatar();
    };
  }, [stopAvatar, stopVoiceChat]);

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${mins}:${secs}`;
  }, []);

  const handleEndSession = useCallback(async () => {
    // Set flag to prevent session from restarting
    isEndingSessionRef.current = true;

    if (timerRef.current) clearInterval(timerRef.current);
    stopVoiceChat();
    
    // Stop avatar (don't await - let it clean up in background)
    stopAvatar().catch((error) => {
      console.warn('Error stopping avatar:', error);
    });
    
    // Build fresh transcript from current messages to ensure we have the latest data
    console.log('🔍 Building transcript for saving:', {
      messagesCount: messages.length,
      transcriptStateLength: transcript.length,
      messageTimesCount: Object.keys(messageTimes).length,
      sessionTime,
    });
    
    const freshTranscript: TranscriptEntry[] = messages
      .map((message) => {
        const speaker: 'interviewer' | 'witness' = message.sender === MessageSender.CLIENT ? 'witness' : 'interviewer';
        const messageSessionTime = messageTimes[message.id] ?? sessionTime;
        const relativeTimestamp = formatSessionTime(messageSessionTime);
        
        return {
          id: message.id,
          timestamp: relativeTimestamp,
          speaker,
          text: message.content || '',
        };
      })
      .filter(entry => entry.text && entry.text.trim().length > 0); // Filter out empty messages
    
    console.log('📝 Fresh transcript built:', {
      length: freshTranscript.length,
      sampleEntries: freshTranscript.slice(0, 3),
      witnessCount: freshTranscript.filter(t => t.speaker === 'witness').length,
      interviewerCount: freshTranscript.filter(t => t.speaker === 'interviewer').length,
    });
    
    // Use fresh transcript if available, otherwise fall back to state
    const finalTranscript = freshTranscript.length > 0 ? freshTranscript : (transcript.length > 0 ? transcript : []);
    
    console.log('✅ Final transcript to save:', {
      length: finalTranscript.length,
      source: freshTranscript.length > 0 ? 'fresh' : (transcript.length > 0 ? 'state' : 'empty'),
    });
    
    // Validate transcript before saving
    if (!finalTranscript || finalTranscript.length === 0) {
      console.error('❌ Cannot save session: transcript is empty');
      console.error('   Messages count:', messages.length);
      console.error('   Messages:', messages.map(m => ({ sender: m.sender, content: m.content?.substring(0, 50) })));
      console.error('   Transcript state length:', transcript.length);
      console.error('   Fresh transcript length:', freshTranscript.length);
      // Still navigate to report page, but show error there
      router.push(`/report?sessionId=${sessionId}`);
      return;
    }
    
    // Validate transcript format
    const invalidEntries = finalTranscript.filter(t => !t.speaker || !t.text || !t.timestamp);
    if (invalidEntries.length > 0) {
      console.warn('⚠️ Some transcript entries are missing required fields:', invalidEntries);
      console.warn('   Total invalid entries:', invalidEntries.length, 'out of', finalTranscript.length);
    }
    
    // Log transcript details for debugging
    console.log('📋 Transcript details:', {
      totalEntries: finalTranscript.length,
      witnessEntries: finalTranscript.filter(t => t.speaker?.toLowerCase() === 'witness').length,
      interviewerEntries: finalTranscript.filter(t => t.speaker?.toLowerCase() === 'interviewer').length,
      sampleEntry: finalTranscript[0],
      usingFreshTranscript: freshTranscript.length > 0,
    });
    
    // Save session data in background (non-blocking)
    console.log('💾 Saving session transcript:', {
      sessionId,
      transcriptLength: finalTranscript.length,
      duration: sessionTime,
      transcriptPreview: finalTranscript.slice(0, 3),
      hasMessages: messages.length > 0,
    });
    
    // Always save to localStorage first as immediate backup
    if (typeof window !== 'undefined' && session) {
      try {
        const sessionToSave = {
          ...session,
          transcript: finalTranscript,
          endTime: new Date().toISOString(),
          duration: sessionTime,
        };
        localStorage.setItem(`session_${sessionId}`, JSON.stringify(sessionToSave));
        console.log('💾 Session saved to localStorage immediately (before API call)');
        console.log('   Transcript length in localStorage:', sessionToSave.transcript.length);
      } catch (localError) {
        console.error('❌ Failed to save to localStorage:', localError);
      }
    }
    
    try {
      const updateResponse = await apiClient.put<{ success: boolean; session: Session }>(`/api/sessions/${sessionId}`, {
        transcript: finalTranscript,
        endTime: new Date().toISOString(),
        duration: sessionTime,
      });
      console.log('✅ Session transcript saved successfully to API');
      
      // Update localStorage with server response if it has transcript, otherwise keep our local version
      if (typeof window !== 'undefined') {
        const sessionToSave = updateResponse?.session && updateResponse.session.transcript?.length > 0
          ? updateResponse.session
          : {
              ...session,
              transcript: finalTranscript,
              endTime: new Date().toISOString(),
              duration: sessionTime,
            };
        localStorage.setItem(`session_${sessionId}`, JSON.stringify(sessionToSave));
        console.log('💾 Session updated in localStorage after API call');
        console.log('   Transcript length in localStorage:', sessionToSave.transcript.length);
      }
    } catch (error: any) {
      console.error('❌ Failed to update session transcript:', {
        error: error?.response?.data || error?.message || error,
        status: error?.response?.status,
        url: error?.config?.url,
      });
      
      // Even if API fails, try to save to localStorage as backup
      if (typeof window !== 'undefined' && session) {
        try {
          const updatedSession = {
            ...session,
            transcript: finalTranscript,
            endTime: new Date().toISOString(),
            duration: sessionTime,
          };
          localStorage.setItem(`session_${sessionId}`, JSON.stringify(updatedSession));
          console.log('💾 Session saved to localStorage as backup (API update failed)');
          console.log('   Saved transcript length:', finalTranscript.length);
          console.log('   Saved session keys:', Object.keys(updatedSession));
          console.log('   Sample transcript entry:', finalTranscript[0]);
          
          // Verify it was saved correctly
          const verification = localStorage.getItem(`session_${sessionId}`);
          if (verification) {
            const parsed = JSON.parse(verification);
            console.log('   Verification - transcript length in localStorage:', parsed.transcript?.length || 0);
          }
        } catch (localError) {
          console.error('❌ Failed to save to localStorage:', localError);
        }
      }
    }

    // Generate analysis in background (non-blocking) via Next.js analysis API
    // Fetch KB content if we have a knowledgeBaseId from the session (uploaded KB)
    // Skip fetching if it's the default KB ID (not stored in knowledge base storage)
    let kbContent = '';
    const defaultKBId = '00000000-0000-0000-0000-000000000001';
    if (session?.knowledgeBaseId && session.knowledgeBaseId !== defaultKBId) {
      try {
        console.log('📚 Fetching KB content for analysis:', session.knowledgeBaseId);
        const kbResponse = await apiClient.get<any>(`/api/knowledge-base/${session.knowledgeBaseId}`);
        if (kbResponse.success && kbResponse.knowledgeBase?.content) {
          kbContent = kbResponse.knowledgeBase.content;
          console.log(`✅ KB content fetched: ${kbContent.length} characters`);
        } else {
          console.warn('⚠️ Could not fetch KB content, analysis will proceed without it');
        }
      } catch (kbError) {
        console.error('❌ Error fetching KB content:', kbError);
        // Continue without KB content
      }
    } else if (session?.knowledgeBaseId === defaultKBId) {
      console.log('📚 Default KB ID detected - skipping KB fetch (will use difficulty prompt for avatar, but no KB for analysis)');
    }
    
    console.log('📊 Starting analysis generation...', {
      transcriptLength: finalTranscript.length,
      durationSeconds: sessionTime,
      knowledgeBaseId: session?.knowledgeBaseId || 'None',
      hasKbContent: !!kbContent,
    });
    
    try {
      const analysisResponse = await apiClient.post<any>(
        '/api/analysis/session',
        {
          transcript: finalTranscript,
          durationSeconds: sessionTime,
          knowledgeBase: kbContent, // Pass KB content, not ID
        },
      );
      
      console.log('📊 Analysis response received:', {
        success: analysisResponse?.success,
        hasAnalysis: !!analysisResponse?.analysis,
        hasReport: !!analysisResponse?.report,
      });
      
      // Transform analysis response to report format (API returns 'analysis', not 'report')
      if (analysisResponse?.success && analysisResponse?.analysis) {
        const analysis = analysisResponse.analysis;
        const overallScore = Math.round(
          (analysis.accuracy + analysis.clarity + analysis.completeness + analysis.consistency) / 4
        );
        
        const report = {
          overallScore: overallScore,
          metrics: {
            accuracy: analysis.accuracy || 0,
            clarity: analysis.clarity || 0,
            tone: analysis.consistency || 0, // Map consistency to tone
            pace: analysis.completeness || 0, // Map completeness to pace
            consistency: analysis.consistency || 0,
          },
          highlights: analysis.highlights || [],
          recommendations: analysis.recommendations || [],
          durationSeconds: sessionTime,
          summary: analysis.summary || 'Analysis completed successfully.',
          flaggedSegments: analysis.flaggedSegments || [],
        };
        console.log('💾 Saving analysis report to session...');
        try {
          const updateResponse = await apiClient.put<{ success: boolean; session: Session }>(`/api/sessions/${sessionId}`, { report });
          console.log('✅ Analysis report saved successfully');
          
          // Also update localStorage as backup
          if (typeof window !== 'undefined' && updateResponse?.session) {
            localStorage.setItem(`session_${sessionId}`, JSON.stringify(updateResponse.session));
            console.log('💾 Session with report updated in localStorage');
          }
        } catch (updateError: any) {
          console.error('❌ Failed to save report to session:', {
            error: updateError?.response?.data || updateError?.message || updateError,
            status: updateError?.response?.status,
          });
          
          // Even if API fails, try to save to localStorage as backup
          if (typeof window !== 'undefined' && session) {
            try {
              const updatedSession = {
                ...session,
                report,
              };
              localStorage.setItem(`session_${sessionId}`, JSON.stringify(updatedSession));
              console.log('💾 Report saved to localStorage as backup (API update failed)');
            } catch (localError) {
              console.error('❌ Failed to save report to localStorage:', localError);
            }
          }
        }
      } else {
        console.warn('⚠️ Analysis response missing report:', analysisResponse);
      }
    } catch (error: any) {
      console.error('❌ Failed to generate or save analysis:', {
        error: error?.response?.data || error?.message || error,
        status: error?.response?.status,
        url: error?.config?.url,
        transcriptLength: transcript.length,
      });
    }

    // Navigate immediately - don't wait for API calls
    router.push(`/report?sessionId=${sessionId}`);
  }, [router, sessionId, sessionTime, stopAvatar, stopVoiceChat, transcript, messages, messageTimes, session, sessionConfig, formatSessionTime]);

  if (!isAuthenticated || !user) {
    return null;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-navy-900 border-t-transparent mx-auto mb-4" />
          <p className="text-lg font-medium text-brand-navy-900">
        Loading session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-0.5 sm:p-2">
      {/* Centered fatal error overlay */}
      {fatalError && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="max-w-md w-full px-4">
            <ErrorMessage
              title="Unable to start session"
              message={fatalError}
              onDismiss={() => {
                setFatalError(null);
                router.push('/lobby');
              }}
            />
          </div>
        </div>
      )}
      <div className="relative w-full max-w-[1920px] bg-white border border-gray-300 rounded-lg overflow-hidden shadow-2xl flex flex-col lg:flex-row" style={{ minHeight: '400px', height: 'calc(100vh - 0.5rem)', maxHeight: 'calc(100vh - 0.5rem)' }}>
        {/* Video Container - Full width on mobile, flex-1 on desktop */}
        <div className="relative flex-1 bg-gray-100 flex items-center justify-center min-h-[300px] sm:min-h-[400px] overflow-hidden">
          <div className="relative w-full h-full bg-black flex items-center justify-center">
          <AvatarVideo ref={videoRef} />

          {!isAvatarReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white z-10">
              <div className="text-center px-4">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-white border-t-transparent mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base font-medium">
                  {isStartingAvatar ? 'Connecting avatar...' : 'Waiting for stream...'}
                </p>
                {loadError && (
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-900/50 rounded-lg max-w-md mx-auto">
                    <p className="text-xs sm:text-sm font-semibold text-red-200">Error:</p>
                    <p className="text-[10px] sm:text-xs text-red-100 mt-1 break-words">{loadError}</p>
                    <button
                      onClick={() => {
                        setLoadError(null);
                        setIsStartingAvatar(false);
                        window.location.reload();
                      }}
                      className="mt-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 active:scale-95 text-xs sm:text-sm font-medium min-h-[44px] min-w-[80px] touch-manipulation transition-all duration-200"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Top-left: Session Time */}
          <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-blue-900 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 z-20">
            <p className="text-white text-[9px] sm:text-xs font-medium whitespace-nowrap">
              Session Time {formatTime(sessionTime)}
            </p>
          </div>

          {/* Microphone Error Message */}
          {micError && isAvatarReady && (
            <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-red-600 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2 z-20 max-w-[85%] sm:max-w-xs">
              <div className="flex items-start gap-1.5 sm:gap-2">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[10px] sm:text-xs font-semibold mb-0.5 sm:mb-1">Microphone Error</p>
                  <p className="text-white text-[9px] sm:text-[10px] leading-tight break-words">{micError}</p>
                  <button
                    onClick={() => {
                      setMicError(null);
                      voiceChatStartedRef.current = false;
                    }}
                    className="mt-1.5 sm:mt-2 text-[9px] sm:text-xs text-white underline hover:no-underline active:opacity-70 min-h-[32px] min-w-[60px] touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    Dismiss
                  </button>
                </div>
              <button
                  onClick={() => setMicError(null)}
                  className="text-white hover:text-gray-200 active:opacity-70 ml-0.5 sm:ml-1 min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center touch-manipulation flex-shrink-0"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
              </button>
              </div>
            </div>
          )}

          {/* Bottom-center: Control Bar (Mic + End Call only) */}
          <div className="absolute bottom-1.5 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm rounded-full px-1.5 py-1 sm:px-3 sm:py-1.5 flex items-center gap-1.5 sm:gap-2 z-20">
            {/* Microphone Button */}
            {isAvatarReady && <MicrophoneButtonControl />}

            {/* End Call Button */}
              <button
                onClick={handleEndSession}
              className="w-12 h-12 sm:w-12 sm:h-12 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 active:scale-95 flex items-center justify-center transition-all duration-200 touch-manipulation shadow-lg min-w-[48px] min-h-[48px]"
              title="End Session"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg
                className="w-5 h-5 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              </button>
            </div>

          {/* Chat/Transcription Toggle Button - Bottom Right */}
          {isAvatarReady && !showTranscription && (
            <button
              onClick={() => setShowTranscription(true)}
              className="absolute bottom-1.5 right-1.5 sm:bottom-4 sm:right-4 w-12 h-12 sm:w-12 sm:h-12 rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-600 active:scale-95 flex items-center justify-center transition-all duration-200 z-20 shadow-lg touch-manipulation min-w-[48px] min-h-[48px]"
              title="Open Chat"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          )}
          </div>
        </div>

        {/* Chat Panel - Full width on mobile, side panel on desktop */}
        {isAvatarReady && showTranscription && (
          <div className="absolute sm:relative inset-0 sm:inset-auto w-full sm:w-96 bg-white border-t sm:border-l border-gray-200 flex flex-col shadow-lg sm:shadow-sm flex-shrink-0 overflow-hidden z-30 sm:z-auto" style={{ height: '100%', maxHeight: 'calc(100vh - 0.5rem)' }}>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-white flex-shrink-0 z-10">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">Chat & Messages</h3>
              <button
                onClick={() => setShowTranscription(false)}
                className="text-gray-400 hover:text-gray-600 active:text-gray-800 active:opacity-70 transition-all duration-200 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation rounded-lg"
                title="Close Chat"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages Area - Scrollable */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden bg-white" 
              style={{ minHeight: 0 }}
            >
              <MessageHistory
                sessionTime={sessionTime}
                messageTimes={messageTimes}
              />
            </div>

            {/* Chat Input - Fixed at bottom */}
            <div className="border-t border-gray-200 bg-white p-3 sm:p-4 flex-shrink-0 z-10">
              <ChatInput />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LivePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <StreamingAvatarProvider basePath={HEYGEN_BASE_PATH}>
        <LiveSessionContent />
      </StreamingAvatarProvider>
    </Suspense>
  );
}
