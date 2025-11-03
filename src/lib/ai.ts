export interface AIResponse {
  explanation?: string;
  files?: Record<string, { code: string }>;
  error?: string;
  result?: string;
}

export async function aiRequest<T = AIResponse>(payload: unknown): Promise<T> {
  const r = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await r.json();
  if (data?.error) throw new Error(data.error as string);
  if (data?.result) {
    try {
      // Try parse as JSON returned by Gemini
      return JSON.parse(data.result as string) as T;
    } catch {
      // If explanation plain text, wrap in object
      return { explanation: data.result as string } as unknown as T;
    }
  }
  return data as T;
}
