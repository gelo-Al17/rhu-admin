import type { Appointment } from "../types";

const BASE = "/api";

export async function getAppointments(filters: Record<string, string> = {}): Promise<Appointment[]> {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${BASE}/appointments?${params}`);
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}

export async function createAppointment(data: Omit<Appointment, "id">): Promise<Appointment> {
  const res = await fetch(`${BASE}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create appointment");
  return res.json();
}

export async function updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
  const res = await fetch(`${BASE}/appointments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update appointment");
  return res.json();
}

export async function cancelAppointment(id: string): Promise<void> {
  const res = await fetch(`${BASE}/appointments/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to cancel appointment");
}
