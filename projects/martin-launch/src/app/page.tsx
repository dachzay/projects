import { LaunchButton } from "@/components/launch-button";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <main className="launch-page">
      <div className="launch-backdrop" aria-hidden="true">
        <div className="launch-orb launch-orb-left" />
        <div className="launch-orb launch-orb-right" />
        <div className="launch-grid-lines" />
      </div>

      <section className="hero-shell">
        <div className="hero-frame">
          <div className="hero-halo" aria-hidden="true" />

          <div className="hero-grid">
            <div className="hero-copy-stack">
              <div className="brandline">
                <span className="brand-mark">M</span>
                <span className="brand-text">Internal launch surface</span>
              </div>

              <div className="hero-badge-row" aria-label="Launch attributes">
                <span className="hero-badge">Mixed internal audience</span>
                <span className="hero-badge">Operator-first</span>
                <span className="hero-badge">Direct handoff</span>
              </div>

              <div className="hero-text-block">
                <p className="hero-kicker">Ready when the work needs a cleaner thread.</p>
                <h1 className="hero-title">{siteConfig.title}</h1>
                <p className="hero-tagline">{siteConfig.tagline}</p>
                <p className="hero-body">
                  Open Martin when the next move needs context, not drift. This
                  page does not explain the system. It gets you into it.
                </p>
              </div>

              <div className="hero-actions">
                <LaunchButton
                  url={siteConfig.martinUrl}
                  title={siteConfig.title}
                />
                <p className="hero-caption">
                  External handoff. Opens Martin in a new tab.
                </p>
              </div>
            </div>

            <aside className="hero-sidecar" aria-label="Launch context">
              <div className="sidecar-card">
                <span className="sidecar-label">System note</span>
                <p className="sidecar-body">
                  Martin keeps the thread when the work gets noisy.
                </p>
              </div>

              <div className="sidecar-list" aria-label="Audience and behavior">
                <div className="sidecar-item">
                  <span className="sidecar-item-label">Who</span>
                  <span className="sidecar-item-value">
                    Teams moving across accounts, decisions, and handoffs.
                  </span>
                </div>

                <div className="sidecar-item">
                  <span className="sidecar-item-label">How</span>
                  <span className="sidecar-item-value">
                    Minimal surface. One launch path. No setup theater.
                  </span>
                </div>

                <div className="sidecar-item">
                  <span className="sidecar-item-label">Signal</span>
                  <span className="sidecar-item-value">
                    Launch clicks are instrumented as <code>agent_launch</code>.
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
