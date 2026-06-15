"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: render a stable placeholder until mounted
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-1.5 font-mono text-xs border border-hairline rounded-md px-3 py-1.5 text-ink hover:text-accent transition-colors"
    >
      {mounted ? (
        isDark ? (
          <>
            <LuMoon aria-hidden className="size-3.5" /> dark
          </>
        ) : (
          <>
            <LuSun aria-hidden className="size-3.5" /> light
          </>
        )
      ) : (
        <>
          <LuSun aria-hidden className="size-3.5 opacity-0" /> theme
        </>
      )}
    </button>
  );
}
