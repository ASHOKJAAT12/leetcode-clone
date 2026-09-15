import mongoose from "mongoose";

export const SUBMISSION_STATUSES = [
    "QUEUED",
    "RUNNING",
    "ACCEPTED",
    "WRONG_ANSWER",
    "COMPILATION_ERROR",
    "RUNTIME_ERROR",
    "TIME_LIMIT_EXCEEDED",
    "MEMORY_LIMIT_EXCEEDED",
    "OUTPUT_LIMIT_EXCEEDED",
    "SYSTEM_ERROR",
    "INTERNAL_ERROR"
];

const SubmissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }, // Optional for early dev
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: "GeneratedProblem", required: true, index: true },

    languageId: { type: String, required: true, index: true },
    code: { type: String, required: true },

    submissionType: { type: String, enum: ["run", "submit"], required: true, index: true },

    status: { type: String, enum: SUBMISSION_STATUSES, required: true, default: "QUEUED", index: true },

    testsPassed: { type: Number, default: 0 },
    testsTotal: { type: Number, default: 0 },

    runtimeMs: { type: Number, default: 0 },
    memoryKb: { type: Number, default: 0 },

    compileOutput: { type: String },
    runtimeOutput: { type: String },
    failureMessage: { type: String },

    executionId: { type: String, index: true } // ID mapping to Judge provider
}, { timestamps: true });

// Compound indexes for history queries safely bounding limits eagerly
SubmissionSchema.index({ problemId: 1, userId: 1, createdAt: -1 });
SubmissionSchema.index({ userId: 1, status: 1 });

export default mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);
