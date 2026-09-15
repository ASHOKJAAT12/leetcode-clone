import mongoose from "mongoose";

const SourceReferenceSchema = new mongoose.Schema({
    source: { type: String, enum: ["explicit", "inferred", "derived"], required: true },
    field: { type: String },
    basedOn: [{ type: String }]
}, { _id: false });

const DeepAnalysisSchema = new mongoose.Schema({
    contextId: { type: mongoose.Schema.Types.ObjectId, ref: "ProblemContext", required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    version: { type: Number, default: 1 },
    parentAnalysisId: { type: mongoose.Schema.Types.ObjectId, ref: "DeepAnalysis" },

    status: { type: String, enum: ["pending", "processing", "completed", "failed", "needs_review"], default: "pending" },

    normalizedContext: {
        language: String,
        domain: String,
        difficulty: String,
        experienceLevel: String,
        problemType: String,
        skills: [String],
        scenario: String,
        constraints: { type: Map, of: mongoose.Schema.Types.Mixed },
        outputStyle: String
    },

    domainAnalysis: {
        domain: String,
        entities: [String],
        workflows: [String],
        businessConcepts: [String],
        likelyData: [String]
    },

    scenarioAnalysis: {
        scenarioType: String,
        mainActors: [String],
        mainEntities: [String],
        processFlow: [String],
        businessRules: [String]
    },

    requirementAnalysis: {
        primaryGoal: String,
        secondaryGoals: [String],
        functionalRequirements: [String],
        nonFunctionalRequirements: [String]
    },

    constraintAnalysis: {
        inputScale: String,
        timeSensitivity: String,
        memorySensitivity: String,
        scalabilityLevel: String,
        importantConstraints: [String],
        inferredConstraints: [String]
    },

    skillAnalysis: [{
        skill: String,
        relevance: String,
        reason: String,
        priority: { type: String, enum: ["primary", "secondary", "optional"] },
        _id: false
    }],

    algorithmAnalysis: [{
        technique: String,
        reason: String,
        applicability: { type: String, enum: ["High", "Medium", "Low", "Excellent", "Good", "Poor"] },
        expectedComplexity: String,
        _id: false
    }],

    languageAnalysis: {
        language: String,
        recommendedFeatures: [String],
        recommendedDataStructures: [String],
        performanceConsiderations: [String],
        commonPitfalls: [String]
    },

    difficultyAnalysis: {
        requested: String,
        assessed: String,
        reasoning: String,
        complexityFactors: [String]
    },

    problemTypeAnalysis: {
        selectedType: String,
        suitable: Boolean,
        reasoning: String,
        recommendedStructure: String
    },

    edgeCases: [{
        case: String,
        reason: String,
        priority: { type: String, enum: ["critical", "important", "optional"] },
        _id: false
    }],

    dataEntities: [{
        name: String,
        fields: [String],
        relationships: [String],
        _id: false
    }],

    inputOutputAnalysis: {
        inputEntities: [String],
        outputEntities: [String],
        transformation: String,
        aggregationRequired: Boolean
    },

    learningObjectives: [{
        objective: String,
        importance: String,
        _id: false
    }],

    likelyMistakes: [{
        mistake: String,
        reason: String,
        severity: String,
        _id: false
    }],

    businessRules: [{
        rule: String,
        source: String,
        importance: String,
        _id: false
    }],

    actors: [{
        name: String,
        role: String,
        interactions: [String],
        _id: false
    }],

    confidence: { type: Map, of: Number }

}, { timestamps: true });

DeepAnalysisSchema.index({ contextId: 1, version: -1 });
DeepAnalysisSchema.index({ userId: 1 });

export default mongoose.models.DeepAnalysis || mongoose.model("DeepAnalysis", DeepAnalysisSchema);
