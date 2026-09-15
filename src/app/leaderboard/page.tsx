import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 flex-1 flex flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 mb-6">
                <Trophy className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Leaderboard</h1>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-md">
                The global leaderboard will track the best software engineers on the platform. Ranked by problems solved, contest rating, and contribution. (Coming in Phase 11)
            </p>
        </div>
    )
}
