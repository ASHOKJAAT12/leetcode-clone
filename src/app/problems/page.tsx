import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { mockProblems } from "@/data/mock/problems";
import { Search } from "lucide-react";

export default function ProblemsPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">Practice with real-world scenarios.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                    <Input type="search" placeholder="Search problems..." className="pl-9" />
                </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" className="rounded-full">All</Button>
                <Button variant="outline" size="sm" className="rounded-full">Easy</Button>
                <Button variant="outline" size="sm" className="rounded-full">Medium</Button>
                <Button variant="outline" size="sm" className="rounded-full">Hard</Button>
            </div>

            <div className="rounded-md border border-neutral-200 dark:border-neutral-800">
                <div className="grid grid-cols-12 border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
                    <div className="col-span-6 md:col-span-5">Status & Title</div>
                    <div className="col-span-3 hidden md:block">Category</div>
                    <div className="col-span-3">Acceptance</div>
                    <div className="col-span-3 md:col-span-1 text-right">Difficulty</div>
                </div>
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {mockProblems.length === 0 && (
                        <div className="px-4 py-8 text-center text-sm text-neutral-500">
                            No problems found. Try changing your filters.
                        </div>
                    )}
                    {mockProblems.map((problem) => (
                        <Link key={problem.id} href={`/problems/${problem.slug}`} className="grid grid-cols-12 items-center px-4 py-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                            <div className="col-span-6 md:col-span-5 font-medium">{problem.title}</div>
                            <div className="col-span-3 hidden md:block text-sm text-neutral-500">{problem.category}</div>
                            <div className="col-span-3 text-sm">{problem.acceptanceRate}%</div>
                            <div className="col-span-3 md:col-span-1 text-right">
                                <span className={
                                    problem.difficulty === "Easy" ? "text-green-600 dark:text-green-400" :
                                        problem.difficulty === "Medium" ? "text-yellow-600 dark:text-yellow-400" :
                                            "text-red-600 dark:text-red-400"
                                }>
                                    {problem.difficulty}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
