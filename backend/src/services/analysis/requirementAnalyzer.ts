export const analyzeRequirements = (normalized: any) => {
    return {
        primaryGoal: `Solve the core business logic related to ${normalized.domain}`,
        secondaryGoals: ["Ensure correct constraints bounds"],
        functionalRequirements: [
            `Handle inputs containing ${normalized.skills.join(", ")} logic.`,
            `Output must map to: ${normalized.outputStyle || 'Standard JSON'}`
        ],
        nonFunctionalRequirements: [
            "Must not crash on Null bounds",
            "Must operate efficiently at scale"
        ]
    };
};
