import Link from "next/link";

const TOOL_NAMES: Record<string, string> = {
  "file-structure": "File Structure",
  "language-stats": "Language Stats",
  dependencies: "Dependencies",
  complexity: "Code Complexity",
  todos: "TODO Tracker",
  security: "Security Scan",
  "pull-requests": "PR Insights",
  commits: "Commit History",
  contributors: "Contributors",
};

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  const name = TOOL_NAMES[tool] ?? tool;

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
      <div className="text-5xl opacity-20">🔧</div>
      <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
        {name}
      </p>
      <p className="text-sm max-w-sm" style={{ color: "var(--text-muted)" }}>
        This tool is coming soon. We&apos;ll build it together.
      </p>
      <Link
        href="/"
        className="mt-2 text-xs px-3 py-1.5 rounded transition-opacity hover:opacity-80"
        style={{ background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}
