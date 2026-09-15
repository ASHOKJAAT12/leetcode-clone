export interface LanguageMapping {
    judgeId: number;
    executionMode: "stdin" | "function-based";
    defaultTimeLimitMs: number;
    defaultMemoryLimitKb: number;
}

// These are standards from Judge0 Extra CE, adapt if switching CE vs Extra
export const REALCODE_TO_JUDGE0_MAP: Record<string, LanguageMapping> = {
    python: {
        judgeId: 71, // Python (3.8.1)
        executionMode: "stdin",
        defaultTimeLimitMs: 2000,
        defaultMemoryLimitKb: 128000
    },
    cpp: {
        judgeId: 54, // C++ (GCC 9.2.0)
        executionMode: "stdin",
        defaultTimeLimitMs: 2000,
        defaultMemoryLimitKb: 128000
    },
    javascript: {
        judgeId: 63, // Node.js (12.14.0)
        executionMode: "stdin",
        defaultTimeLimitMs: 2000,
        defaultMemoryLimitKb: 128000
    },
    java: {
        judgeId: 62, // Java (OpenJDK 13.0.1)
        executionMode: "stdin",
        defaultTimeLimitMs: 2000,
        defaultMemoryLimitKb: 256000 // Java bounds take more memory naturally
    },
    c: {
        judgeId: 50, // C (GCC 9.2.0)
        executionMode: "stdin",
        defaultTimeLimitMs: 1000,
        defaultMemoryLimitKb: 64000
    },
    csharp: {
        judgeId: 51, // C# (Mono 6.6.0.161)
        executionMode: "stdin",
        defaultTimeLimitMs: 2000,
        defaultMemoryLimitKb: 128000
    },
    go: {
        judgeId: 60, // Go (1.13.5)
        executionMode: "stdin",
        defaultTimeLimitMs: 2000,
        defaultMemoryLimitKb: 64000
    }
};

export const getLanguageConfig = (lang: string): LanguageMapping | null => {
    return REALCODE_TO_JUDGE0_MAP[lang.toLowerCase()] || null;
};
