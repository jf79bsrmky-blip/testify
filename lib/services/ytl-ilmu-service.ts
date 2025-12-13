import axios from 'axios';

interface YTLIlmuMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface YTLIlmuResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class YTLIlmuService {
  private apiKey: string;
  private baseUrl: string;
  private model: string;
  private maxTokens: number;
  private temperature: number;
  private enabled: boolean;

  constructor() {
    this.apiKey = process.env.YTL_ILMU_API_KEY || '';
    this.baseUrl = process.env.YTL_ILMU_BASE_URL || 'https://api.ytlailabs.tech';
    this.model = process.env.YTL_ILMU_MODEL || 'ilmu-trial';
    this.maxTokens = parseInt(process.env.YTL_ILMU_MAX_TOKENS || '2000');
    this.temperature = parseFloat(process.env.YTL_ILMU_TEMPERATURE || '0.3');
    this.enabled = process.env.USE_YTL_ILMU === 'true';
  }

  async processMessage(
    message: string,
    conversationHistory: YTLIlmuMessage[] = [],
    knowledgeBaseContent?: string
  ): Promise<{ success: boolean; response?: string; error?: string }> {
    if (!this.enabled || !this.apiKey) {
      return {
        success: false,
        error: 'YTL ILMU service not configured or disabled',
      };
    }

    try {
      const messages: YTLIlmuMessage[] = [];

      // Add system message with knowledge base if provided
      if (knowledgeBaseContent) {
        messages.push({
          role: 'system',
          content: `You are a professional interviewer conducting a witness interview. Use the following knowledge base to inform your questions and responses:\n\n${knowledgeBaseContent}`,
        });
      } else {
        messages.push({
          role: 'system',
          content: 'You are a professional interviewer conducting a witness interview. Ask clear, relevant questions and provide constructive feedback.',
        });
      }

      // Add conversation history
      messages.push(...conversationHistory);

      // Add current message
      messages.push({
        role: 'user',
        content: message,
      });

      const response = await axios.post<YTLIlmuResponse>(
        `${this.baseUrl}/v1/chat/completions`,
        {
          model: this.model,
          messages,
          max_tokens: this.maxTokens,
          temperature: this.temperature,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
          timeout: 30000,
        }
      );

      return {
        success: true,
        response: response.data.choices[0].message.content,
      };
    } catch (error: any) {
      console.error('YTL ILMU API error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Failed to process message with YTL ILMU',
      };
    }
  }

  async processConversation(
    userMessage: string,
    knowledgeBaseContent: string | null | undefined,
    conversationHistory: YTLIlmuMessage[] = [],
    language: string | null | undefined = null
  ): Promise<{ success: boolean; response?: string; error?: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'YTL ILMU service not configured or disabled',
      };
    }

    try {
      console.log('💬 Processing conversation with YTL ILMU:', userMessage);
      console.log('📜 Conversation history length:', conversationHistory.length);
      if (language) {
        console.log('🌍 Response language:', language);
      }

      // Create conversation prompt with language
      const prompt = this.createConversationPrompt(userMessage, knowledgeBaseContent, conversationHistory, language);

      const response = await this.callYTLIlmuConversation(prompt, conversationHistory);

      if (response) {
        console.log('✅ YTL ILMU conversation response received');
        return {
          success: true,
          response: response,
        };
      } else {
        return {
          success: false,
          error: 'Empty response from YTL ILMU',
        };
      }
    } catch (error: any) {
      console.error('❌ YTL ILMU Conversation Error:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to process conversation',
      };
    }
  }

  createConversationPrompt(
    userMessage: string,
    knowledgeBaseContent: string | null | undefined,
    conversationHistory: YTLIlmuMessage[] = [],
    language: string | null | undefined = null
  ): string {
    const isCustomKnowledge = knowledgeBaseContent && knowledgeBaseContent.trim().length > 0;

    // Language mapping for natural language names
    const languageNames: Record<string, string> = {
      'en-US': 'English',
      'hi-IN': 'Hindi',
      'es-ES': 'Spanish',
      'fr-FR': 'French',
      'de-DE': 'German',
      'zh-CN': 'Chinese',
      'ja-JP': 'Japanese',
      'ko-KR': 'Korean',
      'ar-SA': 'Arabic',
      'pt-PT': 'Portuguese',
      'ru-RU': 'Russian',
      'it-IT': 'Italian',
      'nl-NL': 'Dutch',
      'pl-PL': 'Polish',
      'tr-TR': 'Turkish',
      'vi-VN': 'Vietnamese',
      'th-TH': 'Thai',
      'id-ID': 'Indonesian',
      'ms-MY': 'Malay',
      'sv-SE': 'Swedish',
      'no-NO': 'Norwegian',
      'da-DK': 'Danish',
      'fi-FI': 'Finnish',
      'cs-CZ': 'Czech',
      'sk-SK': 'Slovak',
      'hu-HU': 'Hungarian',
      'ro-RO': 'Romanian',
      'bg-BG': 'Bulgarian',
      'el-GR': 'Greek',
      'uk-UA': 'Ukrainian',
    };

    const languageName = language ? (languageNames[language] || 'English') : 'English';
    const languageInstruction = language && language !== 'en-US'
      ? `\n- CRITICAL: Respond ONLY in ${languageName}. Do NOT use English.`
      : '';

    if (isCustomKnowledge) {
      const isFirstMessage = conversationHistory.length === 0 ||
                            userMessage.toLowerCase().includes('hello') ||
                            userMessage.toLowerCase().includes('hi') ||
                            userMessage.toLowerCase().includes('hey') ||
                            userMessage.toLowerCase().includes('start') ||
                            userMessage.toLowerCase().includes('namaste') ||
                            userMessage.toLowerCase().includes('hola');

      if (isFirstMessage) {
        return `${knowledgeBaseContent}

USER'S GREETING: "${userMessage}"

INSTRUCTIONS FOR THIS RESPONSE:
- Greet them professionally and briefly
- Keep your response under 50 words (max 300 characters) for avatar speech${languageInstruction}

RESPONSE:`;
      } else {
        const questionsAsked = conversationHistory
          .filter(msg => msg.role === 'assistant' && msg.content.includes('?'))
          .map(msg => msg.content)
          .join('\n');

        return `${knowledgeBaseContent}

CONVERSATION HISTORY:
${questionsAsked || 'None yet'}

USER'S RESPONSE: "${userMessage}"

INSTRUCTIONS FOR THIS RESPONSE:
- Continue the conversation based on the user's response
- Keep your response under 50 words (max 300 characters) for avatar speech${languageInstruction}

RESPONSE:`;
      }
    } else {
      return `You are a professional legal interviewer conducting witness examinations.

USER MESSAGE: "${userMessage}"

INSTRUCTIONS:
- Respond professionally
- Ask clear, structured questions
- Keep response under 50 words (max 300 characters) for avatar speech
- Be calm and authoritative${languageInstruction}

RESPONSE:`;
    }
  }

  async callYTLIlmuConversation(prompt: string, conversationHistory: YTLIlmuMessage[] = []): Promise<string | null> {
    try {
      console.log('📡 Calling YTL ILMU API for conversation...');
      
      const messages: YTLIlmuMessage[] = [];
      
      messages.push({
        role: 'system',
        content: prompt,
      });
      
      const recentHistory = conversationHistory.slice(-10);
      messages.push(...recentHistory);
      
      console.log('📜 Sending', messages.length, 'messages to YTL ILMU');
      
      const response = await axios.post<YTLIlmuResponse>(
        `${this.baseUrl}/v1/chat/completions`,
        {
          model: this.model,
          messages: messages,
          max_tokens: 100, // Short responses for speech
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const content = response.data.choices[0].message?.content;
        if (content) {
          console.log('✅ YTL ILMU conversation response:', content.substring(0, 100) + '...');
          return content.trim();
        }
      }

      throw new Error('Invalid response format from YTL ILMU');
    } catch (error: any) {
      if (error.response) {
        console.error('❌ YTL ILMU API Error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('❌ YTL ILMU Network Error: No response received');
      } else {
        console.error('❌ YTL ILMU Error:', error.message);
      }
      throw error;
    }
  }

  isConfigured(): boolean {
    return this.enabled && !!this.apiKey && this.apiKey !== 'your_ytl_ilmu_api_key_here';
  }

  async healthCheck(): Promise<boolean> {
    if (!this.isConfigured()) {
      return false;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/health`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error) {
      console.error('YTL ILMU health check failed:', error);
      return false;
    }
  }
}

export const ytlIlmuService = new YTLIlmuService();

