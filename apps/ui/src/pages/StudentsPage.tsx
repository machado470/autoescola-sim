import { useMemo, useState } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Table from '../components/Table'
import { useCrud } from '../hooks/useCrud'

export type Student = {
  id: string
  name: string
  email: string
  phone?: string
  status?: string
}

const emptyForm: Required<Pick<Student, 'name' | 'email'>> & { phone: string; status: string } = {
  name: '',
  email: '',
  phone: '',
  status: ''
}

export function StudentsPage() {
  const { items, loading, error, createItem, updateItem, deleteItem } = useCrud<Student>('students')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState<Student | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const columns = useMemo(
    () => [
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'E-mail' },
      { key: 'phone', label: 'Telefone' },
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
      const message = err instanceof Error ? err.message : 'Não foi possível salvar o aluno.'
      setFormError(message)
    }
  }

  const handleEdit = (student: Student) => {
    setEditing(student)
    setForm({
      name: student.name,
      email: student.email,
      phone: student.phone ?? '',
      status: student.status ?? ''
    })
    setFormError(null)
    setIsModalOpen(true)
  }

  const handleDelete = (student: Student) => {
    if (window.confirm(`Deseja remover o aluno ${student.name}?`)) {
      void deleteItem(student.id).catch((err) => {
        const message = err instanceof Error ? err.message : 'Não foi possível remover o aluno.'
        alert(message)
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Alunos</h2>
          <p className="text-sm text-foreground/70">Gerencie os cadastros de alunos da AutoEscola Sim.</p>
        </div>
        <Button onClick={openCreateModal}>Adicionar aluno</Button>
      </div>

      {error ? <p className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-300">{error}</p> : null}

      <Table<Student>
        data={items}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? 'Editar aluno' : 'Novo aluno'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Nome"
            name="name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
          <Input
            label="E-mail"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
          <Input
            label="Telefone"
            name="phone"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
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

export default StudentsPage
