const DEFAULT_API_URL = 'http://localhost:8080'

export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() && import.meta.env.VITE_API_URL.trim().length > 0
    ? import.meta.env.VITE_API_URL.trim()
    : DEFAULT_API_URL

export const TOKEN_STORAGE_KEY =
  import.meta.env.VITE_TOKEN_KEY?.trim() && import.meta.env.VITE_TOKEN_KEY.trim().length > 0
    ? import.meta.env.VITE_TOKEN_KEY.trim()
    : 'autoescola-sim.authToken'
