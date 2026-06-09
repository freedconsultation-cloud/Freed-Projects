"use client";

import { useRouter } from "next/navigation";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics: string[];
  visibility: string;
  fork: boolean;
}

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
};

function relativeTime(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function ProjectCard({ repo }: { repo: Repo }) {
  const router = useRouter();
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "#8b949e") : "#8b949e";

  function handleReview() {
    localStorage.setItem("crh-repo", repo.full_name);
    router.push("/tools/overview");
  }

  return (
    <div
      className="flex flex-col rounded-lg p-5 gap-3 transition-all duration-150 hover:translate-y-[-2px]"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }}
    >
      {/* Name + visibility */}
      <div className="flex items-start justify-between gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-sm hover:underline truncate"
          style={{ color: "var(--accent)" }}
        >
          {repo.name}
        </a>
        {repo.fork && (
          <span className="text-[10px] shrink-0 px-1.5 py-0.5 rounded"
            style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
            fork
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed line-clamp-2 flex-1"
        style={{ color: "var(--text-muted)" }}>
        {repo.description ?? "No description"}
      </p>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full"
              style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Meta row */}
      <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span>★ {repo.stargazers_count}</span>
        )}
        {repo.forks_count > 0 && (
          <span>⑂ {repo.forks_count}</span>
        )}
        <span className="ml-auto">{relativeTime(repo.pushed_at)}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1" style={{ borderTop: "1px solid var(--border)" }}>
        <button
          onClick={handleReview}
          className="flex-1 text-xs py-1.5 rounded transition-opacity hover:opacity-80 font-medium"
          style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
        >
          Review
        </button>
        {repo.homepage ? (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-xs py-1.5 rounded text-center transition-opacity hover:opacity-80 font-medium"
            style={{ background: "var(--surface-2)", color: "var(--foreground)", border: "1px solid var(--border)" }}
          >
            Launch ↗
          </a>
        ) : (
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-xs py-1.5 rounded text-center transition-opacity hover:opacity-80 font-medium"
            style={{ background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  );
}
