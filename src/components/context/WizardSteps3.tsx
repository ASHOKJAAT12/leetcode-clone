import React from "react";
import { ProblemContext } from "@/types/context";
import { OUTPUT_STYLES } from "@/data/constants";
import { Input } from "@/components/ui/Input";

export function StepScenario({ ctx, update }: { ctx: Partial<ProblemContext>, update: (v: Partial<ProblemContext>) => void }) {
    const [scenario, setScenario] = React.useState(ctx.scenario || "");
    const [error, setError] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setScenario(val);
        update({ scenario: val });
        if (val.length > 0 && val.length < 50) {
            setError("Scenario must contain at least 50 characters.");
        } else {
            setError("");
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Real-World Scenario</h2>
                <p className="text-neutral-500 dark:text-neutral-400">Describe the business need or software situation.</p>
            </div>
            <div>
                <textarea
                    className="w-full flex min-h-[150px] rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 dark:border-neutral-800 dark:focus-visible:ring-indigo-500"
                    placeholder="Example: You are building an e-commerce order-processing system. The system receives a large stream of customer orders and must calculate customer spending efficiently..."
                    value={scenario}
                    onChange={handleChange}
                />
                <div className="flex justify-between mt-2">
                    <span className={`text-sm ${error ? 'text-red-500' : 'text-neutral-500'}`}>
                        {error || (scenario.length > 0 ? "Looks good!" : "")}
                    </span>
                    <span className="text-xs text-neutral-400">{scenario.length} chars</span>
                </div>
            </div>
        </div>
    )
}

export function StepConstraints({ ctx, update }: { ctx: Partial<ProblemContext>, update: (v: Partial<ProblemContext>) => void }) {
    const constraints = ctx.constraints || {};
    const h = (key: string, val: string) => update({ constraints: { ...constraints, [key]: val } });

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Constraints & Output Style</h2>
                <p className="text-neutral-500 dark:text-neutral-400">Set boundaries and specify the generation style.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Input Size / Data Volume</label>
                    <Input placeholder="e.g. 1,000,000 records" value={constraints.inputSize || ""} onChange={e => h("inputSize", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Time Limit Requirement</label>
                    <Input placeholder="e.g. Must process efficiently" value={constraints.timeRequirement || ""} onChange={e => h("timeRequirement", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Memory Requirement</label>
                    <Input placeholder="e.g. Low memory preferred" value={constraints.memoryRequirement || ""} onChange={e => h("memoryRequirement", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Expected Output Style</label>
                    <select
                        className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 dark:border-neutral-800 dark:bg-neutral-950"
                        value={ctx.outputStyle || ""}
                        onChange={e => update({ outputStyle: e.target.value })}
                    >
                        <option value="">Select a style...</option>
                        {OUTPUT_STYLES.map(o => (
                            <option key={o.id} value={o.id}>{o.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}
