import { useNavigate } from "react-router-dom";
import { Users, Calendar, Activity, Package, Megaphone, TrendingUp, ChevronRight, UserPlus, Clock } from "lucide-react";

const kpis = [
  { label: "Total Patients",     value: "3,842", sub: "+24 this week",   icon: Users,     color: "#1A6B5A", bg: "#E8F5F1" },
  { label: "Appointments Today", value: "47",    sub: "8 pending",       icon: Calendar,  color: "#3B82F6", bg: "#DBEAFE" },
  { label: "Queue Length",       value: "23",    sub: "Now serving #41", icon: Activity,  color: "#F59E0B", bg: "#FEF3C7" },
  { label: "Low Stock Items",    value: "3",     sub: "Needs attention", icon: Package,   color: "#EF4444", bg: "#FEE2E2" },
  { label: "Announcements",      value: "2",     sub: "Published",       icon: Megaphone, color: "#8B5CF6", bg: "#EDE9FE" },
];

const weeklyData = [
  { day: "Mon", appts: 38, served: 35 },
  { day: "Tue", appts: 47, served: 40 },
  { day: "Wed", appts: 42, served: 42 },
  { day: "Thu", appts: 51, served: 48 },
  { day: "Fri", appts: 44, served: 41 },
  { day: "Sat", appts: 18, served: 18 },
];
const maxVal = Math.max(...weeklyData.map((d) => d.appts));

const recentActivity = [
  { text: "New patient registered: Lucia Bautista",             time: "5 min ago",  color: "#1A6B5A" },
  { text: "Appointment booked: Juan dela Cruz — Jun 3",         time: "12 min ago", color: "#3B82F6" },
  { text: "Queue #41 served — Rosa Cruz (General)",             time: "18 min ago", color: "#10B981" },
  { text: "Low stock alert: Amoxicillin 500mg",                 time: "1 hr ago",   color: "#F59E0B" },
  { text: "Appointment cancelled: Pedro Bautista — May 30",     time: "2 hr ago",   color: "#EF4444" },
];

const topServices = [
  { name: "General Consultation", pct: 42, color: "#1A6B5A" },
  { name: "Maternal Care",        pct: 22, color: "#2FA98C" },
  { name: "Immunization",         pct: 16, color: "#3B82F6" },
  { name: "Dental Services",      pct: 12, color: "#8B5CF6" },
  { name: "Family Planning",      pct:  8, color: "#F59E0B" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#111827", marginBottom: 4 }}>Admin Dashboard</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>System overview · RHU Malasiqui · 28 May 2026</p>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 28 }}>
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, background: k.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color={k.color} />
                </div>
                <TrendingUp size={16} color="#10B981" />
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 2 }}>{k.value}</div>
              <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{k.label}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>{k.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 24 }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Weekly Appointment Volume</h2>
            <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#6B7280" }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 10, height: 10, background: "#1A6B5A", borderRadius: 2 }} /> Appointments</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 10, height: 10, background: "#E8F5F1", border: "1px solid #2FA98C", borderRadius: 2 }} /> Served</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-end", height: 160 }}>
            {weeklyData.map((d) => (
              <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 4 }}>{d.appts}</div>
                <div style={{ width: "100%", display: "flex", gap: 3, alignItems: "flex-end", height: 120 }}>
                  <div className="chart-bar" style={{ flex: 1, height: `${(d.appts / maxVal) * 100}%` }} />
                  <div style={{ flex: 1, height: `${(d.served / maxVal) * 100}%`, background: "#E8F5F1", border: "1px solid #2FA98C", borderRadius: "4px 4px 0 0" }} />
                </div>
                <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Top Services Used</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {topServices.map((s) => (
              <div key={s.name}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ fontWeight: 500, color: "#374151" }}>{s.name}</span>
                  <span style={{ fontWeight: 700, color: "#111827" }}>{s.pct}%</span>
                </div>
                <div style={{ height: 8, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: 4, transition: "width 0.5s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Recent Activity</h2>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#1A6B5A", fontWeight: 500 }}>View all</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, flexShrink: 0, marginTop: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#374151" }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                    <Clock size={10} /> {a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 14 }}>Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Add New User",       path: "/users",         icon: UserPlus },
                { label: "Post Announcement",  path: "/announcements", icon: Megaphone },
                { label: "View Reports",       path: "/reports",       icon: TrendingUp },
                { label: "Monitor Queue",      path: "/queue",         icon: Activity },
              ].map(({ label, path, icon: Icon }) => (
                <button key={label} onClick={() => navigate(path)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#E8F5F1"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#1A6B5A"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E7EB"; }}>
                  <div style={{ width: 30, height: 30, background: "#E8F5F1", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={15} color="#1A6B5A" />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{label}</span>
                  <ChevronRight size={14} color="#9CA3AF" style={{ marginLeft: "auto" }} />
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg, #1A6B5A, #2FA98C)", borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>System Health</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>All Systems Normal</div>
            {[["Uptime","99.9%"],["Active Sessions","18"],["DB Status","Healthy"],["Last Backup","28 May, 2:00 AM"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>
                <span>{l}</span><span style={{ fontWeight: 700, color: "#fff" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
