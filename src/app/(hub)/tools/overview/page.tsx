"use client";

import { useRepo } from "@/app/_components/RepoContext";
import { useEffect, useState } from "react";
import Link from "next/link";

interface RepoData {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  default_branch: string;
  language: string | null;
  license: { name: string } | null;
  topics: string[];
  pushed_at: string;
  created_at: string;
  size: number;
  visibility: string;
  owner: { login: string; avatar_url: string };
  message?: string;
}

type LanguageMap = Record<string, number>;

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  Go: "#00ADD8",
  Ruby: "#701516",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};

function langColor(lang: string) {
  return LANG_COLORS[lang] ?? "#8b949e";
}

function fmtNum(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center px-5 py-3 rounded-lg"
      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
      <span className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
        {typeof value === "number" ? fmtNum(value) : value}
      </span>
      <span className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

export default function OverviewPage() {
  const { repo, setRepo } = useRepo();
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [languages, setLanguages] = useState<LanguageMap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!repo) return;
    setLoading(true);
    setError(null);
    setRepoData(null);
    setLanguages(null);

    Promise.all([
      fetch(`/api/github/repos/${repo}`).then((r) => r.json()),
      fetch(`/api/github/repos/${repo}/languages`).then((r) => r.json()),
    ])
      .then(([rd, langs]) => {
        if (rd.message) {
          setError(rd.message);
        } else {
          setRepoData(rd);
          setLanguages(langs);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [repo]);

  if (!repo) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <div className="text-5xl opacity-30">◈</div>
        <p className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          No repository selected
        </p>
        <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
          Enter a GitHub repo URL or <code>owner/name</code> in the sidebar to get started.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Fetching {repo}…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-4xl">⚠</div>
        <p className="font-semibold" style={{ color: "var(--red)" }}>
          {error === "Not Found" ? "Repository not found" : error}
        </p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Check that <strong>{repo}</strong> is a public repo or add a{" "}
          <code className="px-1 rounded" style={{ background: "var(--surface-2)" }}>GITHUB_TOKEN</code>{" "}
          to <code className="px-1 rounded" style={{ background: "var(--surface-2)" }}>.env.local</code> for private repos.
        </p>
        <button
          onClick={() => setRepo("")}
          className="mt-2 text-xs px-3 py-1.5 rounded transition-opacity hover:opacity-80"
          style={{ background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
        >
          Clear repo
        </button>
      </div>
    );
  }

  if (!repoData) return null;

  const totalBytes = languages ? Object.values(languages).reduce((a, b) => a + b, 0) : 0;
  const topLangs = languages
    ? Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 8)
    : [];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <img
          src={repoData.owner.avatar_url}
          alt={repoData.owner.login}
          className="w-12 h-12 rounded-full"
          style={{ border: "2px solid var(--border)" }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold truncate" style={{ color: "var(--foreground)" }}>
              {repoData.full_name}
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full capitalize"
              style={{
                background: repoData.visibility === "public" ? "rgba(63,185,80,0.15)" : "rgba(232,81,73,0.15)",
                color: repoData.visibility === "public" ? "var(--green)" : "var(--red)",
              }}>
              {repoData.visibility}
            </span>
          </div>
          {repoData.description && (
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
              {repoData.description}
            </p>
          )}
          <div className="flex gap-3 mt-2 flex-wrap">
            <a
              href={repoData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline"
              style={{ color: "var(--accent)" }}
            >
              View on GitHub ↗
            </a>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Default branch: <span style={{ color: "var(--foreground)" }}>{repoData.default_branch}</span>
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Last push: <span style={{ color: "var(--foreground)" }}>{relativeTime(repoData.pushed_at)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatPill label="Stars" value={repoData.stargazers_count} />
        <StatPill label="Forks" value={repoData.forks_count} />
        <StatPill label="Open Issues" value={repoData.open_issues_count} />
        <StatPill label="Watchers" value={repoData.watchers_count} />
      </div>

      {/* Language breakdown */}
      {topLangs.length > 0 && (
        <div className="rounded-lg p-5 space-y-4"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            Languages
          </h2>
          {/* Bar */}
          <div className="flex rounded-full overflow-hidden h-2.5 gap-px">
            {topLangs.map(([lang, bytes]) => (
              <div
                key={lang}
                style={{ width: `${(bytes / totalBytes) * 100}%`, background: langColor(lang) }}
                title={`${lang}: ${((bytes / totalBytes) * 100).toFixed(1)}%`}
              />
            ))}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {topLangs.map(([lang, bytes]) => (
              <div key={lang} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ background: langColor(lang) }} />
                <span className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                  {lang}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {((bytes / totalBytes) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meta row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {repoData.license && (
          <MetaCard label="License" value={repoData.license.name} />
        )}
        {repoData.language && (
          <MetaCard label="Primary Language" value={repoData.language}
            accent={langColor(repoData.language)} />
        )}
        <MetaCard
          label="Repo Size"
          value={repoData.size >= 1024
            ? `${(repoData.size / 1024).toFixed(1)} MB`
            : `${repoData.size} KB`}
        />
        <MetaCard label="Created" value={new Date(repoData.created_at).toLocaleDateString()} />
        <MetaCard label="Last Push" value={relativeTime(repoData.pushed_at)} />
      </div>

      {/* Topics */}
      {repoData.topics && repoData.topics.length > 0 && (
        <div className="rounded-lg p-5"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
            Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {repoData.topics.map((topic) => (
              <span key={topic}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MetaCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="px-4 py-3 rounded-lg"
      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
      <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="text-sm font-medium" style={{ color: accent ?? "var(--foreground)" }}>{value}</p>
    </div>
  );
}
