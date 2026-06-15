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
    name: "Document Summarizer",
    description:
      "Drop any document — PDF, DOCX, PPTX, XLSX, TXT, CSV, or Markdown — and get an instant AI-generated summary. Then ask follow-up questions and get analyzed responses, all streamed live via Claude.",
    stack: ["TypeScript", "Next.js", "Claude AI", "SheetJS"],
    primaryLang: "TypeScript",
    githubUrl: "https://github.com/freedconsultation-cloud/Document-Summary",
    liveUrl: "https://document-summary-freed.vercel.app",
    status: "live",
    category: "AI/ML",
  },
  {
    name: "UI Generator",
    description:
      "A tool for generating modern UI components based on design specifications.",
    stack: ["TypeScript", "Next.js", "Tailwind", "Prisma", "Postgres"],
    primaryLang: "TypeScript",
    githubUrl: "https://github.com/freedconsultation-cloud/UI-Generator",
    liveUrl: "https://ui-generator-lilac.vercel.app",
    status: "in-progress",
    category: "Web",
  },
  {
    name: "Image Resizer",
    description:
      "Browser-based image resizer with no uploads or servers required. Pick from popular presets — Instagram, YouTube, Twitter, 4K, and more — or enter custom dimensions. Lock aspect ratio, choose output format (JPG, PNG, WebP), adjust quality, and see a before/after comparison before downloading.",
    stack: ["TypeScript", "Next.js", "Canvas API"],
    primaryLang: "TypeScript",
    githubUrl: "https://github.com/freedconsultation-cloud/Image-Resizer",
    liveUrl: "https://image-resizer-freed.vercel.app",
    status: "live",
    category: "Tools",
  },
  {
    name: "Screenshot Markup",
    description:
      "Desktop-only app for capturing and annotating screenshots. Press a global shortcut to select any screen region, then annotate with arrows, rectangles, circles, freehand pen, text, highlight, and redact tools. Full undo/redo history, color picker, stroke width control, and one-click export to clipboard, PNG, or JPG. Requires desktop — no mobile support.",
    stack: ["JavaScript", "Electron", "React", "Konva"],
    primaryLang: "JavaScript",
    githubUrl: "https://github.com/freedconsultation-cloud/Screenshot-Markup",
    status: "live",
    category: "Tools",
  },
  {
    name: "Real-Time Sports Scoreboard",
    description:
      "Live scores for NFL, NBA, MLB, NHL, Premier League, FIFA World Cup, CFB, NCAAB, and NCAAW — updated every 30 seconds via Socket.IO. Navigate any date to browse past or upcoming schedules. Click any game for a box score, line score, win probability, H2H history, injury report, news articles, and betting odds. Click any team for standings, season schedule, and full roster. Search and compare any two players side-by-side across leagues. Season leaders widget shows top performers per stat category. Sign in with Google to favorite teams and receive browser push notifications for score alerts.",
    stack: ["JavaScript", "React", "Node.js", "Socket.IO", "Firebase", "ESPN API"],
    primaryLang: "JavaScript",
    githubUrl: "https://github.com/freedconsultation-cloud/Real-Time-Sports-Scoreboard",
    liveUrl: "https://sports-scoreboard-966b.onrender.com",
    status: "live",
    category: "Web",
  },
  {
    name: "URL Shortener",
    description:
      "Full-stack link shortener with custom slugs, expiry dates, click analytics, and QR code generation. Tracks clicks by country via IP geolocation, plots a daily click chart, and enforces rate limiting. Built with Express, Prisma, and PostgreSQL on Railway.",
    stack: ["JavaScript", "React", "Express", "PostgreSQL", "Prisma", "Recharts"],
    primaryLang: "JavaScript",
    githubUrl: "https://github.com/freedconsultation-cloud/URL-Shortener",
    liveUrl: "https://url-shortener-freed.onrender.com",
    status: "live",
    category: "API",
  },
  {
    name: "Weather App",
    description:
      "Ask anything about the forecast in plain English. Claude routes your question to the right data — current conditions, hourly rain chances, or a 5-day outlook — powered by the Open-Meteo API with no API key required. Auto-detects your location via the browser.",
    stack: ["TypeScript", "Next.js", "Claude AI", "Open-Meteo"],
    primaryLang: "TypeScript",
    githubUrl: "https://github.com/freedconsultation-cloud/Weather-App",
    liveUrl: "https://weather-freed.vercel.app",
    status: "live",
    category: "AI/ML",
  },
  {
    name: "Expense Tracker",
    description:
      "Full-stack expense and income tracker backed by Neon PostgreSQL. Dashboard shows total income, expenses, net balance, a spending-by-category donut chart, and a 6-month income vs. expenses bar chart. Add transactions manually or upload a bank statement PDF — Claude AI extracts and categorizes every transaction automatically for one-click import.",
    stack: ["TypeScript", "Next.js", "Prisma", "PostgreSQL", "Recharts", "Claude AI"],
    primaryLang: "TypeScript",
    githubUrl: "https://github.com/freedconsultation-cloud/Expense-Tracker",
    liveUrl: "https://expense-tracker-mu-ten-81.vercel.app",
    status: "live",
    category: "Data",
  },
  {
    name: "Resume Builder",
    description:
      "Fill in your experience, education, skills, and projects in a clean editor — a live preview updates in real time. Exports a polished, ATS-friendly PDF via the browser's native print engine. Fully client-side with localStorage persistence. Mobile responsive with Edit / Preview tab switching on small screens.",
    stack: ["TypeScript", "Next.js", "Tailwind"],
    primaryLang: "TypeScript",
    githubUrl: "https://github.com/freedconsultation-cloud/Resume-Builder",
    liveUrl: "https://resume-builder-khaki-seven-13.vercel.app",
    status: "live",
    category: "Tools",
  },
  {
    name: "Image Enhancer",
    description:
      "Drop any photo — PNG, JPG, JPEG, or WEBP — and get an automatically enhanced version in seconds. Runs a four-step pipeline entirely in the browser: auto levels (histogram clipping), S-curve contrast boost, vibrance lift, and unsharp mask sharpening. Drag the before/after slider to compare, then download as PNG.",
    stack: ["TypeScript", "Next.js", "Canvas API"],
    primaryLang: "TypeScript",
    githubUrl: "https://github.com/freedconsultation-cloud/Image-Enhancer",
    liveUrl: "https://image-enhancer-alpha-red.vercel.app",
    status: "live",
    category: "Tools",
  },
  {
    name: "Wikipedia Trends",
    description:
      "A daily Higher or Lower game powered by real Wikipedia data. Two trending articles face off — guess which one racked up more views yesterday. String together correct guesses to build your streak; one wrong call ends it. Refreshes every day with new topics pulled live from the Wikimedia API.",
    stack: ["TypeScript", "Next.js", "Tailwind", "Wikimedia API"],
    primaryLang: "TypeScript",
    githubUrl: "https://github.com/freedconsultation-cloud/Trend-Game",
    liveUrl: "https://wikipedia-trends.vercel.app",
    status: "live",
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
