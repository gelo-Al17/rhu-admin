import { useState } from "react";
import { Bell, Globe, Shield, Database, Save } from "lucide-react";

interface Field { label: string; value: string; type: string; }
interface Section { title: string; icon: React.ComponentType<{ size?: number; color?: string }>; fields: Field[]; }

const sections: Section[] = [
  {
    title: "RHU Information",
    icon: Globe,
    fields: [
      { label: "Facility Name",      value: "RHU Malasiqui 1",       type: "text" },
      { label: "Address",            value: "Malasiqui, Pangasinan",  type: "text" },
      { label: "Contact Number",     value: "+63 75 XXX XXXX",        type: "tel" },
      { label: "Email",              value: "rhu@malasiqui.gov.ph",   type: "email" },
      { label: "Operating Hours",    value: "8:00 AM – 5:00 PM",      type: "text" },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    fields: [
      { label: "SMS Provider",                         value: "Semaphore PH",  type: "text" },
      { label: "SMS API Key",                          value: "••••••••••••••••", type: "password" },
      { label: "Appointment Reminder (hours before)",  value: "24",            type: "number" },
      { label: "Queue Alert (numbers ahead)",          value: "3",             type: "number" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    fields: [
      { label: "Session Timeout (minutes)", value: "60", type: "number" },
      { label: "Max Login Attempts",        value: "5",  type: "number" },
    ],
  },
];

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#111827", marginBottom: 4 }}>Settings</h1>
          <p style={{ fontSize: 14, color: "#6B7280" }}>System configuration and preferences</p>
        </div>
        <button className="btn-primary" onClick={save}><Save size={16} /> Save All Changes</button>
      </div>

      {saved && (
        <div style={{ background: "#D1FAE5", border: "1px solid #A7F3D0", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#065F46" }}>
          ✓ Settings saved successfully
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {sections.map(({ title, icon: Icon, fields }) => (
          <div key={title} className="card">
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon size={18} color="#1A6B5A" /> {title}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {fields.map(({ label, value, type }) => (
                <div key={label}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
                  <input className="input" type={type} defaultValue={value} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Database size={18} color="#1A6B5A" /> System Backup
          </h3>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Last backup: 28 May 2026, 2:00 AM</div>
              <div style={{ fontSize: 13, color: "#6B7280" }}>Automatic daily backups at 2:00 AM</div>
            </div>
            <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 16px" }}><Database size={14} /> Backup Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
