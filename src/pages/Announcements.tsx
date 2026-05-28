import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, X, CheckCircle, Globe } from "lucide-react";
import type { Announcement } from "../types";

const initAnnouncements: Announcement[] = [
  { id: 1, title: "Free Medical Mission — June 15, 2026",   type: "Event",         status: "published", date: "27 May 2026", author: "Admin", body: "RHU Malasiqui will hold a free medical mission serving all barangays. Services include general check-up, dental, and lab tests." },
  { id: 2, title: "Updated RHU Schedule for June 2026",      type: "Schedule",      status: "published", date: "20 May 2026", author: "Admin", body: "Please note that RHU1 will be closed on June 12 (Independence Day). Regular services resume June 13." },
  { id: 3, title: "Anti-Rabies Vaccination Drive — June 5",  type: "Health Program",status: "draft",    date: "26 May 2026", author: "Admin", body: "Free anti-rabies vaccination for pets and dog bite victims every Saturday at the RHU compound." },
  { id: 4, title: "Health Advisory: Dengue Season Reminder", type: "Advisory",      status: "draft",    date: "25 May 2026", author: "Admin", body: "Dengue cases are rising in Pangasinan. Please eliminate stagnant water and seek immediate care if symptoms appear." },
];

const typeColors: Record<string, string> = { Event: "badge-blue", Schedule: "badge-teal", "Health Program": "badge-green", Advisory: "badge-amber" };

type FormState = { title: string; type: string; body: string; status: "published" | "draft" };

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initAnnouncements);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState<Announcement | null>(null);
  const [form, setForm] = useState<FormState>({ title: "", type: "Event", body: "", status: "draft" });
  const [preview, setPreview] = useState<Announcement | null>(null);

  const openNew = () => { setEditItem(null); setForm({ title: "", type: "Event", body: "", status: "draft" }); setModal(true); };
  const openEdit = (a: Announcement) => { setEditItem(a); setForm({ title: a.title, type: a.type, body: a.body, status: a.status }); setModal(true); };

  const save = () => {
    if (editItem) {
      setAnnouncements(announcements.map((a) => a.id === editItem.id ? { ...a, ...form } : a));
    } else {
      setAnnouncements([...announcements, { id: Date.now(), ...form, date: "28 May 2026", author: "Admin" }]);
    }
    setModal(false);
  };

  const remove = (id: number) => setAnnouncements(announcements.filter((a) => a.id !== id));
  const toggleStatus = (id: number) =>
    setAnnouncements(announcements.map((a) => a.id === id ? { ...a, status: a.status === "published" ? "draft" : "published" } : a));

  const published = announcements.filter((a) => a.status === "published");
  const drafts    = announcements.filter((a) => a.status === "draft");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#111827", marginBottom: 4 }}>Announcements</h1>
          <p style={{ fontSize: 14, color: "#6B7280" }}>Manage health programs, advisories, and schedule notices</p>
        </div>
        <button className="btn-primary" onClick={openNew}><Plus size={16} /> New Announcement</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total",      count: announcements.length, color: "#1A6B5A", bg: "#E8F5F1" },
          { label: "Published",  count: published.length,     color: "#10B981", bg: "#D1FAE5" },
          { label: "Drafts",     count: drafts.length,        color: "#F59E0B", bg: "#FEF3C7" },
          { label: "This Month", count: announcements.length, color: "#3B82F6", bg: "#DBEAFE" },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className="stat-card" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 40, height: 40, background: bg, borderRadius: 10, fontSize: 18, fontWeight: 800, color, display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {announcements.map((a) => (
          <div key={a.id} className="card" style={{ border: a.status === "published" ? "1px solid #C6E8DF" : "1px solid #E5E7EB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1, marginRight: 16 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <span className={`badge ${typeColors[a.type] ?? "badge-gray"}`}>{a.type}</span>
                  <span className={`badge ${a.status === "published" ? "badge-green" : "badge-gray"}`}>
                    {a.status === "published" ? <><Globe size={10} style={{ display: "inline", marginRight: 2 }} />Published</> : "Draft"}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{a.body}</p>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 8 }}>Posted by {a.author} · {a.date}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                <button onClick={() => setPreview(a)} className="btn-ghost" style={{ padding: "6px 12px", fontSize: 12, color: "#4B5563" }}><Eye size={14} /> Preview</button>
                <button onClick={() => toggleStatus(a.id)} className="btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }}>
                  {a.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => openEdit(a)} className="btn-ghost" style={{ padding: "6px 12px", fontSize: 12, color: "#4B5563" }}><Edit2 size={14} /></button>
                <button onClick={() => remove(a.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", padding: 6 }}><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 600, padding: 36 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>{editItem ? "Edit Announcement" : "New Announcement"}</h3>
              <button onClick={() => setModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Title</label>
                <input className="input" placeholder="Announcement title…" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Type</label>
                  <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    {["Event","Schedule","Health Program","Advisory"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Status</label>
                  <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "published" | "draft" })}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Content</label>
                <textarea className="input" rows={6} placeholder="Write announcement content…" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={() => setModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
              <button onClick={save} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}><CheckCircle size={16} /> {editItem ? "Save Changes" : "Create"}</button>
            </div>
          </div>
        </div>
      )}

      {preview && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 560, padding: 36 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span className="badge badge-blue">Preview</span>
              <button onClick={() => setPreview(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><X size={20} /></button>
            </div>
            <span className={`badge ${typeColors[preview.type] ?? "badge-gray"}`} style={{ marginBottom: 12, display: "inline-block" }}>{preview.type}</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#111827", marginBottom: 12 }}>{preview.title}</h2>
            <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.8 }}>{preview.body}</p>
            <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 20 }}>Published by {preview.author} · {preview.date}</p>
          </div>
        </div>
      )}
    </div>
  );
}
