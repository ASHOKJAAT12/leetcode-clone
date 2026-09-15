"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/services/api/client";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, Clock, XCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface Submission {
    _id: string;
    problemId: { _id: string; title: string; slug: string; difficulty: string };
    languageId: string;
    status: string;
    testsPassed: number;
    testsTotal: number;
    runtimeMs: number;
    memoryKb: number;
    createdAt: string;
}

export default function SubmissionsHistoryPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchSubmissions = async (p: number) => {
        setLoading(true);
        try {
            const res = await apiClient.get(`/submissions?page=${p}&limit=20`);
            setSubmissions(res.data.data);
            setTotalPages(res.data.pagination.pages);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to load submissions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions(page);
    }, [page]);

    const getStatusIcon = (status: string) => {
        if (status === "ACCEPTED") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
        if (status === "WRONG_ANSWER") return <XCircle className="w-5 h-5 text-red-500" />;
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" asChild className="p-2 h-auto"><Link href="/dashboard"><ArrowLeft className="w-5 h-5" /></Link></Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Submission History</h1>
                    <p className="text-neutral-500 text-sm mt-1">Review your latest judgments across the execution sandbox natively.</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-6">{error}</div>
            )}

            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider font-semibold text-[11px]">
                        <tr>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Problem</th>
                            <th className="px-6 py-4">Language</th>
                            <th className="px-6 py-4">Runtime</th>
                            <th className="px-6 py-4">Memory</th>
                            <th className="px-6 py-4">Submitted</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">Loading submissions...</td>
                            </tr>
                        ) : submissions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">No submissions found.</td>
                            </tr>
                        ) : submissions.map((sub) => (
                            <tr key={sub._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    {getStatusIcon(sub.status)}
                                    <Link href={`/submissions/${sub._id}`} className={`font-semibold hover:underline ${sub.status === "ACCEPTED" ? "text-emerald-600 dark:text-emerald-400" : sub.status === "WRONG_ANSWER" ? "text-red-500" : "text-amber-500"}`}>
                                        {sub.status.replace(/_/g, " ")}
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/problems/${sub.problemId.slug}`} className="text-neutral-900 dark:text-neutral-100 font-medium hover:text-indigo-500 transition-colors">
                                        {sub.problemId.title}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 capitalize text-neutral-600 dark:text-neutral-400">
                                    {sub.languageId}
                                </td>
                                <td className="px-6 py-4 font-mono text-neutral-600 dark:text-neutral-400">
                                    {sub.status === "ACCEPTED" ? `${sub.runtimeMs} ms` : "N/A"}
                                </td>
                                <td className="px-6 py-4 font-mono text-neutral-600 dark:text-neutral-400">
                                    {sub.status === "ACCEPTED" ? `${(sub.memoryKb / 1024).toFixed(1)} MB` : "N/A"}
                                </td>
                                <td className="px-6 py-4 text-neutral-500 text-xs">
                                    {formatDistanceToNow(new Date(sub.createdAt), { addSuffix: true })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Basic Pagination Controls */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30">
                    <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1 || loading}>
                        Previous
                    </Button>
                    <span className="text-sm text-neutral-500">Page {page} of {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages || loading}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
