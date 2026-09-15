import apiClient from "./api/client";
import { ProblemContext } from "@/types/context";

const DRAFT_KEY = "realcode_context_draft_fallback";

export const contextService = {
    // Using LocalStorage optionally just for Drafts if the API is offline
    saveDraft(context: Partial<ProblemContext>) {
        try {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(context));
        } catch (e) {
            console.error("Failed to save context draft locally", e);
        }
    },

    getDraft(): Partial<ProblemContext> | null {
        try {
            const data = localStorage.getItem(DRAFT_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    },

    deleteDraft() {
        try {
            localStorage.removeItem(DRAFT_KEY);
        } catch (e) { }
    },

    async finalizeContext(context: ProblemContext): Promise<ProblemContext> {
        try {
            // Pushing the finalized Context Wizard data to MongoDB
            const res: any = await apiClient.post("/contexts", context);
            this.deleteDraft();
            return res.data;
        } catch (error) {
            console.error("Failed to push context to backend API, falling back to local simulation.", error);

            // Fallback object returned so UI logic doesn't crash if DB is down during testing
            return {
                ...context,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                status: "ready_for_analysis"
            } as any;
        }
    },

    async getSavedContexts(): Promise<ProblemContext[]> {
        try {
            const res: any = await apiClient.get("/contexts");
            return res.data || [];
        } catch (error) {
            console.error("Failed to fetch contexts from backend", error);
            return [];
        }
    }
};
