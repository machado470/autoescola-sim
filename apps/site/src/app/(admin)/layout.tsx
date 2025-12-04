export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 240, background: "#111", color: "#fff", padding: 24 }}>
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>Admin</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a href="/(admin)/dashboard">Dashboard</a>
          <a href="/(admin)/categorias">Categorias</a>
          <a href="/(admin)/fases">Fases</a>
          <a href="/(admin)/questoes">Questões</a>
          <a href="/(admin)/aulas">Aulas</a>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 32 }}>
        {children}
      </main>
    </div>
  );
}
