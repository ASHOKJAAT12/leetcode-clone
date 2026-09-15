export const normalizeContext = (context: any) => {
    return {
        language: context.language?.trim().toLowerCase() || "unknown",
        domain: context.domain?.trim() || "General",
        difficulty: context.difficulty?.trim() || "Medium",
        experienceLevel: context.experienceLevel?.trim() || "Intermediate",
        problemType: context.problemType?.trim() || "Algorithmic",
        skills: Array.isArray(context.skills) ? context.skills.map((s: string) => s.trim()) : [],
        scenario: context.scenario || "",
        constraints: context.constraints || {},
        outputStyle: context.outputStyle || ""
    }
};
