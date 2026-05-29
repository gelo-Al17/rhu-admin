import type { User } from "../types";

const BASE = "/api";

export async function getUsers(role?: User["role"]): Promise<User[]> {
  const params = role ? `?role=${role}` : "";
  const res = await fetch(`${BASE}/users${params}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getUserById(id: number): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function createUser(data: Omit<User, "id" | "joined">): Promise<User> {
  const res = await fetch(`${BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

export async function updateUser(id: number, data: Partial<User>): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export async function toggleUserStatus(id: number, active: boolean): Promise<User> {
  return updateUser(id, { status: active ? "active" : "inactive" });
}
