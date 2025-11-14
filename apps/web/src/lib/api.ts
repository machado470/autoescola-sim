const API_URL = "http://127.0.0.1:3000";

export type LoginResponse = {
  access_token: string;
};

export type WhoAmIResponse = {
  id: number;
  email: string;
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Login falhou (${res.status}): ${body}`);
  }

  return res.json();
}

export async function whoAmI(token: string): Promise<WhoAmIResponse> {
  const res = await fetch(`${API_URL}/auth/whoami`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`whoami falhou (${res.status}): ${body}`);
  }

  return res.json();
}
