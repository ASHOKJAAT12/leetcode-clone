"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { mockProblems } from "@/data/mock/problems";
import { mockLanguages } from "@/data/mock/languages";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Play, Send, Lightbulb, ChevronDown } from "lucide-react";

export default function ProblemDetail() {
    const { slug } = useParams();
    const problem = mockProblems.find((p) => p.slug === slug);

    const [language, setLanguage] = useState(mockLanguages[0]);
    const [code, setCode] = useState(language.starterCode);

    useEffect(() => {
        setCode(language.starterCode);
    }, [language]);

    if (!problem) {
        return <div className="p-8 text-center text-neutral-500 md:text-lg">Problem not found.</div>;
    }

    return (
        <div className="flex h-[calc(100vh-3.5rem)] flex-col lg:flex-row overflow-hidden bg-neutral-50 dark:bg-neutral-950">
            {/* Left Panel: Description */}
            <div className="w-full lg:w-1/2 xl:w-5/12 flex flex-col border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-y-auto max-h-[50vh] lg:max-h-full">
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 sticky top-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur z-10">
                    <div className="flex space-x-3 items-center">
                        <span className="font-semibold text-lg max-w-[200px] sm:max-w-xs truncate" title={problem.title}>{problem.title}</span>
                        <Badge variant="outline" className={
                            problem.difficulty === "Easy" ? "text-green-600 dark:text-green-400 border-green-200 dark:border-green-900" :
                                problem.difficulty === "Medium" ? "text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900" :
                                    "text-red-600 dark:text-red-400 border-red-200 dark:border-red-900"
                        }>
                            {problem.difficulty}
                        </Badge>
                    </div>
                </div>
                <div className="p-6 flex-1">
                    <div className="prose dark:prose-invert max-w-none text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                        {problem.description ? problem.description.split('\n').map((line, i) => {
                            if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-8 mb-4 text-neutral-900 dark:text-neutral-100">{line.replace('## ', '')}</h2>
                            if (line.startsWith('- ')) return <li key={i} className="ml-4 mb-2">{line.replace('- ', '')}</li>
                            return <p key={i} className="mb-4 leading-relaxed">{line}</p>
                        }) : <p>No description provided.</p>}
                    </div>
                    <div className="mt-8 border-t border-neutral-200 dark:border-neutral-800 pt-6">
                        <h3 className="text-sm font-semibold mb-3 text-neutral-900 dark:text-neutral-100">Tags & Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {problem.tags.map(tag => (
                                <Badge variant="outline" key={tag}>{tag}</Badge>
                            ))}
                            {problem.expectedSkills?.map(skill => (
                                <Badge variant="secondary" key={skill}>{skill}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Editor & Actions */}
            <div className="flex-1 flex flex-col min-h-[50vh] lg:min-h-full">
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-4 py-2">
                    <div className="relative">
                        {/* Mock Language Selector */}
                        <select
                            className="h-8 w-36 appearance-none rounded-md border border-neutral-200 bg-white px-3 pr-8 text-sm dark:border-neutral-700 dark:bg-neutral-950 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm"
                            value={language.id}
                            onChange={(e) => {
                                const selected = mockLanguages.find(l => l.id === e.target.value);
                                if (selected) setLanguage(selected);
                            }}
                        >
                            {mockLanguages.map(l => (
                                <option key={l.id} value={l.id}>{l.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-2 h-4 w-4 pointer-events-none text-neutral-500" />
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300" disabled>
                            <Lightbulb className="mr-2 h-4 w-4" /> Answer
                        </Button>
                        <Button variant="secondary" size="sm" disabled>
                            <Play className="mr-2 h-4 w-4" /> Run
                        </Button>
                        <Button size="sm" disabled>
                            <Send className="mr-2 h-4 w-4" /> Submit
                        </Button>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <CodeEditor
                        language={language.monacoLanguage}
                        value={code}
                        onChange={(val) => setCode(val || "")}
                    />
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4 min-h-[140px] shadow-[inset_0_4px_6px_-6px_rgba(0,0,0,0.1)]">
                    <div className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wider">Testcases & Output</div>
                    <div className="text-sm text-neutral-500 mt-4 rounded-md border border-dashed border-neutral-300 dark:border-neutral-700 p-4 flex items-center justify-center">
                        Run code to see test case output. (Coming in next phase)
                    </div>
                </div>
            </div>
        </div>
    );
}
