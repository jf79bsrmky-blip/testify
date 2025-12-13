const express = require('express');
const router = express.Router();
const heygenService = require('../services/heygenService');
const promptService = require('../services/promptService');
const { getKnowledgeBase } = require('./knowledgeBase');
const sessionsRouter = require('./sessions');
const findSessionById = sessionsRouter.findSessionById;

// Start a new HeyGen session
router.post('/session/start', async (req, res) => {
  try {
    const { avatarId, voice, quality, knowledgeId, language } = req.body;

    console.log('🎭 Starting HeyGen session...');
    if (knowledgeId) {
      console.log('📚 Using Knowledge Base ID:', knowledgeId);
    }
    if (language) {
      console.log('🌍 Using language:', language);
    }

    const sessionData = await heygenService.startSession(avatarId, voice, quality, knowledgeId, language);

    console.log('📊 Session data received:', JSON.stringify(sessionData, null, 2));

    if (sessionData) {
      const response = {
        success: true,
        data: sessionData,
        timestamp: new Date().toISOString()
      };
      console.log('✅ Sending success response:', JSON.stringify(response, null, 2));
      res.json(response);
    } else {
      console.log('❌ Session data is null, sending error response');
      res.status(500).json({
        success: false,
        error: 'Failed to start HeyGen session'
      });
    }

  } catch (error) {
    console.error('HeyGen session start error:', error);
    res.status(500).json({
      error: 'Failed to start HeyGen session',
      message: error.message
    });
  }
});

// Convert uploaded KB to HeyGen KB (called before session start)
router.post('/convert-kb', async (req, res) => {
  try {
    const { knowledgeId, language, sessionId } = req.body;

    if (!knowledgeId) {
      return res.status(400).json({
        success: false,
        error: 'Knowledge base ID is required'
      });
    }
    
    console.log('🌍 Language for KB conversion:', language || 'not specified');

    console.log('🔄 Converting knowledge base:', knowledgeId);
    console.log('   - ID format check:', knowledgeId.startsWith('kb_') ? 'HeyGen format (starts with kb_)' : 'UUID format (likely uploaded/default)');

    // If it's already a HeyGen KB ID (starts with 'kb_'), return it as-is
    if (knowledgeId.startsWith('kb_')) {
      console.log('📚 Already a HeyGen KB ID:', knowledgeId);
      return res.json({
        success: true,
        knowledgeId: knowledgeId,
        isHeyGenKB: true,
        cached: false
      });
    }

    // Get session difficulty if sessionId is provided
    let sessionDifficulty = 'medium'; // default
    if (sessionId) {
      try {
        const session = findSessionById(sessionId);
        if (session && session.difficulty) {
          sessionDifficulty = session.difficulty;
          console.log('📋 Session difficulty found:', sessionDifficulty);
        } else if (session && session.quality) {
          // Fallback: derive difficulty from quality
          const qualityToDifficulty = { 'low': 'easy', 'medium': 'medium', 'high': 'hard' };
          sessionDifficulty = qualityToDifficulty[session.quality] || 'medium';
          console.log('📋 Derived difficulty from quality:', sessionDifficulty);
        }
      } catch (sessionError) {
        console.warn('⚠️ Failed to get session difficulty:', sessionError.message);
      }
    }

    // Check if it's the default KB ID
    const defaultKBId = '00000000-0000-0000-0000-000000000001';
    if (knowledgeId === defaultKBId) {
      console.log('📚 Using default KB ID:', knowledgeId);
      // For default KB with language, create a HeyGen KB with language instructions
      if (language && heygenService.isConfigured()) {
        console.log('   - Creating default KB with language:', language);
        console.log('   - Using difficulty prompt:', sessionDifficulty);
        const languageNames = {
          'bg-BG': 'Bulgarian', 'zh-CN': 'Chinese', 'cs-CZ': 'Czech', 'da-DK': 'Danish',
          'nl-NL': 'Dutch', 'en-US': 'English', 'fi-FI': 'Finnish', 'fr-FR': 'French',
          'de-DE': 'German', 'el-GR': 'Greek', 'hi-IN': 'Hindi', 'hu-HU': 'Hungarian',
          'id-ID': 'Indonesian', 'it-IT': 'Italian', 'ja-JP': 'Japanese', 'ko-KR': 'Korean',
          'ms-MY': 'Malay', 'no-NO': 'Norwegian', 'pl-PL': 'Polish', 'pt-PT': 'Portuguese',
          'ro-RO': 'Romanian', 'ru-RU': 'Russian', 'sk-SK': 'Slovak', 'es-ES': 'Spanish',
          'sv-SE': 'Swedish', 'tr-TR': 'Turkish', 'uk-UA': 'Ukrainian', 'vi-VN': 'Vietnamese'
        };
        const languageName = languageNames[language] || language.split('-')[0];
        const languageInstruction = `\n\nIMPORTANT LANGUAGE INSTRUCTION:\n- You MUST speak and respond ONLY in ${languageName} (${language}).\n- Do NOT use English or any other language.\n- All your responses must be in ${languageName}.`;
        
        // Get default prompt based on difficulty
        const defaultKBContent = promptService.getDefaultPrompt(sessionDifficulty);
        const kbOpening = language 
          ? `Hello. I will be asking you questions based on the provided knowledge base. Please answer truthfully and clearly. Respond only in ${languageName}.`
          : 'Hello. I will be asking you questions based on the provided knowledge base. Please answer truthfully and clearly.';
        const kbPrompt = defaultKBContent + languageInstruction;
        
        const kbName = `Legal Interview Protocol - ${languageName}`;
        const heygenKB = await heygenService.createKnowledgeBase(kbName, kbOpening, kbPrompt);
        
        if (heygenKB && heygenKB.knowledgeId) {
          console.log('✅ Default KB with language created:', heygenKB.knowledgeId);
          return res.json({
            success: true,
            knowledgeId: heygenKB.knowledgeId,
            isHeyGenKB: true,
            cached: false,
            message: `Default KB created with ${languageName} language support`
          });
        }
      }
      // For default KB without language or if creation failed, return as-is
      return res.json({
        success: true,
        knowledgeId: knowledgeId,
        isHeyGenKB: false,
        cached: false,
        message: 'Default KB - will be handled by session creation'
      });
    }

    // Check if HeyGen API key is configured before attempting conversion
    if (!heygenService.isConfigured()) {
      console.warn('⚠️ HeyGen API key not configured - cannot convert KB to HeyGen format');
      return res.status(400).json({
        success: false,
        error: 'HeyGen API key not configured',
        message: 'Please set HEYGEN_API_KEY in your .env or .env.production file to convert knowledge bases to HeyGen format. The uploaded KB will be stored locally but cannot be used with HeyGen sessions.',
        requiresApiKey: true
      });
    }

    // For uploaded KBs, fetch content and create HeyGen KB
    console.log('📚 Uploaded KB ID (UUID format):', knowledgeId);
    console.log('   - Fetching KB content from storage...');
    console.log('   - Session difficulty:', sessionDifficulty);
    
    // Get the KB content from local storage
    const kbData = getKnowledgeBase(knowledgeId);
    
    if (!kbData) {
      console.error('❌ Knowledge base not found in storage:', knowledgeId);
      return res.status(404).json({
        success: false,
        error: 'Knowledge base not found'
      });
    }
    
    console.log('   - KB found:', kbData.name);
    console.log('   - Content length:', kbData.content.length, 'characters');
    
    // Create HeyGen KB with the uploaded content
    // Use the file name as the KB name, and the content as the prompt
    const kbName = kbData.name || `Uploaded KB ${knowledgeId.substring(0, 8)}`;
    
    // Get language name from language code (e.g., 'es-ES' -> 'Spanish')
    let languageInstruction = '';
    if (language) {
      const languageNames = {
        'bg-BG': 'Bulgarian', 'zh-CN': 'Chinese', 'cs-CZ': 'Czech', 'da-DK': 'Danish',
        'nl-NL': 'Dutch', 'en-US': 'English', 'fi-FI': 'Finnish', 'fr-FR': 'French',
        'de-DE': 'German', 'el-GR': 'Greek', 'hi-IN': 'Hindi', 'hu-HU': 'Hungarian',
        'id-ID': 'Indonesian', 'it-IT': 'Italian', 'ja-JP': 'Japanese', 'ko-KR': 'Korean',
        'ms-MY': 'Malay', 'no-NO': 'Norwegian', 'pl-PL': 'Polish', 'pt-PT': 'Portuguese',
        'ro-RO': 'Romanian', 'ru-RU': 'Russian', 'sk-SK': 'Slovak', 'es-ES': 'Spanish',
        'sv-SE': 'Swedish', 'tr-TR': 'Turkish', 'uk-UA': 'Ukrainian', 'vi-VN': 'Vietnamese'
      };
      const languageName = languageNames[language] || language.split('-')[0];
      languageInstruction = `\n\nIMPORTANT LANGUAGE INSTRUCTION:\n- You MUST speak and respond ONLY in ${languageName} (${language}).\n- Do NOT use English or any other language.\n- All your responses must be in ${languageName}.`;
      console.log(`   - Adding language instruction: ${languageName}`);
    }
    
    // Combine uploaded KB content with difficulty prompt
    const combinedKBContent = promptService.combineKBWithDifficulty(kbData.content, sessionDifficulty);
    console.log('   - Combined KB content with difficulty prompt:', sessionDifficulty);
    console.log('   - Combined content length:', combinedKBContent.length, 'characters');
    
    const kbOpening = language 
      ? `Hello. I will be asking you questions based on the provided knowledge base. Please answer truthfully and clearly. Respond only in ${language.split('-')[0] === 'en' ? 'English' : 'the selected language'}.`
      : 'Hello. I will be asking you questions based on the provided knowledge base. Please answer truthfully and clearly.';
    const kbPrompt = combinedKBContent + languageInstruction;
    
    console.log('   - Creating HeyGen Knowledge Base...');
    const heygenKB = await heygenService.createKnowledgeBase(kbName, kbOpening, kbPrompt);
    
    if (!heygenKB || !heygenKB.knowledgeId) {
      console.error('❌ Failed to create HeyGen KB');
      // Check if it's an authorization error
      const errorDetails = heygenKB?.error || 'Unknown error';
      const isAuthError = typeof errorDetails === 'object' && (errorDetails.code === 400112 || errorDetails.message?.toLowerCase().includes('unauthorized'));
      
      return res.status(500).json({
        success: false,
        error: 'Failed to create HeyGen Knowledge Base',
        message: isAuthError 
          ? 'HeyGen API key is invalid or unauthorized. Please check your HEYGEN_API_KEY in .env or .env.production file.'
          : 'HeyGen API returned no knowledge ID',
        requiresApiKey: isAuthError
      });
    }
    
    console.log('✅ HeyGen KB created successfully:', heygenKB.knowledgeId);
    
    return res.json({
      success: true,
      knowledgeId: heygenKB.knowledgeId,
      isHeyGenKB: true,
      cached: false,
      originalId: knowledgeId,
      message: 'KB converted to HeyGen format successfully'
    });

  } catch (error) {
    console.error('❌ Error converting KB:', error);
    
    // Check if it's an authorization error from HeyGen API
    const isAuthError = error.response?.data?.code === 400112 || 
                       error.response?.data?.message?.toLowerCase().includes('unauthorized') ||
                       error.message?.toLowerCase().includes('unauthorized');
    
    res.status(500).json({
      success: false,
      error: 'Failed to convert knowledge base',
      message: isAuthError 
        ? 'HeyGen API key is invalid or unauthorized. Please check your HEYGEN_API_KEY in .env or .env.production file.'
        : error.message || 'Unknown error occurred',
      requiresApiKey: isAuthError,
      errorDetails: error.response?.data || error.message
    });
  }
});

// Create streaming token (exposed for frontend usage)
router.post('/streaming/token', async (req, res) => {
  try {
    console.log('🔑 Creating HeyGen streaming token via backend...');
    const token = await heygenService.createSessionToken();

    if (!token) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create streaming token',
      });
    }

    res.json({
      success: true,
      token,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('HeyGen streaming token error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create streaming token',
      message: error.message,
    });
  }
});

// Start streaming for a session
router.post('/session/:sessionId/start-streaming', async (req, res) => {
  try {
    const { sessionId } = req.params;

    console.log('🎭 Starting streaming for session:', sessionId);
    
    const result = await heygenService.startStreaming(sessionId);
    
    if (result) {
      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to start streaming'
      });
    }

  } catch (error) {
    console.error('HeyGen streaming start error:', error);
    res.status(500).json({ 
      error: 'Failed to start streaming',
      message: error.message 
    });
  }
});

// Send chat message to avatar (uses Knowledge Base AI)
router.post('/chat', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        error: 'Text is required and must be a string' 
      });
    }

    console.log('💬 HeyGen chat request:', text);
    
    const result = await heygenService.sendChatMessage(text);
    
    const duration_ms = result?.data?.duration_ms || 0;
    
    res.json({
      success: result ? true : false,
      duration_ms: duration_ms,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('HeyGen chat error:', error);
    res.status(500).json({ 
      error: 'Failed to send chat message',
      message: error.message 
    });
  }
});

// Make the avatar speak (without KB - just repeats text)
router.post('/speak', async (req, res) => {
  try {
    const { sessionId, text } = req.body;

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({
        error: 'Session ID is required and must be a string'
      });
    }

    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: 'Text is required and must be a string'
      });
    }

    console.log('🎭 HeyGen speak request:', text);
    console.log('📋 Session ID:', sessionId);

    const result = await heygenService.speak(text, sessionId);

    // The speak method returns the full response from HeyGen
    // Extract duration_ms if available
    const duration_ms = result?.data?.duration_ms || 0;

    res.json({
      success: result ? true : false,
      duration_ms: duration_ms,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('HeyGen speak error:', error);
    res.status(500).json({
      error: 'Failed to make avatar speak',
      message: error.message
    });
  }
});

// Interrupt avatar speech
router.post('/interrupt', async (req, res) => {
  try {
    console.log('⏹️ [INTERRUPT] Interrupt request received at backend');
    console.log('⏹️ [INTERRUPT] Request body:', req.body);
    console.log('⏹️ [INTERRUPT] Calling heygenService.interruptSpeech()...');

    const result = await heygenService.interruptSpeech();

    console.log('⏹️ [INTERRUPT] interruptSpeech() returned:', result);
    console.log('⏹️ [INTERRUPT] Sending response: success=' + result);

    res.json({
      success: result ? true : false,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ [INTERRUPT] HeyGen interrupt error:', error);
    res.status(500).json({
      error: 'Failed to interrupt avatar',
      message: error.message
    });
  }
});

// End HeyGen session
router.post('/session/end', async (req, res) => {
  try {
    console.log('🎭 Ending HeyGen session...');

    const success = await heygenService.endSession();

    res.json({
      success: success,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('HeyGen session end error:', error);
    res.status(500).json({
      error: 'Failed to end HeyGen session',
      message: error.message
    });
  }
});

// Get HeyGen session status
router.get('/session/status', (req, res) => {
  const sessionInfo = heygenService.getSessionInfo();
  
  res.json({
    configured: heygenService.isConfigured(),
    sessionInfo: sessionInfo,
    timestamp: new Date().toISOString()
  });
});

// Handle WebRTC offer from frontend
router.post('/webrtc/offer', async (req, res) => {
  try {
    const { session_id, offer } = req.body;

    if (!session_id || !offer) {
      return res.status(400).json({
        success: false,
        error: 'Session ID and offer are required'
      });
    }

    console.log('🎭 Handling WebRTC offer for session:', session_id);
    
    // For now, we'll just acknowledge the offer
    // In a real implementation, you'd process the offer and return an answer
    res.json({
      success: true,
      answer: {
        type: 'answer',
        sdp: 'dummy-sdp-answer' // This would be a real SDP answer
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('HeyGen WebRTC offer error:', error);
    res.status(500).json({ 
      error: 'Failed to handle WebRTC offer',
      message: error.message 
    });
  }
});

// Check HeyGen configuration status
router.get('/status', (req, res) => {
  res.json({
    configured: heygenService.isConfigured(),
    baseUrl: process.env.HEYGEN_BASE_URL || 'https://api.heygen.com',
    defaultAvatarId: process.env.HEYGEN_AVATAR_ID,
    defaultVoice: process.env.HEYGEN_DEFAULT_VOICE
  });
});

// ==================== KNOWLEDGE BASE ROUTES ====================

// Create a new Knowledge Base
router.post('/knowledge-base/create', async (req, res) => {
  try {
    const { name, opening, prompt } = req.body;

    if (!name || !opening || !prompt) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, opening, and prompt are required'
      });
    }

    console.log('📚 Creating Knowledge Base:', name);

    const result = await heygenService.createKnowledgeBase(name, opening, prompt);

    if (result && result.knowledgeId) {
      console.log('✅ KB creation successful, returning to client');
      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } else {
      console.log('❌ KB creation returned no knowledgeId:', result);
      res.status(500).json({
        success: false,
        error: 'Failed to create Knowledge Base - no ID returned'
      });
    }

  } catch (error) {
    console.error('❌ Knowledge Base creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create Knowledge Base',
      message: error.message
    });
  }
});

// Update an existing Knowledge Base
router.put('/knowledge-base/:knowledgeId', async (req, res) => {
  try {
    const { knowledgeId } = req.params;
    const { name, opening, prompt } = req.body;

    if (!name || !opening || !prompt) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, opening, and prompt are required'
      });
    }

    console.log('📚 Updating Knowledge Base:', knowledgeId);

    const success = await heygenService.updateKnowledgeBase(knowledgeId, name, opening, prompt);

    if (success) {
      res.json({
        success: true,
        message: 'Knowledge Base updated successfully',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to update Knowledge Base'
      });
    }

  } catch (error) {
    console.error('Knowledge Base update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update Knowledge Base',
      message: error.message
    });
  }
});

// List all Knowledge Bases
router.get('/knowledge-base/list', async (req, res) => {
  try {
    console.log('📚 [ROUTE] Listing Knowledge Bases...');

    const knowledgeBases = await heygenService.listKnowledgeBases();

    console.log('📚 [ROUTE] Result:', knowledgeBases);

    if (knowledgeBases !== null && Array.isArray(knowledgeBases)) {
      console.log('📚 [ROUTE] Success! Found', knowledgeBases.length, 'KBs');
      res.json({
        success: true,
        data: knowledgeBases,
        count: knowledgeBases.length,
        timestamp: new Date().toISOString()
      });
    } else if (knowledgeBases === null) {
      console.error('📚 [ROUTE] Service returned null');
      res.status(500).json({
        success: false,
        error: 'Failed to list Knowledge Bases - service returned null',
        details: 'Check backend logs for HeyGen API errors'
      });
    } else {
      console.error('📚 [ROUTE] Invalid response type:', typeof knowledgeBases);
      res.status(500).json({
        success: false,
        error: 'Failed to list Knowledge Bases - invalid response',
        details: 'Response is not an array'
      });
    }

  } catch (error) {
    console.error('❌ [ROUTE] Knowledge Base list error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list Knowledge Bases',
      message: error.message,
      details: 'Check backend logs for more information'
    });
  }
});

// Get a specific Knowledge Base
router.get('/knowledge-base/:knowledgeId', async (req, res) => {
  try {
    const { knowledgeId } = req.params;

    console.log('📚 Getting Knowledge Base:', knowledgeId);

    const knowledgeBase = await heygenService.getKnowledgeBase(knowledgeId);

    if (knowledgeBase) {
      res.json({
        success: true,
        data: knowledgeBase,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Knowledge Base not found'
      });
    }

  } catch (error) {
    console.error('Knowledge Base get error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get Knowledge Base',
      message: error.message
    });
  }
});

// Delete a Knowledge Base
router.delete('/knowledge-base/:knowledgeId', async (req, res) => {
  try {
    const { knowledgeId } = req.params;

    console.log('📚 Deleting Knowledge Base:', knowledgeId);

    const success = await heygenService.deleteKnowledgeBase(knowledgeId);

    if (success) {
      res.json({
        success: true,
        message: 'Knowledge Base deleted successfully',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to delete Knowledge Base'
      });
    }

  } catch (error) {
    console.error('Knowledge Base delete error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete Knowledge Base',
      message: error.message
    });
  }
});

// ==================== DEBUG ENDPOINT ====================

// Debug endpoint to diagnose knowledge base issues
router.get('/debug/knowledge-bases', async (req, res) => {
  try {
    console.log('\n🔍 ========== KNOWLEDGE BASE DEBUG ==========');

    // Check 1: API Key
    console.log('\n1️⃣ Checking API Key...');
    const apiKey = process.env.HEYGEN_API_KEY;
    if (!apiKey) {
      console.error('❌ HEYGEN_API_KEY is not set in environment');
      return res.status(400).json({
        success: false,
        error: 'HEYGEN_API_KEY not configured',
        checks: {
          apiKey: 'NOT SET'
        }
      });
    }
    console.log('✅ API Key is set:', apiKey.substring(0, 10) + '...');

    // Check 2: Base URL
    console.log('\n2️⃣ Checking Base URL...');
    const baseUrl = process.env.HEYGEN_BASE_URL || 'https://api.heygen.com';
    console.log('✅ Base URL:', baseUrl);

    // Check 3: Service Configuration
    console.log('\n3️⃣ Checking HeyGen Service...');
    console.log('✅ Service configured:', heygenService.isConfigured());

    // Check 4: Attempt to list knowledge bases
    console.log('\n4️⃣ Attempting to fetch knowledge bases...');
    const knowledgeBases = await heygenService.listKnowledgeBases();

    console.log('\n5️⃣ Result:');
    if (knowledgeBases === null) {
      console.error('❌ Service returned null');
      return res.status(500).json({
        success: false,
        error: 'Service returned null',
        checks: {
          apiKey: 'SET',
          baseUrl: baseUrl,
          serviceConfigured: heygenService.isConfigured(),
          result: 'NULL'
        },
        message: 'Check backend logs for detailed error'
      });
    }

    if (!Array.isArray(knowledgeBases)) {
      console.error('❌ Result is not an array:', typeof knowledgeBases);
      return res.status(500).json({
        success: false,
        error: 'Invalid response type',
        checks: {
          apiKey: 'SET',
          baseUrl: baseUrl,
          serviceConfigured: heygenService.isConfigured(),
          resultType: typeof knowledgeBases
        }
      });
    }

    console.log(`✅ Found ${knowledgeBases.length} knowledge bases`);

    return res.json({
      success: true,
      checks: {
        apiKey: 'SET',
        baseUrl: baseUrl,
        serviceConfigured: heygenService.isConfigured(),
        resultType: 'array',
        count: knowledgeBases.length
      },
      data: knowledgeBases,
      message: 'All checks passed!'
    });

  } catch (error) {
    console.error('\n❌ Debug error:', error);
    res.status(500).json({
      success: false,
      error: 'Debug check failed',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;
