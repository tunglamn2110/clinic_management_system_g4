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

async function tryForward(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { message: text || "Phản hồi máy chủ không hợp lệ." };
  }

  return { status: response.status, data };
}

export async function POST(request, { params }) {
  const { action } = await params;
  if (action !== "login" && action !== "signup") {
    return NextResponse.json({ message: "Auth action không hợp lệ." }, { status: 404 });
  }

  const payload = await request.json();
  const candidates = getBackendCandidates();

  for (const baseUrl of candidates) {
    try {
      const result = await tryForward(`${baseUrl}/api/auth/${action}`, payload);
      if (result.status !== 404) {
        return NextResponse.json(result.data, { status: result.status });
      }
    } catch {
      continue;
    }
  }

  return NextResponse.json(
    { message: "Không kết nối được dịch vụ đăng nhập/đăng ký." },
    { status: 503 }
  );
}
