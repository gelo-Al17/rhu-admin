import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@rhu.ph");
  const [password, setPassword] = useState("password");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #E8F5F1 0%, #F9FAFB 60%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, justifyContent: "center" }}>
          <div style={{ width: 44, height: 44, background: "#1A6B5A", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Heart size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#111827", fontWeight: 700 }}>RHU Malasiqui</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>Admin Portal</div>
          </div>
        </div>

        <div className="card" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.1)" }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#111827", marginBottom: 6, textAlign: "center" }}>Admin Sign In</h1>
          <p style={{ fontSize: 13, color: "#6B7280", textAlign: "center", marginBottom: 28 }}>Sign in to manage RHU Malasiqui</p>

          {error && (
            <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#991B1B" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email Address</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@rhu.ph" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <input className="input" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ paddingRight: 40 }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
              Sign In
            </button>
          </form>
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF", marginTop: 20 }}>RHU Malasiqui — Pangasinan, Philippines</p>
      </div>
    </div>
  );
}
