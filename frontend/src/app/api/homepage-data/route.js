import { NextResponse } from "next/server";

function getBackendCandidates() {
  const fromEnv = [
    process.env.API_BASE_URL,
    process.env.NEXT_PUBLIC_API_BASE_URL,
    process.env.BACKEND_URL
  ].filter(Boolean);
  const defaults = ["http://localhost:4000", "http://localhost:4001"];
  return [...new Set([...fromEnv, ...defaults])];
}

export async function GET() {
  const candidates = getBackendCandidates();

  for (const baseUrl of candidates) {
    try {
      const response = await fetch(`${baseUrl}/api/homepage-data`);
      if (!response.ok) {
        continue;
      }
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } catch {
      continue;
    }
  }

  return NextResponse.json({ message: "Không lấy được dữ liệu homepage." }, { status: 503 });
}
