import { ProblemContext } from "@/types/context";

const DRAFT_KEY = "realcode_context_draft";
const SAVED_KEY = "realcode_saved_contexts";

export const contextService = {
    saveDraft(context: Partial<ProblemContext>) {
        try {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(context));
        } catch (e) {
            console.error("Failed to save context draft", e);
        }
    },

    getDraft(): Partial<ProblemContext> | null {
        try {
            const data = localStorage.getItem(DRAFT_KEY);
            if (!data) return null;
            return JSON.parse(data);
        } catch (e) {
            console.error("Failed to recover context draft", e);
            return null;
        }
    },

    deleteDraft() {
        try {
            localStorage.removeItem(DRAFT_KEY);
        } catch (e) {
            console.error("Failed to delete draft", e);
        }
    },

    finalizeContext(context: ProblemContext): ProblemContext {
        try {
            const ctx = {
                ...context,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString()
            };
            const existing = localStorage.getItem(SAVED_KEY);
            const parsed = existing ? JSON.parse(existing) : [];
            parsed.push(ctx);
            localStorage.setItem(SAVED_KEY, JSON.stringify(parsed));
            this.deleteDraft();
            return ctx;
        } catch (e) {
            console.error("Failed to finalize context", e);
            return {
                ...context,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString()
            };
        }
    },

    getSavedContexts(): ProblemContext[] {
        try {
            const data = localStorage.getItem(SAVED_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Failed to get saved contexts", e);
            return [];
        }
    }
};
