import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT";
}

interface AuthContextProps {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedAccess = localStorage.getItem("access_token");
    const savedRefresh = localStorage.getItem("refresh_token");

    if (savedUser && savedAccess) {
      setUser(JSON.parse(savedUser));
      setAccessToken(savedAccess);
      setRefreshToken(savedRefresh);
    }

    setLoading(false);
  }, []);

  async function login(email: string, password: string): Promise<User | null> {
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return null;

      const data = await res.json();

      setUser(data.user);
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      return data.user; // << agora retorna o user
    } catch (err) {
      console.error("Login error:", err);
      return null;
    }
  }

  function logout() {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        loading,
        login,
        logout,
        isAuthenticated: !!user && !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

