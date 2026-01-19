import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center gap-8 p-8">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          Wedding Invitations
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Manage your wedding events and invitations
        </p>
        <Link
          href="/maintainer"
          id="events-link"
          data-testid="events-link"
          className="rounded-full bg-black px-6 py-3 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          View Events
        </Link>
      </main>
    </div>
  )
}
