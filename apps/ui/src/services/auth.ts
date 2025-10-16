export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: {
    id: string
    name: string
    email: string
    role?: string
  }
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Falha na autenticação')
  }

  return response.json() as Promise<LoginResponse>
}
