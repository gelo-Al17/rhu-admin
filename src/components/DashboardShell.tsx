import { useState } from "react";
import { Bell, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import AIChatAssistant from "./AIChatAssistant";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar onCollapse={setCollapsed} />

      <div className={`dashboard-main${collapsed ? " collapsed" : ""}`}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, gap: 16 }}>
          <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
            <input className="input" placeholder="Search…" style={{ paddingLeft: 36 }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", width: 38, height: 38, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4B5563" }}>
              <Bell size={18} />
              <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: "#EF4444", borderRadius: "50%", border: "2px solid #fff" }} />
            </div>
            <div style={{ width: 38, height: 38, background: "#E8F5F1", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#1A6B5A", cursor: "pointer" }}>
              AD
            </div>
          </div>
        </div>

        <div className="page-enter">{children}</div>
      </div>

      <AIChatAssistant />
    </div>
  );
}
