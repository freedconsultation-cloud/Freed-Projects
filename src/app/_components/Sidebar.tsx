"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { useRepo } from "./RepoContext";

const NAV = [
  {
    category: "Analysis",
    items: [
      { name: "Repo Overview", href: "/tools/overview", icon: "◈", ready: true },
      { name: "File Structure", href: "/tools/file-structure", icon: "⊞", ready: false },
      { name: "Language Stats", href: "/tools/language-stats", icon: "▤", ready: false },
      { name: "Dependencies", href: "/tools/dependencies", icon: "◉", ready: false },
    ],
  },
  {
    category: "Quality",
    items: [
      { name: "Code Complexity", href: "/tools/complexity", icon: "≋", ready: false },
      { name: "TODO Tracker", href: "/tools/todos", icon: "☑", ready: false },
      { name: "Security Scan", href: "/tools/security", icon: "⚿", ready: false },
    ],
  },
  {
    category: "Review",
    items: [
      { name: "PR Insights", href: "/tools/pull-requests", icon: "⇌", ready: false },
      { name: "Commit History", href: "/tools/commits", icon: "⊛", ready: false },
      { name: "Contributors", href: "/tools/contributors", icon: "◎", ready: false },
    ],
  },
];

function parseRepoInput(raw: string): string {
  const trimmed = raw.trim();
  const match = trimmed.match(/github\.com\/([^/]+\/[^/?\s]+)/);
  if (match) return match[1].replace(/\.git$/, "");
  if (/^[^/\s]+\/[^/\s]+$/.test(trimmed)) return trimmed;
  return trimmed;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { repo, setRepo } = useRepo();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setInputValue(repo);
  }, [repo]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = parseRepoInput(inputValue);
    if (!parsed) return;
    setRepo(parsed);
    setOpen(false);
    if (pathname.startsWith("/hub") || pathname.startsWith("/tools")) {
      router.push("/tools/overview");
    }
  }

  const sidebarContent = (
    <>
      {/* Back to portfolio */}
      <div className="px-3 pt-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs transition-colors hover:opacity-80"
          style={{ color: "var(--text-muted)" }}
        >
          <span>←</span>
          <span>Portfolio</span>
        </Link>
      </div>

      {/* Logo */}
      <div className="p-4 pt-2" style={{ borderBottom: "1px solid var(--border)" }}>
        <Link href="/hub" className="flex items-center gap-2 group">
          <span className="text-lg font-mono" style={{ color: "var(--accent)" }}>{"</>"}</span>
          <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>
            Code Review Hub
          </span>
        </Link>
      </div>

      {/* Repo input */}
      <div className="p-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "var(--text-muted)" }}>
          Repository
        </p>
        <form onSubmit={handleSubmit} className="flex gap-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="owner/repo or URL"
            className="flex-1 text-xs px-2 py-1.5 rounded outline-none min-w-0"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
          <button
            type="submit"
            className="px-2 py-1.5 rounded text-xs font-medium transition-opacity hover:opacity-80"
            style={{ background: "var(--accent)", color: "#000" }}
          >
            Go
          </button>
        </form>
        {repo && (
          <p className="mt-1.5 text-xs truncate" style={{ color: "var(--green)" }}>
            ✓ {repo}
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-5">
        {NAV.map((group) => (
          <div key={group.category}>
            <p className="text-xs font-semibold uppercase tracking-wider px-2 mb-1.5"
              style={{ color: "var(--text-muted)" }}>
              {group.category}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors"
                      style={{
                        background: isActive ? "var(--accent-bg)" : "transparent",
                        color: isActive
                          ? "var(--accent)"
                          : item.ready
                          ? "var(--foreground)"
                          : "var(--text-muted)",
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono">{item.icon}</span>
                        {item.name}
                      </span>
                      {!item.ready && (
                        <span className="text-[10px] px-1 rounded"
                          style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
                          soon
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}>
        Code Review Hub · v0.1.0
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3 shrink-0"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <Link href="/hub" className="flex items-center gap-2">
          <span className="text-lg font-mono" style={{ color: "var(--accent)" }}>{"</>"}</span>
          <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Code Review Hub</span>
        </Link>
        <button
          onClick={() => setOpen((o) => !o)}
          className="p-1.5 rounded transition-opacity hover:opacity-70"
          style={{ color: "var(--foreground)" }}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="2" y1="2" x2="16" y2="16" /><line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="2" y1="4" x2="16" y2="4" /><line x1="2" y1="9" x2="16" y2="9" /><line x1="2" y1="14" x2="16" y2="14" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 w-72 h-full flex flex-col overflow-y-auto transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex w-64 shrink-0 flex-col h-full overflow-y-auto"
        style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
