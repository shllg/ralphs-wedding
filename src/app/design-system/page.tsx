import { Button, Badge, Card, EventItemCard, InvitationCard } from "@/components";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="font-serif text-4xl mb-12" data-testid="page-title">
        Design System
      </h1>

      {/* Typography Section */}
      <section className="mb-12" data-testid="typography-section">
        <h2 className="font-serif text-2xl mb-6 border-b border-border-subtle pb-2">
          Typography
        </h2>
        <div className="space-y-4">
          <p className="font-serif text-4xl">Heading 1 - Cormorant Garamond</p>
          <p className="font-serif text-2xl">Heading 2 - Cormorant Garamond</p>
          <p className="font-serif text-xl">Heading 3 - Cormorant Garamond</p>
          <p className="font-sans text-base text-ink-primary">
            Body text - Inter (Primary)
          </p>
          <p className="font-sans text-sm text-ink-secondary">
            Secondary text - Inter (Secondary)
          </p>
          <p className="font-sans text-sm text-ink-muted">
            Muted text - Inter (Muted)
          </p>
        </div>
      </section>

      {/* Colors Section */}
      <section className="mb-12" data-testid="colors-section">
        <h2 className="font-serif text-2xl mb-6 border-b border-border-subtle pb-2">
          Colors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="h-16 bg-canvas border border-border-subtle rounded mb-2" />
            <p className="font-sans text-xs text-ink-secondary">Canvas</p>
          </div>
          <div>
            <div className="h-16 bg-surface border border-border-subtle rounded mb-2" />
            <p className="font-sans text-xs text-ink-secondary">Surface</p>
          </div>
          <div>
            <div className="h-16 bg-ink-primary rounded mb-2" />
            <p className="font-sans text-xs text-ink-secondary">Ink Primary</p>
          </div>
          <div>
            <div className="h-16 bg-ink-secondary rounded mb-2" />
            <p className="font-sans text-xs text-ink-secondary">Ink Secondary</p>
          </div>
          <div>
            <div className="h-16 bg-ink-muted rounded mb-2" />
            <p className="font-sans text-xs text-ink-secondary">Ink Muted</p>
          </div>
          <div>
            <div className="h-16 bg-bg-success rounded mb-2" />
            <p className="font-sans text-xs text-ink-secondary">Success</p>
          </div>
          <div>
            <div className="h-16 bg-bg-pending rounded mb-2" />
            <p className="font-sans text-xs text-ink-secondary">Pending</p>
          </div>
          <div>
            <div className="h-16 bg-bg-error rounded mb-2" />
            <p className="font-sans text-xs text-ink-secondary">Error</p>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="mb-12" data-testid="buttons-section">
        <h2 className="font-serif text-2xl mb-6 border-b border-border-subtle pb-2">
          Buttons
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" data-testid="button-primary">
            Primary Button
          </Button>
          <Button variant="default" data-testid="button-default">
            Default Button
          </Button>
        </div>
      </section>

      {/* Badges Section */}
      <section className="mb-12" data-testid="badges-section">
        <h2 className="font-serif text-2xl mb-6 border-b border-border-subtle pb-2">
          Badges
        </h2>
        <div className="flex flex-wrap gap-4">
          <Badge status="accepted" />
          <Badge status="pending" />
          <Badge status="declined" />
        </div>
      </section>

      {/* Cards Section */}
      <section className="mb-12" data-testid="cards-section">
        <h2 className="font-serif text-2xl mb-6 border-b border-border-subtle pb-2">
          Cards
        </h2>
        <Card>
          <p className="font-sans text-ink-secondary">
            This is a basic card component with padding, subtle border, and
            shadow.
          </p>
        </Card>
      </section>

      {/* EventItemCard Section */}
      <section className="mb-12" data-testid="event-item-cards-section">
        <h2 className="font-serif text-2xl mb-6 border-b border-border-subtle pb-2">
          Event Item Cards
        </h2>
        <div className="space-y-4">
          <EventItemCard
            title="Wedding Ceremony"
            description="Join us as we exchange vows and celebrate the beginning of our journey together."
            time="3:00 PM"
            location="St. Mary's Chapel"
          />
          <EventItemCard
            title="Cocktail Reception"
            description="Enjoy drinks and hors d'oeuvres while we take photos."
            time="4:30 PM"
            location="Garden Terrace"
          />
          <EventItemCard
            title="Dinner & Dancing"
            description="A celebration with dinner, toasts, and dancing into the night."
            time="6:00 PM"
            location="Grand Ballroom"
          />
        </div>
      </section>

      {/* InvitationCard Section */}
      <section className="mb-12" data-testid="invitation-cards-section">
        <h2 className="font-serif text-2xl mb-6 border-b border-border-subtle pb-2">
          Invitation Cards
        </h2>
        <div className="space-y-3">
          <InvitationCard
            name="Emma Thompson"
            email="emma@email.com"
            state="accepted"
            plusOne
          />
          <InvitationCard
            name="James Wilson"
            email="james@email.com"
            state="accepted"
          />
          <InvitationCard
            name="Sophie Chen"
            email="sophie@email.com"
            state="pending"
            plusOne
          />
          <InvitationCard
            name="Robert Davis"
            email="robert@email.com"
            state="declined"
          />
        </div>
      </section>
    </main>
  );
}
