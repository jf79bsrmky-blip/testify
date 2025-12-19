(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ======================================================
// GLOBAL TYPES FOR THE ENTIRE TESTIFY APPLICATION
// ======================================================
// ============================
// AUTH TYPES
// ============================
__turbopack_context__.s([
    "AVAILABLE_AVATARS",
    ()=>AVAILABLE_AVATARS
]);
const AVAILABLE_AVATARS = [
    // Men (Lawyers)
    {
        id: 'Dexter_Lawyer_Sitting_public',
        name: 'Dexter-English-Male'
    },
    {
        id: 'Pedro_Chair_Sitting_public',
        name: 'Pedro-Mexican-Male'
    },
    {
        id: 'Anthony_Chair_Sitting_public',
        name: 'Anthony-Argentine-Male'
    },
    {
        id: 'Graham_Chair_Sitting_public',
        name: 'Graham-American-Male'
    },
    // Women (Lawyers)
    {
        id: 'Judy_Lawyer_Sitting2_public',
        name: 'Judy-American-Female'
    },
    {
        id: 'Anastasia_Chair_Sitting_public',
        name: 'Anastasia-Greek-Female'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/session-config/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SessionConfigPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const LANGUAGES = [
    {
        name: 'Bulgarian',
        code: 'bg-BG'
    },
    {
        name: 'Chinese',
        code: 'zh-CN'
    },
    {
        name: 'Czech',
        code: 'cs-CZ'
    },
    {
        name: 'Danish',
        code: 'da-DK'
    },
    {
        name: 'Dutch',
        code: 'nl-NL'
    },
    {
        name: 'English',
        code: 'en-US'
    },
    {
        name: 'Finnish',
        code: 'fi-FI'
    },
    {
        name: 'French',
        code: 'fr-FR'
    },
    {
        name: 'German',
        code: 'de-DE'
    },
    {
        name: 'Greek',
        code: 'el-GR'
    },
    {
        name: 'Hindi',
        code: 'hi-IN'
    },
    {
        name: 'Hungarian',
        code: 'hu-HU'
    },
    {
        name: 'Indonesian',
        code: 'id-ID'
    },
    {
        name: 'Italian',
        code: 'it-IT'
    },
    {
        name: 'Japanese',
        code: 'ja-JP'
    },
    {
        name: 'Korean',
        code: 'ko-KR'
    },
    {
        name: 'Malay',
        code: 'ms-MY'
    },
    {
        name: 'Norwegian',
        code: 'no-NO'
    },
    {
        name: 'Polish',
        code: 'pl-PL'
    },
    {
        name: 'Portuguese',
        code: 'pt-PT'
    },
    {
        name: 'Romanian',
        code: 'ro-RO'
    },
    {
        name: 'Russian',
        code: 'ru-RU'
    },
    {
        name: 'Slovak',
        code: 'sk-SK'
    },
    {
        name: 'Spanish',
        code: 'es-ES'
    },
    {
        name: 'Swedish',
        code: 'sv-SE'
    },
    {
        name: 'Turkish',
        code: 'tr-TR'
    },
    {
        name: 'Ukrainian',
        code: 'uk-UA'
    },
    {
        name: 'Vietnamese',
        code: 'vi-VN'
    }
];
function SessionConfigPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, isAuthenticated, loading: authLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [avatarId, setAvatarId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVAILABLE_AVATARS"][0].id);
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('medium');
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en-US');
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [uploadProgress, setUploadProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SessionConfigPage.useEffect": ()=>{
            // Wait for auth to finish loading before checking authentication
            if (authLoading) {
                return;
            }
            if (!isAuthenticated) {
                router.push('/login');
            }
        }
    }["SessionConfigPage.useEffect"], [
        isAuthenticated,
        authLoading,
        router
    ]);
    const handleFileChange = (e)=>{
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Validate file type
            const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
            if (![
                'txt',
                'pdf',
                'docx'
            ].includes(fileType || '')) {
                setError('Only TXT, PDF, and DOCX files are supported');
                return;
            }
            setFile(selectedFile);
            setError('');
        }
    };
    const handleStartSession = async (e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            let kbId = undefined;
            // Upload knowledge base if file is selected
            if (file) {
                setUploadProgress('Uploading knowledge base...');
                console.log('📤 Uploading knowledge base file:', file.name);
                const uploadResult = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].uploadFile('/api/knowledge-base/upload', file);
                if (uploadResult.success && (uploadResult.knowledgeBaseId || uploadResult.knowledgeBase?.id)) {
                    // Backend returns knowledgeBaseId (UUID format), but also check knowledgeBase.id for compatibility
                    kbId = uploadResult.knowledgeBaseId || uploadResult.knowledgeBase?.id;
                    console.log('✅ Knowledge base uploaded, ID:', kbId);
                    if (kbId) {
                        console.log('   - Uploaded KB ID format:', kbId.startsWith('kb_') ? 'HeyGen format (unexpected - should be UUID)' : 'UUID format (correct)');
                    }
                    console.log('   - This uploaded KB will be converted to HeyGen KB when session starts');
                } else {
                    console.error('❌ Upload failed or missing knowledgeBaseId:', uploadResult);
                    throw new Error('Failed to upload knowledge base or missing ID');
                }
            } else {
                // No file uploaded - use default knowledge base
                setUploadProgress('Using default knowledge base...');
                console.log('📚 No file uploaded, using default knowledge base');
                // Use the default KB ID directly (matches backend DEFAULT_KB_ID)
                kbId = '00000000-0000-0000-0000-000000000001';
                console.log('✅ Using default knowledge base, ID:', kbId);
                console.log('   - Default KB: Legal Interview Protocol');
                console.log('   - This KB will be converted to HeyGen KB when session starts');
                console.log('   - KB ID will be stored in session as knowledgeBaseId');
            }
            // Verify kbId is set before creating session
            if (!kbId) {
                console.error('❌ CRITICAL: kbId is undefined! This should not happen.');
                throw new Error('Knowledge base ID is missing');
            }
            console.log('🔍 Pre-session creation check - kbId:', kbId);
            // Map difficulty to quality for backend compatibility
            // easy -> low, medium -> medium, hard -> high
            const qualityMap = {
                easy: 'low',
                medium: 'medium',
                hard: 'high'
            };
            const quality = qualityMap[difficulty];
            // Create session
            setUploadProgress('Creating session...');
            console.log('📝 Creating session with data:', {
                userId: user?.id,
                avatarId,
                difficulty,
                quality,
                language,
                // Only include knowledgeBaseId if we actually have one
                ...kbId ? {
                    knowledgeBaseId: kbId
                } : {}
            });
            const sessionPayload = {
                userId: user?.id,
                avatarId,
                quality,
                language
            };
            if (kbId) {
                sessionPayload.knowledgeBaseId = kbId;
                console.log('📚 Session will be created with knowledgeBaseId:', kbId);
            } else {
                console.warn('⚠️ No knowledge base ID - session will be created without KB');
            }
            const sessionResult = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/sessions', sessionPayload);
            console.log('✅ Session created:', sessionResult);
            if (sessionResult.success) {
                // Store session in localStorage as backup
                localStorage.setItem(`session_${sessionResult.session.id}`, JSON.stringify(sessionResult.session));
                console.log('💾 Session stored in localStorage');
                // Navigate to live session
                router.push(`/live?sessionId=${sessionResult.session.id}`);
            } else {
                throw new Error('Failed to create session');
            }
        } catch (err) {
            setError(err.message || 'Failed to start session');
        } finally{
            setLoading(false);
            setUploadProgress('');
        }
    };
    if (!isAuthenticated || !user) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white border-b border-gray-200 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-brand-navy-900 tracking-tight",
                            children: "Configure Session"
                        }, void 0, false, {
                            fileName: "[project]/app/session-config/page.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push('/lobby'),
                            className: "px-4 py-2 text-sm font-semibold text-brand-navy-900 hover:text-brand-gold-500 transition-colors rounded-xl hover:bg-gray-100",
                            children: "← Back to Lobby"
                        }, void 0, false, {
                            fileName: "[project]/app/session-config/page.tsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/session-config/page.tsx",
                    lineNumber: 189,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/session-config/page.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleStartSession,
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "file",
                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                    children: [
                                        "Upload Case Materials ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-400 font-normal",
                                            children: "(Optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/session-config/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 205,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mb-4",
                                    children: "Upload TXT, PDF, or DOCX files (less than 300 pages)"
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "file",
                                    type: "file",
                                    accept: ".txt,.pdf,.docx",
                                    onChange: handleFileChange,
                                    className: "block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-navy-900 file:text-white hover:file:bg-brand-gold-500 file:transition-all file:duration-200 file:shadow-sm hover:file:shadow-md cursor-pointer"
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this),
                                file ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 p-3 bg-green-50 border border-green-200 rounded-xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-green-700 font-medium",
                                        children: [
                                            "✓ Selected: ",
                                            file.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/session-config/page.tsx",
                                        lineNumber: 220,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-blue-700 font-medium",
                                        children: "ℹ️ No file selected — Default Legal Interview Protocol will be used"
                                    }, void 0, false, {
                                        fileName: "[project]/app/session-config/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 225,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/session-config/page.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "avatar",
                                    className: "block text-sm font-semibold text-gray-700 mb-3",
                                    children: "Select Avatar"
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "avatar",
                                    value: avatarId,
                                    onChange: (e)=>setAvatarId(e.target.value),
                                    className: "w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent transition-all duration-200",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVAILABLE_AVATARS"].map((avatar)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: avatar.id,
                                            children: avatar.name
                                        }, avatar.id, false, {
                                            fileName: "[project]/app/session-config/page.tsx",
                                            lineNumber: 245,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/session-config/page.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-semibold text-gray-700 mb-4",
                                    children: "Session Difficulty"
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4",
                                    children: [
                                        'easy',
                                        'medium',
                                        'hard'
                                    ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center cursor-pointer group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "difficulty",
                                                    value: d,
                                                    checked: difficulty === d,
                                                    onChange: (e)=>setDifficulty(e.target.value),
                                                    className: "w-4 h-4 text-brand-navy-900 border-gray-300 focus:ring-brand-navy-900 focus:ring-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/session-config/page.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 capitalize text-gray-700 group-hover:text-brand-navy-900 transition-colors font-medium",
                                                    children: d
                                                }, void 0, false, {
                                                    fileName: "[project]/app/session-config/page.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, d, true, {
                                            fileName: "[project]/app/session-config/page.tsx",
                                            lineNumber: 259,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mt-3",
                                    children: "Select the difficulty level for this interview session"
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 274,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/session-config/page.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "language",
                                    className: "block text-sm font-semibold text-gray-700 mb-3",
                                    children: "Select Language"
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 281,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "language",
                                    value: language,
                                    onChange: (e)=>setLanguage(e.target.value),
                                    className: "w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-navy-900 focus:border-transparent transition-all duration-200",
                                    children: LANGUAGES.map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: lang.code,
                                            children: lang.name
                                        }, lang.code, false, {
                                            fileName: "[project]/app/session-config/page.tsx",
                                            lineNumber: 291,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mt-2",
                                    children: "Avatar will speak and understand in the selected language"
                                }, void 0, false, {
                                    fileName: "[project]/app/session-config/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/session-config/page.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium animate-slide-down",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/session-config/page.tsx",
                            lineNumber: 302,
                            columnNumber: 13
                        }, this),
                        uploadProgress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-50 border-2 border-blue-200 text-blue-700 px-5 py-4 rounded-xl text-sm font-medium animate-slide-down",
                            children: uploadProgress
                        }, void 0, false, {
                            fileName: "[project]/app/session-config/page.tsx",
                            lineNumber: 308,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "w-full px-6 py-4 min-h-[52px] bg-brand-navy-900 text-white rounded-xl font-semibold hover:bg-brand-navy-800 active:bg-brand-navy-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg touch-manipulation",
                            style: {
                                WebkitTapHighlightColor: 'transparent'
                            },
                            children: loading ? 'Starting Session...' : 'Start Interview Session'
                        }, void 0, false, {
                            fileName: "[project]/app/session-config/page.tsx",
                            lineNumber: 313,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/session-config/page.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/session-config/page.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/session-config/page.tsx",
        lineNumber: 186,
        columnNumber: 5
    }, this);
}
_s(SessionConfigPage, "ob7HRs2SCluCmF5TlyADdtQ40CI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = SessionConfigPage;
var _c;
__turbopack_context__.k.register(_c, "SessionConfigPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_9ce02a84._.js.map