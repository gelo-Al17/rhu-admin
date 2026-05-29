import type { Announcement } from "../types";

const BASE = "/api";

export async function getAnnouncements(): Promise<Announcement[]> {
  const res = await fetch(`${BASE}/announcements`);
  if (!res.ok) throw new Error("Failed to fetch announcements");
  return res.json();
}

export async function createAnnouncement(data: Omit<Announcement, "id" | "date" | "author">): Promise<Announcement> {
  const res = await fetch(`${BASE}/announcements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create announcement");
  return res.json();
}

export async function updateAnnouncement(id: number, data: Partial<Announcement>): Promise<Announcement> {
  const res = await fetch(`${BASE}/announcements/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update announcement");
  return res.json();
}

export async function deleteAnnouncement(id: number): Promise<void> {
  const res = await fetch(`${BASE}/announcements/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete announcement");
}
