import Link from "next/link"
import { Menu, User } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/Button"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
            <div className="flex h-14 items-center px-4 md:px-6">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold sm:inline-block">RealCode</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/problems" className="transition-colors hover:text-neutral-950 dark:hover:text-neutral-50 text-neutral-500 dark:text-neutral-400">Problems</Link>
                    <Link href="/contests" className="transition-colors hover:text-neutral-950 dark:hover:text-neutral-50 text-neutral-500 dark:text-neutral-400">Contests</Link>
                    <Link href="/leaderboard" className="transition-colors hover:text-neutral-950 dark:hover:text-neutral-50 text-neutral-500 dark:text-neutral-400">Leaderboard</Link>
                </nav>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <Button variant="outline" className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-neutral-500 dark:text-neutral-400 sm:pr-12 md:w-40 lg:w-64" disabled>
                            <span className="hidden lg:inline-flex">Search problems...</span>
                            <span className="inline-flex lg:hidden">Search...</span>
                            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border border-neutral-200 bg-neutral-100 px-1.5 font-mono text-[10px] font-medium opacity-100 dark:border-neutral-800 dark:bg-neutral-900 sm:flex">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </Button>
                    </div>
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
                        <Link href="/profile"><User className="h-5 w-5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="md:flex lg:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
