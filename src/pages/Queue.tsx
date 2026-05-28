import { Activity, Clock, CheckCircle, BarChart2 } from "lucide-react";
import type { QueueStation } from "../types";

const liveQueue: QueueStation[] = [
  { station: "General Consultation", serving: 41, waiting: 23, priority: 4, avgWait: "6 min" },
  { station: "Maternal Care",        serving: 5,  waiting: 8,  priority: 2, avgWait: "8 min" },
  { station: "Dental Services",      serving: 3,  waiting: 4,  priority: 0, avgWait: "12 min" },
  { station: "Laboratory",           serving: 7,  waiting: 6,  priority: 1, avgWait: "5 min" },
];

const todayStats = [
  { label: "Total Served Today",  value: "152", icon: CheckCircle, color: "#10B981", bg: "#D1FAE5" },
  { label: "Currently Waiting",   value: "41",  icon: Clock,       color: "#F59E0B", bg: "#FEF3C7" },
  { label: "Avg. Wait Time",      value: "32m", icon: Activity,    color: "#3B82F6", bg: "#DBEAFE" },
  { label: "Total Active Queues", value: "4",   icon: BarChart2,   color: "#8B5CF6", bg: "#EDE9FE" },
];

export default function Queue() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#111827", marginBottom: 4 }}>Queue Monitor</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Real-time queue status across all RHU stations</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {todayStats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="stat-card" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 48, height: 48, background: bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon size={22} color={color} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#111827" }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {liveQueue.map((q) => (
          <div key={q.station} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{q.station}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, background: "#10B981", borderRadius: "50%", animation: "pulse-dot 2s infinite", display: "inline-block" }} />
                  <span style={{ fontSize: 12, color: "#10B981", fontWeight: 600 }}>Live</span>
                </div>
              </div>
              <span className="badge badge-teal">Avg. {q.avgWait}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Serving", value: `#${q.serving}`, color: "#1A6B5A" },
                { label: "Waiting", value: q.waiting,       color: "#F59E0B" },
                { label: "Priority",value: q.priority,      color: "#EF4444" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ background: "#F9FAFB", borderRadius: 10, padding: "12px 0", textAlign: "center" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 800, color }}>{value}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2, fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {[...Array(Math.min(q.waiting, 12))].map((_, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: i < q.priority ? "#FEE2E2" : "#E8F5F1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: i < q.priority ? "#EF4444" : "#1A6B5A", fontFamily: "'JetBrains Mono', monospace" }}>
                  {q.serving + i + 1}
                </div>
              ))}
              {q.waiting > 12 && (
                <div style={{ width: 28, height: 28, borderRadius: 6, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#9CA3AF", fontWeight: 700 }}>
                  +{q.waiting - 12}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
