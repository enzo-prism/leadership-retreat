export function Footer() {
  return (
    <footer className="py-12 px-4 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-light mb-4">Leadership Retreat</h3>
            <p className="text-sm text-muted-foreground">
              Building connections, fostering growth, and inspiring leadership excellence.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-mono uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#details" className="text-muted-foreground hover:text-secondary transition-colors">
                  Event Details
                </a>
              </li>
              <li>
                <a href="#register" className="text-muted-foreground hover:text-secondary transition-colors">
                  Register
                </a>
              </li>
              <li>
                <a
                  href="mailto:retreat@example.com"
                  className="text-muted-foreground hover:text-secondary transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-mono uppercase tracking-widest mb-4">Connect</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The Thompson Savannah
              <br />
              Savannah, Georgia
            </p>
            <p className="text-sm text-muted-foreground">June 4–6, 2026</p>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 Leadership Retreat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
