import Link from "next/link";

interface ToolCardProps {
  name: string;
  description: string;
  icon: string;
  href: string;
  ready?: boolean;
  category: string;
}

const categoryColors: Record<string, string> = {
  Analysis: "#F88379",
  Quality: "#3fb950",
  Review: "#d2a8ff",
};

export default function ToolCard({ name, description, icon, href, ready = false, category }: ToolCardProps) {
  const accentColor = categoryColors[category] ?? "#F88379";

  const card = (
    <div
      className="p-5 rounded-lg flex flex-col gap-3 h-full transition-all duration-150"
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl">{icon}</span>
        <span
          className="text-[11px] font-medium px-2 py-0.5 rounded-full"
          style={
            ready
              ? { background: "rgba(63,185,80,0.15)", color: "var(--green)" }
              : { background: "var(--surface)", color: "var(--text-muted)" }
          }
        >
          {ready ? "Ready" : "Coming soon"}
        </span>
      </div>
      <div>
        <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>
          {name}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      </div>
      <div className="mt-auto pt-2" style={{ borderTop: "1px solid var(--border)" }}>
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: accentColor }}>
          {category}
        </span>
      </div>
    </div>
  );

  if (!ready) {
    return <div className="opacity-60 cursor-not-allowed">{card}</div>;
  }

  return (
    <Link
      href={href}
      className="block rounded-lg hover:scale-[1.02] hover:shadow-lg transition-transform duration-150"
      style={{ ["--shadow-color" as string]: accentColor + "20" }}
    >
      {card}
    </Link>
  );
}
