import axios from 'axios';

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIService {
  private apiKey: string;
  private model: string;
  private maxTokens: number;
  private temperature: number;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
    this.maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS || '80');
    this.temperature = parseFloat(process.env.OPENAI_TEMPERATURE || '0.7');
  }

  async processMessage(
    message: string,
    conversationHistory: OpenAIMessage[] = [],
    knowledgeBaseContent?: string,
    jsonMode: boolean = false
  ): Promise<{ success: boolean; response?: string; error?: string }> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'OpenAI API key not configured',
      };
    }

    try {
      const messages: OpenAIMessage[] = [];

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

      const requestBody: any = {
        model: this.model,
        messages,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      };

      // Enable JSON mode if requested (only works with gpt-4-turbo-preview and later)
      if (jsonMode) {
        requestBody.response_format = { type: 'json_object' };
      }

      const response = await axios.post<OpenAIResponse>(
        'https://api.openai.com/v1/chat/completions',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      return {
        success: true,
        response: response.data.choices[0].message.content,
      };
    } catch (error: any) {
      console.error('OpenAI API error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Failed to process message with OpenAI',
      };
    }
  }

  async transcribeAudio(audioFile: Buffer): Promise<{ success: boolean; text?: string; error?: string }> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'OpenAI API key not configured',
      };
    }

    try {
      const formData = new FormData();
      // Convert Buffer to Blob - use type assertion to bypass TypeScript check
      const audioBlob = new Blob([audioFile as any], { type: 'audio/webm' });
      formData.append('file', audioBlob, 'audio.webm');
      formData.append('model', 'whisper-1');
      formData.append('response_format', 'verbose_json');

      const response = await axios.post(
        'https://api.openai.com/v1/audio/transcriptions',
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      return {
        success: true,
        text: response.data.text,
      };
    } catch (error: any) {
      console.error('Whisper API error:', error.response?.data || error.message);
      return {
        success: false,
        error: 'Failed to transcribe audio',
      };
    }
  }

  async processQuery(
    userMessage: string,
    knowledgeBaseContent: string | null | undefined = null,
    conversationHistory: OpenAIMessage[] = [],
    language: string | null | undefined = null
  ): Promise<string | null> {
    try {
      console.log('🤖 Processing query with OpenAI:', userMessage);
      console.log('📜 Conversation history length:', conversationHistory.length);
      if (language) {
        console.log('🌍 Response language:', language);
      }

      const prompt = this.createPrompt(userMessage, knowledgeBaseContent, conversationHistory, language);
      const response = await this.callOpenAI(prompt, conversationHistory);

      if (response) {
        console.log('✅ OpenAI response received');
        return response;
      } else {
        console.log('⚠️ OpenAI API failed, falling back to knowledge base');
        return this.getKnowledgeBaseResponse(userMessage, language);
      }
    } catch (error: any) {
      console.error('❌ OpenAI Service Error:', error.message);
      return this.getKnowledgeBaseResponse(userMessage, language);
    }
  }

  createPrompt(
    userMessage: string,
    knowledgeBaseContent: string | null | undefined,
    conversationHistory: OpenAIMessage[] = [],
    language: string | null | undefined = null
  ): string {
    const isCustomKnowledge = knowledgeBaseContent && knowledgeBaseContent.trim().length > 0;

    const languageNames: Record<string, string> = {
      'en-US': 'English', 'hi-IN': 'Hindi', 'es-ES': 'Spanish', 'fr-FR': 'French',
      'de-DE': 'German', 'zh-CN': 'Chinese', 'ja-JP': 'Japanese', 'ko-KR': 'Korean',
      'ar-SA': 'Arabic', 'pt-PT': 'Portuguese', 'ru-RU': 'Russian', 'it-IT': 'Italian',
      'nl-NL': 'Dutch', 'pl-PL': 'Polish', 'tr-TR': 'Turkish', 'vi-VN': 'Vietnamese',
      'th-TH': 'Thai', 'id-ID': 'Indonesian', 'ms-MY': 'Malay', 'sv-SE': 'Swedish',
      'no-NO': 'Norwegian', 'da-DK': 'Danish', 'fi-FI': 'Finnish', 'cs-CZ': 'Czech',
      'sk-SK': 'Slovak', 'hu-HU': 'Hungarian', 'ro-RO': 'Romanian', 'bg-BG': 'Bulgarian',
      'el-GR': 'Greek', 'uk-UA': 'Ukrainian',
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
                            userMessage.toLowerCase().includes('start');
      
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
      return `You are a professional legal interviewer (barrister) conducting structured witness examinations.

PERSONA: You are serious, respectful, and inquisitive — your goal is to uncover facts clearly and precisely.

ROLE: Claimant's Barrister (Interviewer)

USER MESSAGE: "${userMessage}"

INSTRUCTIONS:
- Greet the witness professionally and begin the examination
- Ask structured questions one at a time
- Maintain a calm, professional, and slightly authoritative tone
- CRITICAL: Keep responses under 50 words (max 300 characters) for avatar speech
- Wait for witness's answer before proceeding${languageInstruction}

RESPONSE:`;
    }
  }

  async callOpenAI(prompt: string, conversationHistory: OpenAIMessage[] = []): Promise<string | null> {
    try {
      console.log('🔑 OpenAI API Key configured:', this.apiKey ? 'Yes' : 'No');
      console.log('🤖 OpenAI Model:', this.model);
      console.log('📡 Calling OpenAI API...');
      
      const messages: OpenAIMessage[] = [];
      
      messages.push({
        role: 'system',
        content: prompt,
      });
      
      const recentHistory = conversationHistory.slice(-10);
      messages.push(...recentHistory);
      
      console.log('📜 Sending', messages.length, 'messages to OpenAI');
      
      const response = await axios.post<OpenAIResponse>(
        'https://api.openai.com/v1/chat/completions',
        {
          model: this.model,
          messages: messages,
          max_tokens: this.maxTokens,
          temperature: this.temperature,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      console.log('✅ OpenAI API Response Status:', response.status);
      
      if (response.status === 200) {
        const content = response.data.choices?.[0]?.message?.content?.trim();
        console.log('✅ OpenAI Response Content:', content ? `${content.substring(0, 100)}...` : 'empty');
        
        const maxResponseLength = 4000;
        if (content && content.length > maxResponseLength) {
          console.log(`⚠️ Response too long (${content.length} chars), truncating to ${maxResponseLength} chars`);
          const truncatedContent = content.substring(0, maxResponseLength);
          const lastSentenceEnd = truncatedContent.lastIndexOf('.');
          if (lastSentenceEnd > maxResponseLength * 0.8) {
            return truncatedContent.substring(0, lastSentenceEnd + 1);
          }
          return truncatedContent;
        }
        
        return content || null;
      } else {
        console.error('❌ OpenAI API Error - Status:', response.status);
        return null;
      }
    } catch (error: any) {
      if (error.response) {
        console.error('❌ OpenAI API Error - Status:', error.response.status);
        console.error('❌ OpenAI API Error - Data:', JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error('❌ OpenAI Connection Error - No response received');
      } else {
        console.error('❌ OpenAI Request Error:', error.message);
      }
      console.log('⚠️ Falling back to knowledge base responses');
      return null;
    }
  }

  getKnowledgeBaseResponse(userMessage: string, language: string | null | undefined = null): string {
    const message = userMessage.toLowerCase().trim();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || 
        message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening')) {
      return "Good day. I'm the claimant's counsel, and I'll be asking you a few questions to better understand your position and the facts of this case. Please answer truthfully and clearly. Let's begin with Q1: Please introduce yourself — your full name, role, and connection to this case.";
    }
    
    if (message.includes('how are you') || message.includes('how are you doing')) {
      return "Thank you for asking. Let's proceed with the examination. Please introduce yourself — your full name, role, and connection to this case.";
    }
    
    if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
      return "You're welcome. Let's continue. Is there anything else you wish to add to your testimony?";
    }
    
    return "I'm here to help! What would you like to know or discuss?";
  }

  isConfigured(): boolean {
    return !!this.apiKey && this.apiKey !== 'your_openai_api_key_here';
  }
}

export const openaiService = new OpenAIService();

