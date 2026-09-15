import { UserCircle } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 flex-1 flex flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 mb-6">
                <UserCircle className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Your Profile</h1>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-md">
                View your progress, solved topics, badges, and learning history. Demo profile features and user authentication will arrive in Phase 2.
            </p>
        </div>
    )
}
