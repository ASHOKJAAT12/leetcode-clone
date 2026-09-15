export const mapSkills = (normalized: any) => {
    return normalized.skills.map((skill: string, index: number) => {
        return {
            skill,
            relevance: "Explicitly selected by user",
            reason: "Required to solve the algorithmic core.",
            priority: index === 0 ? "primary" : "secondary"
        };
    });
};
