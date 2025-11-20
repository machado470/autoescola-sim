import { useEffect, useState } from "react";
import { getToken, getUser } from "../lib/auth";

export function useAuth() {
  const [auth, setAuth] = useState<{ token: string | null; user: any | null }>({
    token: null,
    user: null,
  });

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    setAuth({ token, user });
  }, []);

  return auth;
}
