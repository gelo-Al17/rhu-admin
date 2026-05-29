import type { InventoryItem } from "../types";

const BASE = "/api";

export async function getInventory(type?: "medicine" | "vaccine"): Promise<InventoryItem[]> {
  const params = type ? `?type=${type}` : "";
  const res = await fetch(`${BASE}/inventory${params}`);
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return res.json();
}

export async function addInventoryItem(data: Omit<InventoryItem, "id">): Promise<InventoryItem> {
  const res = await fetch(`${BASE}/inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add item");
  return res.json();
}

export async function updateInventoryItem(id: number, data: Partial<InventoryItem>): Promise<InventoryItem> {
  const res = await fetch(`${BASE}/inventory/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update item");
  return res.json();
}

export async function deleteInventoryItem(id: number): Promise<void> {
  const res = await fetch(`${BASE}/inventory/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete item");
}

export async function restockItem(id: number, qty: number): Promise<InventoryItem> {
  return updateInventoryItem(id, { qty } as Partial<InventoryItem>);
}
