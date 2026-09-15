import mongoose from "mongoose";

const ProblemContextSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    language: { type: String, required: true },
    domain: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard", "Expert"], required: true },
    experienceLevel: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Professional"], required: true },
    problemType: { type: String, required: true },
    skills: [{ type: String }],
    scenario: { type: String, required: true },
    constraints: {
        inputSize: { type: String },
        timeRequirement: { type: String },
        memoryRequirement: { type: String },
        dataVolume: { type: String },
        businessRules: { type: String }
    },
    outputStyle: { type: String },
    status: { type: String, enum: ["draft", "ready_for_analysis", "archived"], default: "draft" },
    source: { type: String }
}, { timestamps: true });

// Setup functional indexes directly inside Schema instantiation
ProblemContextSchema.index({ userId: 1, status: 1 });
ProblemContextSchema.index({ domain: 1 });
ProblemContextSchema.index({ difficulty: 1 });
ProblemContextSchema.index({ createdAt: -1 });

export default mongoose.models.ProblemContext || mongoose.model("ProblemContext", ProblemContextSchema);
