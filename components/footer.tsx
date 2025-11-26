import Link from "next/link"

import { LogoMark } from "@/components/logo-mark"

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-card border-t border-border" data-reveal>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-5 gap-4">
              <LogoMark size="sm" className="shrink-0 shadow-[0_25px_60px_-30px_rgba(31,76,59,0.55)]" />
              <div className="space-y-2 text-center sm:text-left">
                <p className="text-sm uppercase tracking-[0.3em] text-accent">LR26</p>
                <h3 className="text-2xl font-light">Leadership Retreat</h3>
                <p className="text-sm text-muted-foreground">Savannah, Georgia</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Where Southern charm meets modern luxury. And where insightful leaders connect.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-mono uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#details" className="text-muted-foreground hover:text-accent transition-colors">
                  Event Details
                </a>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-accent transition-colors">
                  Register
                </Link>
              </li>
              <li className="space-y-1">
                <a
                  href="mailto:info@dentistretreat.com"
                  className="block text-muted-foreground hover:text-accent transition-colors"
                >
                  info@dentistretreat.com
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
            <p className="text-xs text-muted-foreground mt-4">
              Questions? Call ML at (415) 298-6710 or Liz at (415) 309-0345.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 Leadership Retreat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
