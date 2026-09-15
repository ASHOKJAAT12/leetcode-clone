"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/services/api/client";
import { useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, Clock, XCircle, AlertTriangle, ArrowLeft, Cpu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface SubmissionDetail {
    _id: string;
    problemId: { _id: string; title: string; slug: string; difficulty: string };
    languageId: string;
    status: string;
    testsPassed: number;
    testsTotal: number;
    runtimeMs: number;
    memoryKb: number;
    code: string;
    failureMessage?: string;
    compileOutput?: string;
    createdAt: string;
}

export default function SubmissionDetailPage() {
    const params = useParams();
    const id = params?.id as string;

    const [sub, setSub] = useState<SubmissionDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        const fetchSub = async () => {
            try {
                const res = await apiClient.get(`/submissions/${id}`);
                setSub(res.data.data);
            } catch (err: any) {
                setError(err.response?.data?.error || "Failed to load submission details.");
            } finally {
                setLoading(false);
            }
        };
        fetchSub();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
                <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                <h2 className="text-xl font-medium tracking-tight text-neutral-600 dark:text-neutral-400">Loading Submission Details...</h2>
            </div>
        );
    }

    if (error || !sub) {
        return (
            <div className="container mx-auto px-4 py-32 text-center text-red-500">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Submission Not Found</h2>
                <p>{error}</p>
                <Button asChild className="mt-6" variant="outline"><Link href="/submissions">Back to Submissions</Link></Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex justify-between items-start mb-8">
                <div className="flex flex-col gap-1">
                    <Link href="/submissions" className="text-neutral-500 hover:text-neutral-900 flex items-center text-sm font-medium mb-3 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1.5" /> All Submissions
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center">
                        {sub.status === "ACCEPTED" ? <CheckCircle2 className="w-8 h-8 mr-3 text-emerald-500" /> : <XCircle className="w-8 h-8 mr-3 text-red-500" />}
                        {sub.status.replace(/_/g, " ")}
                    </h1>
                    <p className="text-neutral-500 text-sm mt-1">Submitted {formatDistanceToNow(new Date(sub.createdAt), { addSuffix: true })}</p>
                </div>

                <Button asChild variant="outline">
                    <Link href={`/problems/${sub.problemId.slug}`}>Go to Problem</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
                    <div className="text-xs uppercase text-neutral-500 font-bold tracking-widest mb-1">Language</div>
                    <div className="text-lg font-semibold capitalize text-neutral-900 dark:text-neutral-100">{sub.languageId}</div>
                </div>
                <div className="bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
                    <div className="text-xs uppercase text-neutral-500 font-bold tracking-widest mb-1">Tests Passed</div>
                    <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{sub.testsPassed} / {sub.testsTotal}</div>
                </div>
                <div className="bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
                    <div className="text-xs uppercase text-neutral-500 font-bold tracking-widest flex items-center mb-1"><Clock className="w-3 h-3 mr-1" /> Runtime</div>
                    <div className="text-lg font-mono text-neutral-900 dark:text-neutral-100">{sub.status === "ACCEPTED" ? `${sub.runtimeMs} ms` : "N/A"}</div>
                </div>
                <div className="bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
                    <div className="text-xs uppercase text-neutral-500 font-bold tracking-widest flex items-center mb-1"><Cpu className="w-3 h-3 mr-1" /> Memory</div>
                    <div className="text-lg font-mono text-neutral-900 dark:text-neutral-100">{sub.status === "ACCEPTED" ? `${(sub.memoryKb / 1024).toFixed(1)} MB` : "N/A"}</div>
                </div>
            </div>

            {sub.failureMessage && (
                <div className="mb-8 p-5 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-xl">
                    <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2 uppercase tracking-widest">Compiler / Runner Output</h3>
                    <p className="text-red-600/80 dark:text-red-400/80 text-sm whitespace-pre-wrap">{sub.failureMessage}</p>

                    {sub.compileOutput && (
                        <pre className="mt-4 bg-red-900/20 text-red-400 p-4 rounded font-mono text-xs overflow-x-auto whitespace-pre-wrap">{sub.compileOutput}</pre>
                    )}
                </div>
            )}

            <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-sm border border-neutral-800">
                <div className="bg-[#2d2d2d] px-4 py-3 border-b border-black/40 flex justify-between items-center text-sm text-neutral-400">
                    <span className="font-mono tracking-wide flex items-center"><code className="text-emerald-400 mr-2 bg-emerald-400/10 px-1.5 py-0.5 rounded text-[10px]">SRC</code> {sub.problemId.slug}-{sub._id.slice(-6)}.{sub.languageId === "python" ? "py" : sub.languageId === "javascript" ? "js" : sub.languageId === "java" ? "java" : "cpp"}</span>
                </div>
                <pre className="p-4 overflow-x-auto text-sm text-neutral-300 font-mono leading-relaxed bg-[#1e1e1e] whitespace-pre-wrap min-h-[300px]">
                    {sub.code}
                </pre>
            </div>

        </div>
    );
}
