import { useState } from "react";
import { MessageCircle, X, Send, Bot, Globe } from "lucide-react";

type Lang = "en" | "fil";

const quickReplies: Record<Lang, string[]> = {
  en:  ["View queue status", "Check inventory alerts", "Recent registrations", "View reports"],
  fil: ["Tingnan ang pila", "Suriin ang inventory", "Mga bagong pasyente", "Tingnan ang ulat"],
};

const botResponses: Record<Lang, Record<string, string>> = {
  en: {
    "View queue status":        "Currently serving #41 at General Consultation. There are 23 patients waiting across all 4 stations.",
    "Check inventory alerts":   "3 items need attention: Amoxicillin 500mg (low stock), Ferrous Sulfate (out of stock), and Salbutamol Nebule (expiring soon).",
    "Recent registrations":     "2 new patients registered today: Lucia Bautista and Marco Ramos. Total patients this week: 24.",
    "View reports":             "The latest appointment report shows 44/47 appointments served today (93.6% completion rate). Go to Reports for full details.",
  },
  fil: {
    "Tingnan ang pila":         "Kasalukuyang sineserbisyuhan ang #41 sa General Consultation. Mayroon pang 23 pasyente sa lahat ng 4 na istasyon.",
    "Suriin ang inventory":     "3 na aytem ang nangangailangan ng pansin: Amoxicillin 500mg (mababa), Ferrous Sulfate (wala na), at Salbutamol Nebule (malapit mag-expire).",
    "Mga bagong pasyente":      "2 bagong pasyente ang nagrehistro ngayon: Lucia Bautista at Marco Ramos. Kabuuang pasyente ngayong linggo: 24.",
    "Tingnan ang ulat":         "Ang pinakabagong ulat ng appointment ay nagpapakita ng 44/47 na naserbisyuhan ngayon (93.6% completion rate). Pumunta sa Reports para sa buong detalye.",
  },
};

interface Message {
  from: "bot" | "user";
  text: string;
}

export default function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! I'm your RHU admin assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text?: string) => {
    const userMsg = text ?? input.trim();
    if (!userMsg) return;
    const reply =
      botResponses[lang][userMsg] ??
      (lang === "en"
        ? "I can help with queue status, inventory, reports, and user management."
        : "Makakatulong ako sa pila, inventory, ulat, at pamamahala ng mga gumagamit.");
    setMessages((prev) => [...prev, { from: "user", text: userMsg }, { from: "bot", text: reply }]);
    setInput("");
  };

  const switchLang = () => {
    const next: Lang = lang === "en" ? "fil" : "en";
    setLang(next);
    setMessages([{
      from: "bot",
      text: next === "en" ? "Hi! I'm your RHU admin assistant. How can I help you?" : "Kumusta! Ako ang iyong RHU admin assistant. Paano kita matutulungan?",
    }]);
  };

  return (
    <>
      {open && (
        <div className="ai-chat-panel">
          <div style={{ background: "#1A6B5A", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={18} color="#fff" />
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>RHU Assistant</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ display: "inline-block", width: 6, height: 6, background: "#10B981", borderRadius: "50%" }} />
                  Online
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={switchLang} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                <Globe size={12} /> {lang === "en" ? "Filipino" : "English"}
              </button>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}><X size={18} /></button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, maxHeight: 300 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
                {msg.from === "bot" && (
                  <div style={{ width: 28, height: 28, background: "#E8F5F1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Bot size={14} color="#1A6B5A" />
                  </div>
                )}
                <div style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: msg.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: msg.from === "user" ? "#1A6B5A" : "#F3F4F6", color: msg.from === "user" ? "#fff" : "#111827", fontSize: 13, lineHeight: 1.5 }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: "8px 16px", display: "flex", flexWrap: "wrap", gap: 6, borderTop: "1px solid #F3F4F6" }}>
            {quickReplies[lang].map((q) => (
              <button key={q} onClick={() => sendMessage(q)} style={{ background: "#E8F5F1", color: "#1A6B5A", border: "1px solid #C6E8DF", borderRadius: 100, padding: "4px 12px", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                {q}
              </button>
            ))}
          </div>

          <div style={{ padding: 12, display: "flex", gap: 8, borderTop: "1px solid #E5E7EB" }}>
            <input className="input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder={lang === "en" ? "Type a message…" : "Mag-type ng mensahe…"} style={{ flex: 1 }} />
            <button onClick={() => sendMessage()} className="btn-primary" style={{ padding: "10px 14px" }}><Send size={16} /></button>
          </div>
        </div>
      )}

      <div className="ai-chat-bubble" onClick={() => setOpen(!open)}>
        {open ? <X size={22} color="#fff" /> : <MessageCircle size={22} color="#fff" />}
      </div>
    </>
  );
}
