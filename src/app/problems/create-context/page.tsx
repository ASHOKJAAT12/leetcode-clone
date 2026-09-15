"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ContextWizard } from "@/components/context/ContextWizard";
import { ProblemContext } from "@/types/context";
import { CheckCircle2, ChevronRight, ListChecks, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import apiClient from "@/services/api/client";

export default function CreateContextPage() {
    const [finalized, setFinalized] = useState<any>(null);
    const router = useRouter();
    const [analyzing, setAnalyzing] = useState(false);

    if (finalized) {
        return (
            <div className="container mx-auto px-4 py-16 md:px-6 flex flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mb-6">
                    <CheckCircle2 className="h-10 w-10" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Context Prepared</h1>
                <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md">
                    Your scenario context has been successfully structured and saved. It is now ready for Deep Analysis.
                </p>

                <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 max-w-md w-full text-left space-y-4 mb-8">
                    <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                        <span className="text-neutral-500">Domain</span>
                        <span className="font-semibold capitalize">{finalized.domain.replace("-", " ")}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                        <span className="text-neutral-500">Language</span>
                        <span className="font-semibold capitalize">{finalized.language}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                        <span className="text-neutral-500">Expected Complexity</span>
                        <span className="font-semibold">{finalized.difficulty}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                        <span className="text-neutral-500">Analysis Status</span>
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1"><ListChecks className="h-4 w-4" /> Ready for Deep Analysis</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild variant="outline" disabled={analyzing}>
                        <Link href="/problems"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Problems</Link>
                    </Button>
                    <Button
                        disabled={analyzing}
                        onClick={async () => {
                            setAnalyzing(true);
                            try {
                                // Assuming the Backend maps _id identically 
                                const ctxId = finalized._id;
                                await apiClient.post(`/contexts/${ctxId}/analyze`);
                                router.push(`/problems/${ctxId}/analysis`);
                            } catch (err) {
                                alert("Analysis Failed, backend offline.");
                                setAnalyzing(false);
                            }
                        }}
                    >
                        {analyzing ? "Generating Analysis..." : "Analyze Context (Phase 4)"} <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <ContextWizard onComplete={setFinalized} />
        </div>
    );
}
