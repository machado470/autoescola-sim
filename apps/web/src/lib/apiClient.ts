import { clearStoredToken, getStoredToken } from './auth-storage'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

type ApiFetchOptions = RequestInit & {
  auth?: boolean
}

function buildHeaders(initHeaders: HeadersInit | undefined, withAuth: boolean): Headers {
  const headers = new Headers(initHeaders)
  if (withAuth) {
    const token = getStoredToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }
  return headers
}

export async function apiFetch(input: string, init: ApiFetchOptions = {}): Promise<Response> {
  const { auth = true, headers: initHeaders, ...rest } = init
  const headers = buildHeaders(initHeaders, auth)
  const response = await fetch(`${API_BASE_URL}${input}`, {
    ...rest,
    headers,
  })

  if (response.status === 401) {
    clearStoredToken()
  }

  return response
}

export { API_BASE_URL }
