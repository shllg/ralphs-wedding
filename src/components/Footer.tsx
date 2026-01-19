export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="border-t border-border-subtle bg-surface"
    >
      <div className="mx-auto max-w-5xl px-6 py-6">
        <p className="text-center font-sans text-sm text-ink-muted">
          {currentYear} Wedding Invitations
        </p>
      </div>
    </footer>
  );
}
