import { useMemo, useState } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Table from '../components/Table'
import { useCrud } from '../hooks/useCrud'

export type Lesson = {
  id: string
  title: string
  date: string
  student: string
  instructor: string
  status?: string
}

const emptyForm: Omit<Lesson, 'id'> = {
  title: '',
  date: '',
  student: '',
  instructor: '',
  status: ''
}

export function LessonsPage() {
  const { items, loading, error, createItem, updateItem, deleteItem } = useCrud<Lesson>('lessons')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState<Lesson | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const columns = useMemo(
    () => [
      { key: 'title', label: 'Aula' },
      {
        key: 'date',
        label: 'Data',
        render: (lesson: Lesson) =>
          lesson.date ? new Date(lesson.date).toLocaleString('pt-BR') : '—'
      },
      { key: 'student', label: 'Aluno' },
      { key: 'instructor', label: 'Instrutor' },
      { key: 'status', label: 'Status' }
    ],
    []
  )

  const openCreateModal = () => {
    setForm(emptyForm)
    setEditing(null)
    setFormError(null)
    setIsModalOpen(true)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (editing) {
        await updateItem(editing.id, form)
      } else {
        await createItem(form)
      }
      setIsModalOpen(false)
      setForm(emptyForm)
      setEditing(null)
      setFormError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível salvar a aula.'
      setFormError(message)
    }
  }

  const handleEdit = (lesson: Lesson) => {
    setEditing(lesson)
    setForm({
      title: lesson.title,
      date: lesson.date,
      student: lesson.student,
      instructor: lesson.instructor,
      status: lesson.status ?? ''
    })
    setFormError(null)
    setIsModalOpen(true)
  }

  const handleDelete = (lesson: Lesson) => {
    if (window.confirm(`Deseja remover a aula ${lesson.title}?`)) {
      void deleteItem(lesson.id).catch((err) => {
        const message = err instanceof Error ? err.message : 'Não foi possível remover a aula.'
        alert(message)
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Aulas</h2>
          <p className="text-sm text-foreground/70">Organize e acompanhe as aulas práticas e teóricas.</p>
        </div>
        <Button onClick={openCreateModal}>Agendar aula</Button>
      </div>

      {error ? <p className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-300">{error}</p> : null}

      <Table<Lesson>
        data={items}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? 'Editar aula' : 'Nova aula'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Título"
            name="title"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            required
          />
          <Input
            label="Data"
            name="date"
            type="datetime-local"
            value={form.date}
            onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
            required
          />
          <Input
            label="Aluno"
            name="student"
            value={form.student}
            onChange={(event) => setForm((prev) => ({ ...prev, student: event.target.value }))}
            required
          />
          <Input
            label="Instrutor"
            name="instructor"
            value={form.instructor}
            onChange={(event) => setForm((prev) => ({ ...prev, instructor: event.target.value }))}
            required
          />
          <Input
            label="Status"
            name="status"
            value={form.status}
            onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
          />
          {formError ? <p className="text-sm text-red-400">{formError}</p> : null}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">{editing ? 'Salvar alterações' : 'Cadastrar'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default LessonsPage
