import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

// Sticky wayfinding nav (Pass 1 IA). Contact lives here + in footer.
export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-paper/80 border-b border-hairline">
      <nav
        aria-label="Primary"
        className="max-w-[1080px] mx-auto px-8 h-[68px] flex items-center justify-between"
      >
        <Link href="/" className="font-mono text-sm font-medium tracking-tight">
          hoonjo<span className="text-accent">.</span>dev
        </Link>
        <div className="flex items-center gap-7">
          <Link href="/work" className="text-sm text-gray-1 hover:text-accent transition-colors">
            Work
          </Link>
          <Link href="/#about" className="text-sm text-gray-1 hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/#contact" className="text-sm text-gray-1 hover:text-accent transition-colors">
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
