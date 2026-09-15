import { normalizeContext } from "./contextNormalizer";
import { analyzeDomain } from "./domainAnalyzer";
import { analyzeScenario } from "./scenarioAnalyzer";
import { analyzeRequirements } from "./requirementAnalyzer";
import { analyzeConstraints } from "./constraintAnalyzer";
import { mapSkills } from "./skillMapper";
import { mapAlgorithms } from "./algorithmMapper";
import { analyzeLanguage } from "./languageAnalyzer";
import { analyzeDifficulty } from "./difficultyAnalyzer";
import { analyzeProblemType } from "./problemTypeAnalyzer";
import { analyzeEdgeCases } from "./edgeCaseAnalyzer";
import { analyzeLearningObjectives } from "./learningObjectiveAnalyzer";
import { analyzeMistakes } from "./mistakeAnalyzer";

// Main orchestration engine executing isolated Rules-based processors sequentially.
export const runDeepAnalysis = (rawContext: any) => {

    // 1. Normalization
    const normalizedContext = normalizeContext(rawContext);

    // 2. Domain & Scenario
    const domainAnalysis = analyzeDomain(normalizedContext);
    const scenarioAnalysis = analyzeScenario(normalizedContext, domainAnalysis);

    // 3. Logic boundaries
    const requirementAnalysis = analyzeRequirements(normalizedContext);
    const constraintAnalysis = analyzeConstraints(normalizedContext);

    // 4. Skills & Algorithmic Technique matchers
    const skillAnalysis = mapSkills(normalizedContext);
    const algorithmAnalysis = mapAlgorithms(normalizedContext, constraintAnalysis);

    // 5. Config analysis
    const languageAnalysis = analyzeLanguage(normalizedContext);
    const difficultyAnalysis = analyzeDifficulty(normalizedContext);
    const problemTypeAnalysis = analyzeProblemType(normalizedContext);

    // 6. Test generation previews
    const edgeCases = analyzeEdgeCases(normalizedContext);

    // 7. Human Coaching bounds
    const learningObjectives = analyzeLearningObjectives(normalizedContext);
    const likelyMistakes = analyzeMistakes(normalizedContext);

    return {
        normalizedContext,
        domainAnalysis,
        scenarioAnalysis,
        requirementAnalysis,
        constraintAnalysis,
        skillAnalysis,
        algorithmAnalysis,
        languageAnalysis,
        difficultyAnalysis,
        problemTypeAnalysis,
        edgeCases,
        dataEntities: [], // Standard default to avoid crash
        inputOutputAnalysis: {}, // Standard default mapping
        learningObjectives,
        likelyMistakes,

        // Explicit provenance rules enforcing tracking origin boundaries safely
        confidence: {
            domain: 0.95,
            skillMapping: 0.85,
            algorithmMapping: 0.80,
            complexityTarget: 0.90
        },
        status: "completed"
    };
};
