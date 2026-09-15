"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/services/api/client";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AlertCircle, ChevronRight, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from "react-resizable-panels";
import { ProblemPanel } from "@/components/workspace/ProblemPanel";
import { EditorPanel } from "@/components/workspace/EditorPanel";
import { OutputPanel } from "@/components/workspace/OutputPanel";
import { useCodeEditor } from "@/hooks/useCodeEditor";
import { useExecution } from "@/hooks/useExecution";

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

    // Lifted Editor + Execution states
    const editor = useCodeEditor(problem);
    const exec = useExecution(problem?._id, editor.activeLanguage, editor.currentCode);

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
        <div className="h-[calc(100vh-4rem)] bg-neutral-100 dark:bg-neutral-900 flex flex-col">
            <div className="h-12 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center px-4 shrink-0 justify-between">
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <LayoutTemplate className="w-4 h-4 text-indigo-500 mr-1" />
                    <Link href="/problems" className="hover:text-indigo-600 transition-colors">Problems</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-neutral-900 dark:text-neutral-100 font-medium truncate max-w-[300px]">{problem.title}</span>
                </div>
            </div>

            <div className="flex-1 overflow-hidden p-2">
                <PanelGroup orientation="horizontal" className="h-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    {/* LEFTPANEL: Problem Description */}
                    <Panel defaultSize={35} minSize={20} maxSize={50}>
                        <ProblemPanel problem={problem} />
                    </Panel>

                    <PanelResizeHandle className="w-1.5 bg-neutral-200 dark:bg-neutral-800 hover:bg-indigo-400 dark:hover:bg-indigo-600 transition-colors cursor-col-resize active:bg-indigo-500" />

                    {/* RIGHTPANEL: Editor + Output Split */}
                    <Panel defaultSize={65}>
                        <PanelGroup orientation="vertical">
                            <Panel defaultSize={65} minSize={30}>
                                <EditorPanel
                                    problem={problem}
                                    language={editor.activeLanguage}
                                    code={editor.currentCode}
                                    onCodeChange={editor.setCode}
                                    onLanguageChange={editor.switchLanguage}
                                    onReset={editor.resetCode}
                                    hasUnsavedChanges={editor.hasUnsavedChanges}
                                    onRun={() => exec.runCode()}
                                    onSubmit={exec.submitCode}
                                    isRunning={exec.isRunning}
                                    isSubmitting={exec.isSubmitting}
                                />
                            </Panel>

                            <PanelResizeHandle className="h-1.5 bg-neutral-200 dark:bg-neutral-800 hover:bg-indigo-400 dark:hover:bg-indigo-600 transition-colors cursor-row-resize active:bg-indigo-500 z-10" />

                            <Panel defaultSize={35} minSize={15}>
                                <OutputPanel exec={exec} />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}
