export async function apiRequest<T = unknown>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers = new Headers(options.headers)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`/api${path}`, {
    ...options,
    headers
  })

  const contentType = response.headers.get('content-type')
  let payload: unknown = null

  if (contentType?.includes('application/json')) {
    payload = await response.json()
  } else if (contentType) {
    payload = await response.text()
  }

  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : (payload as { message?: string })?.message
    throw new Error(message || 'Erro ao comunicar com o servidor')
  }

  return payload as T
}
