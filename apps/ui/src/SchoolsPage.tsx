import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import {
  School,
  CreateSchoolInput,
  fetchAll as fetchAllSchools,
  create as createSchool,
  remove as removeSchool,
} from './services/schools'
import './App.css'

type FormState = CreateSchoolInput

const INITIAL_FORM_STATE: FormState = {
  name: '',
  city: '',
  phone: '',
}

function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasFormChanges = useMemo(
    () => formState.name.trim() !== '' && formState.city.trim() !== '',
    [formState.city, formState.name],
  )

  const loadSchools = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await fetchAllSchools()
      setSchools(data)
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSchools()
  }, [loadSchools])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload: CreateSchoolInput = {
      name: formState.name.trim(),
      city: formState.city.trim(),
      phone: formState.phone?.trim() || undefined,
    }

    try {
      setIsLoading(true)
      const created = await createSchool(payload)
      setSchools((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)))
      setFormState(INITIAL_FORM_STATE)
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = async (id: number) => {
    try {
      await removeSchool(id)
      setSchools((prev) => prev.filter((school) => school.id !== id))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(message)
    }
  }

  return (
    <section className="schools">
      <header>
        <h2>Escolas</h2>
        {isLoading ? <span aria-live="polite">Carregando…</span> : null}
      </header>
      {error ? (
        <p role="alert" className="error">
          {error}
        </p>
      ) : null}

      <form className="school-form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            required
            name="name"
            value={formState.name}
            onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
          />
        </label>
        <label>
          Cidade
          <input
            required
            name="city"
            value={formState.city}
            onChange={(event) => setFormState((prev) => ({ ...prev, city: event.target.value }))}
          />
        </label>
        <label>
          Telefone
          <input
            name="phone"
            value={formState.phone ?? ''}
            onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
          />
        </label>
        <button type="submit" disabled={!hasFormChanges || isLoading}>
          Cadastrar escola
        </button>
      </form>

      <ul className="school-list">
        {schools.length === 0 ? (
          <li>Nenhuma escola cadastrada.</li>
        ) : (
          schools.map((school) => (
            <li key={school.id}>
              <strong>{school.name}</strong>
              <div>{school.city}</div>
              {school.phone ? <div>{school.phone}</div> : null}
              <button type="button" onClick={() => void handleRemove(school.id)}>
                Remover
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default SchoolsPage
