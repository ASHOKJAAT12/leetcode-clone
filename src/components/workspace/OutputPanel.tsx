import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { TerminalSquare, FlaskConical, AlertCircle, CheckCircle2, XCircle, Clock, Cpu } from "lucide-react";
import { useExecution } from "@/hooks/useExecution";

interface OutputPanelProps {
    exec: ReturnType<typeof useExecution>;
}

export function OutputPanel({ exec }: OutputPanelProps) {
    const { isRunning, isSubmitting, runResult, submitResult, error } = exec;
    const [activeTab, setActiveTab] = useState("result");

    const isLoading = isRunning || isSubmitting;

    // Force tab to change to result if new executions come in safely without looping.
    React.useEffect(() => {
        if (isLoading) setActiveTab("result");
    }, [isLoading]);

    return (
        <div className="w-full h-full flex flex-col bg-neutral-50 dark:bg-[#1e1e1e] border-t border-neutral-200 dark:border-neutral-800">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
                <div className="px-2 pt-2 border-b border-neutral-200 dark:border-neutral-800/60 bg-neutral-100/50 dark:bg-neutral-900">
                    <TabsList className="bg-transparent space-x-1 p-0 pb-1 h-auto">
                        <TabsTrigger value="testcase" className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-b-0 border border-transparent dark:data-[state=active]:border-neutral-800 border-b-0 rounded-b-none px-4 py-1.5 text-xs">
                            <FlaskConical className="w-3 h-3 mr-1.5" /> Testcases
                        </TabsTrigger>
                        <TabsTrigger value="result" className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-b-0 border border-transparent dark:data-[state=active]:border-neutral-800 border-b-0 rounded-b-none px-4 py-1.5 text-xs">
                            <TerminalSquare className="w-3 h-3 mr-1.5" /> Test Result
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="testcase" className="flex-1 overflow-y-auto p-4 m-0">
                    {/* Placeholder for real custom testcase input box if time permits. */}
                    <div className="text-sm p-3 bg-white dark:bg-[#252526] border border-neutral-200 dark:border-neutral-800 rounded font-mono text-neutral-500 text-xs">
                         // Custom Input Box will live here.
                    // For now, pressing 'Run' evaluates predefined Sample cases against your solution safely.
                    </div>
                </TabsContent>

                <TabsContent value="result" className="flex-1 overflow-y-auto p-4 m-0 flex flex-col font-sans">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-full opacity-70">
                            <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mb-3"></div>
                            <span className="text-xs tracking-widest uppercase text-indigo-500 font-semibold">{isRunning ? "Running Cases..." : "Evaluating Submission..."}</span>
                        </div>
                    )}

                    {!isLoading && error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/50">
                            <h4 className="flex items-center text-red-600 dark:text-red-400 font-bold mb-2 text-sm"><AlertCircle className="w-4 h-4 mr-2" /> Execution Failed</h4>
                            <p className="text-xs text-red-600/80 dark:text-red-400/80">{error}</p>
                        </div>
                    )}

                    {!isLoading && !error && !runResult && !submitResult && (
                        <div className="text-neutral-400 text-xs text-center mt-10">
                            Run or Submit your code to see results here.
                        </div>
                    )}

                    {/* Run Results Viewer */}
                    {!isLoading && runResult && !runResult.isCustom && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                                {runResult.passed === runResult.total ? (
                                    <span className="flex items-center text-emerald-500 font-bold"><CheckCircle2 className="w-5 h-5 mr-1.5" /> Accepted</span>
                                ) : (
                                    <span className="flex items-center text-red-500 font-bold"><XCircle className="w-5 h-5 mr-1.5" /> Wrong Answer</span>
                                )}
                                <span className="text-xs text-neutral-500">Passed {runResult.passed} / {runResult.total} sample cases</span>
                            </div>

                            <div className="flex gap-2">
                                {runResult.results?.map((res, i) => (
                                    <div key={i} className={`px-3 py-1.5 rounded cursor-pointer text-xs font-semibold ${res.result.status === "ACCEPTED" ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : "bg-red-500/10 text-red-500 hover:bg-red-500/20"}`}>
                                        Case {i + 1}
                                    </div>
                                ))}
                            </div>

                            {/* Automatically reveal the first case safely */}
                            {runResult.results && runResult.results.length > 0 && (
                                <div className="mt-4 space-y-3 relative p-4 rounded bg-white dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800">
                                    {/* Just mapping the first one for direct UI simplicity in this bounds */}
                                    <div className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-1">Input</div>
                                    <pre className="text-xs bg-neutral-100 dark:bg-black p-2 rounded text-neutral-700 dark:text-neutral-300 font-mono overflow-x-auto whitespace-pre-wrap">{runResult.results[0].input || "No Input"}</pre>

                                    <div className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-1">Expected Output</div>
                                    <pre className="text-xs bg-neutral-100 dark:bg-black p-2 rounded text-neutral-700 dark:text-neutral-300 font-mono overflow-x-auto whitespace-pre-wrap">{runResult.results[0].expectedOutput}</pre>

                                    <div className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-1">Stdout</div>
                                    <pre className={`text-xs p-2 rounded font-mono overflow-x-auto whitespace-pre-wrap ${runResult.results[0].result.status === "ACCEPTED" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-red-500/10 text-red-700 dark:text-red-300"}`}>{runResult.results[0].result.stdout || "Execution failed and returned no output."}</pre>

                                    {runResult.results[0].result.stderr && (
                                        <>
                                            <div className="text-xs text-red-500 uppercase tracking-widest font-semibold mb-1 mt-4">Stderr</div>
                                            <pre className="text-xs bg-red-900/20 text-red-400 p-2 rounded font-mono overflow-x-auto whitespace-pre-wrap">{runResult.results[0].result.stderr}</pre>
                                        </>
                                    )}

                                    {runResult.results[0].result.compileOutput && (
                                        <>
                                            <div className="text-xs text-red-500 uppercase tracking-widest font-semibold mb-1 mt-4">Compile Error</div>
                                            <pre className="text-xs bg-red-900/20 text-red-400 p-2 rounded font-mono overflow-x-auto whitespace-pre-wrap">{runResult.results[0].result.compileOutput}</pre>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Submit Results Viewer */}
                    {!isLoading && submitResult && (
                        <div className="p-5 bg-white dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded space-y-4">
                            <div className="flex items-center gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                                {submitResult.status === "ACCEPTED" ? (
                                    <h3 className="text-2xl font-bold flex items-center text-emerald-500"><CheckCircle2 className="w-7 h-7 mr-2" /> Accepted</h3>
                                ) : (
                                    <div className="flex items-start">
                                        <XCircle className="w-6 h-6 mr-2 text-red-500 mt-1" />
                                        <div>
                                            <h3 className="text-xl font-bold text-red-500">{submitResult.status.replace(/_/g, " ")}</h3>
                                            <p className="text-red-500/80 text-xs mt-1">{submitResult.message}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-6 mt-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Tests Passed</span>
                                    <span className="text-xl font-mono text-neutral-900 dark:text-neutral-100">{submitResult.testsPassed} / {submitResult.testsTotal}</span>
                                </div>
                                {submitResult.status === "ACCEPTED" && (
                                    <>
                                        <div className="flex flex-col ml-10">
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 flex items-center"><Clock className="w-3 h-3 mr-1" /> Runtime</span>
                                            <span className="text-xl font-mono text-neutral-900 dark:text-neutral-100">{submitResult.runtimeMs} <span className="text-xs text-neutral-500 ml-1">ms</span></span>
                                        </div>
                                        <div className="flex flex-col ml-6">
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 flex items-center"><Cpu className="w-3 h-3 mr-1" /> Memory</span>
                                            <span className="text-xl font-mono text-neutral-900 dark:text-neutral-100">{(submitResult.memoryKb / 1024).toFixed(1)} <span className="text-xs text-neutral-500 ml-1">MB</span></span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
