"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/services/api/client";
import { useParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, ChevronRight, Hash, Clock, Server, Layers, Cpu, Settings2, FileText, AlertTriangle, AlertCircle, Goal, Link as LinkIcon, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AnalysisDashboard() {
    const params = useParams();
    const id = params?.id as string;
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        const fetchAnalysis = async () => {
            try {
                const res: any = await apiClient.get(`/contexts/${id}/analysis`);
                setAnalysis(res.data);
            } catch (err: any) {
                setError(err.message || "Failed to load Deep Analysis data.");
            } finally {
                setLoading(false);
            }
        };
        fetchAnalysis();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
                <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                <h2 className="text-xl font-medium tracking-tight text-neutral-600 dark:text-neutral-400">Processing Deep Analysis...</h2>
            </div>
        );
    }

    if (error || !analysis) {
        return (
            <div className="container mx-auto px-4 py-32 text-center text-red-500">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Analysis Failed</h2>
                <p>{error}</p>
                <Button asChild className="mt-6" variant="outline"><Link href="/problems">Return to Problems</Link></Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">

            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <Link href="/problems" className="hover:text-indigo-600 transition-colors">Problems</Link> <ChevronRight className="h-3 w-3" />
                        <span className="text-neutral-900 dark:text-neutral-100">Deep Analysis</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Context Engineering & Analysis</h1>
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> {analysis.status}
                        </Badge>
                        <span className="text-sm text-neutral-500">Engine Output Version: {analysis.version}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/problems">Cancel</Link>
                    </Button>
                    <Button disabled>
                        Continue to Problem Generation (Phase 5)
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="architecture" className="space-y-6">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-neutral-100 dark:bg-neutral-900 p-1">
                    <TabsTrigger value="architecture">Architecture & Bounds</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                    <TabsTrigger value="techniques">Algorithmic Techniques</TabsTrigger>
                    <TabsTrigger value="quality">Quality & Edge Cases</TabsTrigger>
                    <TabsTrigger value="language">Language Specifics</TabsTrigger>
                </TabsList>

                <TabsContent value="architecture" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><Layers className="h-5 w-5 text-indigo-500" /> Domain Mapping</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm font-medium text-neutral-500">Target Category</span>
                                    <div className="mt-1 flex items-center gap-2"><Badge>{analysis.domainAnalysis.domain}</Badge></div>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-neutral-500">Inferred Entities</span>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                        {analysis.domainAnalysis.entities?.map((e: string) => <Badge variant="secondary" key={e}>{e}</Badge>)}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-neutral-500">Standard Workflows</span>
                                    <ul className="mt-1 text-sm space-y-1">
                                        {analysis.domainAnalysis.workflows?.map((w: string) => <li key={w} className="flex items-center gap-2"><Check className="h-3 w-3 text-green-500" /> {w}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><Settings2 className="h-5 w-5 text-indigo-500" /> Constraint Bounding</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-2 border-b border-neutral-100 dark:border-neutral-800">
                                    <span className="text-sm font-medium text-neutral-500">Data Volume</span>
                                    <span className="text-sm font-semibold">{analysis.constraintAnalysis.inputScale}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-neutral-100 dark:border-neutral-800">
                                    <span className="text-sm font-medium text-neutral-500">Scalability</span>
                                    <span className="text-sm font-semibold">{analysis.constraintAnalysis.scalabilityLevel}</span>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-neutral-500 mb-2 block">Explicit Constraints</span>
                                    <ul className="text-sm space-y-1 text-neutral-700 dark:text-neutral-300">
                                        {analysis.constraintAnalysis.importantConstraints?.map((c: string) => <li key={c}>• {c}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-amber-600 mb-2 block flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Inferred Rules</span>
                                    <ul className="text-sm space-y-1 text-neutral-700 dark:text-neutral-300 border-l-2 border-amber-500 pl-3">
                                        {analysis.constraintAnalysis.inferredConstraints?.map((c: string) => <li key={c}>{c}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="requirements" className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-6"><Goal className="h-5 w-5 text-indigo-500" /> Goal Abstraction</h3>
                    <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-lg mb-6">
                        <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-1 block">Primary Goal</span>
                        <p className="text-lg font-medium">{analysis.requirementAnalysis.primaryGoal}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold text-sm mb-3">Functional Requirements</h4>
                            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                {analysis.requirementAnalysis.functionalRequirements?.map((r: string, i: number) => <li key={i} className="flex gap-2 items-start"><Check className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" /> {r}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-3">Non-Functional Target</h4>
                            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                {analysis.requirementAnalysis.nonFunctionalRequirements?.map((r: string, i: number) => <li key={i} className="flex gap-2 items-start"><Cpu className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> {r}</li>)}
                            </ul>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="techniques" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><LinkIcon className="h-5 w-5 text-indigo-500" /> Algorithm Candidates</h3>
                            <div className="space-y-4">
                                {analysis.algorithmAnalysis?.map((alg: any, idx: number) => (
                                    <div key={idx} className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-sm">{alg.technique}</span>
                                            <Badge variant="outline" className={alg.applicability === 'Excellent' || alg.applicability === 'High' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400' : ''}>{alg.applicability} Match</Badge>
                                        </div>
                                        <p className="text-xs text-neutral-500 mb-2">{alg.reason}</p>
                                        <div className="text-xs font-mono bg-neutral-100 dark:bg-neutral-900 inline-block px-2 py-1 rounded">Target: {alg.expectedComplexity}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><Hash className="h-5 w-5 text-indigo-500" /> Concept Targeting</h3>
                            <div className="space-y-3">
                                {analysis.skillAnalysis?.map((s: any, idx: number) => (
                                    <div key={idx} className="flex items-start gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0 last:pb-0">
                                        <Badge variant={s.priority === 'primary' ? 'default' : 'secondary'} className="mt-0.5">{s.skill}</Badge>
                                        <div>
                                            <p className="text-sm font-medium">{s.relevance}</p>
                                            <p className="text-xs text-neutral-500">{s.reason}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="quality" className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><AlertTriangle className="h-5 w-5 text-amber-500" /> Edge Cases Evaluated</h3>
                            <ul className="space-y-4">
                                {analysis.edgeCases?.map((e: any, i: number) => (
                                    <li key={i} className="flex gap-3">
                                        <Badge variant={e.priority === 'critical' ? 'destructive' : 'outline'} className="h-fit">{e.priority}</Badge>
                                        <div>
                                            <p className="text-sm font-medium">{e.case}</p>
                                            <p className="text-xs text-neutral-500 mt-1">{e.reason}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><FileText className="h-5 w-5 text-indigo-500" /> Predictive Mistakes Profiling</h3>
                            <ul className="space-y-4">
                                {analysis.likelyMistakes?.map((m: any, i: number) => (
                                    <li key={i} className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-3 rounded-lg">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{m.mistake}</p>
                                            <span className="text-xs font-medium text-amber-600">Severity: {m.severity}</span>
                                        </div>
                                        <p className="text-xs text-neutral-500 mt-1">{m.reason}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="language" className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 capitalize"><Server className="h-5 w-5 text-indigo-500" /> {analysis.languageAnalysis.language} Profile</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <h4 className="text-sm font-medium text-neutral-500 mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-1">Recommended Features</h4>
                            <ul className="space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
                                {analysis.languageAnalysis.recommendedFeatures?.map((f: string) => <li key={f} className="flex gap-2 items-center"><Check className="h-3 w-3 text-green-500" /> {f}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-neutral-500 mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-1">Data Structures</h4>
                            <ul className="space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
                                {analysis.languageAnalysis.recommendedDataStructures?.map((f: string) => <li key={f} className="flex gap-2 items-center"><Check className="h-3 w-3 text-green-500" /> {f}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-neutral-500 mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-1">Performance Tuning</h4>
                            <ul className="space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
                                {analysis.languageAnalysis.performanceConsiderations?.map((f: string) => <li key={f} className="flex gap-2 items-start"><Clock className="h-3 w-3 mt-1 shrink-0 text-amber-500" /> {f}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-neutral-500 mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-1">Common Pitfalls</h4>
                            <ul className="space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
                                {analysis.languageAnalysis.commonPitfalls?.map((f: string) => <li key={f} className="flex gap-2 items-start"><AlertCircle className="h-3 w-3 mt-1 shrink-0 text-red-500" /> {f}</li>)}
                            </ul>
                        </div>
                    </div>
                </TabsContent>


            </Tabs>
        </div>
    );
}
