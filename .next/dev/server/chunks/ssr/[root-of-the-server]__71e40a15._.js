module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/components/heygen/StreamingAvatarProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageSender",
    ()=>MessageSender,
    "StreamingAvatarProvider",
    ()=>StreamingAvatarProvider,
    "StreamingAvatarSessionState",
    ()=>StreamingAvatarSessionState,
    "getKnowledgeBaseId",
    ()=>getKnowledgeBaseId,
    "setKnowledgeBaseId",
    ()=>setKnowledgeBaseId,
    "useStreamingAvatarContext",
    ()=>useStreamingAvatarContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@heygen/streaming-avatar/lib/index.esm.js [app-ssr] (ecmascript)");
"use client";
;
;
;
// Knowledge base ID for YTL LLM (uploaded KBs, not HeyGen KBs)
let globalKnowledgeBaseId = undefined;
const setKnowledgeBaseId = (id)=>{
    globalKnowledgeBaseId = id;
    console.log('📚 Global knowledge base ID set for YTL LLM:', id || 'none');
};
const getKnowledgeBaseId = ()=>{
    return globalKnowledgeBaseId;
};
var StreamingAvatarSessionState = /*#__PURE__*/ function(StreamingAvatarSessionState) {
    StreamingAvatarSessionState["INACTIVE"] = "inactive";
    StreamingAvatarSessionState["CONNECTING"] = "connecting";
    StreamingAvatarSessionState["CONNECTED"] = "connected";
    return StreamingAvatarSessionState;
}({});
var MessageSender = /*#__PURE__*/ function(MessageSender) {
    MessageSender["CLIENT"] = "CLIENT";
    MessageSender["AVATAR"] = "AVATAR";
    return MessageSender;
}({});
const StreamingAvatarContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createContext({
    avatarRef: {
        current: null
    },
    basePath: undefined,
    isMuted: false,
    setIsMuted: ()=>{},
    isVoiceChatLoading: false,
    setIsVoiceChatLoading: ()=>{},
    isVoiceChatActive: false,
    setIsVoiceChatActive: ()=>{},
    sessionState: "inactive",
    setSessionState: ()=>{},
    stream: null,
    setStream: ()=>{},
    messages: [],
    clearMessages: ()=>{},
    handleUserTalkingMessage: ()=>{},
    handleStreamingTalkingMessage: ()=>{},
    handleEndMessage: ()=>{},
    isListening: false,
    setIsListening: ()=>{},
    isUserTalking: false,
    setIsUserTalking: ()=>{},
    isAvatarTalking: false,
    setIsAvatarTalking: ()=>{},
    connectionQuality: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectionQuality"].UNKNOWN,
    setConnectionQuality: ()=>{}
});
const useStreamingAvatarSessionState = ()=>{
    const [sessionState, setSessionState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("inactive");
    const [stream, setStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    return {
        sessionState,
        setSessionState,
        stream,
        setStream
    };
};
const useStreamingAvatarVoiceChatState = ()=>{
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false); // Default to unmuted (mic open)
    const [isVoiceChatLoading, setIsVoiceChatLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVoiceChatActive, setIsVoiceChatActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return {
        isMuted,
        setIsMuted,
        isVoiceChatLoading,
        setIsVoiceChatLoading,
        isVoiceChatActive,
        setIsVoiceChatActive
    };
};
const useStreamingAvatarMessageState = ()=>{
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const currentSenderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleUserTalkingMessage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(({ detail })=>{
        if (currentSenderRef.current === "CLIENT") {
            setMessages((prev)=>[
                    ...prev.slice(0, -1),
                    {
                        ...prev[prev.length - 1],
                        content: [
                            prev[prev.length - 1].content,
                            detail.message
                        ].join("")
                    }
                ]);
        } else {
            currentSenderRef.current = "CLIENT";
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: Date.now().toString(),
                        sender: "CLIENT",
                        content: detail.message
                    }
                ]);
        }
    }, []);
    const handleStreamingTalkingMessage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(({ detail })=>{
        if (currentSenderRef.current === "AVATAR") {
            setMessages((prev)=>[
                    ...prev.slice(0, -1),
                    {
                        ...prev[prev.length - 1],
                        content: [
                            prev[prev.length - 1].content,
                            detail.message
                        ].join("")
                    }
                ]);
        } else {
            currentSenderRef.current = "AVATAR";
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: Date.now().toString(),
                        sender: "AVATAR",
                        content: detail.message
                    }
                ]);
        }
    }, []);
    const handleEndMessage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        currentSenderRef.current = null;
    }, []);
    return {
        messages,
        clearMessages: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
            setMessages([]);
            currentSenderRef.current = null;
        }, []),
        handleUserTalkingMessage,
        handleStreamingTalkingMessage,
        handleEndMessage
    };
};
const useStreamingAvatarListeningState = ()=>{
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return {
        isListening,
        setIsListening
    };
};
const useStreamingAvatarTalkingState = ()=>{
    const [isUserTalking, setIsUserTalking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAvatarTalking, setIsAvatarTalking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return {
        isUserTalking,
        setIsUserTalking,
        isAvatarTalking,
        setIsAvatarTalking
    };
};
const useStreamingAvatarConnectionQualityState = ()=>{
    const [connectionQuality, setConnectionQuality] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectionQuality"].UNKNOWN);
    return {
        connectionQuality,
        setConnectionQuality
    };
};
const StreamingAvatarProvider = ({ children, basePath })=>{
    const avatarRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const voiceChatState = useStreamingAvatarVoiceChatState();
    const sessionState = useStreamingAvatarSessionState();
    const messageState = useStreamingAvatarMessageState();
    const listeningState = useStreamingAvatarListeningState();
    const talkingState = useStreamingAvatarTalkingState();
    const connectionQualityState = useStreamingAvatarConnectionQualityState();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        console.log('🎭 StreamingAvatarProvider initialized with basePath:', basePath || 'default (https://api.heygen.com)');
    }, [
        basePath
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StreamingAvatarContext.Provider, {
        value: {
            avatarRef,
            basePath,
            ...voiceChatState,
            ...sessionState,
            ...messageState,
            ...listeningState,
            ...talkingState,
            ...connectionQualityState
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/heygen/StreamingAvatarProvider.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useStreamingAvatarContext = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useContext(StreamingAvatarContext);
}),
"[project]/components/heygen/hooks/useVoiceChat.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVoiceChat",
    ()=>useVoiceChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/StreamingAvatarProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
const useVoiceChat = ()=>{
    const { avatarRef, isMuted, setIsMuted, isVoiceChatActive, setIsVoiceChatActive, isVoiceChatLoading, setIsVoiceChatLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStreamingAvatarContext"])();
    const startVoiceChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (isInputAudioMuted = false)=>{
        if (!avatarRef.current) {
            console.warn('⚠️ Cannot start voice chat: avatar not initialized');
            return;
        }
        console.log('🎤 Starting voice chat with mute state:', isInputAudioMuted);
        console.log('📊 Avatar ref status:', {
            hasAvatarRef: !!avatarRef.current,
            avatarType: avatarRef.current?.constructor?.name
        });
        setIsVoiceChatLoading(true);
        try {
            // Start voice chat with HeyGen SDK (it will handle microphone permissions)
            console.log('📞 Calling avatarRef.current.startVoiceChat with options:', {
                isInputAudioMuted
            });
            const result = await avatarRef.current?.startVoiceChat({
                isInputAudioMuted
            });
            console.log('📞 startVoiceChat returned:', result);
            setIsVoiceChatLoading(false);
            setIsVoiceChatActive(true);
            setIsMuted(isInputAudioMuted);
            console.log('✅ Voice chat started successfully, microphone is', isInputAudioMuted ? 'MUTED' : 'UNMUTED');
        } catch (error) {
            console.error('❌ Failed to start voice chat:', error);
            console.error('Error details:', {
                message: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
                name: error instanceof Error ? error.name : undefined,
                error: error
            });
            // Provide user-friendly error message
            let userMessage = 'Failed to start microphone. ';
            if (error instanceof Error) {
                if (error.message.includes('permission') || error.message.includes('Permission')) {
                    userMessage += 'Please allow microphone access in your browser settings and try again.';
                } else if (error.message.includes('NotAllowedError') || error.name === 'NotAllowedError') {
                    userMessage += 'Microphone permission was denied. Please allow access and try again.';
                } else if (error.message.includes('NotFoundError') || error.name === 'NotFoundError') {
                    userMessage += 'No microphone found. Please connect a microphone and try again.';
                } else {
                    userMessage += error.message;
                }
            } else {
                userMessage += 'Please check your browser console for details.';
            }
            setIsVoiceChatLoading(false);
            setIsVoiceChatActive(false);
            // Create a new error with user-friendly message
            const userError = new Error(userMessage);
            throw userError;
        }
    }, [
        avatarRef,
        setIsMuted,
        setIsVoiceChatActive,
        setIsVoiceChatLoading
    ]);
    const stopVoiceChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!avatarRef.current) return;
        avatarRef.current?.closeVoiceChat();
        setIsVoiceChatActive(false);
        setIsMuted(true);
    }, [
        avatarRef,
        setIsMuted,
        setIsVoiceChatActive
    ]);
    const muteInputAudio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!avatarRef.current) {
            console.warn('⚠️ Cannot mute: avatar not initialized');
            return;
        }
        console.log('🔇 Muting microphone...');
        avatarRef.current?.muteInputAudio();
        setIsMuted(true);
        console.log('✅ Microphone muted');
    }, [
        avatarRef,
        setIsMuted
    ]);
    const unmuteInputAudio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!avatarRef.current) {
            console.warn('⚠️ Cannot unmute: avatar not initialized');
            return;
        }
        console.log('🔊 Unmuting microphone...');
        avatarRef.current?.unmuteInputAudio();
        setIsMuted(false);
        console.log('✅ Microphone unmuted');
    }, [
        avatarRef,
        setIsMuted
    ]);
    return {
        startVoiceChat,
        stopVoiceChat,
        muteInputAudio,
        unmuteInputAudio,
        isMuted,
        isVoiceChatActive,
        isVoiceChatLoading
    };
};
}),
"[project]/components/heygen/hooks/useMessageHistory.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMessageHistory",
    ()=>useMessageHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/StreamingAvatarProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
const useMessageHistory = ()=>{
    const { messages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStreamingAvatarContext"])();
    return {
        messages
    };
};
}),
"[project]/components/heygen/hooks/useStreamingAvatarSession.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStreamingAvatarSession",
    ()=>useStreamingAvatarSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@heygen/streaming-avatar/lib/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/StreamingAvatarProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useVoiceChat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/hooks/useVoiceChat.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useMessageHistory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/hooks/useMessageHistory.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const useStreamingAvatarSession = ()=>{
    const { avatarRef, basePath, sessionState, setSessionState, stream, setStream, setIsListening, setIsUserTalking, setIsAvatarTalking, setConnectionQuality, handleUserTalkingMessage, handleStreamingTalkingMessage, handleEndMessage, clearMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStreamingAvatarContext"])();
    const { stopVoiceChat } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useVoiceChat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVoiceChat"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useMessageHistory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMessageHistory"])();
    const init = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((token)=>{
        console.log('🔧 Initializing StreamingAvatar with:', {
            tokenLength: token.length,
            tokenPreview: token.substring(0, 20) + '...',
            basePath: basePath || 'default'
        });
        avatarRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
            token,
            basePath
        });
        console.log('✅ StreamingAvatar initialized');
        return avatarRef.current;
    }, [
        avatarRef,
        basePath
    ]);
    const handleStream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ detail })=>{
        console.log('🎥 STREAM_READY event received!', {
            hasStream: !!detail,
            streamId: detail?.id,
            tracks: detail?.getTracks().length
        });
        setStream(detail);
        setSessionState(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingAvatarSessionState"].CONNECTED);
        console.log('✅ Session state set to CONNECTED');
    }, [
        setSessionState,
        setStream
    ]);
    // Track connection state to handle disconnections properly
    const hasConnectedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        hasConnectedRef.current = false;
        avatarRef.current?.off(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].STREAM_READY, handleStream);
        clearMessages();
        stopVoiceChat();
        setIsListening(false);
        setIsUserTalking(false);
        setIsAvatarTalking(false);
        setStream(null);
        await avatarRef.current?.stopAvatar();
        setSessionState(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingAvatarSessionState"].INACTIVE);
    }, [
        avatarRef,
        clearMessages,
        handleStream,
        setIsAvatarTalking,
        setIsListening,
        setIsUserTalking,
        setSessionState,
        setStream,
        stopVoiceChat
    ]);
    const handleDisconnected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        console.warn('⚠️ STREAM_DISCONNECTED event received:', {
            event,
            hasConnected: hasConnectedRef.current,
            currentState: sessionState,
            hasStream: !!stream
        });
        // Remove the disconnected listener to prevent multiple calls
        avatarRef.current?.off(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].STREAM_DISCONNECTED, handleDisconnected);
        // Only stop if we were actually connected
        // If we disconnect before connecting, it might be a configuration or token issue
        if (hasConnectedRef.current) {
            console.log('🛑 Stream was connected, stopping session...');
            stop();
        } else {
            console.error('❌ Stream disconnected before connection was established. This might indicate:');
            console.error('   - Invalid or expired token');
            console.error('   - Configuration error');
            console.error('   - Network connectivity issue');
            console.error('   - Avatar name or settings mismatch');
            // Set state to inactive and clear stream without calling full stop
            hasConnectedRef.current = false;
            setSessionState(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingAvatarSessionState"].INACTIVE);
            setStream(null);
            setIsListening(false);
            setIsUserTalking(false);
            setIsAvatarTalking(false);
        }
    }, [
        sessionState,
        stream,
        stop,
        setSessionState,
        setStream,
        setIsListening,
        setIsUserTalking,
        setIsAvatarTalking,
        avatarRef
    ]);
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (config, token)=>{
        console.log('🚀 Starting avatar session...', {
            currentState: sessionState,
            hasAvatarRef: !!avatarRef.current,
            hasToken: !!token,
            config: {
                avatarName: config.avatarName,
                quality: config.quality,
                language: config.language,
                knowledgeId: config.knowledgeId
            }
        });
        if (sessionState !== __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingAvatarSessionState"].INACTIVE) {
            const errorMsg = `Cannot start avatar: session state is ${sessionState}, expected INACTIVE`;
            console.error('❌', errorMsg);
            throw new Error(errorMsg);
        }
        // Clean up any existing avatar instance first
        if (avatarRef.current) {
            console.log('🧹 Cleaning up existing avatar instance...');
            try {
                await avatarRef.current.stopAvatar().catch(()=>{
                // Ignore errors during cleanup
                });
            } catch (e) {
            // Ignore cleanup errors
            }
            avatarRef.current = null;
        }
        if (!token) {
            throw new Error("Token is required to initialize avatar");
        }
        console.log('🔧 Initializing new avatar instance...');
        init(token);
        if (!avatarRef.current) {
            throw new Error("Avatar is not initialized");
        }
        const avatar = avatarRef.current;
        console.log('📡 Setting up event listeners...');
        // Reset connection tracking
        hasConnectedRef.current = false;
        // Remove any existing listeners first to avoid duplicates
        avatar.off(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].STREAM_READY, handleStream);
        avatar.off(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].STREAM_DISCONNECTED, handleDisconnected);
        setSessionState(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingAvatarSessionState"].CONNECTING);
        // Wrap handleStream to track connection
        const handleStreamWithTracking = (event)=>{
            hasConnectedRef.current = true;
            console.log('✅ Stream connected successfully');
            handleStream(event);
        };
        avatar.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].STREAM_READY, handleStreamWithTracking);
        avatar.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].STREAM_DISCONNECTED, handleDisconnected);
        avatar.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].CONNECTION_QUALITY_CHANGED, ({ detail })=>setConnectionQuality(detail));
        avatar.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].USER_START, ()=>{
            setIsUserTalking(true);
        });
        avatar.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].USER_STOP, ()=>{
            setIsUserTalking(false);
        });
        avatar.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].AVATAR_START_TALKING, ()=>{
            setIsAvatarTalking(true);
        });
        avatar.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].AVATAR_STOP_TALKING, ()=>{
            setIsAvatarTalking(false);
        });
        avatar.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].USER_TALKING_MESSAGE, handleUserTalkingMessage);
        avatar.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].AVATAR_TALKING_MESSAGE, handleStreamingTalkingMessage);
        avatar.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].USER_END_MESSAGE, handleEndMessage);
        avatar.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingEvents"].AVATAR_END_MESSAGE, handleEndMessage);
        console.log('🎬 Calling createStartAvatar...');
        try {
            await avatar.createStartAvatar(config);
            console.log('✅ createStartAvatar completed successfully');
        } catch (error) {
            console.error('❌ createStartAvatar failed:', error);
            throw error;
        }
        return avatarRef.current;
    }, [
        avatarRef,
        handleDisconnected,
        handleEndMessage,
        handleStream,
        handleStreamingTalkingMessage,
        handleUserTalkingMessage,
        init,
        sessionState,
        setConnectionQuality,
        setIsAvatarTalking,
        setIsUserTalking,
        setSessionState,
        stop
    ]);
    return {
        avatarRef,
        sessionState,
        stream,
        initAvatar: init,
        startAvatar: start,
        stopAvatar: stop
    };
};
}),
"[project]/components/heygen/AvatarVideo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AvatarVideo",
    ()=>AvatarVideo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const AvatarVideo = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].forwardRef((_, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
        ref: ref,
        autoPlay: true,
        playsInline: true,
        className: "w-full h-full object-contain"
    }, void 0, false, {
        fileName: "[project]/components/heygen/AvatarVideo.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
AvatarVideo.displayName = "AvatarVideo";
}),
"[project]/components/heygen/MessageHistory.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageHistory",
    ()=>MessageHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/StreamingAvatarProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
// Helper function to format timestamp (in seconds) to MM:SS format
const formatTimestamp = (seconds)=>{
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};
const MessageHistory = ({ sessionTime, messageTimes })=>{
    const { messages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStreamingAvatarContext"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!containerRef.current) return;
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [
        messages
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "w-full flex flex-col gap-4 p-4",
        children: messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center text-gray-400 text-sm py-8 px-4",
            children: "Waiting for conversation to start..."
        }, void 0, false, {
            fileName: "[project]/components/heygen/MessageHistory.tsx",
            lineNumber: 39,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : messages.map((message)=>{
            // Prefer explicit session-time-per-message if provided,
            // then message.timestamp (if set), otherwise fall back to current session time
            const messageTime = (messageTimes && messageTimes[message.id]) ?? message.timestamp ?? sessionTime;
            const timestamp = formatTimestamp(messageTime);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex flex-col ${message.sender === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageSender"].CLIENT ? "items-end" : "items-start"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `rounded-lg px-4 py-3 max-w-[85%] ${message.sender === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageSender"].CLIENT ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm leading-relaxed break-words",
                            children: message.content
                        }, void 0, false, {
                            fileName: "[project]/components/heygen/MessageHistory.tsx",
                            lineNumber: 65,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/heygen/MessageHistory.tsx",
                        lineNumber: 58,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-500 mt-1 px-1",
                        children: timestamp
                    }, void 0, false, {
                        fileName: "[project]/components/heygen/MessageHistory.tsx",
                        lineNumber: 67,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, message.id, true, {
                fileName: "[project]/components/heygen/MessageHistory.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0));
        })
    }, void 0, false, {
        fileName: "[project]/components/heygen/MessageHistory.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/heygen/MicrophoneButtonControl.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MicrophoneButtonControl",
    ()=>MicrophoneButtonControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useVoiceChat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/hooks/useVoiceChat.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const MicrophoneButtonControl = ()=>{
    const { startVoiceChat, stopVoiceChat, isVoiceChatActive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useVoiceChat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVoiceChat"])();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mobile = ("TURBOPACK compile-time value", "undefined") !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        setIsMobile(mobile);
    }, []);
    const requestMicPermission = async ()=>{
        try {
            console.log("🎤 Requesting microphone permission...");
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            // Stop immediately → we only needed permission
            stream.getTracks().forEach((t)=>t.stop());
            console.log("✅ Microphone permission granted");
            return true;
        } catch (err) {
            console.error("❌ Microphone permission denied:", err);
            setError("Microphone access denied. Please enable mic in browser settings.");
            return false;
        }
    };
    const toggleMic = async ()=>{
        try {
            if (!isVoiceChatActive) {
                console.log("🎤 User tapped → Start requested");
                // -------------------------------
                // 🔥 MOBILE FIX: Ask permission first
                // -------------------------------
                if (isMobile) {
                    const allowed = await requestMicPermission();
                    if (!allowed) return;
                }
                await startVoiceChat(false);
                setError(null);
                console.log("🎤 Voice chat started");
            } else {
                console.log("🔇 Stopping microphone...");
                await stopVoiceChat();
            }
        } catch (err) {
            console.error("❌ Mic start error:", err);
            setError(err.message || "Microphone error");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleMic,
                className: "w-12 h-12 rounded-full flex items-center justify-center transition-all bg-gray-700 hover:bg-gray-600 active:scale-95",
                style: {
                    WebkitTapHighlightColor: 'transparent'
                },
                title: isVoiceChatActive ? 'Mute' : 'Unmute',
                children: [
                    !isVoiceChatActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-6 h-6",
                        stroke: "white",
                        fill: "none",
                        strokeWidth: "2",
                        viewBox: "0 0 24 24",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                            }, void 0, false, {
                                fileName: "[project]/components/heygen/MicrophoneButtonControl.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M19 10a7 7 0 1 1-14 0"
                            }, void 0, false, {
                                fileName: "[project]/components/heygen/MicrophoneButtonControl.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/heygen/MicrophoneButtonControl.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    isVoiceChatActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-6 h-6",
                        stroke: "white",
                        fill: "none",
                        strokeWidth: "2",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M9 9v3a3 3 0 0 0 6 0V9M12 3v2m0 10v6m5-6a5 5 0 0 1-10 0m12-4a9 9 0 0 1-18 0"
                        }, void 0, false, {
                            fileName: "[project]/components/heygen/MicrophoneButtonControl.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/heygen/MicrophoneButtonControl.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/heygen/MicrophoneButtonControl.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-14 right-0 bg-red-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg max-w-[200px]",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/heygen/MicrophoneButtonControl.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/heygen/MicrophoneButtonControl.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/ErrorMessage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ErrorMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function ErrorMessage({ title = 'Error', message, onRetry, onDismiss }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-2xl border-2 border-red-200 p-6 shadow-lg animate-slide-down",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-4xl flex-shrink-0",
                    children: "⚠️"
                }, void 0, false, {
                    fileName: "[project]/components/ErrorMessage.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-red-800 mb-2",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/ErrorMessage.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-700 mb-4 leading-relaxed",
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/components/ErrorMessage.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 flex-wrap",
                            children: [
                                onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onRetry,
                                    className: "px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-md",
                                    children: "Try Again"
                                }, void 0, false, {
                                    fileName: "[project]/components/ErrorMessage.tsx",
                                    lineNumber: 23,
                                    columnNumber: 15
                                }, this),
                                onDismiss && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onDismiss,
                                    className: "px-5 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 text-sm font-medium",
                                    children: "Dismiss"
                                }, void 0, false, {
                                    fileName: "[project]/components/ErrorMessage.tsx",
                                    lineNumber: 31,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ErrorMessage.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ErrorMessage.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ErrorMessage.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ErrorMessage.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/heygen/hooks/useTextChat.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTextChat",
    ()=>useTextChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@heygen/streaming-avatar/lib/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/StreamingAvatarProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const useTextChat = ()=>{
    const { avatarRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStreamingAvatarContext"])();
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message)=>{
        if (!avatarRef.current) return;
        avatarRef.current.speak({
            text: message,
            taskType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskType"].TALK,
            taskMode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskMode"].ASYNC
        });
    }, [
        avatarRef
    ]);
    const sendMessageSync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (message)=>{
        if (!avatarRef.current) return;
        return await avatarRef.current?.speak({
            text: message,
            taskType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskType"].TALK,
            taskMode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskMode"].SYNC
        });
    }, [
        avatarRef
    ]);
    return {
        sendMessage,
        sendMessageSync
    };
};
}),
"[project]/components/heygen/ChatInput.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatInput",
    ()=>ChatInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useTextChat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/hooks/useTextChat.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const ChatInput = ()=>{
    const { sendMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useTextChat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTextChat"])();
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (message.trim() === "") {
            return;
        }
        const messageText = message.trim();
        console.log('💬 Sending text message:', messageText);
        // Send the message to the avatar
        // The SDK will handle adding it to message history via USER_TALKING_MESSAGE event
        // if it triggers that event. If not, we may need to add it manually, but let's
        // test first to see if the SDK handles it automatically.
        sendMessage(messageText);
        setMessage("");
    }, [
        message,
        sendMessage
    ]);
    const handleKeyDown = (e)=>{
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-2 items-center w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: message,
                onChange: (e)=>setMessage(e.target.value),
                onKeyDown: handleKeyDown,
                placeholder: "Type your message...",
                className: "flex-1 bg-white text-gray-900 text-sm sm:text-base px-4 py-3 sm:py-2.5 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 min-h-[44px] touch-manipulation",
                autoComplete: "off",
                style: {
                    WebkitTapHighlightColor: 'transparent'
                }
            }, void 0, false, {
                fileName: "[project]/components/heygen/ChatInput.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleSend,
                disabled: !message.trim(),
                className: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 sm:p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center touch-manipulation flex-shrink-0 min-w-[44px] min-h-[44px] shadow-md active:scale-95",
                title: "Send message (Enter)",
                style: {
                    WebkitTapHighlightColor: 'transparent'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5 sm:w-5 sm:h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "22",
                            y1: "2",
                            x2: "11",
                            y2: "13"
                        }, void 0, false, {
                            fileName: "[project]/components/heygen/ChatInput.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                            points: "22 2 15 22 11 13 2 9 22 2"
                        }, void 0, false, {
                            fileName: "[project]/components/heygen/ChatInput.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/heygen/ChatInput.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/heygen/ChatInput.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/heygen/ChatInput.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/app/live/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LivePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@heygen/streaming-avatar/lib/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/StreamingAvatarProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useStreamingAvatarSession$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/hooks/useStreamingAvatarSession.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useVoiceChat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/hooks/useVoiceChat.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useMessageHistory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/hooks/useMessageHistory.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$AvatarVideo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/AvatarVideo.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$MessageHistory$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/MessageHistory.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$MicrophoneButtonControl$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/MicrophoneButtonControl.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ErrorMessage.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$ChatInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/heygen/ChatInput.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const HEYGEN_BASE_PATH = process.env.NEXT_PUBLIC_HEYGEN_BASE_API_URL || process.env.NEXT_PUBLIC_BASE_API_URL || 'https://api.heygen.com';
const mapQuality = (value)=>{
    switch((value || '').toLowerCase()){
        case 'high':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarQuality"].High;
        case 'medium':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarQuality"].Medium;
        default:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarQuality"].Low;
    }
};
function LiveSessionContent() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const sessionId = searchParams?.get('sessionId') || null;
    const { user, isAuthenticated, loading: authLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { avatarRef, startAvatar, stopAvatar, sessionState, stream } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useStreamingAvatarSession$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStreamingAvatarSession"])();
    const { startVoiceChat, stopVoiceChat, isVoiceChatActive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useVoiceChat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVoiceChat"])();
    const { messages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$hooks$2f$useMessageHistory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMessageHistory"])();
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sessionConfig, setSessionConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transcript, setTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [sessionTime, setSessionTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isStartingAvatar, setIsStartingAvatar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showTranscription, setShowTranscription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false); // Default to closed
    const [micError, setMicError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fatalError, setFatalError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [messageTimes, setMessageTimes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const voiceChatStartedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isEndingSessionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const messagesContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isAvatarReady = sessionState === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingAvatarSessionState"].CONNECTED;
    const startTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(()=>setSessionTime((prev)=>prev + 1), 1000);
    }, []);
    const loadSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!sessionId) return;
        try {
            let sessionData = null;
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/sessions/${sessionId}`);
                if (response.success) {
                    sessionData = response.session;
                    // Save to localStorage as backup
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                }
            } catch (apiError) {
                console.warn('⚠️ Failed to load from API, trying localStorage...', apiError?.response?.status);
                const storedSession = localStorage.getItem(`session_${sessionId}`);
                if (storedSession) {
                    sessionData = JSON.parse(storedSession);
                    console.log('✅ Session loaded from localStorage');
                } else {
                    throw apiError;
                }
            }
            if (!sessionData) {
                throw new Error('Session not found');
            }
            setSession(sessionData);
            // Get the selected language (full locale format like 'es-ES')
            const selectedLanguage = sessionData.language || 'en-US';
            // Extract language code (e.g., 'es' from 'es-ES') for STT
            const languageCode = selectedLanguage.split('-')[0];
            console.log('🌍 Selected language:', selectedLanguage);
            console.log('📝 Using language code for STT:', languageCode);
            // Convert uploaded KB to HeyGen KB if needed (before creating config)
            // If no KB in session, use default KB
            let finalKnowledgeId = sessionData.knowledgeBaseId || undefined;
            if (!finalKnowledgeId) {
                // No KB in session - use default KB
                console.log('📚 No knowledgeBaseId in session, using default KB');
                finalKnowledgeId = '00000000-0000-0000-0000-000000000001';
                console.log('   - Default KB ID:', finalKnowledgeId);
                console.log('   - Default KB: Legal Interview Protocol');
            } else {
                console.log('📚 Session knowledgeBaseId:', finalKnowledgeId);
            }
            if (finalKnowledgeId) {
                try {
                    console.log('🔄 Converting knowledge base to HeyGen KB:', finalKnowledgeId);
                    console.log('   - KB ID format:', finalKnowledgeId.startsWith('kb_') ? 'HeyGen format' : 'UUID format (likely uploaded/default)');
                    const selectedLanguage = sessionData.language || 'en-US';
                    console.log('   - Language for KB:', selectedLanguage);
                    const convertResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/api/heygen/convert-kb', {
                        knowledgeId: finalKnowledgeId,
                        language: selectedLanguage,
                        sessionId: sessionId
                    });
                    console.log('📋 Convert KB response:', convertResponse);
                    if (convertResponse.success && convertResponse.knowledgeId) {
                        finalKnowledgeId = convertResponse.knowledgeId;
                        console.log('✅ Converted to HeyGen KB ID:', finalKnowledgeId);
                        console.log('   - Is HeyGen KB:', convertResponse.isHeyGenKB || false);
                        console.log('   - Cached:', convertResponse.cached || false);
                    } else {
                        console.warn('⚠️ KB conversion failed or returned no knowledgeId');
                        console.warn('   - Response:', convertResponse);
                        // Show warning if API key is required
                        if (convertResponse.requiresApiKey) {
                            const errorMsg = convertResponse.message || 'HeyGen API key is required to use knowledge bases';
                            console.warn('⚠️', errorMsg);
                            setLoadError(`Warning: ${errorMsg}. The session will continue without the knowledge base.`);
                        }
                    }
                } catch (convertError) {
                    console.error('❌ Error converting KB:', convertError);
                    console.error('   - Error message:', convertError.message);
                    // Extract error details from response
                    const errorData = convertError.response?.data;
                    const errorMessage = errorData?.message || convertError.message || 'Failed to convert knowledge base';
                    const requiresApiKey = errorData?.requiresApiKey || false;
                    if (requiresApiKey) {
                        // Show a clear warning about missing API key
                        const warningMsg = `HeyGen API key not configured. ${errorMessage}. The session will continue, but the knowledge base may not work properly.`;
                        console.warn('⚠️', warningMsg);
                        setLoadError(warningMsg);
                    } else {
                        // For other errors, just log them but continue
                        console.warn('⚠️ KB conversion failed, continuing with original KB ID');
                    }
                // Continue with original ID
                }
            } else {
                console.log('⚠️ No knowledgeBaseId in session - avatar will start without KB');
            }
            // Build config - use language code (e.g., 'es' not 'es-ES') for HeyGen API
            // The SDK passes language to the API, but it may need the language code format
            const config = {
                quality: mapQuality(sessionData.quality),
                avatarName: sessionData.avatarId,
                knowledgeId: finalKnowledgeId,
                language: languageCode,
                voiceChatTransport: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceChatTransport"].WEBSOCKET,
                voice: {
                    rate: 1.15,
                    emotion: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceEmotion"].EXCITED,
                    model: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElevenLabsModel"].eleven_flash_v2_5
                },
                sttSettings: {
                    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heygen$2f$streaming$2d$avatar$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STTProvider"].DEEPGRAM
                }
            };
            console.log('📋 Session language (full locale):', selectedLanguage);
            console.log('📋 STT language code:', languageCode);
            console.log('📋 Session config created:', {
                avatarName: config.avatarName,
                quality: config.quality,
                hasKnowledgeId: !!config.knowledgeId
            });
            // Set knowledge base ID for YTL LLM (uploaded KBs, not HeyGen KBs)
            // Note: We still pass knowledgeId to HeyGen for compatibility, but YTL LLM will use uploaded KBs
            if (sessionData.knowledgeBaseId) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setKnowledgeBaseId"])(sessionData.knowledgeBaseId);
                console.log('📚 Knowledge base ID set for YTL LLM:', sessionData.knowledgeBaseId);
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setKnowledgeBaseId"])(undefined);
            }
            setSessionConfig(config);
            setLoadError(null);
        } catch (error) {
            console.error('Failed to load session', error);
            const message = error.message ?? 'Failed to load session.';
            setLoadError(message);
            setFatalError(`Failed to load session: ${message}`);
        }
    }, [
        router,
        sessionId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (authLoading) return;
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        if (!sessionId) {
            router.push('/lobby');
            return;
        }
        loadSession();
        startTimer();
        return ()=>{
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [
        isAuthenticated,
        authLoading,
        loadSession,
        router,
        sessionId,
        startTimer
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log('🔍 useEffect triggered:', {
            hasSessionConfig: !!sessionConfig,
            isStartingAvatar,
            sessionState,
            expectedState: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingAvatarSessionState"].INACTIVE
        });
        if (!sessionConfig) {
            console.log('⏸️ Waiting for session config...');
            return;
        }
        if (isStartingAvatar) {
            console.log('⏸️ Avatar is already starting...');
            return;
        }
        if (sessionState !== __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingAvatarSessionState"].INACTIVE) {
            console.log('⏸️ Session state is not INACTIVE, current state:', sessionState);
            return;
        }
        // Use a ref to track cancellation so it persists across renders
        const cancelledRef = {
            current: false
        };
        let connectionTimeout = null;
        const startSession = async ()=>{
            // Don't start if we're ending the session
            if (isEndingSessionRef.current) {
                console.log('⏹️ Session is ending, skipping start');
                return;
            }
            try {
                console.log('🎬 startSession function called');
                setIsStartingAvatar(true);
                console.log('🎭 Starting HeyGen session...');
                console.log('📋 Config:', JSON.stringify(sessionConfig, null, 2));
                console.log('🌐 Base path:', HEYGEN_BASE_PATH || 'not set');
                console.log('📊 Session state at start:', sessionState);
                // Set a timeout to detect if connection hangs
                connectionTimeout = setTimeout(()=>{
                    if (!cancelledRef.current) {
                        console.error('⏱️ Connection timeout - avatar took too long to connect');
                        setLoadError('Connection timeout. Please check your network and try again.');
                        setIsStartingAvatar(false);
                    }
                }, 30000); // 30 second timeout
                // Fetch token
                console.log('🔑 Fetching HeyGen token...');
                const response = await fetch('/api/heygen/token', {
                    method: 'POST'
                });
                if (!response.ok) {
                    const errorText = await response.text().catch(()=>'Unknown error');
                    console.error('❌ Token fetch failed:', response.status, errorText);
                    setLoadError(`Failed to fetch HeyGen token (${response.status}). Please check your API configuration.`);
                    setIsStartingAvatar(false);
                    if (connectionTimeout) clearTimeout(connectionTimeout);
                    return;
                }
                // Check content type to determine if it's JSON or text
                const contentType = response.headers.get('content-type');
                let token;
                try {
                    if (contentType?.includes('application/json')) {
                        const data = await response.json();
                        token = data?.token || data;
                        console.log('✅ Token received (JSON):', token ? token.substring(0, 20) + '...' : 'empty');
                    } else {
                        token = await response.text();
                        console.log('✅ Token received (text):', token ? token.substring(0, 20) + '...' : 'empty');
                    }
                    if (!token || token.trim() === '') {
                        throw new Error('Received empty token from API');
                    }
                } catch (tokenError) {
                    console.error('❌ Error parsing token:', tokenError);
                    setLoadError('Failed to parse token from server response.');
                    setIsStartingAvatar(false);
                    if (connectionTimeout) clearTimeout(connectionTimeout);
                    return;
                }
                console.log('✅ Token validated, length:', token.length);
                console.log('🔍 Checking cancelled flag:', cancelledRef.current);
                if (cancelledRef.current) {
                    console.log('⏹️ Session cancelled, aborting...');
                    return;
                }
                console.log('✅ Not cancelled, proceeding to start avatar...');
                // Start avatar (it will initialize if needed)
                console.log('🚀 Starting avatar with config...');
                console.log('📋 Full config object:', JSON.stringify(sessionConfig, null, 2));
                console.log('📊 Current session state before startAvatar:', sessionState);
                try {
                    await startAvatar(sessionConfig, token);
                    console.log('✅ Avatar started, waiting for stream...');
                } catch (avatarError) {
                    console.error('❌ Error in startAvatar call:', avatarError);
                    console.error('❌ Error stack:', avatarError instanceof Error ? avatarError.stack : 'No stack');
                    throw avatarError; // Re-throw to be caught by outer try-catch
                }
                // Wait for the stream to be ready
                // The STREAM_READY event will fire and update the state to CONNECTED
                console.log('⏳ Waiting for stream to be ready...');
            // We'll start voice chat when the avatar becomes ready (CONNECTED state)
            // This is handled in a separate useEffect that watches for isAvatarReady
            } catch (error) {
                console.error('❌ Failed to start HeyGen session:', error);
                const errorMessage = error instanceof Error ? error.message : 'Failed to start avatar';
                setLoadError(errorMessage);
                setIsStartingAvatar(false);
                console.error('Error details:', {
                    message: errorMessage,
                    config: sessionConfig,
                    basePath: HEYGEN_BASE_PATH,
                    sessionState,
                    error: error instanceof Error ? error.stack : String(error)
                });
                if (connectionTimeout) clearTimeout(connectionTimeout);
            }
        };
        startSession();
        return ()=>{
            console.log('🧹 useEffect cleanup: setting cancelled flag');
            cancelledRef.current = true;
            if (connectionTimeout) {
                clearTimeout(connectionTimeout);
                connectionTimeout = null;
            }
            // Reset ending flag on cleanup (in case component unmounts)
            isEndingSessionRef.current = false;
        };
    }, [
        sessionConfig,
        sessionState,
        startAvatar
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!stream || !videoRef.current) return;
        console.log('📹 Setting video stream...');
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = ()=>{
            console.log('✅ Video metadata loaded, playing...');
            videoRef.current?.play().catch((error)=>{
                console.error('❌ Failed to play video:', error);
            });
        };
    }, [
        stream
    ]);
    // Clear loading state when avatar is ready
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isAvatarReady && isStartingAvatar) {
            console.log('✅ Avatar is ready, clearing loading state');
            setIsStartingAvatar(false);
        }
    }, [
        isAvatarReady,
        isStartingAvatar
    ]);
    // Start voice chat automatically when avatar is ready (always unmuted by default)
    // On mobile, microphone requires user interaction, so we don't auto-start
    // Add a small delay to ensure the stream is fully ready
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check if we're on mobile
        const isMobile = ("TURBOPACK compile-time value", "undefined") !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        // On mobile, don't auto-start microphone (requires user interaction)
        // User will need to click the microphone button to start
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (isAvatarReady && !isVoiceChatActive && !voiceChatStartedRef.current && avatarRef.current && stream) {
            // Set flag immediately to prevent double start
            voiceChatStartedRef.current = true;
            // Wait a bit for the stream to be fully established
            const startVoiceChatWithDelay = setTimeout(()=>{
                console.log('🎤 Avatar is ready, starting voice chat automatically (unmuted)...');
                console.log('📊 Stream status:', {
                    hasStream: !!stream,
                    streamId: stream?.id,
                    tracks: stream?.getTracks().length
                });
                // Start voice chat with microphone unmuted (open) by default
                startVoiceChat(false).then(()=>{
                    console.log('✅ Voice chat started successfully - microphone is OPEN (unmuted)');
                    setMicError(null); // Clear any previous errors
                }).catch((error)=>{
                    console.error('⚠️ Failed to start voice chat:', error);
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    console.error('Error message:', errorMessage);
                    setMicError(errorMessage);
                    voiceChatStartedRef.current = false; // Reset on error so we can retry
                });
            }, 1000); // Wait 1 second after stream is ready
            return ()=>{
                clearTimeout(startVoiceChatWithDelay);
            };
        }
    }, [
        isAvatarReady,
        isVoiceChatActive,
        startVoiceChat,
        stream,
        avatarRef
    ]);
    // Format session time to MM:SS or HH:MM:SS for transcript timestamps
    const formatSessionTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((seconds)=>{
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor(seconds % 3600 / 60);
        const secs = Math.floor(seconds % 60);
        if (hours > 0) {
            return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
        return `${mins}:${String(secs).padStart(2, '0')}`;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setTranscript((prev)=>{
            const previousMap = new Map(prev.map((entry)=>[
                    entry.id,
                    entry
                ]));
            return messages.map((message)=>{
                // Map AVATAR to 'interviewer' and CLIENT (user) to 'witness'
                // The avatar asks questions (interviewer), the client responds (witness)
                const speaker = message.sender === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageSender"].CLIENT ? 'witness' : 'interviewer';
                const existing = previousMap.get(message.id);
                // Use relative session time from messageTimes if available, otherwise use current sessionTime
                const messageSessionTime = messageTimes[message.id] ?? sessionTime;
                const relativeTimestamp = formatSessionTime(messageSessionTime);
                if (existing && existing.text === message.content && existing.speaker === speaker && existing.timestamp === relativeTimestamp) {
                    return existing;
                }
                return {
                    id: message.id,
                    timestamp: relativeTimestamp,
                    speaker,
                    text: message.content
                };
            });
        });
    }, [
        messages,
        messageTimes,
        sessionTime,
        formatSessionTime
    ]);
    // Track the session time when each message was first received,
    // so timestamps under messages reflect the session time at send.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!messages.length) return;
        setMessageTimes((prev)=>{
            let changed = false;
            const next = {
                ...prev
            };
            for (const msg of messages){
                if (next[msg.id] === undefined) {
                    next[msg.id] = sessionTime;
                    changed = true;
                }
            }
            return changed ? next : prev;
        });
    }, [
        messages,
        sessionTime
    ]);
    // Auto-scroll messages container to bottom when new messages arrive
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (messagesContainerRef.current && showTranscription) {
            // Use setTimeout to ensure DOM has updated
            setTimeout(()=>{
                if (messagesContainerRef.current) {
                    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
                }
            }, 100);
        }
    }, [
        messages,
        showTranscription
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (timerRef.current) clearInterval(timerRef.current);
            stopVoiceChat();
            stopAvatar();
        };
    }, [
        stopAvatar,
        stopVoiceChat
    ]);
    const formatTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((seconds)=>{
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hours}:${mins}:${secs}`;
    }, []);
    const handleEndSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        // Set flag to prevent session from restarting
        isEndingSessionRef.current = true;
        if (timerRef.current) clearInterval(timerRef.current);
        stopVoiceChat();
        // Stop avatar (don't await - let it clean up in background)
        stopAvatar().catch((error)=>{
            console.warn('Error stopping avatar:', error);
        });
        // Build fresh transcript from current messages to ensure we have the latest data
        console.log('🔍 Building transcript for saving:', {
            messagesCount: messages.length,
            transcriptStateLength: transcript.length,
            messageTimesCount: Object.keys(messageTimes).length,
            sessionTime
        });
        const freshTranscript = messages.map((message)=>{
            const speaker = message.sender === __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageSender"].CLIENT ? 'witness' : 'interviewer';
            const messageSessionTime = messageTimes[message.id] ?? sessionTime;
            const relativeTimestamp = formatSessionTime(messageSessionTime);
            return {
                id: message.id,
                timestamp: relativeTimestamp,
                speaker,
                text: message.content || ''
            };
        }).filter((entry)=>entry.text && entry.text.trim().length > 0); // Filter out empty messages
        console.log('📝 Fresh transcript built:', {
            length: freshTranscript.length,
            sampleEntries: freshTranscript.slice(0, 3),
            witnessCount: freshTranscript.filter((t)=>t.speaker === 'witness').length,
            interviewerCount: freshTranscript.filter((t)=>t.speaker === 'interviewer').length
        });
        // Use fresh transcript if available, otherwise fall back to state
        const finalTranscript = freshTranscript.length > 0 ? freshTranscript : transcript.length > 0 ? transcript : [];
        console.log('✅ Final transcript to save:', {
            length: finalTranscript.length,
            source: freshTranscript.length > 0 ? 'fresh' : transcript.length > 0 ? 'state' : 'empty'
        });
        // Validate transcript before saving
        if (!finalTranscript || finalTranscript.length === 0) {
            console.error('❌ Cannot save session: transcript is empty');
            console.error('   Messages count:', messages.length);
            console.error('   Messages:', messages.map((m)=>({
                    sender: m.sender,
                    content: m.content?.substring(0, 50)
                })));
            console.error('   Transcript state length:', transcript.length);
            console.error('   Fresh transcript length:', freshTranscript.length);
            // Still navigate to report page, but show error there
            router.push(`/report?sessionId=${sessionId}`);
            return;
        }
        // Validate transcript format
        const invalidEntries = finalTranscript.filter((t)=>!t.speaker || !t.text || !t.timestamp);
        if (invalidEntries.length > 0) {
            console.warn('⚠️ Some transcript entries are missing required fields:', invalidEntries);
            console.warn('   Total invalid entries:', invalidEntries.length, 'out of', finalTranscript.length);
        }
        // Log transcript details for debugging
        console.log('📋 Transcript details:', {
            totalEntries: finalTranscript.length,
            witnessEntries: finalTranscript.filter((t)=>t.speaker?.toLowerCase() === 'witness').length,
            interviewerEntries: finalTranscript.filter((t)=>t.speaker?.toLowerCase() === 'interviewer').length,
            sampleEntry: finalTranscript[0],
            usingFreshTranscript: freshTranscript.length > 0
        });
        // Save session data in background (non-blocking)
        console.log('💾 Saving session transcript:', {
            sessionId,
            transcriptLength: finalTranscript.length,
            duration: sessionTime,
            transcriptPreview: finalTranscript.slice(0, 3),
            hasMessages: messages.length > 0
        });
        // Always save to localStorage first as immediate backup
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const updateResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].put(`/api/sessions/${sessionId}`, {
                transcript: finalTranscript,
                endTime: new Date().toISOString(),
                duration: sessionTime
            });
            console.log('✅ Session transcript saved successfully to API');
            // Update localStorage with server response if it has transcript, otherwise keep our local version
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        } catch (error) {
            console.error('❌ Failed to update session transcript:', {
                error: error?.response?.data || error?.message || error,
                status: error?.response?.status,
                url: error?.config?.url
            });
            // Even if API fails, try to save to localStorage as backup
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        }
        // Generate analysis in background (non-blocking) via Next.js analysis API
        // Fetch KB content if we have a knowledgeBaseId from the session (uploaded KB)
        // Skip fetching if it's the default KB ID (not stored in knowledge base storage)
        let kbContent = '';
        const defaultKBId = '00000000-0000-0000-0000-000000000001';
        if (session?.knowledgeBaseId && session.knowledgeBaseId !== defaultKBId) {
            try {
                console.log('📚 Fetching KB content for analysis:', session.knowledgeBaseId);
                const kbResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/knowledge-base/${session.knowledgeBaseId}`);
                if (kbResponse.success && kbResponse.knowledgeBase?.content) {
                    kbContent = kbResponse.knowledgeBase.content;
                    console.log(`✅ KB content fetched: ${kbContent.length} characters`);
                } else {
                    console.warn('⚠️ Could not fetch KB content, analysis will proceed without it');
                }
            } catch (kbError) {
                console.error('❌ Error fetching KB content:', kbError);
            // Continue without KB content
            }
        } else if (session?.knowledgeBaseId === defaultKBId) {
            console.log('📚 Default KB ID detected - skipping KB fetch (will use difficulty prompt for avatar, but no KB for analysis)');
        }
        console.log('📊 Starting analysis generation...', {
            transcriptLength: finalTranscript.length,
            durationSeconds: sessionTime,
            knowledgeBaseId: session?.knowledgeBaseId || 'None',
            hasKbContent: !!kbContent
        });
        try {
            const analysisResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/api/analysis/session', {
                transcript: finalTranscript,
                durationSeconds: sessionTime,
                knowledgeBase: kbContent
            });
            console.log('📊 Analysis response received:', {
                success: analysisResponse?.success,
                hasAnalysis: !!analysisResponse?.analysis,
                hasReport: !!analysisResponse?.report
            });
            // Transform analysis response to report format (API returns 'analysis', not 'report')
            if (analysisResponse?.success && analysisResponse?.analysis) {
                const analysis = analysisResponse.analysis;
                const overallScore = Math.round((analysis.accuracy + analysis.clarity + analysis.completeness + analysis.consistency) / 4);
                const report = {
                    overallScore: overallScore,
                    metrics: {
                        accuracy: analysis.accuracy || 0,
                        clarity: analysis.clarity || 0,
                        tone: analysis.consistency || 0,
                        pace: analysis.completeness || 0,
                        consistency: analysis.consistency || 0
                    },
                    highlights: analysis.highlights || [],
                    recommendations: analysis.recommendations || [],
                    durationSeconds: sessionTime,
                    summary: analysis.summary || 'Analysis completed successfully.',
                    flaggedSegments: analysis.flaggedSegments || []
                };
                console.log('💾 Saving analysis report to session...');
                try {
                    const updateResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].put(`/api/sessions/${sessionId}`, {
                        report
                    });
                    console.log('✅ Analysis report saved successfully');
                    // Also update localStorage as backup
                    if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && updateResponse?.session) //TURBOPACK unreachable
                    ;
                } catch (updateError) {
                    console.error('❌ Failed to save report to session:', {
                        error: updateError?.response?.data || updateError?.message || updateError,
                        status: updateError?.response?.status
                    });
                    // Even if API fails, try to save to localStorage as backup
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                }
            } else {
                console.warn('⚠️ Analysis response missing report:', analysisResponse);
            }
        } catch (error) {
            console.error('❌ Failed to generate or save analysis:', {
                error: error?.response?.data || error?.message || error,
                status: error?.response?.status,
                url: error?.config?.url,
                transcriptLength: transcript.length
            });
        }
        // Navigate immediately - don't wait for API calls
        router.push(`/report?sessionId=${sessionId}`);
    }, [
        router,
        sessionId,
        sessionTime,
        stopAvatar,
        stopVoiceChat,
        transcript,
        messages,
        messageTimes,
        session,
        sessionConfig,
        formatSessionTime
    ]);
    if (!isAuthenticated || !user) {
        return null;
    }
    if (!session) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-16 w-16 border-4 border-brand-navy-900 border-t-transparent mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/live/page.tsx",
                        lineNumber: 864,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-medium text-brand-navy-900",
                        children: "Loading session..."
                    }, void 0, false, {
                        fileName: "[project]/app/live/page.tsx",
                        lineNumber: 865,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/live/page.tsx",
                lineNumber: 863,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/live/page.tsx",
            lineNumber: 862,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-200 flex items-center justify-center p-0.5 sm:p-2",
        children: [
            fatalError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 flex items-center justify-center bg-black/40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-md w-full px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ErrorMessage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        title: "Unable to start session",
                        message: fatalError,
                        onDismiss: ()=>{
                            setFatalError(null);
                            router.push('/lobby');
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/live/page.tsx",
                        lineNumber: 879,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/live/page.tsx",
                    lineNumber: 878,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/live/page.tsx",
                lineNumber: 877,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-[1920px] bg-white border border-gray-300 rounded-lg overflow-hidden shadow-2xl flex flex-col lg:flex-row",
                style: {
                    minHeight: '400px',
                    height: 'calc(100vh - 0.5rem)',
                    maxHeight: 'calc(100vh - 0.5rem)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1 bg-gray-100 flex items-center justify-center min-h-[300px] sm:min-h-[400px] overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-full h-full bg-black flex items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$AvatarVideo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarVideo"], {
                                    ref: videoRef
                                }, void 0, false, {
                                    fileName: "[project]/app/live/page.tsx",
                                    lineNumber: 894,
                                    columnNumber: 11
                                }, this),
                                !isAvatarReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 flex items-center justify-center bg-black/70 text-white z-10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center px-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-white border-t-transparent mx-auto mb-3 sm:mb-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/live/page.tsx",
                                                lineNumber: 899,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm sm:text-base font-medium",
                                                children: isStartingAvatar ? 'Connecting avatar...' : 'Waiting for stream...'
                                            }, void 0, false, {
                                                fileName: "[project]/app/live/page.tsx",
                                                lineNumber: 900,
                                                columnNumber: 17
                                            }, this),
                                            loadError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 sm:mt-4 p-3 sm:p-4 bg-red-900/50 rounded-lg max-w-md mx-auto",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs sm:text-sm font-semibold text-red-200",
                                                        children: "Error:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/live/page.tsx",
                                                        lineNumber: 905,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] sm:text-xs text-red-100 mt-1 break-words",
                                                        children: loadError
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/live/page.tsx",
                                                        lineNumber: 906,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setLoadError(null);
                                                            setIsStartingAvatar(false);
                                                            window.location.reload();
                                                        },
                                                        className: "mt-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 active:scale-95 text-xs sm:text-sm font-medium min-h-[44px] min-w-[80px] touch-manipulation transition-all duration-200",
                                                        style: {
                                                            WebkitTapHighlightColor: 'transparent'
                                                        },
                                                        children: "Retry"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/live/page.tsx",
                                                        lineNumber: 907,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/live/page.tsx",
                                                lineNumber: 904,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/live/page.tsx",
                                        lineNumber: 898,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/live/page.tsx",
                                    lineNumber: 897,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-blue-900 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 z-20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white text-[9px] sm:text-xs font-medium whitespace-nowrap",
                                        children: [
                                            "Session Time ",
                                            formatTime(sessionTime)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/live/page.tsx",
                                        lineNumber: 926,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/live/page.tsx",
                                    lineNumber: 925,
                                    columnNumber: 11
                                }, this),
                                micError && isAvatarReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-red-600 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2 z-20 max-w-[85%] sm:max-w-xs",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-1.5 sm:gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-white mt-0.5 flex-shrink-0",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/live/page.tsx",
                                                    lineNumber: 941,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/live/page.tsx",
                                                lineNumber: 935,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white text-[10px] sm:text-xs font-semibold mb-0.5 sm:mb-1",
                                                        children: "Microphone Error"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/live/page.tsx",
                                                        lineNumber: 949,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white text-[9px] sm:text-[10px] leading-tight break-words",
                                                        children: micError
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/live/page.tsx",
                                                        lineNumber: 950,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setMicError(null);
                                                            voiceChatStartedRef.current = false;
                                                        },
                                                        className: "mt-1.5 sm:mt-2 text-[9px] sm:text-xs text-white underline hover:no-underline active:opacity-70 min-h-[32px] min-w-[60px] touch-manipulation",
                                                        style: {
                                                            WebkitTapHighlightColor: 'transparent'
                                                        },
                                                        children: "Dismiss"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/live/page.tsx",
                                                        lineNumber: 951,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/live/page.tsx",
                                                lineNumber: 948,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setMicError(null),
                                                className: "text-white hover:text-gray-200 active:opacity-70 ml-0.5 sm:ml-1 min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center touch-manipulation flex-shrink-0",
                                                style: {
                                                    WebkitTapHighlightColor: 'transparent'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-3.5 h-3.5 sm:w-4 sm:h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M6 18L18 6M6 6l12 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/live/page.tsx",
                                                        lineNumber: 973,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/live/page.tsx",
                                                    lineNumber: 967,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/live/page.tsx",
                                                lineNumber: 962,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/live/page.tsx",
                                        lineNumber: 934,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/live/page.tsx",
                                    lineNumber: 933,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-1.5 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm rounded-full px-1.5 py-1 sm:px-3 sm:py-1.5 flex items-center gap-1.5 sm:gap-2 z-20",
                                    children: [
                                        isAvatarReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$MicrophoneButtonControl$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MicrophoneButtonControl"], {}, void 0, false, {
                                            fileName: "[project]/app/live/page.tsx",
                                            lineNumber: 988,
                                            columnNumber: 31
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleEndSession,
                                            className: "w-12 h-12 sm:w-12 sm:h-12 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 active:scale-95 flex items-center justify-center transition-all duration-200 touch-manipulation shadow-lg min-w-[48px] min-h-[48px]",
                                            title: "End Session",
                                            style: {
                                                WebkitTapHighlightColor: 'transparent'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5 sm:w-5 sm:h-5",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "white",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/live/page.tsx",
                                                    lineNumber: 1006,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/live/page.tsx",
                                                lineNumber: 997,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/live/page.tsx",
                                            lineNumber: 991,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/live/page.tsx",
                                    lineNumber: 986,
                                    columnNumber: 11
                                }, this),
                                isAvatarReady && !showTranscription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowTranscription(true),
                                    className: "absolute bottom-1.5 right-1.5 sm:bottom-4 sm:right-4 w-12 h-12 sm:w-12 sm:h-12 rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-600 active:scale-95 flex items-center justify-center transition-all duration-200 z-20 shadow-lg touch-manipulation min-w-[48px] min-h-[48px]",
                                    title: "Open Chat",
                                    style: {
                                        WebkitTapHighlightColor: 'transparent'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5 sm:w-6 sm:h-6",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "white",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/live/page.tsx",
                                            lineNumber: 1028,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/live/page.tsx",
                                        lineNumber: 1019,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/live/page.tsx",
                                    lineNumber: 1013,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/live/page.tsx",
                            lineNumber: 893,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/live/page.tsx",
                        lineNumber: 892,
                        columnNumber: 9
                    }, this),
                    isAvatarReady && showTranscription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute sm:relative inset-0 sm:inset-auto w-full sm:w-96 bg-white border-t sm:border-l border-gray-200 flex flex-col shadow-lg sm:shadow-sm flex-shrink-0 overflow-hidden z-30 sm:z-auto",
                        style: {
                            height: '100%',
                            maxHeight: 'calc(100vh - 0.5rem)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-white flex-shrink-0 z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm sm:text-base font-semibold text-gray-900",
                                        children: "Chat & Messages"
                                    }, void 0, false, {
                                        fileName: "[project]/app/live/page.tsx",
                                        lineNumber: 1040,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowTranscription(false),
                                        className: "text-gray-400 hover:text-gray-600 active:text-gray-800 active:opacity-70 transition-all duration-200 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation rounded-lg",
                                        title: "Close Chat",
                                        style: {
                                            WebkitTapHighlightColor: 'transparent'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "18",
                                                    y1: "6",
                                                    x2: "6",
                                                    y2: "18"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/live/page.tsx",
                                                    lineNumber: 1056,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "6",
                                                    y1: "6",
                                                    x2: "18",
                                                    y2: "18"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/live/page.tsx",
                                                    lineNumber: 1057,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/live/page.tsx",
                                            lineNumber: 1047,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/live/page.tsx",
                                        lineNumber: 1041,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/live/page.tsx",
                                lineNumber: 1039,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: messagesContainerRef,
                                className: "flex-1 overflow-y-auto overflow-x-hidden bg-white",
                                style: {
                                    minHeight: 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$MessageHistory$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageHistory"], {
                                    sessionTime: sessionTime,
                                    messageTimes: messageTimes
                                }, void 0, false, {
                                    fileName: "[project]/app/live/page.tsx",
                                    lineNumber: 1068,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/live/page.tsx",
                                lineNumber: 1063,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-gray-200 bg-white p-3 sm:p-4 flex-shrink-0 z-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$ChatInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatInput"], {}, void 0, false, {
                                    fileName: "[project]/app/live/page.tsx",
                                    lineNumber: 1076,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/live/page.tsx",
                                lineNumber: 1075,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/live/page.tsx",
                        lineNumber: 1037,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/live/page.tsx",
                lineNumber: 890,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/live/page.tsx",
        lineNumber: 874,
        columnNumber: 5
    }, this);
}
function LivePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/app/live/page.tsx",
            lineNumber: 1089,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$heygen$2f$StreamingAvatarProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StreamingAvatarProvider"], {
            basePath: HEYGEN_BASE_PATH,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveSessionContent, {}, void 0, false, {
                fileName: "[project]/app/live/page.tsx",
                lineNumber: 1095,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/live/page.tsx",
            lineNumber: 1094,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/live/page.tsx",
        lineNumber: 1087,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__71e40a15._.js.map