import Link from "next/link";

// Sticky wayfinding nav (Pass 1 IA). Contact lives here + in footer.
export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-hj-paper/80 border-b border-hj-line">
      <nav
        aria-label="Primary"
        className="max-w-[1080px] mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between gap-3"
      >
        <Link href="/" className="font-hj-mono text-sm font-medium tracking-tight shrink-0">
          hoonjo<span className="text-hj-blue">.</span>dev
        </Link>
        <div className="flex items-center gap-4 sm:gap-7">
          <Link href="/work" className="inline-flex items-center min-h-[44px] text-sm text-hj-muted hover:text-hj-blue transition-colors">
            Work
          </Link>
          <Link href="/#about" className="inline-flex items-center min-h-[44px] text-sm text-hj-muted hover:text-hj-blue transition-colors">
            About
          </Link>
          <Link href="/#contact" className="inline-flex items-center min-h-[44px] text-sm text-hj-muted hover:text-hj-blue transition-colors">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
