import { useState } from "react";
import { Plus, Search, Edit2, X, CheckCircle } from "lucide-react";
import type { InventoryItem } from "../types";

const initialItems: InventoryItem[] = [
  { id: 1, name: "Amoxicillin 500mg",     cat: "Antibiotic",    qty: 12,  unit: "caps",    expiry: "2026-12-31", reorder: 50,  status: "low" },
  { id: 2, name: "Amlodipine 5mg",        cat: "Antihyp.",      qty: 240, unit: "tabs",    expiry: "2027-03-15", reorder: 100, status: "ok" },
  { id: 3, name: "Metformin 500mg",       cat: "Antidiabetic",  qty: 180, unit: "tabs",    expiry: "2026-08-20", reorder: 150, status: "ok" },
  { id: 4, name: "Ferrous Sulfate 325mg", cat: "Supplement",    qty: 0,   unit: "tabs",    expiry: "2027-01-10", reorder: 200, status: "out" },
  { id: 5, name: "Paracetamol 500mg",     cat: "Analgesic",     qty: 360, unit: "tabs",    expiry: "2027-06-30", reorder: 200, status: "ok" },
  { id: 6, name: "Salbutamol Nebule",     cat: "Bronchodilator",qty: 24,  unit: "nebules", expiry: "2026-06-15", reorder: 30,  status: "expiring" },
  { id: 7, name: "OPV Vaccine",           cat: "Vaccine",       qty: 15,  unit: "doses",   expiry: "2026-06-15", reorder: 20,  status: "expiring" },
  { id: 8, name: "Measles Vaccine",       cat: "Vaccine",       qty: 40,  unit: "doses",   expiry: "2027-02-28", reorder: 20,  status: "ok" },
];

const statusConfig: Record<InventoryItem["status"], { label: string; badge: string; icon: string }> = {
  ok:       { label: "In Stock",      badge: "badge-green", icon: "✓" },
  low:      { label: "Low Stock",     badge: "badge-amber", icon: "!" },
  out:      { label: "Out of Stock",  badge: "badge-red",   icon: "✗" },
  expiring: { label: "Expiring Soon", badge: "badge-amber", icon: "⏰" },
};

type FormState = { name: string; cat: string; qty: string; unit: string; expiry: string; reorder: string };

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [tab, setTab] = useState("Medicines");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", cat: "", qty: "", unit: "tabs", expiry: "", reorder: "" });
  const [saved, setSaved] = useState(false);

  const filtered = items.filter((m) => {
    const isVaccine = m.cat === "Vaccine";
    if (tab === "Vaccines" && !isVaccine) return false;
    if (tab === "Medicines" && isVaccine) return false;
    return m.name.toLowerCase().includes(search.toLowerCase());
  });

  const stats = {
    total: items.length,
    low:   items.filter((m) => m.status === "low").length,
    out:   items.filter((m) => m.status === "out").length,
    exp:   items.filter((m) => m.status === "expiring").length,
  };

  const openAdd = () => { setEditItem(null); setForm({ name: "", cat: "", qty: "", unit: "tabs", expiry: "", reorder: "" }); setModalOpen(true); };
  const openEdit = (m: InventoryItem) => { setEditItem(m); setForm({ name: m.name, cat: m.cat, qty: String(m.qty), unit: m.unit, expiry: m.expiry, reorder: String(m.reorder) }); setModalOpen(true); };

  const saveItem = () => {
    const qty = Number(form.qty);
    const reorder = Number(form.reorder);
    const status: InventoryItem["status"] = qty === 0 ? "out" : qty <= reorder ? "low" : "ok";
    if (editItem) {
      setItems(items.map((m) => m.id === editItem.id ? { ...m, ...form, qty, reorder, status } : m));
    } else {
      setItems([...items, { id: Date.now(), ...form, qty, reorder, status }]);
    }
    setModalOpen(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const restock = (m: InventoryItem) => {
    const input = window.prompt(`Restock ${m.name}. Enter quantity to add:`);
    const qty = parseInt(input ?? "0", 10);
    if (qty > 0) {
      setItems(items.map((item) => item.id === m.id ? { ...item, qty: item.qty + qty, status: item.qty + qty > item.reorder ? "ok" : "low" } : item));
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#111827", marginBottom: 4 }}>Inventory Management</h1>
          <p style={{ fontSize: 14, color: "#6B7280" }}>Medicines and vaccines stock management</p>
        </div>
        <button className="btn-primary" onClick={openAdd}><Plus size={16} /> Add Item</button>
      </div>

      {saved && (
        <div style={{ background: "#D1FAE5", border: "1px solid #A7F3D0", borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 10, fontSize: 14, color: "#065F46", alignItems: "center" }}>
          <CheckCircle size={16} /> Inventory updated successfully
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Items",   value: stats.total, color: "#1A6B5A", bg: "#E8F5F1" },
          { label: "Low Stock",     value: stats.low,   color: "#F59E0B", bg: "#FEF3C7" },
          { label: "Expiring Soon", value: stats.exp,   color: "#EF4444", bg: "#FEE2E2" },
          { label: "Out of Stock",  value: stats.out,   color: "#EF4444", bg: "#FEE2E2" },
        ].map((s) => (
          <div key={s.label} className="stat-card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 44, height: 44, background: s.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 4, background: "#F3F4F6", borderRadius: 10, padding: 4 }}>
          {["Medicines", "Vaccines"].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 20px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", background: tab === t ? "#fff" : "transparent", color: tab === t ? "#111827" : "#6B7280", boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none", fontFamily: "'DM Sans', sans-serif" }}>{t}</button>
          ))}
        </div>
        <div style={{ position: "relative", width: 280 }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
          <input className="input" placeholder="Search items…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
          <table className="data-table">
            <thead>
              <tr><th>Item Name</th><th>Category</th><th>Quantity</th><th>Unit</th><th>Expiry Date</th><th>Reorder Level</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((m) => {
                const s = statusConfig[m.status];
                const daysToExp = Math.round((new Date(m.expiry).getTime() - Date.now()) / 86400000);
                return (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 600 }}>{m.name}</td>
                    <td style={{ fontSize: 13 }}>{m.cat}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: m.qty === 0 ? "#EF4444" : m.qty <= m.reorder ? "#F59E0B" : "#10B981" }}>{m.qty}</td>
                    <td style={{ fontSize: 13 }}>{m.unit}</td>
                    <td>
                      <div style={{ fontSize: 13 }}>{m.expiry}</div>
                      {daysToExp <= 30 && <div style={{ fontSize: 11, color: "#EF4444", fontWeight: 600 }}>Exp. in {daysToExp}d</div>}
                    </td>
                    <td style={{ fontSize: 13 }}>{m.reorder} {m.unit}</td>
                    <td><span className={`badge ${s.badge}`}>{s.icon} {s.label}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => openEdit(m)} className="btn-ghost" style={{ padding: "4px 10px", fontSize: 12, color: "#4B5563" }}><Edit2 size={12} /> Edit</button>
                        <button onClick={() => restock(m)} className="btn-secondary" style={{ padding: "4px 10px", fontSize: 12 }}>Restock</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 500, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>{editItem ? "Edit Item" : "Add New Item"}</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {([ ["Item Name","name","e.g. Amoxicillin 500mg"], ["Category","cat","e.g. Antibiotic"] ] as const).map(([label, key, ph]) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
                  <input className="input" placeholder={ph} value={form[key as keyof FormState]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Quantity</label>
                  <input className="input" type="number" min="0" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Unit</label>
                  <select className="input" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                    {["tabs","caps","mL","bottles","nebules","doses","sachets","vials"].map((u) => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Expiry Date</label>
                  <input className="input" type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Reorder Level</label>
                  <input className="input" type="number" min="0" value={form.reorder} onChange={(e) => setForm({ ...form, reorder: e.target.value })} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={() => setModalOpen(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
              <button onClick={saveItem} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}><CheckCircle size={16} /> {editItem ? "Save Changes" : "Add Item"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
