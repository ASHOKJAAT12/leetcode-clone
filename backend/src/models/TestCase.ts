import mongoose from "mongoose";

export const TEST_CASE_TYPES = ["sample", "hidden", "custom"];

const TestCaseSchema = new mongoose.Schema({
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: "GeneratedProblem", required: true, index: true },

    type: { type: String, enum: TEST_CASE_TYPES, required: true },

    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },

    isHidden: { type: Boolean, required: true, default: false },

    weight: { type: Number, default: 1 },

    timeLimitMs: { type: Number, default: 2000 },
    memoryLimitKb: { type: Number, default: 128000 }, // 128MB
    outputLimitBytes: { type: Number, default: 2048000 } // 2MB
}, { timestamps: true });

export default mongoose.models.TestCase || mongoose.model("TestCase", TestCaseSchema);
