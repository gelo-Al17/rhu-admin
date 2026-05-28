import { useState } from "react";
import { Users as UsersIcon, UserPlus, Search, Filter, Edit2, Shield, ToggleLeft, ToggleRight, X, CheckCircle } from "lucide-react";
import type { User } from "../types";

const initUsers: User[] = [
  { id: 1, name: "Juan dela Cruz",    role: "patient", email: "juan@email.com",      phone: "09171234567", status: "active",   joined: "1 Jan 2026" },
  { id: 2, name: "Ana Cruz",          role: "patient", email: "ana@email.com",        phone: "09181234567", status: "active",   joined: "15 Jan 2026" },
  { id: 3, name: "Dr. Maria Reyes",   role: "doctor",  email: "dr.reyes@rhu.ph",      phone: "09191234567", status: "active",   joined: "1 Feb 2025" },
  { id: 4, name: "Dr. Jose Santos",   role: "doctor",  email: "dr.santos@rhu.ph",     phone: "09201234567", status: "active",   joined: "15 Mar 2025" },
  { id: 5, name: "Nurse Carla Santos",role: "nurse",   email: "nurse.santos@rhu.ph",  phone: "09211234567", status: "active",   joined: "1 Apr 2025" },
  { id: 6, name: "Admin User",        role: "admin",   email: "admin@rhu.ph",         phone: "09221234567", status: "active",   joined: "1 Jan 2025" },
  { id: 7, name: "Rosa Mendoza",      role: "patient", email: "rosa@email.com",       phone: "09231234567", status: "inactive", joined: "10 Feb 2026" },
  { id: 8, name: "Ramon Flores",      role: "patient", email: "ramon@email.com",      phone: "09241234567", status: "active",   joined: "20 Feb 2026" },
];

const roleColors: Record<string, string> = { patient: "badge-blue", doctor: "badge-teal", nurse: "badge-green", admin: "badge-red" };
const roleTabs = ["All", "Patients", "Doctors", "Nurses", "Admins"];

type FormState = { name: string; role: User["role"]; email: string; phone: string };

export default function Users() {
  const [users, setUsers] = useState<User[]>(initUsers);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", role: "patient", email: "", phone: "" });
  const [saved, setSaved] = useState(false);

  const filtered = users.filter((u) => {
    const roleMatch = tab === "All" || u.role === tab.slice(0, -1).toLowerCase();
    const searchMatch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return roleMatch && searchMatch;
  });

  const toggle = (id: number) =>
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));

  const addUser = () => {
    setUsers([...users, { id: Date.now(), ...form, status: "active", joined: "28 May 2026" }]);
    setModal(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setForm({ name: "", role: "patient", email: "", phone: "" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#111827", marginBottom: 4 }}>User Management</h1>
          <p style={{ fontSize: 14, color: "#6B7280" }}>Manage all system users and their roles</p>
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}><UserPlus size={16} /> Add User</button>
      </div>

      {saved && (
        <div style={{ background: "#D1FAE5", border: "1px solid #A7F3D0", borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: "#065F46" }}>
          <CheckCircle size={16} /> User added successfully
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Patients", count: users.filter((u) => u.role === "patient").length, color: "#3B82F6", bg: "#DBEAFE" },
          { label: "Doctors",  count: users.filter((u) => u.role === "doctor").length,  color: "#1A6B5A", bg: "#E8F5F1" },
          { label: "Nurses",   count: users.filter((u) => u.role === "nurse").length,   color: "#10B981", bg: "#D1FAE5" },
          { label: "Admins",   count: users.filter((u) => u.role === "admin").length,   color: "#EF4444", bg: "#FEE2E2" },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className="stat-card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 44, height: 44, background: bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color }}>{count}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 4, background: "#F3F4F6", borderRadius: 10, padding: 4 }}>
          {roleTabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", background: tab === t ? "#fff" : "transparent", color: tab === t ? "#111827" : "#6B7280", boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none", fontFamily: "'DM Sans', sans-serif" }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
            <input className="input" placeholder="Search users…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 32, width: 240 }} />
          </div>
          <button className="btn-secondary" style={{ padding: "8px 14px", fontSize: 13 }}><Filter size={14} /> Filter</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr><th>User</th><th>Role</th><th>Email</th><th>Phone</th><th>Date Joined</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, background: "#E8F5F1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#1A6B5A" }}>
                        {u.name.split(" ")[0][0]}{u.name.split(" ").at(-1)![0]}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{u.name}</div>
                    </div>
                  </td>
                  <td><span className={`badge ${roleColors[u.role]}`}>{u.role.charAt(0).toUpperCase() + u.role.slice(1)}</span></td>
                  <td style={{ fontSize: 13, color: "#6B7280" }}>{u.email}</td>
                  <td style={{ fontSize: 13, color: "#6B7280" }}>{u.phone}</td>
                  <td style={{ fontSize: 13, color: "#6B7280" }}>{u.joined}</td>
                  <td>{u.status === "active" ? <span className="badge badge-green">Active</span> : <span className="badge badge-gray">Inactive</span>}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <button className="btn-ghost" style={{ padding: "4px 10px", fontSize: 12, color: "#4B5563" }}><Edit2 size={12} /> Edit</button>
                      <button className="btn-ghost" style={{ padding: "4px 10px", fontSize: 12, color: "#4B5563" }}><Shield size={12} /> Role</button>
                      <button onClick={() => toggle(u.id)} style={{ background: "none", border: "none", cursor: "pointer", color: u.status === "active" ? "#EF4444" : "#10B981", padding: 4 }}>
                        {u.status === "active" ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 460, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>Add New User</h3>
              <button onClick={() => setModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {([ ["Full Name","name","text","e.g. Dr. Maria Santos"], ["Email","email","email","user@rhu.ph"], ["Mobile","phone","tel","09XX XXX XXXX"] ] as const).map(([label, key, type, ph]) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
                  <input className="input" type={type} placeholder={ph} value={form[key as keyof FormState]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Role</label>
                <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as User["role"] })}>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse / Midwife</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={() => setModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
              <button onClick={addUser} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}><UserPlus size={16} /> Add User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
