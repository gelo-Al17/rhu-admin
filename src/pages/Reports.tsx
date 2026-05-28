import { useState } from "react";
import { Download, FileText, BarChart2, Users, Package } from "lucide-react";

interface ReportType { id: string; icon: React.ComponentType<{ size?: number; color?: string }>; title: string; desc: string; }

const reportTypes: ReportType[] = [
  { id: "appointments", icon: BarChart2, title: "Appointment Report",    desc: "Bookings, cancellations, no-shows by date range and service type." },
  { id: "patients",     icon: Users,     title: "Patient Statistics",    desc: "New registrations, demographics, barangay distribution." },
  { id: "queue",        icon: FileText,  title: "Queue Performance",     desc: "Avg. wait times, throughput, peak hours analysis." },
  { id: "inventory",    icon: Package,   title: "Inventory Usage Report",desc: "Medicines dispensed, reorder frequency, expiry tracking." },
];

const sampleRows = [
  { date: "27 May 2026", service: "General Consultation", bookings: 47, served: 44, cancelled: 2, noShow: 1 },
  { date: "26 May 2026", service: "General Consultation", bookings: 42, served: 41, cancelled: 1, noShow: 0 },
  { date: "25 May 2026", service: "Maternal Care",        bookings: 18, served: 18, cancelled: 0, noShow: 0 },
  { date: "24 May 2026", service: "Dental Services",      bookings: 14, served: 12, cancelled: 1, noShow: 1 },
  { date: "23 May 2026", service: "Laboratory",           bookings: 22, served: 21, cancelled: 0, noShow: 1 },
];

export default function Reports() {
  const [selected, setSelected] = useState("appointments");
  const [from, setFrom] = useState("2026-05-01");
  const [to, setTo] = useState("2026-05-28");
  const [generated, setGenerated] = useState(true);

  const current = reportTypes.find((r) => r.id === selected);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#111827", marginBottom: 4 }}>Reports</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Generate and export system reports</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {reportTypes.map((r) => {
          const Icon = r.icon;
          const sel = selected === r.id;
          return (
            <div key={r.id} onClick={() => setSelected(r.id)}
              style={{ padding: 20, borderRadius: 12, border: `2px solid ${sel ? "#1A6B5A" : "#E5E7EB"}`, background: sel ? "#E8F5F1" : "#fff", cursor: "pointer", transition: "all 0.15s" }}>
              <Icon size={24} color={sel ? "#1A6B5A" : "#6B7280"} style={{ marginBottom: 10 }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: sel ? "#1A6B5A" : "#111827", marginBottom: 4 }}>{r.title}</div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>{r.desc}</div>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>From Date</label>
            <input className="input" type="date" value={from} onChange={(e) => setFrom(e.target.value)} style={{ width: 180 }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>To Date</label>
            <input className="input" type="date" value={to} onChange={(e) => setTo(e.target.value)} style={{ width: 180 }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Filter by Service</label>
            <select className="input" style={{ width: 200 }}>
              <option>All Services</option>
              <option>General Consultation</option>
              <option>Maternal Care</option>
              <option>Dental Services</option>
              <option>Laboratory</option>
            </select>
          </div>
          <button className="btn-primary" onClick={() => setGenerated(true)} style={{ height: 42, padding: "0 24px" }}>
            <BarChart2 size={16} /> Generate Report
          </button>
          {generated && (
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-secondary" style={{ height: 42, padding: "0 16px", fontSize: 13 }}><Download size={14} /> CSV</button>
              <button className="btn-secondary" style={{ height: 42, padding: "0 16px", fontSize: 13 }}><Download size={14} /> PDF</button>
            </div>
          )}
        </div>
      </div>

      {generated && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
              {current?.title} — {from} to {to}
            </h3>
            <span style={{ fontSize: 13, color: "#6B7280" }}>{sampleRows.length} records</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
            {[
              { label: "Total Bookings", value: sampleRows.reduce((a, r) => a + r.bookings, 0), color: "#1A6B5A" },
              { label: "Total Served",   value: sampleRows.reduce((a, r) => a + r.served, 0),   color: "#10B981" },
              { label: "Cancelled",      value: sampleRows.reduce((a, r) => a + r.cancelled, 0),color: "#F59E0B" },
              { label: "No-show",        value: sampleRows.reduce((a, r) => a + r.noShow, 0),   color: "#EF4444" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ background: "#F9FAFB", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 4, textTransform: "uppercase" }}>{label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color }}>{value}</div>
              </div>
            ))}
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr><th>Date</th><th>Service</th><th>Bookings</th><th>Served</th><th>Cancelled</th><th>No-show</th><th>Completion Rate</th></tr>
              </thead>
              <tbody>
                {sampleRows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 13 }}>{r.date}</td>
                    <td style={{ fontSize: 13, fontWeight: 500 }}>{r.service}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{r.bookings}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#10B981" }}>{r.served}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#F59E0B" }}>{r.cancelled}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#EF4444" }}>{r.noShow}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: "#F3F4F6", borderRadius: 3 }}>
                          <div style={{ height: "100%", width: `${(r.served / r.bookings) * 100}%`, background: "#1A6B5A", borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#1A6B5A", minWidth: 36 }}>{Math.round((r.served / r.bookings) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
