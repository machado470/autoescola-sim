declare module 'axios' {
  export interface AxiosResponse<T = unknown> {
    data: T
    status: number
    statusText: string
    headers?: Record<string, unknown>
  }

  export interface AxiosRequestConfig<TData = unknown> {
    method?: string
    url?: string
    baseURL?: string
    data?: TData
    headers?: AxiosHeaders | Record<string, unknown>
    validateStatus?: (status: number) => boolean
    withCredentials?: boolean
    [key: string]: unknown
  }

  export type RawAxiosRequestHeaders = Record<string, string>

  export class AxiosHeaders {
    forEach(
      callback: (value: unknown, name: string, headers: AxiosHeaders) => void,
      thisArg?: unknown,
    ): void
  }

  export type AxiosHeaderValue = string | number | boolean

  export function isAxiosError(payload: unknown): payload is { message?: string }

  const axios: {
    create: (config?: AxiosRequestConfig) => {
      request: <T = unknown>(config: AxiosRequestConfig) => Promise<AxiosResponse<T>>
    }
  }

  export default axios
}

declare module 'react-router-dom' {
  export const Link: any
  export const NavLink: any
  export const RouterProvider: any
  export const useLocation: any
  export const useNavigate: any
  export const useParams: any
  export const Navigate: any
  export const createBrowserRouter: any
  export type Location = any
}
