import { useMemo, useState } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Table from '../components/Table'
import { useCrud } from '../hooks/useCrud'

export type School = {
  id: string
  name: string
  city: string
  state: string
  phone?: string
}

const emptyForm: Omit<School, 'id'> = {
  name: '',
  city: '',
  state: '',
  phone: ''
}

export function SchoolsPage() {
  const { items, loading, error, createItem, updateItem, deleteItem } = useCrud<School>('schools')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState<School | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const columns = useMemo(
    () => [
      { key: 'name', label: 'Nome' },
      { key: 'city', label: 'Cidade' },
      { key: 'state', label: 'UF' },
      { key: 'phone', label: 'Telefone' }
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
      const message = err instanceof Error ? err.message : 'Não foi possível salvar a escola.'
      setFormError(message)
    }
  }

  const handleEdit = (school: School) => {
    setEditing(school)
    setForm({
      name: school.name,
      city: school.city,
      state: school.state,
      phone: school.phone ?? ''
    })
    setFormError(null)
    setIsModalOpen(true)
  }

  const handleDelete = (school: School) => {
    if (window.confirm(`Deseja remover a escola ${school.name}?`)) {
      void deleteItem(school.id).catch((err) => {
        const message = err instanceof Error ? err.message : 'Não foi possível remover a escola.'
        alert(message)
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Escolas</h2>
          <p className="text-sm text-foreground/70">Cadastre unidades e controle os pontos de atendimento.</p>
        </div>
        <Button onClick={openCreateModal}>Adicionar escola</Button>
      </div>

      {error ? <p className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-300">{error}</p> : null}

      <Table<School>
        data={items}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? 'Editar escola' : 'Nova escola'}
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
            label="Cidade"
            name="city"
            value={form.city}
            onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
            required
          />
          <Input
            label="Estado"
            name="state"
            value={form.state}
            maxLength={2}
            onChange={(event) => setForm((prev) => ({ ...prev, state: event.target.value.toUpperCase() }))}
            required
          />
          <Input
            label="Telefone"
            name="phone"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
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

export default SchoolsPage
