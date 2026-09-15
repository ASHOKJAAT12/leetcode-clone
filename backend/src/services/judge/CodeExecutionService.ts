export type ExecutionStatus =
    | "QUEUED"
    | "RUNNING"
    | "ACCEPTED"
    | "WRONG_ANSWER"
    | "COMPILATION_ERROR"
    | "RUNTIME_ERROR"
    | "TIME_LIMIT_EXCEEDED"
    | "MEMORY_LIMIT_EXCEEDED"
    | "OUTPUT_LIMIT_EXCEEDED"
    | "SYSTEM_ERROR"
    | "INTERNAL_ERROR"
    | "CANCELLED";

export type ExecutionRequest = {
    languageId: string;
    sourceCode: string;
    stdin?: string;
    expectedOutput?: string;
    timeLimitMs?: number;
    memoryLimitKb?: number;
};

export type ExecutionResult = {
    status: ExecutionStatus;
    stdout?: string;
    stderr?: string;
    compileOutput?: string;
    message?: string;
    runtimeMs?: number;
    memoryKb?: number;
    exitCode?: number;
};

export interface CodeExecutionService {
    execute(request: ExecutionRequest): Promise<ExecutionResult>;
    // Future integrations for batching test execution can be applied here cleanly
    executeBatch?(requests: ExecutionRequest[]): Promise<ExecutionResult[]>;
}
