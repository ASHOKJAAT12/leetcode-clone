import { useState } from "react";
import axios from "axios";

export type ExecutionResultItem = {
    testCaseId: string;
    input: string;
    expectedOutput: string;
    result: {
        status: string;
        stdout?: string;
        stderr?: string;
        compileOutput?: string;
        message?: string;
        runtimeMs?: number;
        memoryKb?: number;
    }
};

export type ExecutionResponse = {
    isCustom: boolean;
    passed?: number;
    total?: number;
    results?: ExecutionResultItem[];
    result?: ExecutionResultItem["result"]; // For custom tests
};

export type SubmissionResponse = {
    submissionId: string;
    status: string;
    testsPassed: number;
    testsTotal: number;
    runtimeMs: number;
    memoryKb: number;
    message?: string;
};

export const useExecution = (problemId: string, language: string, code: string) => {
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [runResult, setRunResult] = useState<ExecutionResponse | null>(null);
    const [submitResult, setSubmitResult] = useState<SubmissionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const runCode = async (customInput?: string) => {
        setIsRunning(true);
        setError(null);
        setRunResult(null);
        try {
            const res = await axios.post("http://localhost:5000/api/execution/run", {
                problemId,
                language,
                code,
                customInput
            });
            setRunResult(res.data);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || "Failed to execute code.");
        } finally {
            setIsRunning(false);
        }
    };

    const submitCode = async () => {
        setIsSubmitting(true);
        setError(null);
        setSubmitResult(null);
        try {
            // Mock submission user ID intercept handled by axios interceptors if active, else defaults to dev fallback.
            const res = await axios.post("http://localhost:5000/api/submissions", {
                problemId,
                language,
                code
            });
            setSubmitResult(res.data);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || "Failed to submit code. Judge execution cluster unavailable.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        runCode,
        submitCode,
        isRunning,
        isSubmitting,
        runResult,
        submitResult,
        error
    };
};
