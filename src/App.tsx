import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardShell from "./components/DashboardShell";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Appointments from "./pages/Appointments";
import Queue from "./pages/Queue";
import Inventory from "./pages/Inventory";
import Announcements from "./pages/Announcements";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={<AdminLayout><Dashboard /></AdminLayout>}
        />
        <Route
          path="/users"
          element={<AdminLayout><Users /></AdminLayout>}
        />
        <Route
          path="/appointments"
          element={<AdminLayout><Appointments /></AdminLayout>}
        />
        <Route
          path="/queue"
          element={<AdminLayout><Queue /></AdminLayout>}
        />
        <Route
          path="/inventory"
          element={<AdminLayout><Inventory /></AdminLayout>}
        />
        <Route
          path="/announcements"
          element={<AdminLayout><Announcements /></AdminLayout>}
        />
        <Route
          path="/analytics"
          element={<AdminLayout><Analytics /></AdminLayout>}
        />
        <Route
          path="/reports"
          element={<AdminLayout><Reports /></AdminLayout>}
        />
        <Route
          path="/settings"
          element={<AdminLayout><Settings /></AdminLayout>}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
