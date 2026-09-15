import React from "react";
import { ProblemContext } from "@/types/context";
import { mockLanguages } from "@/data/mock/languages";
import { DOMAINS, EXPERIENCES, PROBLEM_TYPES, SKILLS, OUTPUT_STYLES } from "@/data/constants";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export function StepLanguage({ ctx, update }: { ctx: Partial<ProblemContext>, update: (v: Partial<ProblemContext>) => void }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Programming Language</h2>
                <p className="text-neutral-500 dark:text-neutral-400">Select the language you want to solve the problem in.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockLanguages.map(l => (
                    <Button key={l.id} variant={ctx.language === l.id ? "default" : "outline"} className={`h-16 ${ctx.language === l.id ? 'ring-2 ring-offset-2 ring-indigo-600 dark:ring-indigo-400' : ''}`} onClick={() => update({ language: l.id })}>
                        {l.name}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export function StepDomain({ ctx, update }: { ctx: Partial<ProblemContext>, update: (v: Partial<ProblemContext>) => void }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Industry Domain</h2>
                <p className="text-neutral-500 dark:text-neutral-400">Choose a real-world vertical for your scenario.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DOMAINS.map(d => (
                    <Card key={d.id} className={`cursor-pointer transition-colors hover:border-indigo-600 ${ctx.domain === d.id ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`} onClick={() => update({ domain: d.id })}>
                        <CardHeader className="p-4">
                            <CardTitle className="text-base">{d.name}</CardTitle>
                            <CardDescription>{d.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export function StepDifficultyAndExperience({ ctx, update }: { ctx: Partial<ProblemContext>, update: (v: Partial<ProblemContext>) => void }) {
    const diffs = ["Easy", "Medium", "Hard", "Expert"] as const;
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-4">
                <div>
                    <h2 className="text-xl font-bold">Difficulty</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Complexity of the problem.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {diffs.map(d => (
                        <Button key={d} variant={ctx.difficulty === d ? "default" : "outline"} onClick={() => update({ difficulty: d })}>{d}</Button>
                    ))}
                </div>
            </div>
            <div className="space-y-4">
                <div>
                    <h2 className="text-xl font-bold">Experience Level</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Your background, adjusting the technical verbiage.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {EXPERIENCES.map(e => (
                        <Card key={e.id} className={`cursor-pointer hover:border-indigo-600 ${ctx.experienceLevel === e.id ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`} onClick={() => update({ experienceLevel: e.id as any })}>
                            <CardHeader className="p-4">
                                <CardTitle className="text-sm">{e.name}</CardTitle>
                                <CardDescription className="text-xs">{e.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function StepProblemType({ ctx, update }: { ctx: Partial<ProblemContext>, update: (v: Partial<ProblemContext>) => void }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Problem Type</h2>
                <p className="text-neutral-500 dark:text-neutral-400">What kind of task are you solving?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROBLEM_TYPES.map(p => (
                    <Card key={p.id} className={`cursor-pointer hover:border-indigo-600 ${ctx.problemType === p.id ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`} onClick={() => update({ problemType: p.id })}>
                        <CardHeader className="p-4">
                            <CardTitle className="text-base">{p.name}</CardTitle>
                            <CardDescription className="text-sm border-t border-neutral-100 dark:border-neutral-800 pt-2 mt-2">{p.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
