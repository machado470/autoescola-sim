import React from "react";
import { Progress } from "../../ui/Progress";

export default function SinalizacaoPage() {
  return (
    <div style={{maxWidth: 760, margin: "0 auto", padding: 24}}>
      <header style={{display: "flex", alignItems: "center", gap: 16, marginBottom: 16}}>
        <img src="/icons/cone.svg" width={64} height={64} alt="cone" />
        <div style={{fontSize: 44, fontWeight: 900}}>Sinalização</div>
      </header>

      <div style={{fontSize: 22, color: "#334155", marginBottom: 8}}>60% concluído</div>
      <Progress value={60} />

      <nav style={{display: "flex", gap: 20, marginTop: 24, marginBottom: 16, fontSize: 22}}>
        <strong>Aulas</strong>
        <a href="/quiz/sinalizacao" style={{textDecoration: "none"}}>Quiz</a>
        <span style={{opacity:.6}}>Progresso</span>
      </nav>

      <section style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 26}}>
        <div style={{border: "1px solid #e5e7eb", borderRadius: 16, padding: 18, textAlign: "center"}}>
          <img src="/icons/stop.svg" width={140} height={140} alt="R-1" />
          <div style={{marginTop: 6, fontSize: 28, fontWeight: 700}}>R-1</div>
        </div>
        <div style={{border: "1px solid #e5e7eb", borderRadius: 16, padding: 18, textAlign: "center"}}>
          <img src="/icons/yield.svg" width={140} height={140} alt="R-2" />
          <div style={{marginTop: 6, fontSize: 28, fontWeight: 700}}>R-2</div>
        </div>
      </section>

      <a href="/quiz/sinalizacao" style={{
        display:"block", textAlign:"center", padding:"18px 20px",
        background:"#3b82f6", color:"#fff", borderRadius:20, fontSize:28, fontWeight:800,
        textDecoration:"none"
      }}>
        Iniciar Quiz
      </a>

      <div style={{display:"flex", gap:16, marginTop:26, alignItems:"center"}}>
        <img src="/icons/cone.svg" width="72" height="72" alt="cone"/>
        <div style={{border:"1px solid #e5e7eb", padding:"14px 18px", borderRadius:16, fontSize:22}}>
          Muita atenção com as placas vermelhas, elas indicam proibições.
        </div>
      </div>
    </div>
  );
}
