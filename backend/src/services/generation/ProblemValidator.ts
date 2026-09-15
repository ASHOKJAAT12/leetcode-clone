export const validateGeneratedProblem = (problem: any) => {
    // Compute basic scoring heuristics natively verifying deterministic logic bounds.

    let overall = 100;
    let contextRelevance = 100;
    let skillAlignment = 100;
    let difficultyAlignment = 100;
    let consistency = 100;
    let realism = 100;

    // Basic failure conditions structurally bounds checking
    if (!problem.title || !problem.slug) {
        overall -= 40;
        consistency -= 50;
    }

    if (!problem.realWorldScenario?.background) {
        realism -= 30;
        overall -= 20;
    }

    if (!problem.examples || problem.examples.length < 2) {
        consistency -= 20;
        overall -= 10;
    }

    const qualityScore = {
        overall: Math.max(0, overall),
        contextRelevance: Math.max(0, contextRelevance),
        skillAlignment: Math.max(0, skillAlignment),
        difficultyAlignment: Math.max(0, difficultyAlignment),
        consistency: Math.max(0, consistency),
        realism: Math.max(0, realism)
    };

    // Strict threshold
    const status = qualityScore.overall >= 80 ? 'validated' : 'needs_review';

    return { isValid: qualityScore.overall >= 80, qualityScore, status };
};
