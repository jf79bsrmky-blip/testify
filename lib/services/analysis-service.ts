import { TranscriptEntry, SessionReportData } from '@/types';
import { openaiService } from './openai-service';
import { ytlIlmuService } from './ytl-ilmu-service';
import axios from 'axios';

interface AnalysisResult {
  accuracy: number;
  clarity: number;
  completeness: number;
  consistency: number;
  highlights: string[];
  recommendations: string[];
  flaggedSegments: Array<{
    time: string;
    title: string;
    snippet: string;
  }>;
  summary: string;
}

export class AnalysisService {
  private useYTLIlmu: boolean;
  private apiKey: string;
  private baseURL: string;
  private model: string;

  constructor() {
    this.useYTLIlmu = process.env.USE_YTL_ILMU !== 'false';
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.baseURL = 'https://api.openai.com/v1';
    this.model = process.env.OPENAI_MODEL || 'gpt-4o';

    console.log('🔧 Analysis Service Configuration:');
    console.log(`   Primary: ${this.useYTLIlmu ? 'YTL ILMU' : 'OpenAI'}`);
    console.log(`   YTL ILMU: ${ytlIlmuService.isConfigured() ? 'Configured ✅' : 'Not configured ⚠️'}`);
    console.log(`   OpenAI: ${this.apiKey ? 'Configured ✅' : 'Not configured ⚠️'}`);
  }

  async analyzeSession(
    transcript: TranscriptEntry[],
    knowledgeBase: string = '',
    options: { sessionDuration?: number } = {}
  ): Promise<AnalysisResult> {
    try {
      console.log('🔍 Starting session analysis...');
      console.log(`📝 Transcript messages: ${transcript.length}`);
      console.log(`📚 Knowledge base: ${knowledgeBase ? 'Provided' : 'None'}`);

      if (!transcript || transcript.length === 0) {
        throw new Error('Transcript is required for analysis');
      }

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

      const analysisPrompt = this.buildAnalysisPrompt(
        transcript,
        witnessResponses,
        interviewerQuestions,
        knowledgeBase,
        options
      );

      const analysisResult = await this.callOpenAIForAnalysis(analysisPrompt);

      console.log('✅ Analysis completed successfully');
      return analysisResult;
    } catch (error: any) {
      console.error('❌ Analysis Service Error:', error.message);
      return this.getFallbackAnalysis(transcript);
    }
  }

  buildAnalysisPrompt(
    transcript: TranscriptEntry[],
    witnessResponses: string,
    interviewerQuestions: string,
    knowledgeBase: string,
    options: { sessionDuration?: number }
  ): string {
    const hasKnowledgeBase = knowledgeBase && knowledgeBase.trim().length > 0;
    
    const conversationContext = transcript.map((msg) => {
      return `[${msg.timestamp || 'N/A'}] ${msg.speaker}: ${msg.text}`;
    }).join('\n');

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
EVALUATION CRITERIA (Be Realistic & Evidence-Based):
═══════════════════════════════════════════════════════════════

1. **CREDIBILITY / ACCURACY** (0-100):
   ${hasKnowledgeBase 
     ? `• Compare each statement against the knowledge base
   • Deduct 5-10 points for EACH factual error or misstatement
   • Deduct 3-5 points for EACH significant omission
   • Deduct 2-3 points for vague/uncertain language ("I think", "maybe")
   • Score 90-100: Perfect recall, all facts correct
   • Score 70-89: Mostly accurate, minor errors
   • Score 50-69: Some errors or omissions
   • Score below 50: Major factual problems`
     : `• Check for internal contradictions
   • Evaluate logical consistency
   • Assess confidence in statements
   • Score 90-100: Fully coherent, no contradictions
   • Score 70-89: Mostly consistent
   • Score 50-69: Some inconsistencies
   • Score below 50: Major contradictions`}

2. **CLARITY** (0-100):
   • Count filler words (um, uh, like, you know) - deduct 2 points each
   • Check for rambling or unfocused responses - deduct 5-10 points
   • Evaluate articulation and word choice
   • Assess if responses directly answer questions
   • Score 90-100: Crystal clear, professional communication
   • Score 70-89: Generally clear with minor issues
   • Score 50-69: Somewhat unclear, needs improvement
   • Score below 50: Difficult to understand

3. **COMPLETENESS** (0-100):
   ${hasKnowledgeBase
     ? `• Check if witness covered ALL major points from knowledge base
   • Deduct 10-15 points for each critical topic not mentioned
   • Deduct 5 points for superficial coverage of important topics
   • Award bonus points for volunteering relevant details
   • Score 90-100: Comprehensive, all key points covered
   • Score 70-89: Good coverage, minor omissions
   • Score 50-69: Important gaps in testimony
   • Score below 50: Severely incomplete`
     : `• Evaluate depth and detail of responses
   • Check if all aspects of questions were addressed
   • Assess thoroughness of explanations
   • Score 90-100: Very thorough and detailed
   • Score 70-89: Adequate detail
   • Score 50-69: Lacking detail
   • Score below 50: Too brief or superficial`}

4. **CONSISTENCY** (0-100):
   • Analyze for contradictory statements across the conversation
   • Check if details align (times, places, events)
   • Look for changes in story or facts
   • Evaluate narrative coherence
   • Score 90-100: Perfectly consistent throughout
   • Score 70-89: Generally consistent, very minor discrepancies
   • Score 50-69: Noticeable inconsistencies
   • Score below 50: Major contradictions

═══════════════════════════════════════════════════════════════
ANALYSIS REQUIREMENTS:
═══════════════════════════════════════════════════════════════

**HIGHLIGHTS** (3-5 specific observations):
- Reference actual quotes or moments from transcript (with timestamps if possible)
- Be specific: "At 02:15, clearly stated X" not just "Good recall"
- Focus on STRENGTHS and positive moments
- Make them evidence-based

**RECOMMENDATIONS** (3-5 actionable improvements):
- Be SPECIFIC and PRACTICAL
${hasKnowledgeBase ? '- Reference specific knowledge base points that were missed\n' : ''}
- Provide clear action items: "Practice X" or "Review Y"
- Prioritize the most impactful improvements
- Make them achievable and constructive

**FLAGGED SEGMENTS** (if any issues found):
- Include timestamp (MM:SS format)
- Specific title describing the issue
- Brief snippet explaining the problem
${hasKnowledgeBase ? '- Flag: factual errors vs KB, omissions, contradictions\n' : '- Flag: contradictions, vague statements, unclear responses\n'}
- Maximum 5 most important issues

**SUMMARY** (2-4 sentences):
- Overall performance assessment
- Key strengths and weaknesses
${hasKnowledgeBase ? '- Specific reference to knowledge base performance\n' : ''}
- Balanced and professional tone

═══════════════════════════════════════════════════════════════
IMPORTANT SCORING GUIDELINES:
═══════════════════════════════════════════════════════════════

- BE REALISTIC: Most people score 60-85%, not 90-100%
- BE CRITICAL: Identify real issues, don't be overly generous
- BE EVIDENCE-BASED: Every score should reflect actual observations
- VARY SCORES: Different dimensions should have different scores based on performance
${hasKnowledgeBase ? '- BE STRICT ON ACCURACY: Knowledge base comparison should be precise\n' : ''}
- NO GENERIC RESPONSES: Make everything specific to THIS testimony

RESPONSE FORMAT (Valid JSON only):
{
  "accuracy": <realistic number 0-100>,
  "clarity": <realistic number 0-100>,
  "completeness": <realistic number 0-100>,
  "consistency": <realistic number 0-100>,
  "highlights": [
    "Specific highlight with timestamp/quote",
    "Another specific positive observation"
  ],
  "recommendations": [
    "Specific, actionable improvement with clear action",
    "Another practical recommendation"
  ],
  "flaggedSegments": [
    {
      "time": "02:15",
      "title": "Specific issue type",
      "snippet": "Detailed explanation of the problem"
    }
  ],
  "summary": "Comprehensive 2-4 sentence assessment with specific observations and balanced evaluation of performance."
}`;
  }

  async callOpenAIForAnalysis(prompt: string): Promise<AnalysisResult> {
    if (this.useYTLIlmu && ytlIlmuService.isConfigured()) {
      try {
        console.log('📡 Calling YTL ILMU for detailed analysis...');
        const result = await ytlIlmuService.processMessage(prompt, [], undefined);
        if (result.success && result.response) {
          const content = result.response;
          console.log('✅ YTL ILMU Analysis Response received');

          try {
            let cleanedContent = content.trim();
            if (cleanedContent.startsWith('```')) {
              cleanedContent = cleanedContent.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
            }
            const analysisData = JSON.parse(cleanedContent);
            
        return {
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
          } catch (parseError: any) {
            console.error('❌ Failed to parse YTL ILMU JSON:', parseError.message);
            throw new Error('Invalid JSON response from YTL ILMU');
          }
        }
      } catch (ytlError: any) {
        console.error('❌ YTL ILMU failed:', ytlError.message);
        console.log('⚠️ Falling back to OpenAI...');
      }
    }

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
          let cleanedContent = content.trim();
          if (cleanedContent.startsWith('```')) {
            cleanedContent = cleanedContent.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
          }
          const analysisData = JSON.parse(cleanedContent);

        return {
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
        } catch (parseError: any) {
          console.error('❌ Failed to parse OpenAI JSON:', parseError.message);
          throw new Error('Invalid JSON response from OpenAI');
        }
      } else {
        throw new Error(`OpenAI API returned status ${response.status}`);
      }
    } catch (error: any) {
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

  normalizeScore(score: any): number {
    const num = parseInt(String(score)) || 0;
    return Math.max(0, Math.min(100, num));
  }

  getFallbackAnalysis(transcript: TranscriptEntry[]): AnalysisResult {
    console.log('⚠️ Using fallback analysis');
    
    const witnessMessageCount = transcript.filter(
      msg => msg.speaker && msg.speaker.toLowerCase() === 'witness'
    ).length;

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

  isConfigured(): boolean {
    const ytlConfigured = this.useYTLIlmu && ytlIlmuService.isConfigured();
    const openaiConfigured = !!this.apiKey && this.apiKey !== 'your_openai_api_key_here';
    return ytlConfigured || openaiConfigured;
  }

  getActiveProvider(): string {
    if (this.useYTLIlmu && ytlIlmuService.isConfigured()) {
      return 'YTL ILMU';
    } else if (this.apiKey) {
      return 'OpenAI';
    }
    return 'None';
  }
}

export const analysisService = new AnalysisService();
