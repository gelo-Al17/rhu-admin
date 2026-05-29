import type { QueueStation } from "../types";

const BASE = "/api";

export async function getQueueStatus(): Promise<QueueStation[]> {
  const res = await fetch(`${BASE}/queue`);
  if (!res.ok) throw new Error("Failed to fetch queue");
  return res.json();
}

export async function callNextInQueue(stationId: string): Promise<{ serving: number }> {
  const res = await fetch(`${BASE}/queue/call-next`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stationId }),
  });
  if (!res.ok) throw new Error("Failed to call next");
  return res.json();
}

export async function markServed(queueId: number): Promise<void> {
  const res = await fetch(`${BASE}/queue/${queueId}/served`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to mark as served");
}
