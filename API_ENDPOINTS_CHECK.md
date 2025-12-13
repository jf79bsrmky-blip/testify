# API Endpoints Status Check

## YTL ILMU Configuration

### Base URL
- **Default**: `https://api.ytlailabs.tech`
- **Environment Variable**: `YTL_ILMU_BASE_URL`
- **Current Status**: Using default (not set in env)

### Main Endpoint
- **Endpoint**: `${baseURL}/v1/chat/completions`
- **Method**: POST
- **Full URL**: `https://api.ytlailabs.tech/v1/chat/completions`
- **Headers**:
  - `Authorization: Bearer {YTL_ILMU_API_KEY}`
  - `Content-Type: application/json`
- **Request Format**: OpenAI-compatible format
- **API Key Status**: ❌ NOT SET

### Configuration
- **Model**: `ilmu-trial` (default)
- **Max Tokens**: 2000 (default)
- **Temperature**: 0.3 (default)
- **Timeout**: 60000ms (60 seconds)

### Service Files
- `backend/services/ytlIlmuService.js` - Main service
- `lib/services/ytl-ilmu-service.ts` - Frontend service wrapper

---

## HeyGen Configuration

### Base URL
- **Default**: `https://api.heygen.com`
- **Environment Variable**: `HEYGEN_BASE_URL`
- **Current Status**: Using default (not set in env)

### Main Endpoints

#### 1. Create Streaming Token
- **Endpoint**: `/v1/streaming.create_token`
- **Full URL**: `https://api.heygen.com/v1/streaming.create_token`
- **Method**: POST
- **Headers**:
  - `X-API-KEY: {HEYGEN_API_KEY}`
  - `Content-Type: application/json`
- **Body**: `{}`
- **API Key Status**: ❌ NOT SET

#### 2. Create Streaming Session
- **Endpoint**: `/v1/streaming.new`
- **Full URL**: `https://api.heygen.com/v1/streaming.new`
- **Method**: POST
- **Headers**:
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Note**: Uses Bearer token (not X-API-KEY header)

#### 3. Start Streaming
- **Endpoint**: `/v1/streaming.start`
- **Full URL**: `https://api.heygen.com/v1/streaming.start`
- **Method**: POST
- **Headers**:
  - `X-API-KEY: {HEYGEN_API_KEY}`
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

#### 4. Send Task (Speak/Chat)
- **Endpoint**: `/v1/streaming.task`
- **Full URL**: `https://api.heygen.com/v1/streaming.task`
- **Method**: POST
- **Headers**:
  - `X-API-KEY: {HEYGEN_API_KEY}`
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

#### 5. Keep Alive
- **Endpoint**: `/v1/streaming.keep_alive`
- **Full URL**: `https://api.heygen.com/v1/streaming.keep_alive`
- **Method**: POST
- **Headers**:
  - `X-API-KEY: {HEYGEN_API_KEY}`
  - `Content-Type: application/json`

#### 6. Interrupt Speech
- **Endpoint**: `/v1/streaming.interrupt`
- **Full URL**: `https://api.heygen.com/v1/streaming.interrupt`
- **Method**: POST
- **Headers**:
  - `X-API-KEY: {HEYGEN_API_KEY}`
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

#### 7. Stop Session
- **Endpoint**: `/v1/streaming.stop`
- **Full URL**: `https://api.heygen.com/v1/streaming.stop`
- **Method**: POST
- **Headers**:
  - `X-API-KEY: {HEYGEN_API_KEY}`
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

#### 8. Create Knowledge Base
- **Endpoint**: `/v1/streaming/knowledge_base/create`
- **Full URL**: `https://api.heygen.com/v1/streaming/knowledge_base/create`
- **Method**: POST
- **Headers**:
  - `X-API-KEY: {HEYGEN_API_KEY}`
  - `Content-Type: application/json`

#### 9. Update Knowledge Base
- **Endpoint**: `/v1/streaming/knowledge_base/update`
- **Full URL**: `https://api.heygen.com/v1/streaming/knowledge_base/update`
- **Method**: POST
- **Headers**:
  - `X-API-KEY: {HEYGEN_API_KEY}`
  - `Content-Type: application/json`

#### 10. List Knowledge Bases
- **Endpoint**: `/v1/streaming/knowledge_base/list`
- **Full URL**: `https://api.heygen.com/v1/streaming/knowledge_base/list`
- **Method**: GET
- **Headers**:
  - `X-Api-Key: {HEYGEN_API_KEY}`
  - `Accept: application/json`

#### 11. Get Knowledge Base
- **Endpoint**: `/v1/streaming/knowledge_base/{knowledgeId}`
- **Full URL**: `https://api.heygen.com/v1/streaming/knowledge_base/{knowledgeId}`
- **Method**: GET
- **Headers**:
  - `X-Api-Key: {HEYGEN_API_KEY}`
  - `Accept: application/json`

### Service Files
- `backend/services/heygenService.js` - Main backend service
- `lib/services/heygen-service.ts` - Frontend service wrapper
- `app/api/heygen/token/route.ts` - Next.js API route for token creation

---

## Current Status Summary

### YTL ILMU
- ✅ Base URL configured (using default)
- ❌ API Key: NOT SET
- ✅ Endpoint format: OpenAI-compatible (`/v1/chat/completions`)
- ⚠️ Service will fail without API key

### HeyGen
- ✅ Base URL configured (using default)
- ❌ API Key: NOT SET
- ✅ All endpoints properly configured
- ⚠️ Service will return 500 errors without API key

---

## Environment Variables Required

### For YTL ILMU:
```env
YTL_ILMU_API_KEY=your_api_key_here
YTL_ILMU_BASE_URL=https://api.ytlailabs.tech  # Optional, uses default
YTL_ILMU_MODEL=ilmu-trial  # Optional, uses default
USE_YTL_ILMU=true  # Set to false to use OpenAI instead
```

### For HeyGen:
```env
HEYGEN_API_KEY=your_api_key_here
HEYGEN_BASE_URL=https://api.heygen.com  # Optional, uses default
HEYGEN_AVATAR_ID=your_avatar_id  # Optional
HEYGEN_DEFAULT_VOICE=your_voice_id  # Optional
```

---

## Notes

1. **YTL ILMU** uses OpenAI-compatible API format, so it should work with standard chat completion endpoints.

2. **HeyGen** requires a token to be created first before creating sessions. The token is obtained from `/v1/streaming.create_token`.

3. Both services are currently returning errors because API keys are not configured.

4. The endpoints are correctly configured in the code - they just need valid API keys to work.

