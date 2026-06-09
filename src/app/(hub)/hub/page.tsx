import ToolCard from "@/app/_components/ToolCard";

const TOOLS = [
  {
    name: "Repo Overview",
    description: "Stats, description, stars, forks, open issues, license, and language breakdown at a glance.",
    icon: "◈",
    href: "/tools/overview",
    ready: true,
    category: "Analysis",
  },
  {
    name: "File Structure",
    description: "Browse the full directory tree, filter by language, and spot large or unusual files.",
    icon: "⊞",
    href: "/tools/file-structure",
    ready: false,
    category: "Analysis",
  },
  {
    name: "Language Stats",
    description: "Detailed breakdown of every language used, with line counts and percentage share.",
    icon: "▤",
    href: "/tools/language-stats",
    ready: false,
    category: "Analysis",
  },
  {
    name: "Dependencies",
    description: "Parse package.json, requirements.txt, pom.xml, and Cargo.toml in one view.",
    icon: "◉",
    href: "/tools/dependencies",
    ready: false,
    category: "Analysis",
  },
  {
    name: "Code Complexity",
    description: "Cyclomatic complexity, function sizes, and hotspots across Python, JS, and Java.",
    icon: "≋",
    href: "/tools/complexity",
    ready: false,
    category: "Quality",
  },
  {
    name: "TODO Tracker",
    description: "Find every TODO, FIXME, HACK, and NOTE across the entire codebase.",
    icon: "☑",
    href: "/tools/todos",
    ready: false,
    category: "Quality",
  },
  {
    name: "Security Scan",
    description: "Surface hardcoded secrets, dangerous patterns, and known vulnerable dependency versions.",
    icon: "⚿",
    href: "/tools/security",
    ready: false,
    category: "Quality",
  },
  {
    name: "PR Insights",
    description: "Open pull requests, review lag, merge rates, and hotly contested files.",
    icon: "⇌",
    href: "/tools/pull-requests",
    ready: false,
    category: "Review",
  },
  {
    name: "Commit History",
    description: "Commit cadence, churn rate, and the biggest recent changes in one timeline.",
    icon: "⊛",
    href: "/tools/commits",
    ready: false,
    category: "Review",
  },
  {
    name: "Contributors",
    description: "Who owns what, contribution heatmap, and knowledge-silo detection.",
    icon: "◎",
    href: "/tools/contributors",
    ready: false,
    category: "Review",
  },
];

export default function HomePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
          Code Review Hub
        </h1>
        <p className="text-base" style={{ color: "var(--text-muted)" }}>
          Enter a GitHub repo in the sidebar, then pick a tool to start reviewing.
        </p>
      </div>

      <Section title="Analysis" color="#F88379">
        {TOOLS.filter((t) => t.category === "Analysis").map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </Section>

      <Section title="Quality" color="#3fb950">
        {TOOLS.filter((t) => t.category === "Quality").map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </Section>

      <Section title="Review" color="#d2a8ff">
        {TOOLS.filter((t) => t.category === "Review").map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </Section>
    </div>
  );
}

function Section({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color }}>
          {title}
        </h2>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
    </div>
  );
}
