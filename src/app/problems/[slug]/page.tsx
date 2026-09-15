"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/services/api/client";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AlertCircle, BookOpen, Layers, ChevronRight, Play, Send, Settings2 } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

export default function ProblemWorkspacePage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [problem, setProblem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!slug) return;
        const fetchProblem = async () => {
            try {
                const res = await apiClient.get(`/problems/${slug}`);
                setProblem(res.data);
            } catch (err: any) {
                setError(err.response?.data?.error || "Failed to fetch problem workspace.");
            } finally {
                setLoading(false);
            }
        };
        fetchProblem();
    }, [slug]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
                <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                <h2 className="text-xl font-medium tracking-tight text-neutral-600 dark:text-neutral-400">Loading Workspace...</h2>
            </div>
        );
    }

    if (error || !problem) {
        return (
            <div className="container mx-auto px-4 py-32 text-center text-red-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Problem Not Found</h2>
                <p>{error}</p>
                <Button asChild className="mt-6" variant="outline"><Link href="/problems">Return to Problems</Link></Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <Link href="/problems" className="hover:text-indigo-600 transition-colors">Problems</Link> <ChevronRight className="h-3 w-3" />
                        <span className="text-neutral-900 dark:text-neutral-100">{problem.title}</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                        {problem.title}
                        <Badge variant={problem.difficulty === 'Hard' ? 'destructive' : problem.difficulty === 'Medium' ? 'default' : 'secondary'}>{problem.difficulty}</Badge>
                    </h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" disabled className="text-neutral-500 cursor-not-allowed hidden md:flex">
                        <Play className="w-4 h-4 mr-2" /> Run Code (Phase 6)
                    </Button>
                    <Button disabled className="cursor-not-allowed">
                        <Send className="w-4 h-4 mr-2 bg-indigo-500 rounded p-0.5 text-white" /> Submit Solution (Phase 6)
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">

                {/* Left Panel: Description */}
                <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-950 flex flex-col overflow-hidden">
                    <Tabs defaultValue="description" className="w-full flex-1 flex flex-col">
                        <div className="border-b border-neutral-200 dark:border-neutral-800 p-2">
                            <TabsList className="grid grid-cols-3 bg-neutral-100 dark:bg-neutral-900 p-1 w-[300px]">
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="editorial">Editorial</TabsTrigger>
                                <TabsTrigger value="submissions">Submissions</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="description" className="flex-1 overflow-y-auto p-6 m-0 prose dark:prose-invert max-w-none">
                            <div className="flex gap-2 mb-6">
                                <Badge variant="outline"><Layers className="w-3 h-3 mr-1" /> {problem.domain}</Badge>
                                {problem.skills?.map((skill: string) => <Badge variant="secondary" key={skill}>{skill}</Badge>)}
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg border-b border-neutral-200 dark:border-neutral-800 pb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-indigo-500" /> Real-World Background</h3>
                                <p className="text-neutral-600 dark:text-neutral-300 text-sm mt-3">{problem.realWorldScenario?.background}</p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg border-b border-neutral-200 dark:border-neutral-800 pb-2">Objective</h3>
                                <p className="text-neutral-800 dark:text-neutral-200 font-medium text-base mt-3 border-l-2 border-indigo-500 pl-3">{problem.realWorldScenario?.objective}</p>
                            </div>

                            {problem.examples?.map((ex: any, idx: number) => (
                                <div key={idx} className="mb-6">
                                    <h4 className="font-semibold text-sm mb-2">Example {idx + 1}:</h4>
                                    <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-lg p-4 font-mono text-xs">
                                        <div className="mb-2"><span className="text-neutral-500 select-none">Input:</span><br />
                                            {ex.input.split('\n').map((line: string, i: number) => <div key={i}>{line}</div>)}
                                        </div>
                                        <div className="mb-2"><span className="text-neutral-500 select-none">Output:</span><br />{ex.output}</div>
                                        <div><span className="text-neutral-500 select-none">Explanation:</span><br /><span className="text-neutral-600 dark:text-neutral-400 font-sans">{ex.explanation}</span></div>
                                    </div>
                                </div>
                            ))}

                            <div className="mb-8">
                                <h3 className="text-lg border-b border-neutral-200 dark:border-neutral-800 pb-2">Constraints</h3>
                                <ul className="text-sm mt-3 text-neutral-600 dark:text-neutral-300 list-disc pl-5 space-y-1 font-mono text-xs rounded bg-neutral-50 dark:bg-neutral-900 p-4 border border-neutral-100 dark:border-neutral-800">
                                    {problem.constraints?.explicit?.map((c: string, idx: number) => <li key={idx} className="mb-1">{c}</li>)}
                                    {problem.constraints?.inferred?.map((c: string, idx: number) => <li key={idx} className="text-neutral-500">{c}</li>)}
                                </ul>
                            </div>
                        </TabsContent>
                        <TabsContent value="editorial" className="p-6">
                            <div className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold mb-1">Editorial Content Locked</h4>
                                    <p className="text-sm">Official Solutions and AI Hint Coaching are scheduled for Phase 8.</p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="submissions" className="p-6">
                            <p className="text-neutral-500 text-sm">Submission Tracking (Phase 6)</p>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Panel: Code Editor Stub */}
                <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl bg-[#1e1e1e] flex flex-col overflow-hidden relative">
                    <div className="bg-[#2d2d2d] py-2 px-4 flex justify-between items-center z-10 w-full shrink-0 border-b border-black/20">
                        <Badge variant="outline" className="text-xs bg-[#1e1e1e] text-neutral-300 border-neutral-700 hover:bg-[#1e1e1e] uppercase">{problem.language}</Badge>
                        <div className="flex gap-2">
                            <span className="text-neutral-500 text-xs">VIM</span>
                            <span className="text-neutral-500 text-xs">Monaco (Phase 6)</span>
                        </div>
                    </div>
                    <div className="flex-1 p-4 overflow-auto">
                        <div className="relative">
                            <pre className="text-sm font-mono text-neutral-300 w-full h-full pb-8 whitespace-pre-wrap">{problem.starterCode}</pre>
                        </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 top-12 bg-neutral-950/60 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center z-20">
                        <Settings2 className="w-8 h-8 text-indigo-400 mb-3 opacity-50" />
                        <h3 className="text-white font-semibold mb-1 opacity-90 text-sm tracking-wide">JUDGE EXECUTION OFFLINE</h3>
                        <p className="text-neutral-400 text-xs max-w-[200px] leading-relaxed">Phase 6 introduces Monaco Code Editor integration and Judge0 execution sandboxes.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
