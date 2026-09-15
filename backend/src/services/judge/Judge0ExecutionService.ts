import axios from "axios";
import { env } from "../../config/env";
import { CodeExecutionService, ExecutionRequest, ExecutionResult, ExecutionStatus } from "./CodeExecutionService";
import { getLanguageConfig } from "./LanguageConfig";

const base64Encode = (str: string) => Buffer.from(str).toString("base64");
const base64Decode = (str: string) => Buffer.from(str, "base64").toString("utf-8");

export class Judge0ExecutionService implements CodeExecutionService {
    private client = axios.create({
        baseURL: env.JUDGE0_API_URL,
        headers: {
            "Content-Type": "application/json",
            ...(env.JUDGE0_API_KEY && { "X-RapidAPI-Key": env.JUDGE0_API_KEY })
        }
    });

    private mapJudge0Status(judgeStatusId: number): ExecutionStatus {
        switch (judgeStatusId) {
            case 1: // In Queue
                return "QUEUED";
            case 2: // Processing
                return "RUNNING";
            case 3: // Accepted
                return "ACCEPTED";
            case 4: // Wrong Answer
                return "WRONG_ANSWER";
            case 5: // Time Limit Exceeded
                return "TIME_LIMIT_EXCEEDED";
            case 6: // Compilation Error
                return "COMPILATION_ERROR";
            case 7: // Runtime Error (SIGSEGV)
            case 8: // Runtime Error (SIGXFSZ)
            case 9: // Runtime Error (SIGFPE)
            case 10: // Runtime Error (SIGABRT)
            case 11: // Runtime Error (NZEC)
            case 12: // Runtime Error (Other)
                return "RUNTIME_ERROR";
            case 13: // Internal Error
                return "INTERNAL_ERROR";
            case 14: // Exec Format Error
                return "SYSTEM_ERROR";
            default:
                return "INTERNAL_ERROR";
        }
    }

    async execute(request: ExecutionRequest): Promise<ExecutionResult> {
        try {
            if (!env.JUDGE0_ENABLED) {
                return { status: "SYSTEM_ERROR", message: "Code Execution Service is disabled." };
            }

            const config = getLanguageConfig(request.languageId);
            if (!config) {
                return { status: "SYSTEM_ERROR", message: `Unsupported language: ${request.languageId}` };
            }

            // Enforce hard backend limits replacing frontend trust exactly.
            const timeLimit = request.timeLimitMs ? request.timeLimitMs / 1000 : config.defaultTimeLimitMs / 1000;
            const memoryLimit = request.memoryLimitKb || config.defaultMemoryLimitKb;

            const payload = {
                source_code: base64Encode(request.sourceCode),
                language_id: config.judgeId,
                stdin: request.stdin ? base64Encode(request.stdin) : undefined,
                expected_output: request.expectedOutput ? base64Encode(request.expectedOutput) : undefined,
                cpu_time_limit: Math.min(timeLimit, 5.0), // Cap at 5 seconds
                memory_limit: memoryLimit,
                base64_encoded: true
            };

            // Basic Sync Execution (For scalable systems: this becomes wait=false -> queue)
            const res = await this.client.post("/submissions?base64_encoded=true&wait=true", payload);

            const data = res.data;
            const status = this.mapJudge0Status(data.status?.id || 13);

            return {
                status,
                stdout: data.stdout ? base64Decode(data.stdout) : undefined,
                stderr: data.stderr ? base64Decode(data.stderr) : undefined,
                compileOutput: data.compile_output ? base64Decode(data.compile_output) : undefined,
                message: data.message ? base64Decode(data.message) : undefined,
                runtimeMs: data.time ? Math.round(parseFloat(data.time) * 1000) : 0,
                memoryKb: data.memory || 0,
                exitCode: data.exit_code
            };

        } catch (error: any) {
            console.error("Judge0 Execution Error:", error.message);
            return {
                status: "SYSTEM_ERROR",
                message: "Execution provider is temporarily unavailable or returned a 500.",
            };
        }
    }
}
