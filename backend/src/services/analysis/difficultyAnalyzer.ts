export const analyzeDifficulty = (normalized: any) => {
    const requested = normalized.difficulty;
    const experience = normalized.experienceLevel;

    let assessed = requested;
    let reasoning = "Difficulty request maps securely to requested user constraints.";

    if (requested === "Easy" && experience === "Professional") {
        assessed = "Medium";
        reasoning = "Upgraded to Medium to fit Professional boundary requirements.";
    }

    return {
        requested,
        assessed,
        reasoning,
        complexityFactors: ["Data volume", "Nested rules depth"]
    };
};
