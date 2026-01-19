import Link from "next/link";

export function Header() {
  return (
    <header
      id="site-header"
      className="border-b border-border-subtle bg-surface"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          id="site-logo"
          className="font-serif text-2xl font-semibold text-ink-primary"
        >
          Wedding Invitations
        </Link>

        <nav id="main-navigation" aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/maintainer"
                id="nav-maintainers"
                data-testid="nav-maintainers"
                className="font-sans text-sm text-ink-secondary transition-colors hover:text-ink-primary"
              >
                Manage Events
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
