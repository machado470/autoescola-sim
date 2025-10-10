/** Estatísticas do aluno. TODO: puxar da store/API. */
export default function Perfil() {
  return (
    <section className="space-y-4 rounded-3xl border border-[var(--border-subtle)] bg-card-bg/80 p-6 text-sm shadow-sm shadow-black/5 backdrop-blur sm:p-10">
      <h2 className="text-2xl font-semibold tracking-tight text-text-base sm:text-3xl">Perfil do aluno</h2>
      <p className="text-[color:var(--muted)]">
        Visualize aqui suas próximas aulas, metas de estudo e progresso geral. Em breve teremos integrações com o histórico da
        plataforma.
      </p>
    </section>
  )
}
