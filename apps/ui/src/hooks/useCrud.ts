import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from './useAuth'
import { apiRequest } from '../services/api'

type Id = string | number

type UseCrudOptions<T> = {
  mapResponse?: (data: unknown) => T[]
}

export function useCrud<T extends { id: Id }>(resource: string, options?: UseCrudOptions<T>) {
  const { token } = useAuth()
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const mapResponse = useMemo(() => options?.mapResponse ?? ((data: unknown) => data as T[]), [options?.mapResponse])

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiRequest(`/${resource}`, { method: 'GET' }, token ?? undefined)
      const list = mapResponse(response)
      setItems(list)
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível carregar os dados.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [mapResponse, resource, token])

  useEffect(() => {
    if (token) {
      void fetchItems()
    }
  }, [fetchItems, token])

  const createItem = useCallback(
    async (payload: Partial<T>) => {
      const created = await apiRequest<T>(`/${resource}`, {
        method: 'POST',
        body: JSON.stringify(payload)
      }, token ?? undefined)

      setItems((prev) => [...prev, created])
    },
    [resource, token]
  )

  const updateItem = useCallback(
    async (id: Id, payload: Partial<T>) => {
      const updated = await apiRequest<T>(`/${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      }, token ?? undefined)

      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)))
    },
    [resource, token]
  )

  const deleteItem = useCallback(
    async (id: Id) => {
      await apiRequest<void>(`/${resource}/${id}`, { method: 'DELETE' }, token ?? undefined)
      setItems((prev) => prev.filter((item) => item.id !== id))
    },
    [resource, token]
  )

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  }
}
