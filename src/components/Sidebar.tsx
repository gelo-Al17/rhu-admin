import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Users, Calendar, Activity, Package,
  Megaphone, BarChart2, ClipboardList, Settings,
  ChevronLeft, ChevronRight, LogOut, Heart,
} from "lucide-react";
import type { NavItem } from "../types";

const navItems: NavItem[] = [
  { href: "/dashboard",    icon: LayoutDashboard, label: "Dashboard" },
  { href: "/users",        icon: Users,            label: "User Management" },
  { href: "/appointments", icon: Calendar,         label: "Appointments" },
  { href: "/queue",        icon: Activity,         label: "Queue Monitor" },
  { href: "/inventory",    icon: Package,          label: "Inventory" },
  { href: "/announcements",icon: Megaphone,        label: "Announcements" },
  { href: "/analytics",    icon: BarChart2,        label: "Analytics" },
  { href: "/reports",      icon: ClipboardList,    label: "Reports" },
  { href: "/settings",     icon: Settings,         label: "Settings" },
];

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

export default function Sidebar({ onCollapse }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    onCollapse?.(next);
  };

  return (
    <aside className="sidebar" style={{ width: collapsed ? 72 : 260 }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12, overflow: "hidden" }}>
        <div style={{ width: 40, height: 40, background: "#1A6B5A", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Heart size={20} color="#fff" />
        </div>
        {!collapsed && (
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.2, whiteSpace: "nowrap" }}>
              RHU Malasiqui
            </div>
            <div style={{ fontSize: 11, color: "#6B7280", whiteSpace: "nowrap" }}>Admin Portal</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `sidebar-nav-item${isActive ? " active" : ""}`}
              title={collapsed ? item.label : undefined}
              style={{ justifyContent: collapsed ? "center" : undefined }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <Icon size={20} />
                {item.badge && !collapsed && (
                  <span style={{ position: "absolute", top: -4, right: -6, background: "#EF4444", color: "#fff", borderRadius: 100, fontSize: 10, fontWeight: 700, padding: "1px 5px", lineHeight: 1.4 }}>
                    {item.badge}
                  </span>
                )}
              </div>
              {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div style={{ borderTop: "1px solid #E5E7EB", padding: "12px 8px" }}>
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 8, borderRadius: 8, marginBottom: 4 }}>
            <div style={{ width: 34, height: 34, background: "#E8F5F1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 700, color: "#1A6B5A" }}>
              AD
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Admin</div>
              <div style={{ fontSize: 11, color: "#6B7280" }}>admin@rhu.ph</div>
            </div>
          </div>
        )}
        <NavLink
          to="/login"
          className="sidebar-nav-item"
          style={{ color: "#EF4444", justifyContent: collapsed ? "center" : undefined }}
        >
          <LogOut size={18} />
          {!collapsed && <span>Log Out</span>}
        </NavLink>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={toggle}
        style={{ position: "absolute", top: "50%", right: -12, transform: "translateY(-50%)", width: 24, height: 24, background: "#fff", border: "1px solid #E5E7EB", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", zIndex: 10, color: "#4B5563" }}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
