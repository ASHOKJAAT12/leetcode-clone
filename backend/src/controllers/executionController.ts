import { Request, Response } from "express";
import { Judge0ExecutionService } from "../services/judge/Judge0ExecutionService";
import GeneratedProblem from "../models/GeneratedProblem";
import { env } from "../config/env";
import { OutputComparator } from "../services/judge/OutputComparator";
import TestCase from "../models/TestCase";

const judgeService = new Judge0ExecutionService();
const comparator = new OutputComparator();

export const runCode = async (req: Request, res: Response): Promise<void> => {
    try {
        const { problemId, language, code, customInput } = req.body;

        if (!problemId || !language || !code) {
            res.status(400).json({ success: false, error: "Missing required fields" });
            return;
        }

        // Code size limit check (security)
        if (Buffer.byteLength(code, 'utf8') > env.MAX_SOURCE_CODE_BYTES) {
            res.status(400).json({ success: false, error: "Source code size exceeds limit" });
            return;
        }

        const problem = await GeneratedProblem.findById(problemId);
        if (!problem) {
            res.status(404).json({ success: false, error: "Problem not found" });
            return;
        }

        // Check if custom input is used, or sample tests
        if (customInput) {
            if (Buffer.byteLength(customInput, 'utf8') > 102400) {
                res.status(400).json({ success: false, error: "Custom input too large." });
                return;
            }

            const result = await judgeService.execute({
                languageId: language,
                sourceCode: code,
                stdin: customInput,
                timeLimitMs: 2000
            });

            res.status(200).json({ success: true, isCustom: true, result });
            return;
        }

        // Fallback to testing the specified SAMPLE tests stored on the GeneratedProblem edgeCases/examples if TestCase schema doesn't exist yet for this problem
        let testCases = await TestCase.find({ problemId, type: "sample" });
        if (testCases.length === 0) {
            // Mock sample test for Phase 7 based on Phase 5's embedded examples if real TestCases aren't initialized
            const sampleTests = problem.examples.map((ex: any, index: number) => ({
                input: ex.input,
                expectedOutput: ex.output,
                _id: `ex_${index}`
            }));
            testCases = sampleTests;
        }

        if (!testCases || testCases.length === 0) {
            res.status(404).json({ success: false, error: "No sample tests available for this problem." });
            return;
        }

        const results = [];
        let passed = 0;

        for (const tc of testCases) {
            const execRes = await judgeService.execute({
                languageId: language,
                sourceCode: code,
                stdin: tc.input || "",
                expectedOutput: tc.expectedOutput || "",
                timeLimitMs: 2000
            });

            let isMatch = false;
            if (execRes.status === "ACCEPTED" || execRes.status === "WRONG_ANSWER") {
                // Double check with OutputComparator precisely handling trails.
                const exactMatch = comparator.compare(execRes.stdout || "", tc.expectedOutput || "");
                if (exactMatch.isMatch && (execRes.status === "ACCEPTED" || !execRes.compileOutput)) {
                    isMatch = true;
                    execRes.status = "ACCEPTED";
                } else {
                    execRes.status = "WRONG_ANSWER";
                }
            }

            if (isMatch) passed++;

            results.push({
                testCaseId: tc._id,
                input: tc.input,
                expectedOutput: tc.expectedOutput,
                result: execRes
            });
        }

        res.status(200).json({
            success: true,
            isCustom: false,
            passed,
            total: testCases.length,
            results
        });

    } catch (err: any) {
        console.error("Run error:", err);
        res.status(500).json({ success: false, error: err.message, code: "EXECUTION_SERVICE_UNAVAILABLE" });
    }
};
