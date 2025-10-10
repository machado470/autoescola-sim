export const AUTH_TOKEN_KEY = 'autoescola-sim.authToken'

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

export function setStoredToken(token: string) {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function clearStoredToken() {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
}
