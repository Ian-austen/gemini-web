"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{r:string, c:string}[]>([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if(!input || loading) return;
    setLoading(true);
    const newHistory = [...history, {r: "User", c: input}];
    setHistory(newHistory);
    const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ message: input }) });
    const data = await res.json();
    setHistory([...newHistory, {r: "Gemini", c: data.text}]);
    setInput("");
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Gemini 实时对话</h1>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', height: '500px', overflowY: 'auto', background: '#f9f9f9' }}>
        {history.map((item, i) => (
          <div key={i} style={{ marginBottom: '15px', color: item.r === 'User' ? '#333' : '#0070f3' }}>
            <strong>{item.r}:</strong> <p style={{ whiteSpace: 'pre-wrap' }}>{item.c}</p>
          </div>
        ))}
        {loading && <p>Gemini 正在思考...</p>}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <input style={{ flex: 1, padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} 
               value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="输入消息..." />
        <button style={{ padding: '10px 24px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} 
                onClick={send} disabled={loading}>{loading ? '发送中...' : '发送'}</button>
      </div>
    </main>
  );
}
