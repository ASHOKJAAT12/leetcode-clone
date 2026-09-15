import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Activity, Code, Trophy, Flame } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 flex-1">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">Welcome back, developer.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
                        <Code className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Not started yet</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                        <Flame className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0 days</div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Solve a problem today!</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
                        <Activity className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--%</div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Submit code to see</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
                        <Trophy className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Unranked</div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Participate in contests</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mb-8">
                <Card className="bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-xl">Create a New Challenge</CardTitle>
                        <CardDescription className="text-base text-neutral-600 dark:text-neutral-400">
                            Choose your language, domain and skills to prepare a personalized real-world problem.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/problems/create-context">Create Context</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-bold tracking-tight mb-4">Recommended Problems</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Smart Parking Slot Allocation</CardTitle>
                        <CardDescription>Smart City &bull; <Badge variant="secondary" className="ml-1">Medium</Badge></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2">In a smart city, parking slots are equipped with sensors. You receive a continuous stream of parking events...</p>
                        <Button asChild className="w-full">
                            <Link href="/problems/smart-parking-slot-allocation">Solve Now</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">E-Commerce Billing</CardTitle>
                        <CardDescription>E-Commerce &bull; <Badge variant="secondary" className="ml-1">Easy</Badge></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2">Calculate the final total of shopping cart items given various promotional discounts and tax rules.</p>
                        <Button asChild className="w-full">
                            <Link href="/problems/ecommerce-billing">Solve Now</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
