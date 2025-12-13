const axios = require('axios');
const ytlIlmuService = require('./ytlIlmuService');

/**
 * Analysis Service
 * Uses LLM to analyze witness testimony transcriptions
 * Evaluates: Accuracy, Clarity, Completeness, Consistency
 * 
 * Supports: YTL ILMU (primary) and OpenAI (fallback)
 */
class AnalysisService {
  constructor() {
    // YTL ILMU Configuration (Primary)
    this.useYTLIlmu = process.env.USE_YTL_ILMU !== 'false'; // Use YTL ILMU by default
    
    // OpenAI Configuration (Fallback)
    this.apiKey = process.env.OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1';
    this.model = process.env.OPENAI_MODEL || 'gpt-4o';
    
    console.log('🔧 Analysis Service Configuration:');
    console.log(`   Primary: ${this.useYTLIlmu ? 'YTL ILMU' : 'OpenAI'}`);
    console.log(`   YTL ILMU: ${ytlIlmuService.isConfigured() ? 'Configured ✅' : 'Not configured ⚠️'}`);
    console.log(`   OpenAI: ${this.apiKey ? 'Configured ✅' : 'Not configured ⚠️'}`);
  }

  /**
   * Check if a message is substantial (long enough for analysis)
   * @param {String} text - Message text
   * @returns {Boolean} True if message is substantial
   */
  isSubstantialMessage(text) {
    if (!text || typeof text !== 'string') return false;
    
    const trimmedText = text.trim();
    if (trimmedText.length === 0) return false;
    
    // Count words
    const words = trimmedText.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    // Count characters
    const charCount = trimmedText.length;
    
    // Count sentences (periods, exclamation marks, question marks)
    const sentenceCount = (trimmedText.match(/[.!?]+/g) || []).length;
    
    // Check if message is substantial:
    // - At least 35+ words, OR
    // - At least 250+ characters, OR
    // - Contains >= 3 sentences
    return wordCount >= 35 || charCount >= 250 || sentenceCount >= 3;
  }

  /**
   * Check if a message is very short (greetings, 1-3 words)
   * @param {String} text - Message text
   * @returns {Boolean} True if message is very short
   */
  isVeryShortMessage(text) {
    if (!text || typeof text !== 'string') return true;
    
    const trimmedText = text.trim();
    if (trimmedText.length === 0) return true;
    
    const words = trimmedText.split(/\s+/).filter(w => w.length > 0);
    return words.length <= 3;
  }

  /**
   * Check if transcript only contains greetings
   * @param {Array} transcript - Array of {speaker, text, timestamp} messages
   * @returns {Boolean} True if transcript only contains greetings
   */
  isOnlyGreetings(transcript) {
    if (!transcript || transcript.length === 0) return true;
    
    const greetingWords = [
      'hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening',
      'how are you', 'how do you do', 'nice to meet you', 'pleased to meet you',
      'thanks', 'thank you', 'bye', 'goodbye', 'see you', 'farewell', 'ok', 'okay',
      'yes', 'no', 'sure', 'alright', 'fine', 'good', 'great'
    ];
    
    // Check if all witness/user messages are just greetings
    const witnessMessages = transcript.filter(
      entry => entry.speaker === 'witness' || entry.speaker === 'user'
    );
    
    if (witnessMessages.length === 0) return true;
    
    // Check if all witness messages are greetings or very short responses
    const allGreetings = witnessMessages.every(entry => {
      const text = (entry.text || '').trim().toLowerCase();
      if (text.length === 0) return true;
      
      // Very short messages (1-2 words) that are likely greetings
      if (text.split(/\s+/).length <= 2) {
        const words = text.split(/\s+/);
        return words.every(word => {
          const cleanWord = word.replace(/[.,!?;:]/g, '');
          return greetingWords.some(greeting => 
            cleanWord === greeting || 
            greeting.includes(cleanWord) || 
            cleanWord.includes(greeting)
          );
        });
      }
      
      // Check if the entire message matches a greeting pattern
      const greetingPatterns = [
        /^(hi|hello|hey|greetings|good morning|good afternoon|good evening|how are you|how do you do|nice to meet you|pleased to meet you)[\s.,!?]*$/i,
        /^(thanks|thank you|bye|goodbye|see you|farewell)[\s.,!?]*$/i,
        /^(ok|okay|yes|no|sure|alright|fine|good|great)[\s.,!?]*$/i,
      ];
      
      return greetingPatterns.some(pattern => pattern.test(text));
    });
    
    return allGreetings;
  }

  /**
   * Check if there's insufficient data for analysis
   * @param {Array} transcript - Array of {speaker, text, timestamp} messages
   * @returns {Boolean} True if insufficient data
   */
  hasInsufficientData(transcript) {
    if (!transcript || transcript.length === 0) return true;
    
    // Count total words across all witness messages
    const witnessMessages = transcript.filter(
      entry => entry.speaker === 'witness' || entry.speaker === 'user'
    );
    
    if (witnessMessages.length === 0) return true;
    
    // Calculate total word count from all witness messages
    let totalWordCount = 0;
    for (const msg of witnessMessages) {
      const text = (msg.text || '').trim();
      if (text.length > 0) {
        const words = text.split(/\s+/).filter(w => w.length > 0);
        totalWordCount += words.length;
      }
    }
    
    // If total word count is 10 or less, insufficient data
    if (totalWordCount <= 10) {
      return true;
    }
    
    // If we have more than 10 words total, allow analysis
    return false;
  }

  /**
   * Get "not enough data" response
   * @param {Boolean} isOnlyGreetings - Whether transcript only contains greetings
   * @returns {Object} Analysis result indicating insufficient data
   */
  getInsufficientDataResponse(isOnlyGreetings) {
    return {
      accuracy: 0,
      clarity: 0,
      completeness: 0,
      consistency: 0,
      highlights: [],
      recommendations: [],
      flaggedSegments: [],
      summary: isOnlyGreetings
        ? 'The session transcript contains only greetings and does not have enough substantive content for analysis. Please conduct a longer interview session with detailed responses.'
        : 'The session transcript does not contain enough witness responses to perform a meaningful analysis. Please conduct a longer interview session with more detailed responses.',
      insufficientData: true,
      isOnlyGreetings: isOnlyGreetings
    };
  }

  /**
   * Analyze a session transcript against a knowledge base
   * @param {Array} transcript - Array of {speaker, text, timestamp} messages
   * @param {String} knowledgeBase - Reference knowledge base content
   * @param {Object} options - Additional options (sessionDuration, etc.)
   * @returns {Object} Analysis results with scores and recommendations
   */
  async analyzeSession(transcript, knowledgeBase = '', options = {}) {
    try {
      console.log('🔍 Starting session analysis...');
      console.log(`📝 Transcript messages: ${transcript.length}`);
      console.log(`📚 Knowledge base: ${knowledgeBase ? 'Provided' : 'None'}`);

      // Validate inputs
      if (!transcript || transcript.length === 0) {
        throw new Error('Transcript is required for analysis');
      }

      // Check if there's insufficient data or only greetings
      const onlyGreetings = this.isOnlyGreetings(transcript);
      const insufficientData = this.hasInsufficientData(transcript);
      
      if (insufficientData) {
        console.log('⚠️ Insufficient data for analysis - returning early');
        console.log(`   Only greetings: ${onlyGreetings}`);
        return this.getInsufficientDataResponse(onlyGreetings);
      }

      // Extract witness responses only
      const witnessResponses = transcript
        .filter(msg => msg.speaker && msg.speaker.toLowerCase() === 'witness')
        .map(msg => msg.text)
        .join(' ');

      const interviewerQuestions = transcript
        .filter(msg => msg.speaker && msg.speaker.toLowerCase() === 'interviewer')
        .map(msg => msg.text)
        .join(' ');

      console.log(`👤 Witness response count: ${transcript.filter(msg => msg.speaker && msg.speaker.toLowerCase() === 'witness').length}`);
      console.log(`🎤 Interviewer question count: ${transcript.filter(msg => msg.speaker && msg.speaker.toLowerCase() === 'interviewer').length}`);

      // Build comprehensive analysis prompt
      const analysisPrompt = this.buildAnalysisPrompt(
        transcript,
        witnessResponses,
        interviewerQuestions,
        knowledgeBase,
        options
      );

      // Call OpenAI for analysis
      const analysisResult = await this.callOpenAIForAnalysis(analysisPrompt);

      console.log('✅ Analysis completed successfully');
      return analysisResult;

    } catch (error) {
      console.error('❌ Analysis Service Error:', error.message);
      // Return fallback analysis
      return this.getFallbackAnalysis(transcript);
    }
  }

  buildAnalysisPrompt(transcript, witnessResponses, interviewerQuestions, knowledgeBase, options) {
    const hasKnowledgeBase = knowledgeBase && knowledgeBase.trim().length > 0;
    
    // Build conversation context with timestamps
    const conversationContext = transcript.map((msg, index) => {
      return `[${msg.timestamp || 'N/A'}] ${msg.speaker}: ${msg.text}`;
    }).join('\n');

    // Count witness responses
    const witnessCount = transcript.filter(m => m.speaker?.toLowerCase() === 'witness').length;

    return `You are an expert witness testimony analyst with 20+ years of experience evaluating credibility, communication, and completeness in legal settings. Provide a thorough, realistic, and evidence-based analysis.

${hasKnowledgeBase ? `═══════════════════════════════════════════════════════════════
KNOWLEDGE BASE (Reference Facts & Expected Information):
═══════════════════════════════════════════════════════════════
${knowledgeBase}

⚠️ CRITICAL: Compare witness testimony against these facts. Identify:
- What they got RIGHT (factually accurate)
- What they got WRONG (misstatements, errors)
- What they OMITTED (missing important details)
` : ''}

═══════════════════════════════════════════════════════════════
INTERVIEW TRANSCRIPT (${witnessCount} witness responses):
═══════════════════════════════════════════════════════════════
${conversationContext}

${options.sessionDuration ? `\nSession Duration: ${Math.floor(options.sessionDuration / 60)}:${(options.sessionDuration % 60).toString().padStart(2, '0')}\n` : ''}

═══════════════════════════════════════════════════════════════
EVALUATION CRITERIA:
═══════════════════════════════════════════════════════════════

1. **CREDIBILITY & ACCURACY** (0-100):
   ${hasKnowledgeBase 
     ? `• CRITICAL: Compare testimony against the Knowledge Base (KB)
   • Deduct 10 points for Direct Contradictions (stating the opposite of the KB)
   • Deduct 5 points for Factual Errors (dates, amounts, names)
   • Deduct 2 points for Unnecessary Hedging on known facts (e.g., "I guess" on your own job title)
   • SCORE GUIDANCE:
     - 95-100: Good alignment with KB; authoritative recall.
     - 80-94: Accurate on material facts; minor slips on trivial details.
     - 60-79: General alignment, but several noticeable factual hazinesses.
     - 40-59: Significant errors or contradictions with the record.
     - < 40: Perjury level / Complete fabrication.`
     : `• Evaluate internal logic and plausibility
   • Deduct points for answers that defy common sense or business logic
   • Assess confidence: Is the witness authoritative on their own story?
   • SCORE GUIDANCE:
     - 95-100: Highly credible, logical, and authoritative.
     - 80-94: Plausible and consistent story.
     - 60-79: Occasional logical gaps or moments of unearned uncertainty.
     - 40-59: Implausible narrative or confusing logic.
     - < 40: Story falls apart completely.`}

2. **CLARITY & COMPOSURE** (0-100):
   • Filler Words: Deduct only if they distract from the meaning (excessive "um," "uh").
   • Pacing: Deduct for rushing or interrupting the counsel.
   • Structure: Deduct for "Word Salad" or rambling answers that lose the point.
   • SCORE GUIDANCE:
     - 95-100: Concise, articulate, professional demeanor.
     - 80-94: Clear communication; minor fillers that do not impede understanding.
     - 60-79: understandable but somewhat messy; frequent fillers or run-on sentences.
     - 40-59: Difficult to follow; rambling; distinct lack of polish.
     - < 40: Incoherent or unintelligible.

3. **RESPONSIVENESS (COMPLETENESS)** (0-100):
   *Note: In cross-examination, "Completeness" means answering exactly what is asked, not volunteering extra info.*
   ${hasKnowledgeBase
     ? `• Deduct 10 points for EVASIVENESS (dodging a question the KB has an answer for)
   • Deduct 5-10 points for VOLUNTEERING information (oversharing beyond the scope of the question)
   • Deduct 5 points for non-responsive answers (answering a different question than asked)
   • SCORE GUIDANCE:
     - 95-100: Surgical precision; answers exactly what is asked and nothing more.
     - 80-94: generally responsive; occasional over-explanation.
     - 60-79: Frequently evasive or frequently volunteers damaging unnecessary info.
     - 40-59: Hostile, non-responsive, or completely fails to address questions.
     - < 40: Refusal to testify or obstructionist.`
     : `• Evaluate if the witness accepts the premise of the question
   • Deduct for arguing with counsel unnecessarily
   • Deduct for pivoting to irrelevant topics
   • SCORE GUIDANCE:
     - 95-100: Directly addresses the questions; cooperative but firm.
     - 80-94: Mostly responsive; some unnecessary elaboration.
     - 60-79: Often drifts off-topic or argues over semantics.
     - 40-59: Consistently non-responsive.
     - < 40: Complete failure to engage.`}

4. **CONSISTENCY** (0-100):
   • Analyze stability under pressure.
   • Deduct 10-15 points if the witness changes their story after being pressed.
   • Deduct 5 points for contradicting a previous statement made in this same session.
   • SCORE GUIDANCE:
     - 95-100: Rock-solid; story did not change under pressure.
     - 80-94: Consistent on main points; slight wobbles on fringe details.
     - 60-79: Clarified or walked back several statements; visibly rattled.
     - 40-59: Contradicted self on material points; story changed significantly.
     - < 40: Admitted to lying or total collapse of narrative.

═══════════════════════════════════════════════════════════════
ANALYSIS REQUIREMENTS:
═══════════════════════════════════════════════════════════════

**HIGHLIGHTS** (3-5 specific observations):
- Quote specific strong moments: "At 02:15, when asked about the date, you correctly corrected the Counsel."
- Focus on tactical wins: "Successfully avoided the logic trap regarding X."
- Praise brevity and tone where applicable.

**RECOMMENDATIONS** (3-5 actionable improvements):
- Be prescriptive: "Stop saying 'I believe' for facts you know. Say 'Yes' or 'No'."
${hasKnowledgeBase ? '- Identify specific KB facts to memorize (e.g., "Review the timeline of the merger").\n' : ''}
- Address demeanor: "Don't interrupt the question; wait one beat before answering."

**FLAGGED SEGMENTS** (Maximum 5 significant issues):
- **Timestamp**: (MM:SS)
- **Issue Type**: (e.g., "Contradiction," "Oversharing," "Speculation")
- **Snippet**: "You stated X, but the record shows Y." or "You volunteered information Z which opened you up to attack."

**SUMMARY** (2-4 sentences):
- Provide a balanced verdict.
- If the score is >40%, acknowledge the basic competency.
- Define the primary area for growth (e.g., "Great recall, but too defensive" or "Polite, but factually shaky").

═══════════════════════════════════════════════════════════════
RESPONSE FORMAT (Valid JSON only):
{
  "accuracy": <integer 0-100>,
  "clarity": <integer 0-100>,
  "completeness": <integer 0-100>,
  "consistency": <integer 0-100>,
  "highlights": [
    "Specific strength 1",
    "Specific strength 2"
  ],
  "recommendations": [
    "Actionable tip 1",
    "Actionable tip 2"
  ],
  "flaggedSegments": [
    {
      "time": "MM:SS",
      "title": "Issue Type",
      "snippet": "Description of error"
    }
  ],
  "summary": "Narrative summary."
}`;
  }

  async callOpenAIForAnalysis(prompt) {
    // Try YTL ILMU first if configured
    if (this.useYTLIlmu && ytlIlmuService.isConfigured()) {
      try {
        console.log('📡 Calling YTL ILMU for detailed analysis...');
        const content = await ytlIlmuService.processQuery(prompt);
        console.log('✅ YTL ILMU Analysis Response received');

        try {
          const analysisData = JSON.parse(content);
          
          // Validate and normalize scores
          const normalizedData = {
            accuracy: this.normalizeScore(analysisData.accuracy),
            clarity: this.normalizeScore(analysisData.clarity),
            completeness: this.normalizeScore(analysisData.completeness),
            consistency: this.normalizeScore(analysisData.consistency),
            highlights: Array.isArray(analysisData.highlights) 
              ? analysisData.highlights.slice(0, 6) 
              : [],
            recommendations: Array.isArray(analysisData.recommendations) 
              ? analysisData.recommendations.slice(0, 6) 
              : [],
            flaggedSegments: Array.isArray(analysisData.flaggedSegments) 
              ? analysisData.flaggedSegments.slice(0, 10) 
              : [],
            summary: analysisData.summary || 'Analysis completed successfully.'
          };

          console.log('📊 Analysis Scores:', {
            accuracy: normalizedData.accuracy,
            clarity: normalizedData.clarity,
            completeness: normalizedData.completeness,
            consistency: normalizedData.consistency
          });

          return normalizedData;

        } catch (parseError) {
          console.error('❌ Failed to parse YTL ILMU JSON:', parseError.message);
          console.error('Raw content:', content);
          throw new Error('Invalid JSON response from YTL ILMU');
        }
      } catch (ytlError) {
        console.error('❌ YTL ILMU failed:', ytlError.message);
        console.log('⚠️ Falling back to OpenAI...');
        // Continue to OpenAI fallback below
      }
    }

    // Fallback to OpenAI if YTL ILMU fails or not configured
    try {
      console.log('📡 Calling OpenAI for detailed analysis...');
      
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a senior legal analyst with 20+ years of experience evaluating witness testimony. You are known for being thorough, realistic, and constructively critical. You provide evidence-based analysis that helps witnesses improve. Be specific, cite actual examples from the transcript, and give realistic scores (most witnesses score 60-80%, not 90%+). Always respond with valid JSON only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2500,
          temperature: 0.4,
          response_format: { type: "json_object" }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 60000,
        }
      );

      if (response.status === 200) {
        const content = response.data.choices?.[0]?.message?.content?.trim();
        console.log('✅ OpenAI Analysis Response received');
        
        try {
          const analysisData = JSON.parse(content);
          
          const normalizedData = {
            accuracy: this.normalizeScore(analysisData.accuracy),
            clarity: this.normalizeScore(analysisData.clarity),
            completeness: this.normalizeScore(analysisData.completeness),
            consistency: this.normalizeScore(analysisData.consistency),
            highlights: Array.isArray(analysisData.highlights) 
              ? analysisData.highlights.slice(0, 6) 
              : [],
            recommendations: Array.isArray(analysisData.recommendations) 
              ? analysisData.recommendations.slice(0, 6) 
              : [],
            flaggedSegments: Array.isArray(analysisData.flaggedSegments) 
              ? analysisData.flaggedSegments.slice(0, 10) 
              : [],
            summary: analysisData.summary || 'Analysis completed successfully.'
          };

          return normalizedData;

        } catch (parseError) {
          console.error('❌ Failed to parse OpenAI JSON:', parseError.message);
          throw new Error('Invalid JSON response from OpenAI');
        }
      } else {
        throw new Error(`OpenAI API returned status ${response.status}`);
      }

    } catch (error) {
      if (error.response) {
        console.error('❌ OpenAI API Error - Status:', error.response.status);
        console.error('❌ OpenAI API Error - Data:', JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error('❌ OpenAI Connection Error - No response received');
      } else {
        console.error('❌ OpenAI Analysis Error:', error.message);
      }
      throw error;
    }
  }

  normalizeScore(score) {
    const num = parseInt(score) || 0;
    return Math.max(0, Math.min(100, num));
  }

  getFallbackAnalysis(transcript) {
    console.log('⚠️ Using fallback analysis');
    
    const witnessMessageCount = transcript.filter(
      msg => msg.speaker && msg.speaker.toLowerCase() === 'witness'
    ).length;

    // Calculate basic scores based on transcript characteristics
    const baseScore = Math.min(85, 60 + witnessMessageCount * 3);

    return {
      accuracy: baseScore,
      clarity: Math.min(90, baseScore + 5),
      completeness: Math.max(70, baseScore - 5),
      consistency: Math.min(88, baseScore + 3),
      highlights: [
        'Participated actively in the interview session',
        'Provided responses to all questions asked',
        witnessMessageCount > 5 
          ? 'Maintained engagement throughout the session'
          : 'Completed the interview session'
      ],
      recommendations: [
        'Consider providing more detailed responses',
        'Practice articulating thoughts more clearly',
        'Review the knowledge base material for better preparation',
        'Work on reducing hesitations and filler words'
      ],
      flaggedSegments: [],
      summary: 'Analysis completed with limited AI capabilities. Scores are estimated based on transcript characteristics. For detailed analysis, please configure OpenAI API key.'
    };
  }

  isConfigured() {
    // Check if either YTL ILMU or OpenAI is configured
    const ytlConfigured = this.useYTLIlmu && ytlIlmuService.isConfigured();
    const openaiConfigured = !!this.apiKey && this.apiKey !== 'your_openai_api_key_here';
    
    return ytlConfigured || openaiConfigured;
  }

  getActiveProvider() {
    if (this.useYTLIlmu && ytlIlmuService.isConfigured()) {
      return 'YTL ILMU';
    } else if (this.apiKey) {
      return 'OpenAI';
    }
    return 'None';
  }
}

module.exports = new AnalysisService();

