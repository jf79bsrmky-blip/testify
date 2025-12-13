const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage for sessions (in production, use a database)
// Using array format to match lib/storage.ts structure
const sessions = [];

// Helper: find session by ID
function findSessionById(sessionId) {
  return sessions.find(s => s.id === sessionId);
}

// Helper: update session
function updateSession(sessionId, data) {
  const index = sessions.findIndex(s => s.id === sessionId);
  if (index === -1) return null;
  
  sessions[index] = {
    ...sessions[index],
    ...data,
  };
  
  return sessions[index];
}

// List all sessions
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      sessions: sessions,
      count: sessions.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Session list error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to list sessions',
      message: error.message 
    });
  }
});

// Create a new session
router.post('/', (req, res) => {
  try {
    const { userId, name, avatarId, quality, difficulty, language, knowledgeBaseId } = req.body;
    
    // Map difficulty to quality for backwards compatibility
    // If difficulty is provided, use it; otherwise derive from quality
    let finalDifficulty = difficulty;
    if (!finalDifficulty && quality) {
      const qualityToDifficulty = { 'low': 'easy', 'medium': 'medium', 'high': 'hard' };
      finalDifficulty = qualityToDifficulty[quality] || 'medium';
    }
    finalDifficulty = finalDifficulty || 'medium';
    
    const sessionId = uuidv4();
    const session = {
      id: sessionId,
      userId: userId || '1',
      name: name || `Session ${new Date().toLocaleString()}`,
      avatarId: avatarId || process.env.HEYGEN_AVATAR_ID || 'Dexter_Lawyer_Sitting_public',
      quality: quality || 'medium',
      difficulty: finalDifficulty, // Store difficulty for prompt selection
      language: language || 'en-US',
      knowledgeBaseId: knowledgeBaseId,
      startTime: new Date().toISOString(),
      transcript: [],
      report: undefined,
    };
    
    sessions.push(session);
    
    console.log(`📝 Session created: ${sessionId}`);
    
    res.json({
      success: true,
      session: session,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Session creation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create session',
      message: error.message 
    });
  }
});

// Get session by ID
router.get('/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = findSessionById(sessionId);
    
    if (!session) {
      return res.status(404).json({ 
        success: false,
        error: 'Session not found' 
      });
    }

    res.json({
      success: true,
      session: session,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Session retrieval error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to retrieve session',
      message: error.message 
    });
  }
});

// Update session (PUT /:sessionId)
router.put('/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const updateData = req.body;
    
    const updated = updateSession(sessionId, updateData);
    
    if (!updated) {
      return res.status(404).json({ 
        success: false,
        error: 'Session not found' 
      });
    }

    console.log(`📝 Session updated: ${sessionId}`, {
      hasTranscript: !!updateData.transcript,
      transcriptLength: updateData.transcript?.length || 0,
      hasReport: !!updateData.report,
      hasEndTime: !!updateData.endTime,
    });

    res.json({
      success: true,
      session: updated,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Session update error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update session',
      message: error.message 
    });
  }
});

// Add message to session (legacy endpoint, kept for compatibility)
router.post('/:sessionId/messages', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message, isUser, timestamp } = req.body;
    
    const session = findSessionById(sessionId);
    
    if (!session) {
      return res.status(404).json({ 
        success: false,
        error: 'Session not found' 
      });
    }

    const messageEntry = {
      id: uuidv4(),
      timestamp: timestamp || new Date().toISOString(),
      speaker: isUser ? 'user' : 'avatar',
      text: message
    };
    
    if (!session.transcript) {
      session.transcript = [];
    }
    session.transcript.push(messageEntry);
    
    console.log(`📝 Message added to session ${sessionId}: ${message}`);
    
    res.json({
      success: true,
      message: messageEntry,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Message addition error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to add message to session',
      message: error.message 
    });
  }
});

// End session (legacy endpoint, kept for compatibility)
router.put('/:sessionId/end', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { duration, report } = req.body;
    
    const session = findSessionById(sessionId);
    
    if (!session) {
      return res.status(404).json({ 
        success: false,
        error: 'Session not found' 
      });
    }

    session.endTime = new Date().toISOString();
    session.duration = duration || 0;
    if (report) {
      session.report = report;
    }
    
    console.log(`📝 Session ended: ${sessionId}`);
    
    res.json({
      success: true,
      session: session,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Session end error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to end session',
      message: error.message 
    });
  }
});

// Delete session
router.delete('/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const index = sessions.findIndex(s => s.id === sessionId);
    
    if (index === -1) {
      return res.status(404).json({ 
        success: false,
        error: 'Session not found' 
      });
    }

    sessions.splice(index, 1);
    
    console.log(`📝 Session deleted: ${sessionId}`);

    res.json({
      success: true,
      message: 'Session deleted successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Session deletion error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete session',
      message: error.message 
    });
  }
});

// Export helper function for use in other routes (e.g., LLM route)
module.exports = router;
module.exports.findSessionById = findSessionById;
