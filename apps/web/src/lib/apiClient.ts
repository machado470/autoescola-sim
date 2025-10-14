import axios, {
  type AxiosHeaders,
  type AxiosRequestConfig,
  type AxiosResponse,
  type RawAxiosRequestHeaders,
} from 'axios'
import { clearStoredToken, getStoredToken } from './auth-storage'

import { API_BASE_URL } from '../config'

type ApiRequestConfig<TData = unknown> = AxiosRequestConfig<TData> & {
  withAuth?: boolean
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
})

function buildHeaders(
  initHeaders: AxiosRequestConfig['headers'] = undefined,
  withAuth: boolean,
): RawAxiosRequestHeaders {
  const headers: RawAxiosRequestHeaders = {}

  if (
    initHeaders &&
    typeof (initHeaders as AxiosHeaders).forEach === 'function'
  ) {
    ;(initHeaders as AxiosHeaders).forEach((value: unknown, name: string) => {
      if (typeof value !== 'undefined' && value !== null) {
        headers[name] = Array.isArray(value)
          ? value.map((entry) => String(entry)).join(', ')
          : String(value)
      }
    })
  } else if (initHeaders && typeof initHeaders === 'object') {
    Object.entries(initHeaders as Record<string, unknown>).forEach(
      ([name, value]) => {
        if (typeof value !== 'undefined' && value !== null) {
          headers[name] = Array.isArray(value)
            ? value.join(', ')
            : String(value)
        }
      },
    )
  }

  if (withAuth) {
    const token = getStoredToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  return headers
}

export async function apiFetch<TResponse = unknown>(
  input: string,
  config: ApiRequestConfig = {},
): Promise<AxiosResponse<TResponse>> {
  const { withAuth = true, headers: initHeaders, ...rest } = config
  const headers = buildHeaders(initHeaders, withAuth)

  const response = await apiClient.request<TResponse>({
    url: input,
    ...rest,
    headers,
    validateStatus: () => true,
  })

  if (response.status === 401) {
    clearStoredToken()
  }

  return response
}

export { API_BASE_URL }
