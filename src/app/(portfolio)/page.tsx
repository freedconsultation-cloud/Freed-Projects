"use client";

import { useState } from "react";
import Link from "next/link";

interface Project {
  name: string;
  description: string;
  stack: string[];
  primaryLang: string;
  githubUrl?: string;
  liveUrl?: string;
  status: "live" | "in-progress" | "archived";
  category: "Web" | "Data" | "Tools" | "AI/ML" | "API";
}

const PROJECTS: Project[] = [
  {
    name: "Code Review Hub",
    description:
      "One-stop dashboard for analyzing GitHub repositories — language stats, file structure, dependency graphs, TODO tracking, and PR insights.",
    stack: ["TypeScript", "Next.js", "Tailwind"],
    primaryLang: "TypeScript",
    liveUrl: "/hub",
    status: "in-progress",
    category: "Tools",
  },
  {
    name: "UI Generator",
    description:
      "A tool for generating modern UI components based on design specifications.",
    stack: ["TypeScript", "JavaScript", "CSS"],
    primaryLang: "TypeScript",
    githubUrl: "https://github.com/freedconsultation-cloud/UI-Generator",
    liveUrl: "https://ui-generator-lilac.vercel.app",
    status: "in-progress",
    category: "Web",
  },
  {
    name: "TaskFlow",
    description:
      "Kanban-style project management app with drag-and-drop boards, real-time collaboration via WebSockets, and a REST API backend.",
    stack: ["React", "Node.js", "PostgreSQL"],
    primaryLang: "JavaScript",
    status: "live",
    category: "Web",
  },
  {
    name: "DataPulse",
    description:
      "Interactive analytics dashboard that ingests CSV or database exports and renders time-series charts, cohort breakdowns, and anomaly alerts.",
    stack: ["Python", "FastAPI", "Plotly"],
    primaryLang: "Python",
    status: "live",
    category: "Data",
  },
  {
    name: "SecureVault API",
    description:
      "Zero-knowledge password manager backend built with Spring Boot. AES-256 encrypted storage, OAuth2 login, and a CLI client for terminal power users.",
    stack: ["Java", "Spring Boot", "PostgreSQL"],
    primaryLang: "Java",
    status: "archived",
    category: "API",
  },
  {
    name: "MLClassifier",
    description:
      "Image classification pipeline using a fine-tuned ResNet model. Includes a training script, evaluation metrics dashboard, and a lightweight Flask inference API.",
    stack: ["Python", "PyTorch", "Flask"],
    primaryLang: "Python",
    status: "live",
    category: "AI/ML",
  },
  {
    name: "QuickQuery",
    description:
      "Browser-based SQL playground that connects to local or remote databases, renders results as editable grids, and exports to CSV or JSON in one click.",
    stack: ["TypeScript", "React", "SQLite"],
    primaryLang: "TypeScript",
    status: "in-progress",
    category: "Tools",
  },
  {
    name: "DevMetrics",
    description:
      "Personal developer dashboard that aggregates GitHub activity, pull request cycle times, and commit streaks into a single daily digest.",
    stack: ["JavaScript", "Express", "Chart.js"],
    primaryLang: "JavaScript",
    status: "archived",
    category: "Web",
  },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
};

const CATEGORY_COLORS: Record<string, string> = {
  Web: "#F88379",
  Data: "#3fb950",
  Tools: "#d2a8ff",
  "AI/ML": "#e3b341",
  API: "#f85149",
};

const STATUS_STYLES: Record<
  Project["status"],
  { bg: string; color: string; label: string }
> = {
  live: { bg: "rgba(63,185,80,0.15)", color: "#3fb950", label: "Live" },
  "in-progress": {
    bg: "rgba(227,179,65,0.15)",
    color: "#e3b341",
    label: "In Progress",
  },
  archived: {
    bg: "rgba(139,148,158,0.15)",
    color: "#8b949e",
    label: "Archived",
  },
};

function ProjectTile({ project }: { project: Project }) {
  const status = STATUS_STYLES[project.status];
  const catColor = CATEGORY_COLORS[project.category] ?? "#F88379";
  const langColor = LANG_COLORS[project.primaryLang] ?? "#8b949e";

  const isInternalLink = project.liveUrl?.startsWith("/");

  return (
    <div
      className="flex flex-col gap-3 p-5 rounded-lg transition-all duration-150 hover:translate-y-[-2px]"
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
          {project.name}
        </h3>
        <span
          className="text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0"
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-xs leading-relaxed flex-1"
        style={{ color: "var(--text-muted)" }}
      >
        {project.description}
      </p>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] px-2 py-0.5 rounded"
            style={{
              background: "var(--surface)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: langColor }}
          />
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            {project.primaryLang}
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-wider ml-2"
            style={{ color: catColor }}
          >
            {project.category}
          </span>
        </div>

        <div className="flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] px-2.5 py-1 rounded transition-opacity hover:opacity-80"
              style={{
                background: "var(--surface)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              GitHub
            </a>
          )}
          {project.liveUrl &&
            (isInternalLink ? (
              <Link
                href={project.liveUrl}
                className="text-[11px] px-2.5 py-1 rounded transition-opacity hover:opacity-80 font-medium"
                style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
              >
                Open →
              </Link>
            ) : (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] px-2.5 py-1 rounded transition-opacity hover:opacity-80 font-medium"
                style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
              >
                Launch ↗
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = ["All", "Web", "Data", "Tools", "AI/ML", "API"] as const;
type Filter = (typeof CATEGORIES)[number];

export default function PortfolioPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-8 py-4 sticky top-0 z-10"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span className="font-bold font-mono text-sm" style={{ color: "var(--accent)" }}>
          {"</>"}
        </span>
<div />
      </nav>

      <div className="max-w-5xl mx-auto px-8 pt-8 pb-12">
        {/* Projects */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: "#F88379" }}
            >
              Projects
            </h2>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={
                  filter === cat
                    ? {
                        background: "#F88379",
                        color: "#000",
                        fontWeight: 600,
                      }
                    : {
                        background: "var(--surface-2)",
                        color: "var(--accent)",
                        border: "1px solid var(--accent)",
                      }
                }
              >
                {cat}
              </button>
            ))}
            <span
              className="ml-auto text-xs self-center"
              style={{ color: "var(--text-muted)" }}
            >
              {visible.length} project{visible.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((project) => (
              <ProjectTile key={project.name} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
