import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Code2, Globe2, Briefcase, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-800 dark:from-indigo-400 dark:to-indigo-600 pb-2">
                Practice Coding. <br className="hidden sm:inline" /> Solve Real Problems.
              </h1>
              <p className="mx-auto max-w-[700px] text-neutral-500 md:text-xl dark:text-neutral-400">
                Build programming skills by solving problems inspired by real-world software systems. Don't just reverse strings—build architecture.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" asChild className="h-12 px-8">
                <Link href="/problems">
                  Start Solving <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="h-12 px-8">
                <Link href="/problems">Explore Problems</Link>
              </Button>
            </div>
            <div className="pt-8 flex items-center justify-center gap-4 flex-wrap">
              <Badge variant="secondary" className="px-4 py-2 text-sm"><Code2 className="mr-2 h-4 w-4" /> 15+ Languages</Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm"><Globe2 className="mr-2 h-4 w-4" /> Real World Scenarios</Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm"><Briefcase className="mr-2 h-4 w-4" /> Job Ready Skills</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Industry Domains</h3>
              <p className="text-neutral-500 dark:text-neutral-400">Explore problems from E-Commerce, Healthcare, EdTech, FinTech, and more.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Code2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Full Environment</h3>
              <p className="text-neutral-500 dark:text-neutral-400">Write, test, and run code instantly in a rich Monaco-powered online environment.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Globe2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Robust Progress</h3>
              <p className="text-neutral-500 dark:text-neutral-400">Track streaks, solve rates, and skill progression across different engineering tags.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-neutral-200 bg-white py-8 dark:border-neutral-800 dark:bg-neutral-950 flex flex-col items-center">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} RealCode. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-neutral-500 hover:underline dark:text-neutral-400">Terms</Link>
            <Link href="#" className="text-sm text-neutral-500 hover:underline dark:text-neutral-400">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
