import Link from "next/link";
import { Button } from "@/components";

export default function Home() {
  return (
    <section
      id="home-hero"
      className="flex flex-1 flex-col items-center justify-center py-16"
    >
      <h1 className="font-serif text-4xl font-semibold text-ink-primary md:text-5xl">
        Welcome
      </h1>
      <p className="mt-4 max-w-md text-center font-sans text-lg text-ink-secondary">
        Manage your wedding events and invitations with ease
      </p>
      <div className="mt-8">
        <Link href="/maintainer" id="events-link" data-testid="events-link">
          <Button variant="primary">View Events</Button>
        </Link>
      </div>
    </section>
  );
}
