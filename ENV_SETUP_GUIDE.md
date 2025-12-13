# Environment Variables Setup Guide

## Environment File Names

The project uses **`.env.production`** (preferred) or **`.env`** (fallback).

The server loads them in this order:
1. First tries: `.env.production` (in the root directory)
2. If not found, tries: `.env` (in the root directory)

## Where to Create the File

Create the environment file in the **root directory** of the project (same level as `server.js`):

```
Project/
├── server.js          ← Same level as this
├── .env.production    ← Create here (or .env)
├── package.json
├── app/
├── backend/
└── ...
```

## How to Add Your API Keys

### Option 1: Create `.env.production` (Recommended)

Create a file named `.env.production` in the root directory with:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# ===== YTL ILMU Configuration =====
USE_YTL_ILMU=true
YTL_ILMU_API_KEY=your_actual_ytl_ilmu_api_key_here
YTL_ILMU_BASE_URL=https://api.ytlailabs.tech
YTL_ILMU_MODEL=ilmu-trial
YTL_ILMU_MAX_TOKENS=2000
YTL_ILMU_TEMPERATURE=0.3

# ===== OpenAI Configuration (Fallback) =====
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.3

# ===== HeyGen Configuration =====
HEYGEN_API_KEY=your_actual_heygen_api_key_here
HEYGEN_BASE_URL=https://api.heygen.com
HEYGEN_AVATAR_ID=your_default_avatar_id_here
HEYGEN_DEFAULT_VOICE=your_default_voice_id_here

# Session Configuration
SESSION_SECRET=your_random_secret_string_here
SESSION_TIMEOUT=3600000
```

### Option 2: Create `.env` (Alternative)

If you prefer `.env`, create it with the same content as above.

## Required API Keys

### Minimum Required (to fix current errors):

1. **YTL ILMU API Key**
   ```env
   YTL_ILMU_API_KEY=your_key_here
   ```

2. **HeyGen API Key**
   ```env
   HEYGEN_API_KEY=your_key_here
   ```

## Quick Setup Steps

1. **Create the file** in the root directory:
   - Windows: Create `.env.production` or `.env` file
   - You can copy from `backend/env.example` as a template

2. **Add your API keys**:
   - Replace `your_actual_ytl_ilmu_api_key_here` with your real YTL ILMU API key
   - Replace `your_actual_heygen_api_key_here` with your real HeyGen API key

3. **Restart the server** for changes to take effect

## Example File Location

```
C:\Users\attarat.local\Desktop\Project\.env.production
```

or

```
C:\Users\attarat.local\Desktop\Project\.env
```

## Important Notes

- ⚠️ **Never commit** `.env` or `.env.production` to git (they should be in `.gitignore`)
- ✅ The `backend/env.example` file is just a template - it won't be loaded automatically
- 🔄 You need to restart the server after adding/changing environment variables
- 🔑 Replace all placeholder values with your actual API keys

## Verification

After creating the file and restarting the server, you should see:
- ✅ `API Key: Configured` instead of `API Key: NOT SET` in the startup logs
- ✅ No more 401/500 errors from HeyGen endpoints
- ✅ YTL ILMU service working properly

