import { generateTitle, generateBackground, generateConstraints, generateStarterCode, generateExamples } from "./templates";
import { validateGeneratedProblem } from "./ProblemValidator";

export const generateRealWorldProblem = (context: any, analysis: any) => {

    const title = generateTitle(analysis);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const generated = {
        contextId: context._id,
        analysisId: analysis._id,
        title,
        slug,
        domain: context.domain,
        difficulty: context.difficulty,
        problemType: context.problemType,

        description: `Solve the problem ensuring the output matches expected configurations properly mapped to the ${analysis.scenarioAnalysis.scenarioType}.`,

        realWorldScenario: {
            background: generateBackground(analysis),
            objective: `Your task is to ${analysis.requirementAnalysis.primaryGoal.toLowerCase()} efficiently.`,
            actors: analysis.scenarioAnalysis.mainActors || [],
            entities: analysis.domainAnalysis.entities || []
        },

        inputSpecification: {
            description: `A sequence of integers and records representing the targeted domain structure safely.`,
            fields: []
        },

        outputSpecification: {
            description: `The single deterministic metric ensuring exactly validated types natively mapping constraints perfectly.`,
            fields: []
        },

        constraints: generateConstraints(analysis),
        examples: generateExamples(analysis),

        edgeCases: analysis.edgeCases || [],
        skills: context.skills || [],

        expectedTechniques: analysis.algorithmAnalysis || [],
        learningObjectives: analysis.learningObjectives || [],

        language: context.language,
        starterCode: generateStarterCode(context.language),
        executionMode: "stdin",
        generationMethod: "rule-based",
        generationVersion: "1.0.0"
    };

    // Score and Validate natively
    const { qualityScore, status } = validateGeneratedProblem(generated);

    return { ...generated, qualityScore, status };
};
