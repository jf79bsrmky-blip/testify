// ======================================================
// GLOBAL TYPES FOR THE ENTIRE TESTIFY APPLICATION
// ======================================================

// ============================
// AUTH TYPES
// ============================
export interface User {
  id: string;
  name: string;
  email: string;
  uniqueCode?: string;
}

// Credentials used in login form
export interface LoginCredentials {
  email: string;
  password: string;
  uniqueCode: string; // required in login page
}

// Response returned from login API
export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
  error?: string;
}


// ============================
// SESSION & TRANSCRIPT TYPES
// ============================

export interface TranscriptEntry {
  id: string;
  timestamp: string;
  speaker: 'interviewer' | 'witness';
  text: string;
}

export interface Session {
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


// ============================
// REPORT / ANALYSIS TYPES
// ============================

export interface SessionReportData {
  overallScore: number;

  metrics: {
    accuracy: number;
    clarity: number;
    tone: number;
    pace: number;
  };

  highlights: string[];
  recommendations: string[];

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


// ============================
// LLM REQUESTS
// ============================

export interface LLMRequest {
  prompt: string;
  knowledgeBase?: string;
  model: 'openai' | 'heygen';
}

export interface LLMResponse {
  success: boolean;
  text: string;
}


// ============================
// AVATAR TYPES
// ============================

export interface Avatar {
  id: string;
  name: string;
}

export const AVAILABLE_AVATARS: Avatar[] = [
  // Men (Lawyers)
  { id: 'Dexter_Lawyer_Sitting_public', name: 'Dexter-English-Male' },
  { id: 'Pedro_Chair_Sitting_public', name: 'Pedro-Mexican-Male' },
  { id: 'Anthony_Chair_Sitting_public', name: 'Anthony-Argentine-Male' },
  { id: 'Graham_Chair_Sitting_public', name: 'Graham-American-Male' },
  // Women (Lawyers)
  { id: 'Judy_Lawyer_Sitting2_public', name: 'Judy-American-Female' },
  { id: 'Anastasia_Chair_Sitting_public', name: 'Anastasia-Greek-Female' },
];


// ============================
// INTERNAL BACKEND TYPES
// (Not used by frontend, only for login validation)
// ============================
export interface BackendUser extends User {
  password: string;
  uniqueCode: string;
}
