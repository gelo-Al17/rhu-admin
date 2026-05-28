import { useState } from "react";
import { Calendar, Search, Filter } from "lucide-react";
import type { Appointment } from "../types";

const appointments: Appointment[] = [
  { id: "APT-001", patient: "Juan dela Cruz",   doctor: "Dr. Maria Reyes",  date: "3 Jun 2026",  time: "10:00 AM", service: "General",  status: "confirmed" },
  { id: "APT-002", patient: "Ana Cruz",         doctor: "Dr. Ana Cruz",     date: "3 Jun 2026",  time: "11:00 AM", service: "Maternal", status: "confirmed" },
  { id: "APT-003", patient: "Rosa Mendoza",     doctor: "Dr. Jose Santos",  date: "3 Jun 2026",  time: "2:00 PM",  service: "Dental",   status: "pending" },
  { id: "APT-004", patient: "Ramon Flores",     doctor: "Dr. Maria Reyes",  date: "4 Jun 2026",  time: "8:30 AM",  service: "General",  status: "confirmed" },
  { id: "APT-005", patient: "Lucia Bautista",   doctor: "Dr. Ana Cruz",     date: "4 Jun 2026",  time: "9:00 AM",  service: "Maternal", status: "pending" },
  { id: "APT-006", patient: "Pedro Villanueva", doctor: "Dr. Maria Reyes",  date: "5 Jun 2026",  time: "10:30 AM", service: "General",  status: "cancelled" },
];

const statusBadgeClass: Record<Appointment["status"], string> = {
  confirmed: "badge-green",
  pending:   "badge-amber",
  cancelled: "badge-red",
};

export default function Appointments() {
  const [search, setSearch] = useState("");

  const filtered = appointments.filter((a) =>
    a.patient.toLowerCase().includes(search.toLowerCase()) ||
    a.doctor.toLowerCase().includes(search.toLowerCase()) ||
    a.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#111827", marginBottom: 4 }}>Appointments</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Full view of all appointments across RHU stations</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Today",     count: appointments.filter((a) => a.date === "3 Jun 2026").length, color: "#1A6B5A", bg: "#E8F5F1" },
          { label: "Confirmed", count: appointments.filter((a) => a.status === "confirmed").length, color: "#10B981", bg: "#D1FAE5" },
          { label: "Pending",   count: appointments.filter((a) => a.status === "pending").length,   color: "#F59E0B", bg: "#FEF3C7" },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className="stat-card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 44, height: 44, background: bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color }}>{count}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#374151" }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", gap: 12 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
            <input className="input" placeholder="Search appointments…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
          </div>
          <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 14px" }}><Filter size={14} /> Filter</button>
          <button className="btn-primary" style={{ fontSize: 13, padding: "8px 16px" }}><Calendar size={14} /> Schedule View</button>
        </div>
        <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr><th>Appt ID</th><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Service</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{a.id}</td>
                  <td style={{ fontWeight: 600 }}>{a.patient}</td>
                  <td style={{ fontSize: 13 }}>{a.doctor}</td>
                  <td style={{ fontSize: 13 }}>{a.date}</td>
                  <td style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{a.time}</td>
                  <td><span className="badge badge-teal">{a.service}</span></td>
                  <td><span className={`badge ${statusBadgeClass[a.status]}`}>{a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn-secondary" style={{ fontSize: 12, padding: "4px 10px" }}>Edit</button>
                      <button style={{ background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
