// lib/storage.ts
// Central in-memory storage for sessions + knowledge bases

// ----------------------
// Session Type
// ----------------------
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
  transcript: Array<{
    id: string;
    timestamp: string;
    speaker: "user" | "avatar" | "witness" | "interviewer";
    text: string;
  }>;
  report?: any;
}

// ----------------------
// Knowledge Base Type
// ----------------------
export interface KnowledgeBase {
  id: string;
  title: string;
  items: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  createdAt: string;
}

// ----------------------
// In-memory data stores
// ----------------------

// Active sessions (per user)
export const sessions: Session[] = [];

// Knowledge bases uploaded by user
export const knowledgeBases: KnowledgeBase[] = [];

// Helper: get session by ID
export function getSessionById(id: string) {
  return sessions.find((s) => s.id === id);
}

// Helper: update session
export function updateSession(id: string, data: Partial<Session>) {
  const index = sessions.findIndex((s) => s.id === id);
  if (index === -1) return null;

  sessions[index] = {
    ...sessions[index],
    ...data,
  };

  return sessions[index];
}
