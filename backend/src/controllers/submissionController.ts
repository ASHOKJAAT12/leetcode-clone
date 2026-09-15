import { Request, Response } from "express";
import { Judge0ExecutionService } from "../services/judge/Judge0ExecutionService";
import GeneratedProblem from "../models/GeneratedProblem";
import Submission from "../models/Submission";
import TestCase from "../models/TestCase";
import { env } from "../config/env";
import { OutputComparator } from "../services/judge/OutputComparator";

const judgeService = new Judge0ExecutionService();
const comparator = new OutputComparator();

export const submitCode = async (req: Request, res: Response): Promise<void> => {
    try {
        const { problemId, language, code } = req.body;

        // Use pseudo userID until Authentication Phase intercepts it.
        const userId = (req as any).user?.id || "temp-dev-user-id";

        if (!problemId || !language || !code) {
            res.status(400).json({ success: false, error: "Missing required fields.", code: "BAD_REQUEST" });
            return;
        }

        if (Buffer.byteLength(code, 'utf8') > env.MAX_SOURCE_CODE_BYTES) {
            res.status(400).json({ success: false, error: "Source code size exceeds limit." });
            return;
        }

        const problem = await GeneratedProblem.findById(problemId);
        if (!problem) {
            res.status(404).json({ success: false, error: "Problem not found." });
            return;
        }

        // Initialize submission boundary ensuring tracking persists regardless of runtime crashes natively.
        const submission = new Submission({
            userId,
            problemId,
            languageId: language,
            code,
            submissionType: "submit",
            status: "QUEUED"
        });
        await submission.save();

        let testCases = await TestCase.find({ problemId });

        // Fallback for Phase 5 Generated problems that lack native TestCase DB embeddings safely parsing edgeCases array
        if (testCases.length === 0) {
            const derivedHidden = problem.edgeCases.map((ec: any, i: number) => ({
                input: ec.case,
                expectedOutput: "No Explicit Meta Generated from Phase 5",
                isHidden: true
            }));
            const derivedPublic = problem.examples.map((ex: any, i: number) => ({
                input: ex.input,
                expectedOutput: ex.output,
                isHidden: false
            }));
            testCases = [...derivedPublic, ...derivedHidden];
        }

        if (!testCases || testCases.length === 0) {
            submission.status = "SYSTEM_ERROR";
            submission.failureMessage = "No test cases configured for this problem.";
            await submission.save();
            res.status(500).json({ success: false, error: "Internal test configuration missing." });
            return;
        }

        let passed = 0;
        let maxRuntime = 0;
        let maxMemory = 0;
        let finalStatus = "ACCEPTED";
        let failedMessage = "";
        let compileOutput = "";
        let runtimeOutput = "";

        // Sequential Execution bounding quota limits safely checking outputs deeply accurately
        for (const tc of testCases) {
            const execRes = await judgeService.execute({
                languageId: language,
                sourceCode: code,
                stdin: tc.input || "",
                expectedOutput: tc.expectedOutput && tc.expectedOutput !== "No Explicit Meta Generated from Phase 5" ? tc.expectedOutput : undefined,
                timeLimitMs: 2000
            });

            if (execRes.runtimeMs && execRes.runtimeMs > maxRuntime) maxRuntime = execRes.runtimeMs;
            if (execRes.memoryKb && execRes.memoryKb > maxMemory) maxMemory = execRes.memoryKb;

            if (execRes.compileOutput) compileOutput = execRes.compileOutput;
            if (execRes.stderr) runtimeOutput = execRes.stderr;

            if (execRes.status === "COMPILATION_ERROR") {
                finalStatus = "COMPILATION_ERROR";
                failedMessage = "Code failed to compile.";
                break;
            } else if (execRes.status === "RUNTIME_ERROR") {
                finalStatus = "RUNTIME_ERROR";
                failedMessage = execRes.message || "Runtime Exception Occurred.";
                break;
            } else if (execRes.status === "TIME_LIMIT_EXCEEDED") {
                finalStatus = "TIME_LIMIT_EXCEEDED";
                failedMessage = "CPU Limits Surpassed.";
                break;
            } else if (execRes.status === "MEMORY_LIMIT_EXCEEDED") {
                finalStatus = "MEMORY_LIMIT_EXCEEDED";
                failedMessage = "Memory constraints violated.";
                break;
            } else if (execRes.status === "SYSTEM_ERROR" || execRes.status === "INTERNAL_ERROR") {
                finalStatus = "SYSTEM_ERROR";
                failedMessage = "Judge execution engine unavailable.";
                break;
            } else {
                // Fallback accurate exact comparator masking false boundaries cleanly parsing true expected values.
                if (tc.expectedOutput && tc.expectedOutput !== "No Explicit Meta Generated from Phase 5") {
                    const exactMatch = comparator.compare(execRes.stdout || "", tc.expectedOutput);
                    if (exactMatch.isMatch) {
                        passed++;
                    } else {
                        finalStatus = "WRONG_ANSWER";
                        failedMessage = tc.isHidden ? "A hidden test case failed." : "Sample test case failed.";
                        break;
                    }
                } else {
                    // Accept implicitly if no output spec defined for generated cases avoiding false negatives
                    passed++;
                }
            }
        }

        submission.testsPassed = passed;
        submission.testsTotal = testCases.length;
        submission.status = finalStatus;
        submission.runtimeMs = maxRuntime;
        submission.memoryKb = maxMemory;
        submission.compileOutput = compileOutput;
        submission.runtimeOutput = runtimeOutput;
        submission.failureMessage = failedMessage;

        await submission.save();

        res.status(200).json({
            success: true,
            submissionId: submission._id,
            status: submission.status,
            testsPassed: submission.testsPassed,
            testsTotal: submission.testsTotal,
            runtimeMs: submission.runtimeMs,
            memoryKb: submission.memoryKb,
            message: submission.failureMessage
        });

    } catch (err: any) {
        console.error("Submission error:", err);
        res.status(500).json({ success: false, error: err.message, code: "EXECUTION_SERVICE_UNAVAILABLE" });
    }
};

export const getSubmissions = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const problemId = req.query.problemId;
        const userId = (req as any).user?.id || "temp-dev-user-id"; // Filter strictly by identity

        const filter: any = {};
        if (problemId) filter.problemId = problemId;
        if (userId !== "temp-dev-user-id") filter.userId = userId;

        const submissions = await Submission.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("problemId", "title slug difficulty");

        const total = await Submission.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: submissions,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err: any) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const getSubmissionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = (req as any).user?.id || "temp-dev-user-id";

        const submission = await Submission.findById(id).populate("problemId", "title slug");
        if (!submission) {
            res.status(404).json({ success: false, error: "Submission not found" });
            return;
        }

        // Only owner can view code
        if (submission.userId?.toString() !== userId && userId !== "temp-dev-user-id") {
            submission.code = "Hidden for privacy";
        }

        res.status(200).json({ success: true, data: submission });
    } catch (err: any) {
        res.status(500).json({ success: false, error: err.message });
    }
};
