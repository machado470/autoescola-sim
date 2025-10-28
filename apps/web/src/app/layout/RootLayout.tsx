import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout(){
  const link = { padding: 8, textDecoration: "none", border: "1px solid #ccc", borderRadius: 8, marginRight: 8 };
  const bar  = { display: "flex", gap: 8, padding: 12, borderTop: "1px solid #eee", position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff" };
  return (
    <div style={{minHeight:"100dvh", display:"flex", flexDirection:"column"}}>
      <header style={{padding:12, borderBottom:"1px solid #eee", fontWeight:600}}>AutoEscola-Sim</header>
      <main style={{flex:1, padding:16}}><Outlet/></main>
      <nav style={bar as any}>
        <NavLink to="/" style={link as any}>Home</NavLink>
      </nav>
    </div>
  );
}
