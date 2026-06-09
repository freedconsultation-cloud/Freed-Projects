import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const githubPath = path.join("/");

  const url = new URL(request.url);
  const queryString = url.searchParams.toString();
  const githubUrl = `https://api.github.com/${githubPath}${queryString ? `?${queryString}` : ""}`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "code-review-hub/0.1",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(githubUrl, { headers, next: { revalidate: 60 } });
  const data = await response.json();

  return Response.json(data, { status: response.status });
}
