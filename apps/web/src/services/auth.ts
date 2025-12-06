import axios from "axios";

export async function loginUser(email: string, password: string) {
  const res = await axios.post("http://localhost:3000/auth/login", {
    email,
    password,
  });

  return res.data.user;
}
