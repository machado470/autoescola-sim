export type School = {
  id: number
  name: string
  city: string
  phone?: string | null
}

const BASE_URL = 'http://localhost:3000/schools'

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()
  return (text ? JSON.parse(text) : undefined) as T
}

export async function fetchAll(): Promise<School[]> {
  const response = await fetch(BASE_URL)
  return handleResponse<School[]>(response)
}

export type CreateSchoolInput = {
  name: string
  city: string
  phone?: string
}

export async function create(data: CreateSchoolInput): Promise<School> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return handleResponse<School>(response)
}

export type UpdateSchoolInput = Partial<CreateSchoolInput>

export async function update(id: number, data: UpdateSchoolInput): Promise<School> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return handleResponse<School>(response)
}

export async function remove(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  await handleResponse<void>(response)
}
