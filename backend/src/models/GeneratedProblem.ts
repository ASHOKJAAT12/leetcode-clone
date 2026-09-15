import mongoose from "mongoose";

const GeneratedProblemSchema = new mongoose.Schema({
    contextId: { type: mongoose.Schema.Types.ObjectId, ref: "ProblemContext", required: true, index: true },
    analysisId: { type: mongoose.Schema.Types.ObjectId, ref: "DeepAnalysis", required: true, index: true },

    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },

    domain: { type: String, required: true, index: true },
    difficulty: { type: String, required: true, index: true },
    problemType: { type: String, required: true },

    description: { type: String, required: true },

    realWorldScenario: {
        background: String,
        objective: String,
        actors: [String],
        entities: [String]
    },

    inputSpecification: {
        description: String,
        fields: [mongoose.Schema.Types.Mixed]
    },

    outputSpecification: {
        description: String,
        fields: [mongoose.Schema.Types.Mixed]
    },

    constraints: {
        explicit: [String],
        inferred: [String]
    },

    examples: [{
        input: String,
        output: String,
        explanation: String,
        _id: false
    }],

    edgeCases: [{
        case: String,
        reason: String,
        priority: String,
        _id: false
    }],

    skills: [String],

    expectedTechniques: [{
        name: String,
        priority: String,
        reason: String,
        _id: false
    }],

    learningObjectives: [{
        objective: String,
        importance: String,
        _id: false
    }],

    language: { type: String, required: true },

    starterCode: { type: mongoose.Schema.Types.Mixed },

    executionMode: { type: String, enum: ["stdin", "function-based"], default: "stdin" },

    qualityScore: {
        overall: Number,
        contextRelevance: Number,
        skillAlignment: Number,
        difficultyAlignment: Number,
        consistency: Number,
        realism: Number
    },

    status: { type: String, enum: ["draft", "generated", "validated", "needs_review", "published", "archived"], required: true, default: "generated", index: true },

    generationMethod: { type: String, required: true, default: "rule-based" },
    generationVersion: { type: String, required: true, default: "1.0.0" }

}, { timestamps: true });

export default mongoose.models.GeneratedProblem || mongoose.model("GeneratedProblem", GeneratedProblemSchema);
