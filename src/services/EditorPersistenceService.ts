export type EditorState = {
    problemId: string;
    activeLanguage: string;
    codeByLanguage: Record<string, string>;
    hasUnsavedChanges: boolean;
    lastSavedAt?: string;
};

const STORAGE_PREFIX = "realcode:problem:";

class EditorPersistence {
    private getKey(problemId: string): string {
        return `${STORAGE_PREFIX}${problemId}`;
    }

    saveCode(problemId: string, language: string, code: string): void {
        if (typeof window === "undefined") return;
        try {
            const key = this.getKey(problemId);
            const existingRaw = localStorage.getItem(key);
            let state: Record<string, string> = {};

            if (existingRaw) {
                const parsed = JSON.parse(existingRaw);
                // Validate bounds before assigning
                if (typeof parsed === "object" && !Array.isArray(parsed)) {
                    state = parsed;
                }
            }

            state[language] = code;
            localStorage.setItem(key, JSON.stringify(state));
        } catch (err) {
            console.warn("Failed to persist code locally:", err);
        }
    }

    loadLanguageCode(problemId: string, language: string): string | null {
        if (typeof window === "undefined") return null;
        try {
            const key = this.getKey(problemId);
            const raw = localStorage.getItem(key);
            if (!raw) return null;

            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === "object" && parsed[language]) {
                if (typeof parsed[language] === "string") {
                    return parsed[language];
                }
            }
            return null;
        } catch (err) {
            console.warn("Failed to read local code state:", err);
            return null;
        }
    }

    clearProblemCode(problemId: string): void {
        if (typeof window === "undefined") return;
        try {
            localStorage.removeItem(this.getKey(problemId));
        } catch (err) {
            console.warn("Failed to clear problem code:", err);
        }
    }
}

export const EditorPersistenceService = new EditorPersistence();
