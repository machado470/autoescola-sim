/** Painel do instrutor. TODO: CRUD de trilhas e import JSON. */
export default function Instrutor() {
  return (
    <section className="space-y-4 rounded-3xl border border-[var(--border-subtle)] bg-card-bg/80 p-6 text-sm shadow-sm shadow-black/5 backdrop-blur sm:p-10">
      <h2 className="text-2xl font-semibold tracking-tight text-text-base sm:text-3xl">Painel do instrutor</h2>
      <p className="text-[color:var(--muted)]">
        Em breve você poderá cadastrar novas trilhas, importar conteúdos e acompanhar o engajamento dos alunos por turma.
      </p>
    </section>
  )
}
