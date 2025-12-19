(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiClient",
    ()=>apiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
class ApiClient {
    client;
    constructor(){
        // Determine base URL - use environment variable, or detect from window location, or fallback to RunPod URL
        let baseURL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_APP_URL;
        if (!baseURL && ("TURBOPACK compile-time value", "object") !== 'undefined') {
            // Use current hostname and port (works for both localhost and IP access)
            baseURL = `${window.location.protocol}//${window.location.host}`;
        }
        if (!baseURL) {
            baseURL = 'https://aio83wt0ai4vge-8004.proxy.runpod.net';
        }
        this.client = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });
        // Attach token to requests
        this.client.interceptors.request.use((config)=>{
            const token = this.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error)=>Promise.reject(error));
        // Unified error handling
        this.client.interceptors.response.use((response)=>response, (error)=>{
            const status = error.response?.status;
            const requestUrl = error.config?.url?.toString() || "";
            // --------------------------------------------
            // 🚫 FIXED: Only redirect on REAL protected 401s
            // --------------------------------------------
            const isAuthCall = requestUrl.includes('/api/auth/login') || requestUrl.includes('/api/auth/demo-credentials') || requestUrl.includes('/api/auth/refresh');
            const isOnLoginPage = ("TURBOPACK compile-time value", "object") !== 'undefined' && window.location.pathname.startsWith('/login');
            if (status === 401 && !isAuthCall && !isOnLoginPage) {
                // Unauthorized on a protected route → force re-login
                this.clearToken();
                if ("TURBOPACK compile-time truthy", 1) {
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
            // --------------------------------------------
            // Logging
            // --------------------------------------------
            if (status) {
                if (status !== 401) {
                    console.warn('API Error:', {
                        status,
                        statusText: error.response?.statusText,
                        data: error.response?.data,
                        url: requestUrl,
                        method: error.config?.method
                    });
                }
            } else if (error.request) {
                console.error('API No Response:', {
                    url: requestUrl,
                    method: error.config?.method
                });
            } else {
                console.error('API Setup Error:', error.message);
            }
            return Promise.reject(error);
        });
    }
    // ---------------------------
    // Token helpers
    // ---------------------------
    getToken() {
        return ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('authToken') : "TURBOPACK unreachable";
    }
    clearToken() {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        }
    }
    setToken(token) {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('authToken', token);
        }
    }
    // ---------------------------
    // HTTP Helper Methods
    // ---------------------------
    async get(url, config) {
        const response = await this.client.get(url, config);
        return response.data;
    }
    async post(url, data, config) {
        const response = await this.client.post(url, data, config);
        return response.data;
    }
    async put(url, data, config) {
        const response = await this.client.put(url, data, config);
        return response.data;
    }
    async delete(url, config) {
        const response = await this.client.delete(url, config);
        return response.data;
    }
    async uploadFile(url, file, additionalData) {
        const formData = new FormData();
        formData.append('file', file);
        if (additionalData) {
            Object.entries(additionalData).forEach(([key, value])=>{
                formData.append(key, value);
            });
        }
        const response = await this.client.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
}
const apiClient = new ApiClient();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // -------------------------------------------------
    // Restore session from localStorage on first load
    // -------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const storedUser = localStorage.getItem('user');
                const storedToken = localStorage.getItem('authToken');
                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].setToken(storedToken);
                }
            } catch (err) {
                console.error('Error restoring session:', err);
            }
            setLoading(false);
        }
    }["AuthProvider.useEffect"], []);
    // -------------------------------------------------
    // LOGIN FUNCTION — clean, predictable, safe
    // -------------------------------------------------
    const login = async (credentials)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/auth/login', credentials);
            if (response.success && response.user && response.token) {
                // Store user + token
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('authToken', response.token);
                setUser(response.user);
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].setToken(response.token);
                return response;
            }
            // Login failed (wrong password, missing fields, etc.)
            // Do NOT clear form or redirect — just return failure
            return {
                success: false,
                message: response.message || 'Invalid credentials.',
                error: response.error || 'login_failed'
            };
        } catch (error) {
            const msg = error?.response?.data?.message || error?.response?.data?.error || 'Login failed. Please try again.';
            return {
                success: false,
                message: msg,
                error: 'login_failed'
            };
        }
    };
    // -------------------------------------------------
    // LOGOUT FUNCTION — always safe & clean
    // -------------------------------------------------
    const logout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/auth/logout');
        } catch  {
            console.warn('Logout failed (frontend cleanup will continue).');
        }
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].setToken('');
        setUser(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            loading,
            login,
            logout,
            isAuthenticated: !!user
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth-context.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "NiO5z6JIqzX62LS5UWDgIqbZYyY=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_393d2808._.js.map