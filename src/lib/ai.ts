export async function aiRequest<T = any>(payload: {
  action: "generate" | "explain" | "transform" | "fix" | "theme";
  prompt?: string;
  files?: Record<string, { code: string }>;
  selection?: { path: string; start: number; end: number; code: string };
  errors?: string;
}): Promise<T> {
  const r = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await r.json();
  if (data?.error) throw new Error(data.error);
  if (data?.result) {
    try {
      // Try parse as JSON returned by Gemini
      return JSON.parse(data.result) as T;
    } catch {
      // If explanation plain text, wrap in object
      return { explanation: data.result } as unknown as T;
    }
  }
  return data as T;
}
