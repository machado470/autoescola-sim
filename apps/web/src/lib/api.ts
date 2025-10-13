export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function apiGet(path: string) {
  const response = await fetch(`${API_URL}${path}`)
  if (!response.ok) {
    throw new Error(`Falha ao buscar ${path}: ${response.status}`)
  }
  return response.json()
}
