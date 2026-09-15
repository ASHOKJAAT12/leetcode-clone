import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Layers, BookOpen, Clock, AlertTriangle } from "lucide-react";

interface ProblemPanelProps {
    problem: any;
}

export function ProblemPanel({ problem }: ProblemPanelProps) {
    if (!problem) return null;

    return (
        <div className="w-full h-full flex flex-col bg-white dark:bg-neutral-950 overflow-y-auto">
            <div className="p-6">
                <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant={problem.difficulty === 'Hard' ? 'destructive' : problem.difficulty === 'Medium' ? 'default' : 'secondary'}>{problem.difficulty}</Badge>
                    <Badge variant="outline"><Layers className="w-3 h-3 mr-1" /> {problem.domain}</Badge>
                    {problem.skills?.map((s: string) => <Badge variant="secondary" key={s}>{s}</Badge>)}
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">{problem.title}</h1>

                <div className="prose dark:prose-invert max-w-none text-sm">
                    {problem.realWorldScenario?.background && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><BookOpen className="w-4 h-4 text-indigo-500" /> Real-World Background</h3>
                            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
                                {problem.realWorldScenario.background}
                            </p>
                        </div>
                    )}

                    <div className="mb-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
                        <h3 className="text-lg font-semibold mb-2">Objective</h3>
                        <p className="text-neutral-800 dark:text-neutral-200 border-l-2 border-indigo-500 pl-3">
                            {problem.realWorldScenario?.objective || "Solve the problem efficiently."}
                        </p>
                        {problem.description && <p className="mt-4 text-neutral-700 dark:text-neutral-300">{problem.description}</p>}
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Examples</h3>
                        <div className="space-y-4">
                            {problem.examples?.map((ex: any, idx: number) => (
                                <div key={idx} className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 font-mono text-xs shadow-sm">
                                    <div className="font-semibold text-neutral-400 mb-2 font-sans text-xs uppercase tracking-wider">Example {idx + 1}</div>
                                    <div className="mb-3">
                                        <span className="text-neutral-500 select-none mr-2 block mb-1">Input:</span>
                                        <div className="bg-white dark:bg-black/40 p-2 rounded border border-neutral-200/50 dark:border-neutral-800">
                                            {ex.input.split('\n').map((line: string, i: number) => <div key={i}>{line}</div>)}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <span className="text-neutral-500 select-none mr-2 block mb-1">Output:</span>
                                        <div className="bg-white dark:bg-black/40 p-2 rounded border border-neutral-200/50 dark:border-neutral-800">{ex.output}</div>
                                    </div>
                                    {ex.explanation && (
                                        <div>
                                            <span className="text-neutral-500 select-none block mb-1">Explanation:</span>
                                            <span className="text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">{ex.explanation}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                        <ul className="text-sm mt-3 text-neutral-600 dark:text-neutral-300 list-disc pl-5 space-y-1 font-mono text-xs rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                            {problem.constraints?.explicit?.map((c: string, idx: number) => <li key={idx} className="mb-2 text-neutral-700 dark:text-neutral-300">{c}</li>)}
                            {problem.constraints?.inferred?.map((c: string, idx: number) => <li key={`inf-${idx}`} className="text-neutral-500">{c}</li>)}
                        </ul>
                    </div>

                    {problem.edgeCases && problem.edgeCases.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Key Considerations</h3>
                            <ul className="text-sm space-y-2">
                                {problem.edgeCases.map((e: any, idx: number) => (
                                    <li key={idx} className="flex flex-col bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded border border-amber-100 dark:border-amber-900/50">
                                        <span className="font-medium text-amber-900 dark:text-amber-400">{e.case}</span>
                                        <span className="text-neutral-500 text-xs mt-1">{e.reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
