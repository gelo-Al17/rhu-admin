import { useState } from "react";
import { TrendingUp, TrendingDown, Download } from "lucide-react";

const monthlyData = [
  { month: "Jan", patients: 280, appointments: 340, served: 320 },
  { month: "Feb", patients: 310, appointments: 380, served: 360 },
  { month: "Mar", patients: 295, appointments: 355, served: 340 },
  { month: "Apr", patients: 340, appointments: 410, served: 395 },
  { month: "May", patients: 365, appointments: 445, served: 430 },
];

const heatmap = [
  { day: "Mon", hours: [2,5,8,12,15,14,10,6,3] },
  { day: "Tue", hours: [1,4,9,14,18,16,12,8,4] },
  { day: "Wed", hours: [3,6,10,13,14,12,9,5,2] },
  { day: "Thu", hours: [2,5,11,15,17,15,11,7,3] },
  { day: "Fri", hours: [2,4,8,12,14,13,9,6,2] },
  { day: "Sat", hours: [1,3,6,8,7,5,3,2,1] },
];

const timeLabels = ["8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM"];
const maxHeat = 18;
const maxAppts = Math.max(...monthlyData.map((d) => d.appointments));
const presets = ["Today", "This Week", "This Month", "Last 3 Months"];

const getHeatColor = (v: number): string => {
  const pct = v / maxHeat;
  if (pct > 0.8) return "#1A6B5A";
  if (pct > 0.6) return "#2FA98C";
  if (pct > 0.4) return "#6CC4A6";
  if (pct > 0.2) return "#A8DDD0";
  return "#E8F5F1";
};

export default function Analytics() {
  const [preset, setPreset] = useState("This Month");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#111827", marginBottom: 4 }}>Analytics</h1>
          <p style={{ fontSize: 14, color: "#6B7280" }}>Patient and appointment insights for RHU Malasiqui</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", gap: 4, background: "#F3F4F6", borderRadius: 10, padding: 4 }}>
            {presets.map((p) => (
              <button key={p} onClick={() => setPreset(p)} style={{ padding: "7px 14px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", background: preset === p ? "#fff" : "transparent", color: preset === p ? "#111827" : "#6B7280", boxShadow: preset === p ? "0 1px 4px rgba(0,0,0,0.08)" : "none", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
                {p}
              </button>
            ))}
          </div>
          <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 16px" }}><Download size={14} /> Export</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 28 }}>
        {[
          { label: "Total Patients",     value: "3,842", change: "+8.2%",  up: true },
          { label: "Total Appointments", value: "1,930", change: "+12.4%", up: true },
          { label: "Avg. Wait Time",     value: "32 min",change: "-4.1%",  up: false },
          { label: "Service Rate",       value: "96.4%", change: "+1.8%",  up: true },
        ].map(({ label, value, change, up }) => (
          <div key={label} className="stat-card">
            <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 8 }}>{value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: up ? "#10B981" : "#EF4444", fontWeight: 600 }}>
              {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {change} vs last period
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Monthly Appointment Trends</h2>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#6B7280" }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 10, height: 10, background: "#1A6B5A", borderRadius: 2 }} /> Appointments</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 10, height: 10, background: "#E8F5F1", border: "1px solid #2FA98C", borderRadius: 2 }} /> Served</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-end", height: 200 }}>
          {monthlyData.map((d) => (
            <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1A6B5A" }}>{d.appointments}</div>
              <div style={{ width: "100%", display: "flex", gap: 4, alignItems: "flex-end", height: 160 }}>
                <div className="chart-bar" style={{ flex: 1, height: `${(d.appointments / maxAppts) * 100}%` }} />
                <div style={{ flex: 1, height: `${(d.served / maxAppts) * 100}%`, background: "#E8F5F1", border: "1px solid #2FA98C", borderRadius: "4px 4px 0 0" }} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>{d.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Patient Visits Heatmap</h2>
          <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, color: "#6B7280" }}>
            <span>Low</span>
            {["#E8F5F1","#A8DDD0","#6CC4A6","#2FA98C","#1A6B5A"].map((c) => (
              <div key={c} style={{ width: 18, height: 18, background: c, borderRadius: 4 }} />
            ))}
            <span>High</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "50px repeat(9, 1fr)", gap: 6 }}>
          <div />
          {timeLabels.map((t) => (
            <div key={t} style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", fontWeight: 600 }}>{t}</div>
          ))}
          {heatmap.map((row) => (
            <div key={row.day} style={{ display: "contents" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", display: "flex", alignItems: "center" }}>{row.day}</div>
              {row.hours.map((v, i) => (
                <div key={i} style={{ height: 36, background: getHeatColor(v), borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: v > 12 ? "#fff" : "#1A6B5A", cursor: "default", transition: "transform 0.1s" }}
                  title={`${row.day} ${timeLabels[i]}: ${v} patients`}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}>
                  {v}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 12 }}>Average number of patients per hour slot</p>
      </div>
    </div>
  );
}
